# Política de revisão contínua, fallback e propagação do PedWB

## Objetivo e limites

Manter o compêndio pediátrico amplo, atualizado, organizado e rastreável. Os 330 diagnósticos/temas informados são o inventário inicial conhecido, não um limite nem uma meta de encerramento. Descobrir, revisar e incorporar temas, módulos, medicamentos, procedimentos, protocolos, calculadoras e evidências pediátricas relevantes continua enquanto a rotina estiver autorizada; nenhum lote, prazo ou número de temas encerra o trabalho.

Não confundir o número de páginas de um arquivo com o número de temas, a existência de um registro com sua revisão clínica, nem o corpus persistido com todo o conteúdo do Whitebook. Não declarar revisão, comparação, execução recorrente, sincronização, publicação ou confirmação em produção sem evidência correspondente. Esta política não configura sozinha um agendador, acesso ao Whitebook, ferramentas de escrita externas ou deployment.

## Fluxo principal e concorrência

Antes de qualquer escrita, confirmar o estado e o progresso da rotina principal, seu último checkpoint/tema e a versão/commit/deployment do destino. Se a rotina principal estiver ativa e progredindo, não iniciar uma escrita concorrente. Para cada atualização:

**estado vigente → detectar novidade/lacuna → comparar → validar → deduplicar → corrigir/complementar por delta → testar → publicar → verificar produção**

Reler o baseline e reconciliar alterações recentes imediatamente antes de gravar. Preservar conteúdo anterior válido e preferir patches mínimos, reversíveis e auditáveis a reconstruções. Não sobrescrever alterações posteriores, usar force push ou excluir conteúdo válido sem necessidade. Em conflitos entre fontes, reter as versões e registrar origem, data, população, contexto, aplicabilidade e possível motivo da divergência.

## Descoberta e validação clínica

Usar o Whitebook principalmente para descobrir tópicos, mudanças e lacunas, nunca como única validação nem para reproduzir extensamente conteúdo proprietário. Sempre que possível, confirmar na fonte primária e validar independentemente. Prioridade: ANVISA/Bulário Eletrônico; Ministério da Saúde, PCDT e CONITEC; SES-MG; Sociedade Brasileira de Pediatria; demais sociedades brasileiras; diretrizes internacionais reconhecidas; literatura primária; revisões sistemáticas/metanálises; protocolos de centros pediátricos de referência. Snippets e agregadores não substituem a fonte original quando acessível. Produzir síntese clínica original e registrar as fontes consultadas e as não acessíveis.

Revisar progressivamente definição, apresentação, exame, alarmes/gravidade, diferenciais, exames/imagem, critérios/escores, suporte e tratamento definitivo, farmacoterapia, procedimentos, complicações, populações especiais, reavaliação, internação/UTI/transferência, alta, acompanhamento, prognóstico, alertas e mudanças regulatórias. Exibir apenas seções aplicáveis; não criar fatos para preencher lacunas.

## Segurança medicamentosa

Toda informação medicamentosa nova ou materialmente alterada requer três verificações independentes:

1. **Clínica/documental:** indicação, população, idade/peso, via, dose e frequência, duração, máximos por dose/dia, contraindicações, precauções, função renal/hepática, interações, monitorização, status regulatório e uso off-label.
2. **Farmacêutica/matemática:** produto e apresentação, sal/base, concentração, forma, dose ponderal e total, volume, diluente e volume final, concentração final, velocidade, unidades e conversões. Distinguir mg de mcg, U de mU, mg/kg/dose de mg/kg/dia, dose de concentração, volume de diluente de volume final e concentração do produto de concentração final.
3. **Cálculo reverso independente:** para infusão, reconstruir dose → concentração → mL/h e mL/h → concentração → dose; o percurso reverso deve reproduzir a dose pretendida.

Para medicamentos de alta vigilância, exigir também dupla checagem humana de peso, unidade, concentração, via e programação da bomba. Se a evidência não sustenta os campos necessários, classificá-los como pendentes/insuficientes; não extrapolar nem automatizar.

## Inventário, deduplicação e proveniência

Manter um registro separado e atualizado dos totais inventariados, não revisados, parcialmente revisados, integralmente revisados, com divergências, com lacunas, novos/descobertos, aguardando validação, incorporados, publicados e bloqueados. Na reconciliação inicial, identificar o denominador e as evidências de cada status; usar “desconhecido/não reconciliado” quando não houver dados, nunca inventar contagens. Cada novo item recebe identificador, título, origem, data de descoberta e relação com temas existentes. Deduplicar por significado clínico, considerando tema, conceito, medicamento, indicação, população, via, dose normalizada e fonte/versão, quando aplicável.

Para cada alteração material, registrar tema/ID, data, origem e referências confirmatórias, população/contexto, versão, conteúdo anterior e novo, motivo, status clínico/matemático/regulatório, resultado da checagem reversa quando aplicável, hash, commit, testes, deployment e confirmação de publicação. Preservar checkpoint recuperável com último tema processado, progresso comprovável, pendências, bloqueios e próxima retomada.

## Fallback passivo

Antes de atuar, verificar se a rotina principal está bloqueada de fato. Manter fallback inativo quando a rotina principal estiver acessível e progredindo. Ativá-lo apenas por bloqueio verificável, como Whitebook inacessível/sessão expirada ou falha de serviço/fonte crítica. Durante o bloqueio, trabalhar somente no corpus persistente acessível, retomando da versão/checkpoint mais recente após reconciliar commit e deployment.

Fontes persistidas prioritárias, quando disponíveis: `iagochaves3-cell/consulta-pediatrica-rapida` (`pedwb/PedWB_Consolidado.md`, `pedwb/index.html`), `iagochaves3-cell/PRESCRICAO-PEDIATRICA`, `PedWB_Integracao_Progressiva.md`, `Library/PedWB_Consolidado.md`, `PedWB_Consolidado.pdf`, `PedWB_Revisao_Continua.json` e checkpoints equivalentes posteriores. Não presumir acesso a esses destinos só porque estão listados.

Fallback permite revisar e aprimorar o corpus existente, mas não comprova alteração ou comparação com o Whitebook. Sem acesso externo, não inventar novidades, não alegar cobertura integral nem afirmar “sem mudanças” após uma comparação que não ocorreu. Quando o acesso for restabelecido, comparar a versão atual, reconciliar deltas, registrar novo checkpoint e devolver a escrita à rotina principal; interromper a escrita do fallback naquele destino para evitar concorrência.

## Propagação e publicação

Avaliar cada delta validado para cada destino relacionado, sem cópia indiscriminada: Prescrição Pediátrica Segura; Emergência Pediátrica — Doses e Cálculos; Folha de Parada; Soroterapia Pediátrica; Ventilação Mecânica; Pediatric Flow; Anamnese Pediátrica; Prescrição Integral; Catálogo Pediátrico; Estudo Continuado e demais projetos pertinentes. Adaptar pela finalidade: antibiótico ambulatorial para prescrição segura; vasoativo para emergência/folha de parada; solução IV para soroterapia; ventilação para seu projeto; critério diagnóstico para fluxo; sinais/sintomas para anamnese/compêndio; atualização ampla para estudo continuado. Reler e reconciliar cada baseline publicado antes de escrever; registrar destino não acessível como “pronto para propagação”, sem alegar atualização.

Considerar alteração concluída somente com evidência de implementação, publicação, teste funcional e confirmação na versão em produção. Arquivo, commit, build, preview, memória ou relatório isolados não satisfazem a confirmação. Se publicação/verificação não estiver disponível, informar exatamente o que foi feito e o que permanece pendente.

## Monitoramento e continuidade

Em checkpoints, registrar última execução verificável, progresso, último tema processado, erros/acessos/fontes, validação, build/deployment, regressões, divergência de versão, concorrência e integridade do corpus. Não emitir alerta quando tudo estiver normal; alertar somente problemas acionáveis (interrupção, perda de acesso, checkpoint corrompido, regressão, conflito clínico importante, inconsistência matemática, falha de publicação ou ausência de confirmação). Reabrir temas diante de nova diretriz, bula, alerta, regulação, evidência, medicamento, dose, contraindicação, apresentação, erro de segurança ou delta do Whitebook.

Essa definição descreve o procedimento autorizado, não prova que exista execução autônoma permanente. Só declarar recorrência se houver mecanismo ativo verificável e resultados registrados.
