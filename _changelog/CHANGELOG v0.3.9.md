---
type: changelog
version: 0.3.9
date: 2026-03-22
tags:
  - meta/changelog
---

# Changelog v0.3.9

**Data:** 2026-03-22
**Título:** Hotfix dos links internos no mood tracker mensal, semanal e anual

---

## Mudanças

1. **Heatmap anual corrigido**: o tracker anual voltou a guardar `journalPath` e `reviewPath` separadamente e agora resolve um caminho real de nota antes de renderizar cada célula do heatmap. Isso elimina o hover quebrado com `[object Object]`.
2. **Links internos reforçados**: os trackers mensal, semanal e anual passaram a renderizar links com `data-href`, além do `href`, para melhorar a resolução dos links internos fora do modo leitura.
3. **Gerador alinhado**: `_scripts/RefreshMoodTrackers.ps1` foi atualizado e os trackers de `2026` e `2027`, junto dos templates mensais, semanais e anuais, foram regenerados a partir da lógica nova.
4. **Encoding preservado**: o gerador foi normalizado para UTF-8 com BOM no script-fonte, evitando que a regeneração quebrasse os acentos em PT-BR.

---

## Arquivos modificados

- `00-Dashboard/Mood-Energy Tracker/`
- `_scripts/RefreshMoodTrackers.ps1`
- `_templates/daily/Mood-Energy Month Template.md`
- `_templates/daily/Mood-Energy Week Template.md`
- `_templates/daily/Mood-Energy Year Template.md`
- `_changelog/CHANGELOG v0.3.9.md`

---

## Objetivo

Esta versão restaura a navegação correta do heatmap e fortalece o render dos trackers para leitura e live preview, sem mexer no contrato das reviews diárias.

[[CHANGELOG INDEX|<- Índice]]
