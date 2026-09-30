# infosWB — Compêndio Pediátrico

Portal independente dentro de `infoswb/`, sem substituição da interface ou das calculadoras existentes na raiz. URL de publicação: https://iagochaves3-cell.github.io/compeniowb/infoswb/.

## Conteúdo visível

O portal renderiza os textos completos do corpus PedWB e do acervo medicamentoso MASTER, em vez de apenas oferecer links de arquivos. A carga de referência dos testes contém 330 temas clínicos e 498 fichas medicamentosas. Esses números são dinâmicos e não constituem limite de expansão ou prova de revisão clínica.

O índice documental `PedWB_Indice_Pediatria.md`, datado de 25/09/2026, sustenta 23 pastas de especialidades no módulo Prescrições Pediátricas e uma árvore geral de sete módulos com 55 subpastas. Módulos apenas inventariados permanecem identificados como tais, sem fingir que seus textos completos foram extraídos. A taxonomia não é declarada como cópia integral da organização Premium atual do Whitebook.

## Interação e apresentação

Busca por título e texto sem distinção de acentos; filtros por especialidade; acervo A–Z; leitura em blocos expansíveis; sumário; filtro dentro do documento; fontes e limitações preservadas; favoritos locais; modo claro/escuro; ajuste de fonte; modo foco; cópia de texto e impressão; menu responsivo para celular. Não são coletados dados de pacientes.

## Dois arquivos como prompt principal

Ler `AGENTS.md`. Os originais `PedWB_Prompt_Mestre_Unificado.md` e `.txt` estão incorporados em `masters.pack.js`: a representação Markdown é armazenada integralmente em gzip e o TXT é reconstruído pela transformação exata que distingue os originais. A função `master()` verifica separadamente o SHA-256 de ambos antes de liberar leitura ou download em `#metodo`.

MD SHA-256: b70e0f25fc3a621d6727eb8bf2db28573638d47959590db199dcc2d2eb367914

TXT SHA-256: 5015697a71683f30d1db07216039344bdd8bd5d2082b0f64206adb6287d4fead

São duas representações do mesmo mestre, não dois escritores. A criação do portal não altera instruções nativas de projetos inacessíveis do ChatGPT.

## Fontes e atualização

Clínica: `iagochaves3-cell/consulta-pediatrica-rapida`, branch `principal`, arquivo `pedwb/PedWB_Consolidado.md`; alternativas públicas e uma versão persistida identificada no código.

Medicamentos: `Biblioteca_Medicamentosa_Pediatrica_MASTER_498.md` na raiz deste repositório, com alternativa no GitHub raw.

O leitor consulta essas fontes a cada abertura e pelo botão Atualizar acervo. Mudanças persistidas passam a ser exibidas no portal após recarga. A origem realmente utilizada e seu SHA-256 aparecem no documento. Novos temas sem associação no índice permanecem acessíveis no A–Z e devem receber classificação documental em atualização incremental de `taxonomy.json`.

Este diretório passa a ser destino explícito dos deltas da rotina principal PedWB, sob os mesmos critérios de aplicabilidade, revisão, controle de versão e publicação. Não criar novo agendamento: preservar a coordenação principal/fallback existente. O leitor não realiza pesquisa clínica autônoma nem acessa o Whitebook autenticado.

## Validação da interface antes da publicação

Foram executadas oito verificações unitárias do parser e renderizador e 27 verificações de interface em Chromium com documentos locais e fronteiras de rede/armazenamento simuladas. Todas passaram. Os testes cobrem preservação dos 330 temas, identidades independentes da numeração, 498 fichas, categorias, busca, blocos, favoritos, modos de leitura, impressão, igualdade dos dois mestres, responsividade e falhas de fonte. A sintaxe JavaScript também foi verificada.

Esses testes são da interface e da integridade documental, não de validação clínica integral. O navegador de teste não teve acesso à produção: deployment, HTTP público e integridade dos arquivos publicados devem ser verificados separadamente. Não declarar teste ponta a ponta da rede real com base em fixtures.

## Segurança clínica

Acervo documental: publicação não significa homologação humana ou nova aprovação de todas as doses. Manter indicação, população, limitações, fontes e status originais. Não habilitar prescrição automática pela inclusão de um capítulo. Novos deltas medicamentosos exigem checagem clínica/documental, farmacêutica e dimensional, cálculo reverso e testes específicos. Não copiar extensamente material proprietário nem expor credenciais.
