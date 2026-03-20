---
type: changelog
version: 0.1.8
date: 2026-03-20
tags:
  - meta/changelog
---

# Changelog v0.1.8

**Data:** 2026-03-20
**Titulo:** Fallback do Dataview no tablet + normalizacao do changelog

---

## Mudancas

1. **Fallback real para DashboardHelpers e ReviewControls**: os blocos `dataviewjs` deixam de depender apenas do `cJS()` configurado no plugin `CustomJS`; agora tentam `forceLoadCustomJS()`, usam o plugin quando ele estiver pronto e, se necessario, carregam `_scripts/*.js` direto do vault.
2. **Heatmap anual mais contextual**: o score diario continua sendo a media entre manha e noite, mas o clique agora prefere a daily note do dia quando ela existir, e o tooltip passa a deixar explicito que se trata da media do dia.
3. **Sequencia de versoes corrigida**: a lacuna em `v0.0.4` foi fechada, os arquivos a partir do antigo `v0.0.5` foram renumerados em cascata e o indice do changelog voltou a ficar monotonicamente consistente.
4. **Documentacao, QA e regeneracao alinhados**: `Plugin Setup`, `Regression Checklist` e `RefreshMoodTrackers.ps1` agora registram o comportamento esperado em sync/mobile e reemitem o tracker anual com a mesma logica contextual do vault.

---

## Arquivos modificados

- `00-Dashboard/Daily Dashboard.md`
- `00-Dashboard/Weekly Dashboard.md`
- `00-Dashboard/Mood-Energy Tracker/Monthly/2026/*.md`
- `00-Dashboard/Mood-Energy Tracker/Monthly/2027/*.md`
- `00-Dashboard/Mood-Energy Tracker/Yearly/2026.md`
- `00-Dashboard/Mood-Energy Tracker/Yearly/2027.md`
- `03-Daily/Journal/2026-03-19.md`
- `03-Daily/Journal/2026-03-20.md`
- `03-Daily/Morning Reviews/2026-03-19 Morning Review.md`
- `03-Daily/Morning Reviews/2026-03-20 Morning Review.md`
- `03-Daily/Evening Reviews/2026-03-19 Evening Review.md`
- `03-Daily/Evening Reviews/2026-03-20 Evening Review.md`
- `plugins/Plugin Setup.md`
- `plugins/Regression Checklist.md`
- `_templates/daily/Daily Note Template.md`
- `_templates/daily/Evening Review Template.md`
- `_templates/daily/Mood-Energy Month Template.md`
- `_templates/daily/Mood-Energy Week Template.md`
- `_templates/daily/Mood-Energy Year Template.md`
- `_templates/daily/Morning Review Template.md`
- `_scripts/RefreshMoodTrackers.ps1`
- `_changelog/CHANGELOG INDEX.md`

---

## Objetivo

Esta versao corta a dependencia fragil de configuracao do `CustomJS` em dispositivos moveis, esclarece a navegacao do heatmap anual e devolve coerencia ao historico de versoes do vault.

[[CHANGELOG INDEX|<- Indice]]
