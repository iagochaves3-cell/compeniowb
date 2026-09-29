const searchInput = document.querySelector('#catalog-search');
const list = document.querySelector('#catalog-list');
const detail = document.querySelector('#monograph');
const resultCount = document.querySelector('#result-count');
const errorMessage = document.querySelector('#catalog-error');
const filterButtons = [...document.querySelectorAll('[data-filter]')];

const flagLabels = {
  contem_restricao_contexto_especifico: 'Restrições',
  contem_off_label: 'Off-label',
  contem_alerta_nao_extrapolar: 'Não extrapolar',
};

let records = [];
let activeFilter = 'all';
let selectedRecordId = null;

function normalize(value) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('pt-BR');
}

function flagsFor(record) {
  return Object.entries(flagLabels)
    .filter(([key]) => record.flags_documentais?.[key])
    .map(([, label]) => label);
}

function matchesFilter(record) {
  const flags = record.flags_documentais ?? {};
  if (activeFilter === 'restriction') return Boolean(flags.contem_restricao_contexto_especifico);
  if (activeFilter === 'off-label') return Boolean(flags.contem_off_label);
  if (activeFilter === 'alert') {
    return Boolean(flags.contem_alerta_nao_extrapolar || flags.contem_restricao_contexto_especifico);
  }
  return true;
}

function matchingRecords() {
  const query = normalize(searchInput.value.trim());
  return records.filter((record) => {
    if (!matchesFilter(record)) return false;
    if (!query) return true;
    return normalize(`${record.medicamento} ${record.texto_integral_monografia}`).includes(query);
  });
}

function renderDetail(record) {
  detail.replaceChildren();

  const header = document.createElement('header');
  header.className = 'monograph-header';
  const titleBlock = document.createElement('div');
  const kicker = document.createElement('p');
  kicker.className = 'monograph-kicker';
  kicker.textContent = `Ficha ${record.ficha} / ${records.length}`;
  const title = document.createElement('h3');
  title.id = 'monograph-title';
  title.textContent = record.medicamento;
  titleBlock.append(kicker, title);

  const page = document.createElement('span');
  page.className = 'page-chip';
  page.textContent = `PDF · p. ${record.pagina_pdf}`;
  header.append(titleBlock, page);
  detail.append(header);

  const flags = flagsFor(record);
  if (flags.length) {
    const flagList = document.createElement('div');
    flagList.className = 'monograph-flags';
    flagList.setAttribute('aria-label', 'Sinalizadores documentais');
    for (const label of flags) {
      const flag = document.createElement('span');
      flag.className = 'flag';
      flag.textContent = label;
      flagList.append(flag);
    }
    detail.append(flagList);
  }

  const text = document.createElement('p');
  text.className = 'monograph-text';
  text.textContent = record.texto_integral_monografia;
  detail.append(text);

  const source = document.createElement('p');
  source.className = 'monograph-source';
  source.textContent = `Fonte: Catálogo Posológico Pediátrico · ficha ${record.ficha} · página ${record.pagina_pdf}.`;
  detail.append(source);
}

function renderList() {
  const visibleRecords = matchingRecords();
  resultCount.textContent = `${visibleRecords.length} ${visibleRecords.length === 1 ? 'resultado' : 'resultados'}`;
  list.replaceChildren();

  if (!visibleRecords.length) {
    const empty = document.createElement('p');
    empty.className = 'empty-list';
    empty.textContent = 'Nenhum registro corresponde à busca e aos filtros selecionados.';
    list.append(empty);
    detail.replaceChildren();
    const emptyDetail = document.createElement('p');
    emptyDetail.className = 'empty-list';
    emptyDetail.textContent = 'Ajuste os termos ou escolha outro filtro para explorar o catálogo.';
    detail.append(emptyDetail);
    selectedRecordId = null;
    return;
  }

  for (const record of visibleRecords) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'medicine-row';
    button.setAttribute('aria-pressed', String(record.ficha === selectedRecordId));
    button.addEventListener('click', () => {
      selectedRecordId = record.ficha;
      for (const row of list.querySelectorAll('.medicine-row')) {
        row.setAttribute('aria-pressed', String(row === button));
      }
      renderDetail(record);
    });

    const number = document.createElement('span');
    number.className = 'row-number';
    number.textContent = String(record.ficha).padStart(3, '0');
    const name = document.createElement('span');
    name.className = 'row-name';
    name.textContent = record.medicamento;
    const page = document.createElement('span');
    page.className = 'row-page';
    page.textContent = `p. ${record.pagina_pdf}`;
    button.append(number, name, page);
    list.append(button);
  }

  const selected = visibleRecords.find((record) => record.ficha === selectedRecordId) ?? visibleRecords[0];
  selectedRecordId = selected.ficha;
  renderDetail(selected);
}

function setActiveFilter(button) {
  activeFilter = button.dataset.filter;
  for (const filterButton of filterButtons) {
    const selected = filterButton === button;
    filterButton.classList.toggle('selected', selected);
    filterButton.setAttribute('aria-pressed', String(selected));
  }
  renderList();
}

for (const button of filterButtons) {
  button.addEventListener('click', () => setActiveFilter(button));
}
searchInput.addEventListener('input', renderList);
document.addEventListener('keydown', (event) => {
  const target = event.target;
  const isEditing = target instanceof HTMLElement
    && (target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName));
  if (event.key === '/' && !isEditing) {
    event.preventDefault();
    searchInput.focus();
  }
  if (event.key === 'Escape' && target === searchInput && searchInput.value) {
    searchInput.value = '';
    renderList();
  }
});

try {
  const response = await fetch('./Biblioteca_Medicamentosa_Pediatrica_MASTER_498.json');
  if (!response.ok) throw new Error(`Catálogo indisponível (${response.status}).`);
  const catalog = await response.json();
  if (!Array.isArray(catalog.medicamentos)) throw new Error('Formato do catálogo inválido.');
  records = catalog.medicamentos;
  document.querySelector('#stat-count').textContent = String(records.length);
  renderList();
} catch {
  errorMessage.hidden = false;
  resultCount.textContent = 'Indisponível';
  detail.textContent = 'O catálogo não pôde ser carregado. Consulte o PDF da fonte ou tente novamente mais tarde.';
}
