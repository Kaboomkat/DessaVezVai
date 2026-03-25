---
title: Plugin Setup
type: setup
tags:
  - meta/setup
  - plugins
---

# Plugin Setup

## Plugins obrigatorios

| Plugin | Uso no vault | Configuracao critica |
|--------|---------------|----------------------|
| Dataview | Todos os dashboards e trackers | JavaScript queries habilitadas |
| Templater | Renderizacao de templates | Pasta `_templates` e sem folder ownership |
| CustomJS | Helpers compartilhados | Scripts folder em `_scripts` |
| QuickAdd | Reviews e criacao rapida | Macros com os nomes exatos dos dashboards |
| Periodic Notes | Diario e reviews periodicas | Comandos de daily/weekly note ativos |
| Buttons | Blocos de acao | Necessario para todos os botoes dos dashboards |

Este vault versiona a pasta `.obsidian/`, entao as configuracoes criticas acima fazem parte do vault compartilhado.

## Plugin recomendado para automacao externa

| Plugin | Uso no vault | Configuracao critica |
|--------|---------------|----------------------|
| Local REST API | Ponte estavel para automacao por script/API | Secure server ativo, API key valida e porta HTTPS acessivel |

- A ponte de automacao externa fica em `plugins/Obsidian Automation.md` e `_scripts/obsidian/`.
- Essa camada nao substitui `QuickAdd`, `Buttons`, `Templater` ou `Periodic Notes`; ela apenas aciona essas superficies sem depender de clique manual.

## Sync e mobile

- `_scripts/*.js` precisa continuar dentro do sync; em `Obsidian Sync`, isso depende de `Sync all other types` ativo no dispositivo.
- Os blocos `dataviewjs` do vault tentam carregar helpers de `_scripts` quando o `CustomJS` ainda nao reaplicou a configuracao no device.
- Mesmo com esse fallback, plugin novo ou config nova em tablet/celular ainda pode exigir restart completo do Obsidian para aplicar.

## Contrato de dados

- `03-Daily/Morning Reviews/*.md` guarda `mood_morning` e `energy_morning`
- `03-Daily/Evening Reviews/*.md` guarda `mood_evening` e `energy_evening`
- `03-Daily/Journal/*.md` nao deve guardar esses campos no frontmatter
- `05-Resources/Knowledge/*.md` guarda `type: knowledge`, `topic`, `summary` e `source_notes`
- `00-Dashboard/*` e `00-Dashboard/Mood-Energy Tracker/*` devem consultar apenas os review files ou os resources corretos para cada modulo

## Ownership de criacao

- `Periodic Notes` e o unico criador de `03-Daily/Journal` e `03-Daily/Reviews`
- `QuickAdd` e o criador das reviews ad hoc, notas de escrita, projetos, recursos, notas em `Knowledge` e captura rapida
- `Templater` nao deve disputar criacao por pasta; ele apenas renderiza templates quando chamado por `Periodic Notes` ou `QuickAdd`
- `CustomJS` e leitura apenas; nao deve ser usado para persistencia do vault

## Modelo de camadas

- `04-Tasks/Inbox` cobre fleeting operacional
- `01-Writing/Snippets` cobre fleeting criativa
- `03-Daily/Journal` cobre fleeting contextual
- `05-Resources/Books`, `05-Resources/Articles` e `01-Writing/Research` guardam notas-fonte
- `05-Resources/Knowledge` guarda apenas notas permanentes em palavras proprias
- `01-Writing/*` e `02-Projects/*` continuam como notas de projeto, nao como parte do slip-box

## Configuracao que deve permanecer desativada

- `Templater.trigger_on_file_creation = false`
- `Templater.enable_folder_templates = false`

Se esses dois flags forem reativados, o vault volta a correr risco de dupla aplicacao de template.
