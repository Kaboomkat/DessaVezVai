---
type: changelog
version: 0.1.5
date: 2026-03-20
tags:
  - meta/changelog
---

# Changelog v0.1.5

**Data:** 2026-03-20
**Titulo:** Hotfix do Daily Dashboard, QuickAdd e calendario mensal

---

## Mudancas

1. **QuickAdd restaurado**: as choices `Morning Review` e `Evening Review` voltaram para a configuracao ativa do plugin, com `open existing file` e template correto.
2. **Daily Dashboard limpo**: o dashboard diario foi reescrito em UTF-8 limpo para remover mojibake e voltar a ficar legivel.
3. **Tracker mensal em grid**: o calendario mensal deixou de usar tabela esticada e passou a usar grid com celulas quadradas.
4. **Regeneracao dos trackers**: todos os trackers mensais de 2026 e 2027 foram atualizados com o layout novo.

---

## Arquivos modificados

- `.obsidian/plugins/quickadd/data.json`
- `00-Dashboard/Daily Dashboard.md`
- `_templates/daily/Mood-Energy Month Template.md`
- `_scripts/RefreshMoodTrackers.ps1`
- `00-Dashboard/Mood-Energy Tracker/Monthly/2026/*.md`
- `00-Dashboard/Mood-Energy Tracker/Monthly/2027/*.md`

---

## Objetivo

Esta versao fecha o hotfix de usabilidade mais urgente: comandos de review encontrados pelo Command Palette, dashboard diario legivel e tracker mensal com cara de calendario.

[[CHANGELOG|<- Indice]]
