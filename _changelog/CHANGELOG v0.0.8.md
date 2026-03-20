---
type: changelog
version: 0.0.8
date: 2026-03-20
tags:
  - meta/changelog
---

# Changelog v0.0.8

**Data:** 2026-03-20
**Titulo:** Migracao da daily note antiga e limpeza dos trackers

---

## Mudancas

1. **Daily note antiga migrada**: `03-Daily/Journal/2026-03-19.md` foi atualizada para o bloco novo de `Estado do Dia`, usando `DashboardHelpers`.
2. **Daily note antiga**: a navegacao ganhou o link para `Revisao Semanal`, alinhando a nota existente ao template atual.
3. **RefreshMoodTrackers.ps1**: removidos caracteres que estavam introduzindo mojibake nos trackers gerados.
4. **Trackers regenerados**: arquivos anuais e mensais foram reemitidos com separadores e placeholders ASCII limpos.

---

## Arquivos modificados

- `03-Daily/Journal/2026-03-19.md`
- `_scripts/RefreshMoodTrackers.ps1`
- `00-Dashboard/Mood-Energy Tracker/Yearly/2026.md`
- `00-Dashboard/Mood-Energy Tracker/Yearly/2027.md`
- `00-Dashboard/Mood-Energy Tracker/Monthly/2026/*.md`
- `00-Dashboard/Mood-Energy Tracker/Monthly/2027/*.md`

---

## Objetivo

Esta versao elimina a divergencia entre notas diarias antigas e templates atuais, e limpa a camada visual dos trackers para evitar textos corrompidos.

[[CHANGELOG|<- Indice]]
