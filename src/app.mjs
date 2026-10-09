import { calculateDose, calculateInfusion } from './calculations.mjs';

const $ = (selector) => document.querySelector(selector);
const format = (value) => new Intl.NumberFormat('pt-BR', {
  maximumSignificantDigits: 6,
}).format(value);

function setError(form, message) {
  const error = form.querySelector('[role="alert"]');
  error.textContent = message;
  error.hidden = !message;
  form.querySelector('.result').hidden = true;
}

$('#dose-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  try {
    const result = calculateDose(Object.fromEntries(new FormData(form)));
    setError(form, '');
    $('#dose-result').innerHTML = `
      <p><strong>Dose por administração:</strong> ${format(result.dosePerAdministration)} ${result.amountUnit}</p>
      <p><strong>Volume por administração:</strong> ${format(result.volumePerDoseMl)} mL</p>
      ${result.dosePerDay === null ? '' : `<p><strong>Total em 24 h:</strong> ${format(result.dosePerDay)} ${result.amountUnit}</p>`}
      <p><strong>Checagem reversa:</strong> ${format(result.reconstructedPerKg)} ${result.doseUnit}</p>
      ${result.capped ? '<p class="warning">O limite informado foi aplicado. Confirme se o tipo de limite corresponde à referência clínica.</p>' : ''}
    `;
    form.querySelector('.result').hidden = false;
  } catch (error) {
    setError(form, error.message);
  }
});

$('#infusion-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  try {
    const result = calculateInfusion(Object.fromEntries(new FormData(form)));
    setError(form, '');
    $('#infusion-result').innerHTML = `
      <p><strong>Concentração calculada:</strong> ${format(result.concentration)} ${result.concentrationUnit}</p>
      <p><strong>Quantidade por hora:</strong> ${format(result.amountPerHour)} ${result.amountUnit}/h</p>
      <p><strong>Quantidade por minuto:</strong> ${format(result.amountPerMinute)} ${result.amountUnit}/min</p>
      <p><strong>Bomba:</strong> ${format(result.pumpRateMlPerHour)} mL/h</p>
      <p><strong>Consumo:</strong> 6 h ${format(result.volumeFor6HoursMl)} mL · 12 h ${format(result.volumeFor12HoursMl)} mL · 24 h ${format(result.volumeFor24HoursMl)} mL</p>
      <p><strong>Duração estimada da solução:</strong> ${format(result.solutionDurationHours)} h</p>
      <p><strong>Checagem reversa:</strong> ${format(result.reconstructedPerKg)} ${result.doseUnit}</p>
    `;
    form.querySelector('.result').hidden = false;
  } catch (error) {
    setError(form, error.message);
  }
});

document.querySelectorAll('[data-daily-field]').forEach((field) => {
  $('#dose-unit').addEventListener('change', (event) => {
    field.hidden = !event.target.value.endsWith('/day');
  });
});
