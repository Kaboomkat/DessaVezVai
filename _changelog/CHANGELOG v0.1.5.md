---
type: changelog
version: 0.1.5
date: 2026-03-20
tags:
  - meta/changelog
---

# Changelog v0.1.5

**Data:** 2026-03-20
**Titulo:** Hotfix da media no Mood-Energy Tracker mensal

---

## Mudancas

1. **Media robusta no mensal**: a funcao `avg()` do tracker mensal passou a normalizar `Dataview DataArray` com `Array.from(...)` antes de usar `reduce()`.
2. **Mensais regenerados**: os trackers mensais de 2026 e 2027 foram atualizados com a funcao corrigida.
3. **Gerador alinhado**: o script de regeneracao e o template base mensal agora compartilham a mesma implementacao segura.

---

## Arquivos modificados

- `_templates/daily/Mood-Energy Month Template.md`
- `_scripts/RefreshMoodTrackers.ps1`
- `00-Dashboard/Mood-Energy Tracker/Monthly/2026/*.md`
- `00-Dashboard/Mood-Energy Tracker/Monthly/2027/*.md`

---

## Objetivo

Esta versao fecha o erro `arr.reduce is not a function` no tracker mensal.

[[CHANGELOG INDEX|<- Indice]]
