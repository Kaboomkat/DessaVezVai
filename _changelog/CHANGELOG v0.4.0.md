---
type: changelog
version: 0.4.0
date: 2026-03-22
tags:
  - meta/changelog
---

# Changelog v0.4.0

**Data:** 2026-03-22
**Título:** Trackers mensais, semanais e anuais extraídos para view compartilhada do Dataview

---

## Mudanças

1. **Notas de tracker ficaram enxutas**: os arquivos mensal, semanal e anual deixaram de embutir blocos enormes de `dataviewjs` e agora chamam uma view compartilhada com `await dv.view("_scripts/dataview/mood-tracker", ...)`.
2. **View reutilizável criada**: a renderização dos trackers foi movida para [view.js](/C:/Users/rodri/Obsidian/Ebook%20Claude/_scripts/dataview/mood-tracker/view.js), com CSS dedicado em [view.css](/C:/Users/rodri/Obsidian/Ebook%20Claude/_scripts/dataview/mood-tracker/view.css).
3. **Preview mais limpo**: como a nota agora contém só um bloco curto de chamada, o tracker fica muito menos poluído fora do modo leitura, sem perder o heatmap, os cards mensais e as tabelas semanais.
4. **Gerador alinhado**: [RefreshMoodTrackers.ps1](/C:/Users/rodri/Obsidian/Ebook%20Claude/_scripts/RefreshMoodTrackers.ps1) e os templates mensais, semanais e anuais foram atualizados para esse novo contrato e os trackers de `2026` e `2027` foram regenerados.

---

## Arquivos modificados

- `00-Dashboard/Mood-Energy Tracker/`
- `_scripts/dataview/mood-tracker/view.js`
- `_scripts/dataview/mood-tracker/view.css`
- `_scripts/RefreshMoodTrackers.ps1`
- `_templates/daily/Mood-Energy Month Template.md`
- `_templates/daily/Mood-Energy Week Template.md`
- `_templates/daily/Mood-Energy Year Template.md`
- `_changelog/CHANGELOG v0.4.0.md`

---

## Objetivo

Esta versão não muda o contrato de dados dos trackers; ela troca a superfície de render para uma view compartilhada do Dataview, deixando mês e ano mais limpos e mais fáceis de manter.

[[CHANGELOG INDEX|<- Índice]]
