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

Este repositorio versiona a pasta `.obsidian/`, entao as configuracoes criticas acima ja fazem parte do vault compartilhado.

## Contrato de dados

- `03-Daily/Morning Reviews/*.md` guarda `mood_morning` e `energy_morning`
- `03-Daily/Evening Reviews/*.md` guarda `mood_evening` e `energy_evening`
- `03-Daily/Journal/*.md` nao deve guardar esses campos no frontmatter
- `00-Dashboard/*` e `00-Dashboard/Mood-Energy Tracker/*` devem consultar apenas os review files

## Ownership de criacao

- `Periodic Notes` e o unico criador de `03-Daily/Journal` e `03-Daily/Reviews`
- `QuickAdd` e o criador das reviews ad hoc, notas de escrita, projetos, recursos e captura rapida
- `Templater` nao deve disputar criacao por pasta; ele apenas renderiza templates quando chamado por `Periodic Notes` ou `QuickAdd`
- `CustomJS` e leitura apenas; nao deve ser usado para persistencia do vault

## Configuracao que deve permanecer desativada

- `Templater.trigger_on_file_creation = false`
- `Templater.enable_folder_templates = false`

Se esses dois flags forem reativados, o vault volta a correr risco de dupla aplicacao de template.
