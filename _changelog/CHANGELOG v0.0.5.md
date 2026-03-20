---
type: changelog
version: 0.0.5
date: 2026-03-20
tags:
  - meta/changelog
---

# Changelog v0.0.5

**Data:** 2026-03-20
**Titulo:** Reescrita dos trackers de humor e energia

---

## Mudancas

1. **Script de regeneracao**: criado `_scripts/RefreshMoodTrackers.ps1` para reemitir trackers e templates sem depender de copy-paste manual.
2. **Mood-Energy Week Template**: reescrito para ler apenas `Morning Reviews`, `Evening Reviews` e `Journal`, usando `DashboardHelpers`.
3. **Mood-Energy Month Template**: reescrito para abandonar a logica antiga 1-10 e usar a escala emoji 1-5 consolidada no vault.
4. **Mood-Energy Year Template**: reescrito com a mesma fonte de dados e o mesmo helper compartilhado.
5. **Trackers anuais existentes**: `2026.md` e `2027.md` foram regenerados na nova logica.
6. **Trackers mensais existentes**: todos os meses de `2026` foram regenerados na nova logica.
7. **Trackers mensais de 2027**: pasta `00-Dashboard/Mood-Energy Tracker/Monthly/2027/` criada para remover navegacao quebrada a partir do tracker anual de 2027.
8. **Mood-Energy Tracker Hub**: simplificado e alinhado ao novo contrato de dados.

---

## Arquivos modificados

- `_scripts/RefreshMoodTrackers.ps1`
- `_templates/daily/Mood-Energy Week Template.md`
- `_templates/daily/Mood-Energy Month Template.md`
- `_templates/daily/Mood-Energy Year Template.md`
- `00-Dashboard/Mood-Energy Tracker/Hub.md`
- `00-Dashboard/Mood-Energy Tracker/Yearly/2026.md`
- `00-Dashboard/Mood-Energy Tracker/Yearly/2027.md`
- `00-Dashboard/Mood-Energy Tracker/Monthly/2026/*.md`
- `00-Dashboard/Mood-Energy Tracker/Monthly/2027/*.md`

---

## Objetivo

Esta versao elimina a divergencia entre dashboards e trackers: todo o sistema de humor/energia passa a consumir a mesma estrutura de dados e o mesmo helper.

[[CHANGELOG INDEX|← Índice]]
