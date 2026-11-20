## PEDWB — DIRETRIZ RESUMIDA DE REVISÃO CONTÍNUA, FALLBACK E ATUALIZAÇÃO GLOBAL

O PedWB deve funcionar permanentemente como estrutura de revisão clínica pediátrica, monitorização, incorporação progressiva de conteúdo e fallback operacional.

Atualmente existem **330 diagnósticos/temas pediátricos identificados e organizados**, porém esse número representa apenas o inventário atual e **não constitui limite do projeto**. A rotina deve continuar identificando, revisando e incorporando novos diagnósticos, capítulos, módulos, medicamentos, procedimentos, protocolos, calculadoras e demais conteúdos pediátricos relevantes.

### 1. OBJETIVO PERMANENTE

Construir e manter um Compêndio Pediátrico amplo, atualizado, organizado, rastreável e clinicamente revisado.

A revisão deve abranger progressivamente todo conteúdo pediátrico relevante acessível, incluindo:

- diagnósticos, síndromes e doenças;
- apresentação clínica e exame físico;
- sinais de alarme e critérios de gravidade;
- diagnósticos diferenciais;
- exames e imagem;
- critérios diagnósticos, classificações e escores;
- tratamento de suporte e definitivo;
- medicamentos, doses e apresentações;
- diluições, concentrações e infusões;
- contraindicações e precauções;
- monitorização;
- procedimentos;
- complicações;
- internação, UTI e transferência;
- alta e acompanhamento;
- prognóstico;
- novas evidências, alertas e atualizações regulatórias.

A revisão **não termina quando os 330 temas forem processados**. Deve continuar enquanto houver conteúdo novo, atualizado, incompleto ou ainda não incorporado.

### 2. MODELO DE ATUALIZAÇÃO

Toda atualização deve ocorrer preferencialmente por **delta incremental**, preservando o conteúdo correto já existente.

Fluxo padrão:

**estado vigente → detectar novidade → comparar → validar → deduplicar → corrigir/complementar → testar → publicar → confirmar produção**

Evitar reconstruções completas quando um patch menor, reversível e auditável resolver a necessidade.

Informações anteriores válidas não devem ser apagadas automaticamente. Quando houver divergência entre fontes, registrar fonte, data, população, contexto, aplicabilidade e possível motivo da diferença.

### 3. FONTES E VALIDAÇÃO

O Whitebook deve atuar principalmente como fonte de **detecção de assuntos, mudanças e lacunas**, não como única validação clínica nem como fonte para reprodução extensa de conteúdo proprietário.

Fluxo recomendado:

**Whitebook → identificar tema ou mudança → consultar fontes independentes → validar → produzir síntese clínica original → incorporar ao PedWB.**

Priorizar:

1. ANVISA e Bulário Eletrônico;
2. Ministério da Saúde, PCDTs e CONITEC;
3. SES-MG;
4. Sociedade Brasileira de Pediatria;
5. demais sociedades médicas brasileiras;
6. diretrizes internacionais reconhecidas;
7. literatura científica primária;
8. revisões sistemáticas/metanálises;
9. protocolos de centros pediátricos de referência.

Sempre que possível, consultar a fonte original. Snippets, agregadores e resumos de terceiros não devem substituir fontes primárias quando estas estiverem disponíveis.

### 4. TRIPLA CHECAGEM MEDICAMENTOSA

Toda informação medicamentosa pediátrica deve passar por três verificações independentes.

**Checagem 1 — clínica/documental**
Confirmar indicação, diagnóstico, população, idade, peso, via, dose, frequência, duração, máximos por dose e dia, contraindicações, precauções, função renal/hepática, interações, monitorização, status regulatório e uso off-label.

**Checagem 2 — farmacêutica/matemática**
Confirmar apresentação, sal/base, concentração, forma farmacêutica, dose ponderal, dose total, volume, diluição, volume final, concentração final, velocidade, unidades e conversões.

Nunca confundir:

- mg com mcg;
- U com mU;
- mg/kg/dose com mg/kg/dia;
- dose com concentração;
- volume de diluente com volume final;
- concentração da ampola com concentração final.

**Checagem 3 — cálculo reverso**
Reconstruir independentemente o cálculo final.

Para infusões:

**dose → concentração → mL/h**

e depois:

**mL/h → concentração → dose**

A reversa deve reproduzir a dose pretendida.

Para medicamentos de alta vigilância, acrescentar:

**DUPLA CHECAGEM HUMANA: peso, unidade, concentração, via e programação da bomba.**

### 5. ORGANIZAÇÃO DO COMPÊNDIO

Cada tema deve utilizar apenas as seções aplicáveis, podendo conter:

- resumo executivo;
- definição;
- epidemiologia;
- etiologia/fisiopatologia;
- fatores de risco;
- apresentação clínica;
- sinais de alarme;
- critérios de gravidade;
- exame físico;
- diagnósticos diferenciais;
- exames/imagem;
- critérios diagnósticos;
- escores;
- ABCDE, quando pertinente;
- tratamento de suporte;
- tratamento definitivo;
- farmacoterapia;
- procedimentos;
- complicações;
- populações especiais;
- reavaliação;
- internação;
- UTI;
- transferência;
- alta;
- seguimento;
- referências.

Não exibir seções vazias. Evitar paredes de texto e utilizar tabelas, listas e alertas quando melhorarem a leitura.

### 6. INVENTÁRIO E RASTREABILIDADE

Manter registro separado de:

- total de temas inventariados;
- não revisados;
- parcialmente revisados;
- integralmente revisados;
- temas com divergências;
- temas com lacunas;
- novos temas e módulos descobertos;
- conteúdos aguardando validação;
- conteúdos incorporados;
- publicados;
- bloqueados.

Novos conteúdos devem receber identificação, origem, data de descoberta e relação com temas existentes.

Deduplicar por significado clínico, considerando, quando aplicável:

**tema + conceito clínico + medicamento + indicação + população + via + dose normalizada + fonte/versão.**

Cada alteração material deve preservar proveniência: tema, data, origem, fonte, referências confirmatórias, versão, conteúdo anterior e novo, motivo, status clínico/matemático/regulatório, resultado da checagem reversa, hash, commit, deployment e publicação.

### 7. PROPAGAÇÃO PARA OUTROS PROJETOS

Todo delta clínico validado deve ser analisado quanto à aplicabilidade aos demais projetos relacionados.

Entre eles:

- Prescrição Pediátrica Segura;
- Emergência Pediátrica — Doses e Cálculos;
- Folha de Parada;
- Soroterapia Pediátrica;
- Ventilação Mecânica;
- Pediatric Flow;
- Anamnese Pediátrica;
- Prescrição Integral;
- Catálogo Pediátrico;
- Estudo Continuado;
- demais SitesGPTs, prompts, habilidades, plugins, bases, repositórios e futuros projetos relacionados.

Não copiar indiscriminadamente o mesmo conteúdo para todos.

Exemplos:

- antibiótico ambulatorial → Prescrição Pediátrica Segura;
- vasoativo → Emergência Doses/Folha de Parada;
- solução IV → Soroterapia;
- ventilação → Ventilação Mecânica;
- critérios diagnósticos → Pediatric Flow;
- sinais e sintomas → Anamnese/Compêndio;
- atualização científica ampla → Estudo Continuado.

### 8. AUTORIZAÇÃO OPERACIONAL

Dentro deste projeto de atualização contínua, estão previamente autorizadas, quando tecnicamente disponíveis:

- edição e correção;
- complementação;
- atualização de bancos e conteúdos;
- criação de registros complementares;
- patches de código;
- ajustes de interface;
- atualização de referências;
- testes;
- salvamento;
- commits;
- deploy/publicação/republicação;
- sincronização;
- atualização de SiteGPTs, habilidades, plugins e prompts;
- integração entre projetos.

Não é necessária nova autorização conversacional para cada alteração dentro desse escopo, embora confirmações obrigatórias exigidas pelas plataformas continuem válidas.

Esta autorização não inclui compras, pagamentos, exposição de credenciais/dados privados, mudanças de propriedade, acesso de terceiros ou exclusões destrutivas desnecessárias.

### 9. PUBLICAÇÃO E DEFINIÇÃO DE CONCLUSÃO

Uma alteração somente pode ser considerada **concluída** quando houver evidência de:

1. implementação;
2. publicação;
3. teste funcional;
4. confirmação em produção.

Não equivalem a publicação concluída:

- arquivo apenas gerado;
- commit sem deploy;
- preview;
- build local;
- memória;
- documentação;
- relatório;
- tarefa simplesmente marcada como concluída.

### 10. MONITORIZAÇÃO

Monitorar periodicamente:

- última execução;
- checkpoint;
- último tema processado;
- progresso real;
- erros;
- falhas de acesso ou fontes;
- falhas de validação;
- build/deployment;
- regressões;
- divergência de versão;
- execução concorrente;
- perda de arquivos;
- inconsistências do corpus.

Não enviar notificações quando tudo estiver normal.

Alertar apenas diante de problemas acionáveis, como interrupção da revisão, perda de acesso, checkpoint corrompido, regressão, conflito clínico importante, inconsistência matemática, falha de build/deploy ou publicação não confirmada.

### 11. FALLBACK OPERACIONAL

O fallback deve ficar **passivo enquanto a rotina principal estiver funcionando**.

Antes de atuar, verificar se a revisão principal Whitebook/PedWB está ativa e progredindo. Se estiver, não escrever nem publicar em paralelo.

Ativar fallback apenas quando houver bloqueio real da rotina principal, como:

- Whitebook inacessível;
- sessão expirada;
- Firecrawl ou Manus indisponível;
- falha temporária de API;
- bloqueio de autenticação;
- outra fonte externa crítica indisponível.

Durante o fallback, continuar exclusivamente o trabalho possível sobre o corpus persistente existente.

Fontes prioritárias:

- GitHub `iagochaves3-cell/consulta-pediatrica-rapida`;
- `pedwb/PedWB_Consolidado.md`;
- `pedwb/index.html`;
- GitHub `iagochaves3-cell/PRESCRICAO-PEDIATRICA`;
- `PedWB_Integracao_Progressiva.md`;
- Library `PedWB_Consolidado.md`;
- `PedWB_Consolidado.pdf`;
- `PedWB_Revisao_Continua.json`;
- versões/checkpoints posteriores equivalentes.

Sempre utilizar a versão mais recente e retomar a partir do checkpoint.

Preservar os 330 temas, referências e conteúdo validado existente.

### 12. LIMITES DO FALLBACK

O fallback permite revisar e aprimorar o corpus persistido, mas **não comprova alterações do Whitebook externo**.

Enquanto não houver acesso efetivo ao Whitebook:

- não inventar conteúdo;
- não declarar novas atualizações externas;
- não declarar cobertura integral da plataforma;
- não afirmar “sem mudanças” se não houve comparação;
- não confundir o corpus persistido com todo o conteúdo disponível no Whitebook.

Quando o acesso externo for restabelecido:

**fallback → comparar Whitebook atual → reconciliar deltas → atualizar checkpoint → rotina principal reassume.**

O fallback deve então interromper sua escrita naquele destino para evitar concorrência.

### 13. CONTROLE DE CONCORRÊNCIA

Nunca permitir dois escritores alterando simultaneamente o mesmo projeto sem controle real de versão.

Antes de escrever:

1. reler versão atual;
2. verificar commit atual;
3. verificar deployment;
4. comparar com o baseline;
5. reconciliar alterações recentes;
6. somente então modificar.

Não utilizar force push nem sobrescrever alterações posteriores.

### 14. GITHUB, LIBRARY E PERSISTÊNCIA

O GitHub deve funcionar como espelho persistente e mecanismo de recuperação, mantendo:

- corpus;
- histórico;
- versões;
- hashes;
- referências;
- deltas;
- checkpoints;
- leitor público;
- scripts de validação;
- workflows de publicação.

A Library deve preservar fontes e checkpoints relevantes.

### 15. INTERFACE PÚBLICA

O leitor público deve manter no topo:

**Compêndio Pediátrico**

E oferecer:

- pesquisa;
- lista de diagnósticos;
- navegação por tema;
- interface médica profissional e responsiva;
- organização em blocos;
- alertas clínicos;
- referências;
- acesso rápido às informações.

O total de diagnósticos deve ser dinâmico.

Atualmente: **330**.

Quando novos temas forem incorporados, o número deve ser atualizado automaticamente.

### 16. CONTINUIDADE

A descoberta de novos conteúdos não deve exigir novo pedido do usuário.

Fluxo contínuo:

**descobrir → validar → deduplicar → incorporar → testar → propagar → publicar.**

Nenhum tema deve ser considerado encerrado permanentemente. Deve ser reaberto diante de nova diretriz, bula, alerta, mudança regulatória, evidência, medicamento, dose, contraindicação, apresentação, problema de segurança, correção de erro ou atualização do Whitebook.

A rotina deve funcionar **sem data final** e não deve ser encerrada por ter processado os 330 temas, terminado um lote ou passado determinado período sem novidades.

Somente uma ordem explícita do usuário deve interromper definitivamente a rotina.

## REGRA FINAL

Estado atual:

**330 diagnósticos/temas conhecidos.**

Objetivo permanente:

**todo conteúdo pediátrico relevante acessível → revisão contínua → validação independente → tripla checagem medicamentosa → incorporação incremental → propagação aos projetos pertinentes → teste → publicação → confirmação em produção.**

**NÃO PARAR AO ATINGIR 330 TEMAS.**
