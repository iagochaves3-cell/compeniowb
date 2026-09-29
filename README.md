# Compêndio Pediátrico WB

Ferramenta de apoio matemático para cálculo pediátrico de dose por peso e velocidade de infusão. Abra `index.html` em um navegador moderno; não há dependências de instalação.

O GitHub Pages está configurado para publicar a branch `main` em `https://iagochaves3-cell.github.io/compeniowb/` após o merge. A publicação manual exige a confirmação `PUBLICAR` na ação “Publicar site manualmente”.

## Segurança e escopo atual

Esta versão contém calculadoras, mas **não contém monografias, doses recomendadas, preparo clínico, compatibilidade ou protocolos validados**. Os resultados dependem exclusivamente dos valores digitados e não confirmam se a prescrição é apropriada. Consulte fontes confiáveis, bula e protocolo institucional; submeta medicamentos de alta vigilância a checagem humana independente.

As calculadoras exibem a dose e o volume/velocidade, fazem checagem reversa e impedem a combinação de dimensões incompatíveis. A calculadora de dose aceita unidade por dose ou por dia e permite aplicar um limite absoluto informado pelo usuário. A calculadora de infusão informa concentração, mL/h, consumo em 6/12/24 horas e duração estimada.

## Verificação

Execute os testes unitários com:

```sh
node --test
```

Conteúdo clínico futuro deve permanecer explicitamente não validado até que fontes, revisão clínica/farmacêutica, validação matemática e rastreabilidade estejam disponíveis.
