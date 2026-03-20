---
type: changelog
version: 0.2.2
date: 2026-03-20
tags:
  - meta/changelog
---

# Changelog v0.2.2

**Data:** 2026-03-20
**Titulo:** Limpeza de encoding do Weekly Dashboard

---

## Mudancas

1. **Weekly Dashboard reescrito em UTF-8 limpo**: os titulos, labels, tabelas e textos auxiliares deixaram de exibir mojibake e voltaram a ficar legiveis.
2. **Rotulos normalizados em ASCII**: os labels de semana, media, manha/noite e navegacao foram simplificados para evitar regressao de encoding no vault.
3. **Atalho de diario corrigido**: a navegacao rapida do Weekly Dashboard passou a usar `Index de Diario`, em vez do antigo link de pasta `03-Daily/Journal/`.

---

## Arquivos modificados

- `00-Dashboard/Weekly Dashboard.md`
- `_changelog/CHANGELOG INDEX.md`

---

## Objetivo

Esta versao fecha a ultima quebra visual gritante no dashboard semanal sem reabrir o fluxo daily ou os trackers.

[[CHANGELOG INDEX|<- Indice]]
