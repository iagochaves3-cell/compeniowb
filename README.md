# Compêndio Pediátrico WB

Este repositório contém uma ferramenta de apoio matemático para cálculo pediátrico de dose por peso e velocidade de infusão, além de artefatos e configurações do compêndio. Abra `index.html` em um navegador moderno; não há dependências de instalação.

O PDF consolidado (`PedWB_Consolidado.pdf`) tem 330 páginas. Esse número não comprova que existam 330 diagnósticos distintos ou que o conteúdo esteja integralmente revisado. Os 330 temas informados são um inventário inicial, não um limite. A matriz de 25 domínios por diagnóstico está em [`config/COMPENIOWB_25_TOPIC_MATRIX.md`](config/COMPENIOWB_25_TOPIC_MATRIX.md).

Os textos oficiais fornecidos pelo usuário estão preservados em [`config/COMPENIOWB_OFFICIAL_CONTINUOUS_REVIEW.md`](config/COMPENIOWB_OFFICIAL_CONTINUOUS_REVIEW.md) e [`config/CONFIGURATION_FILE_REQUIREMENT.md`](config/CONFIGURATION_FILE_REQUIREMENT.md). A política incremental de revisão, fallback e propagação está em [`CONTINUOUS_REVIEW_POLICY.md`](CONTINUOUS_REVIEW_POLICY.md), com modelo de relatório em [`config/CONTINUOUS_REVIEW_REPORT_TEMPLATE.md`](config/CONTINUOUS_REVIEW_REPORT_TEMPLATE.md). A habilidade de consulta e atualização está no arquivo `catalogo-posologico-pediatrico-vigente-atualizado.skill`.

O site deste repositório é publicado pelo GitHub Pages na branch `main`, em `https://iagochaves3-cell.github.io/compeniowb/`, após o merge. A publicação manual exige a confirmação `PUBLICAR` na ação “Publicar site manualmente”.

## Segurança e escopo atual

O aplicativo de cálculo (`index.html`) contém calculadoras, mas **não contém monografias, doses recomendadas, preparo clínico, compatibilidade ou protocolos validados**. Os resultados dependem exclusivamente dos valores digitados e não confirmam se a prescrição é apropriada. Consulte fontes confiáveis, bula e protocolo institucional; submeta medicamentos de alta vigilância a checagem humana independente.

As calculadoras exibem a dose e o volume/velocidade, fazem checagem reversa e impedem a combinação de dimensões incompatíveis. A calculadora de dose aceita unidade por dose ou por dia e permite aplicar um limite absoluto informado pelo usuário. A calculadora de infusão informa concentração, mL/h, consumo em 6/12/24 horas e duração estimada.

Atualizações do compêndio devem preservar conteúdo clínico válido, referências e histórico; preferir deltas rastreáveis e não declarar revisão, comparação externa, publicação ou confirmação em produção sem evidência. Este repositório não configura, por si só, acesso contínuo ao Whitebook, escrita em outros projetos nem execução autônoma permanente.

## Verificação

Execute os testes unitários com:

```sh
node --test
```
Conteúdo clínico futuro deve permanecer explicitamente não validado até que fontes, revisão clínica/farmacêutica, validação matemática e rastreabilidade estejam disponíveis.
Conteúdo clínico futuro deve permanecer explicitamente não validado até que fontes, revisão clínica/farmacêutica, validação matemática e rastreabilidade estejam disponíveis.
