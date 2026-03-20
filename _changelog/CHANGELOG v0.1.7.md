---
type: changelog
version: 0.1.7
date: 2026-03-20
tags:
  - meta/changelog
---

# Changelog v0.1.7

**Data:** 2026-03-20
**Titulo:** Review contextual por data e retorno do heatmap anual

---

## Mudancas

1. **Review contextual por nota**: `Morning Review` e `Evening Review` agora usam `review_date` no `QuickAdd`, permitindo que o botao dentro de uma daily note abra/crie a review da data da propria nota.
2. **Buttons com Templater contextual**: os botoes no Daily Dashboard injetam a data de hoje; os botoes nas daily notes injetam `tp.file.title`, evitando cair na review do dia atual quando a nota aberta e de outra data.
3. **Links auxiliares do template diario**: os links de fallback do `Daily Note Template` passaram a apontar para a data da nota gerada.
4. **Gerador anual alinhado**: o script `RefreshMoodTrackers.ps1` voltou a carregar o bloco do heatmap estilo GitHub para as geracoes futuras do tracker anual.

---

## Arquivos modificados

- `.obsidian/plugins/quickadd/data.json`
- `00-Dashboard/Daily Dashboard.md`
- `03-Daily/Journal/2026-03-19.md`
- `03-Daily/Journal/2026-03-20.md`
- `_templates/daily/Daily Note Template.md`
- `_scripts/RefreshMoodTrackers.ps1`

---

## Objetivo

Esta versao corrige o desvio de data nas reviews abertas a partir de diarios antigos e devolve a visualizacao anual em heatmap sem reabrir a arquitetura fragil baseada em nome de comando.

[[CHANGELOG INDEX|<- Indice]]
