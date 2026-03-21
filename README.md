# Vault de Escrita Integrado

Este repositório versiona um vault Obsidian voltado para escrita, rotina diária e GTD leve. O centro do sistema não é o plugin da moda nem o dashboard em si; é o fluxo de produção de texto sustentado por notas diárias, revisões curtas e uma camada mínima de automação para reduzir atrito.

## O que este vault prioriza

- escrita criativa em `01-Writing/`
- operação diária em `03-Daily/`
- captura e execução em `04-Tasks/`
- dashboards em `00-Dashboard/` como superfície de leitura e navegação, não como fonte de verdade

## Mapa do vault

```text
/
├── 00-Dashboard/         # dashboards, hubs e trackers para operação diária e leitura do sistema
│   └── Mood-Energy Tracker/ # visões mensal, semanal e anual do humor/energia a partir dos review files
├── 01-Writing/           # núcleo de escrita criativa: manuscritos, pesquisa, personagens e fragmentos
├── 02-Projects/          # projetos não literários, com áreas para ativos, someday e arquivo
├── 03-Daily/             # rotina diária: diário, reviews e índice canônico das entradas
│   ├── Journal/          # daily notes criadas pelo Periodic Notes
│   ├── Morning Reviews/  # review da manhã, fonte de verdade de mood/energy da manhã
│   ├── Evening Reviews/  # review da noite, fonte de verdade de mood/energy da noite
│   ├── Reviews/          # revisões semanais e mensais
│   └── Index de Diario.md # índice dinâmico das daily notes, sem depender de link de pasta
├── 04-Tasks/             # captura, próximas ações, waiting e referência operacional
├── 05-Resources/         # base de conhecimento: contatos, livros, artigos e definições
├── 06-Archive/           # material que saiu do fluxo ativo
├── _templates/           # templates chamados por Periodic Notes, QuickAdd e fluxos de criação
├── _scripts/             # CustomJS e scripts de geração/manutenção do vault
├── _changelog/           # histórico versionado das correções e mudanças de arquitetura
└── .obsidian/            # configuração versionada dos plugins e do comportamento do app
```

## Arquitetura operacional

### Fonte de verdade

- `03-Daily/Journal/` guarda as daily notes
- `03-Daily/Morning Reviews/` e `03-Daily/Evening Reviews/` guardam humor e energia
- `03-Daily/Reviews/` guarda as revisões semanais e mensais
- `03-Daily/Index de Diario.md` é o índice canônico das daily notes

O tracker de humor/energia não lê o frontmatter da daily note como fonte principal. Ele lê os arquivos de review.

### Donos de criação

- `Periodic Notes` cria:
  - daily notes em `03-Daily/Journal`
  - weekly reviews em `03-Daily/Reviews`
  - monthly reviews em `03-Daily/Reviews`
- `QuickAdd` cria ou reabre:
  - `Morning Review`
  - `Evening Review`
  - notas rápidas de projetos, escrita e recursos
- `Templater` não é o dono da criação por pasta; ele renderiza os templates quando o arquivo nasce

### Superfícies de leitura

- [Home.md](./00-Dashboard/Home.md)
- [Daily Dashboard.md](./00-Dashboard/Daily%20Dashboard.md)
- [Weekly Dashboard.md](./00-Dashboard/Weekly%20Dashboard.md)
- [Index de Diario.md](./03-Daily/Index%20de%20Diario.md)
- [Mood-Energy Tracker](./00-Dashboard/Mood-Energy%20Tracker/)

## Fluxo diário esperado

1. Abrir a daily note do dia pelo `Daily Dashboard` ou pelo comando do `Periodic Notes`.
2. Criar ou reabrir `Morning Review` e `Evening Review` pelos botões do dashboard ou da própria daily note.
3. Preencher mood e energia na review, não na daily note.
4. Escrever o `Destaque do Dia` no bloco correspondente da daily note.
5. Revisar a semana no `Weekly Dashboard` e no `Mood-Energy Tracker`.

## Convenções que importam

- daily notes: `YYYY-MM-DD.md`
- morning review: `YYYY-MM-DD Morning Review.md`
- evening review: `YYYY-MM-DD Evening Review.md`
- weekly review: `YYYY-Www.md`
- o arquivo `Index de Diario.md` fica em ASCII no path por estabilidade de link; o texto visível usa acentuação normal

## Plugins realmente relevantes

- `Dataview`
- `CustomJS`
- `Templater`
- `QuickAdd`
- `Periodic Notes`
- `Buttons`

Sem esses seis, o vault abre; mas o fluxo operacional fica incompleto.

## Arquivos de contrato

- [Plugin Setup.md](./plugins/Plugin%20Setup.md)
- [Command Contract.md](./plugins/Command%20Contract.md)
- [Regression Checklist.md](./plugins/Regression%20Checklist.md)
- [CLAUDE.md](./CLAUDE.md)

## Trackers

O `Mood-Energy Tracker` tem três camadas:

- mensal
- semanal
- anual

Os arquivos materializados são gerados a partir de:

- [Mood-Energy Month Template.md](./_templates/daily/Mood-Energy%20Month%20Template.md)
- [Mood-Energy Week Template.md](./_templates/daily/Mood-Energy%20Week%20Template.md)
- [Mood-Energy Year Template.md](./_templates/daily/Mood-Energy%20Year%20Template.md)
- [RefreshMoodTrackers.ps1](./_scripts/RefreshMoodTrackers.ps1)

Se o tracker quebrar, a primeira suspeita deve ser a fonte de review, não a daily note.

## Git e changelog

O repositório foi organizado para mudanças pequenas e rastreáveis.

Fluxo recomendado:

1. alterar a fonte do comportamento
2. corrigir o materializado afetado, se houver
3. registrar o lote em `_changelog/`
4. revisar com `git diff`
5. commitar com a versão correspondente
6. publicar

## Leitura rápida do estado atual

- o sistema diário gira em torno de `Periodic Notes + QuickAdd + Templater`
- `Morning Review` e `Evening Review` são a fonte de verdade para humor e energia
- o `Index de Diario` substitui navegação por link de pasta
- dashboards são camadas de operação e observação
- o README não é especificação completa; os contratos detalhados estão nos arquivos de `plugins/` e em `CLAUDE.md`
