---
type: changelog
version: 0.4.1
date: 2026-03-22
tags:
  - meta/changelog
---

# Changelog v0.4.1

**Data:** 2026-03-22
**Título:** Rollback do refactor visual dos mood trackers

---

## Mudanças

1. **Rollback do `v0.4.0`**: os trackers mensal, semanal e anual voltaram a renderizar com os blocos `dataviewjs` embutidos, no formato anterior que estava visualmente estável para leitura e edição.
2. **View compartilhada removida**: os arquivos [view.js](/C:/Users/rodri/Obsidian/Ebook%20Claude/_scripts/dataview/mood-tracker/view.js) e [view.css](/C:/Users/rodri/Obsidian/Ebook%20Claude/_scripts/dataview/mood-tracker/view.css) saíram do circuito dos trackers.
3. **Funcionalidade preservada**: o rollback mantém o fix do `v0.3.9`, então os links internos do heatmap continuam apontando corretamente para as notas diárias e reviews.
4. **Gerador e templates alinhados novamente**: [RefreshMoodTrackers.ps1](/C:/Users/rodri/Obsidian/Ebook%20Claude/_scripts/RefreshMoodTrackers.ps1) e os templates de mês, semana e ano foram restaurados para o contrato anterior.

---

## Arquivos modificados

- `00-Dashboard/Mood-Energy Tracker/`
- `_scripts/RefreshMoodTrackers.ps1`
- `_templates/daily/Mood-Energy Month Template.md`
- `_templates/daily/Mood-Energy Week Template.md`
- `_templates/daily/Mood-Energy Year Template.md`
- `_changelog/CHANGELOG v0.4.1.md`

---

## Objetivo

Restaurar a apresentação anterior dos trackers sem reintroduzir o bug de links internos que já tinha sido corrigido no `v0.3.9`.

[[CHANGELOG INDEX|<- Índice]]
