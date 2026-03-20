---
type: changelog
version: 0.1.4
date: 2026-03-20
tags:
  - meta/changelog
---

# Changelog v0.1.4

**Data:** 2026-03-20
**Titulo:** Hotfix do QuickAdd e ajuste visual do tracker mensal

---

## Mudancas

1. **QuickAdd reviews**: `Morning Review` e `Evening Review` passaram a usar o comportamento canonico `Nothing` quando o arquivo do dia ja existe.
2. **Fluxo idempotente**: o objetivo e evitar o warning `File not written to` no caso comum de abrir uma review diaria que ja foi criada.
3. **Tracker mensal compacto**: os dias do calendario ficaram menores e mais quadrados, com menos altura visual.

---

## Arquivos modificados

- `.obsidian/plugins/quickadd/data.json`
- `_templates/daily/Mood-Energy Month Template.md`
- `00-Dashboard/Mood-Energy Tracker/Monthly/2026/*.md`
- `00-Dashboard/Mood-Energy Tracker/Monthly/2027/*.md`

---

## Objetivo

Esta versao fecha o hotfix do QuickAdd com base no contrato do plugin e melhora a legibilidade do tracker mensal.

[[CHANGELOG|<- Indice]]
