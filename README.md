# PED-MASTER — Catálogo Pediátrico

Interface web para consulta e busca nas 498 monografias de `Biblioteca_Medicamentosa_Pediatrica_MASTER_498.json`, com filtros para sinalizadores documentais, referência às páginas do PDF-fonte e calculadoras matemáticas independentes. Não há dependências de instalação.

O catálogo lê o JSON por `fetch`; rode em um servidor HTTP local (por exemplo, `python3 -m http.server 8000`) ou use o GitHub Pages. O GitHub Pages está configurado para publicar a branch `main` em `https://iagochaves3-cell.github.io/compeniowb/`. A publicação manual exige a confirmação `PUBLICAR` na ação “Publicar site manualmente”.

## Segurança e escopo atual

O catálogo é documental e **não transforma conteúdo em prescrição operacional validada**. A interface preserva o texto integral, restrições e sinalizadores do mestre, sem recomendar medicamentos. Confira cada decisão em fontes atuais, bula e protocolo institucional; lacunas e restrições devem ser tratadas conforme a governança clínica.

As calculadoras recebem dados informados pelo usuário, exibem dose e volume/velocidade, fazem checagem reversa e impedem a combinação de dimensões incompatíveis. A calculadora de dose aceita unidade por dose ou por dia e permite aplicar um limite informado pelo usuário. A calculadora de infusão informa concentração, mL/h, consumo em 6/12/24 horas e duração estimada. Elas não consultam o catálogo nem validam a adequação clínica dos dados.

## Verificação

Execute os testes unitários com:

```sh
node --test
```

Conteúdo clínico futuro deve permanecer explicitamente não validado até que fontes, revisão clínica/farmacêutica, validação matemática e rastreabilidade estejam disponíveis.
