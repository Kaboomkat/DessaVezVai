---
type: changelog
version: 0.0.8
date: 2026-03-20
tags:
  - meta/changelog
---

# Changelog v0.0.8

**Data:** 2026-03-20
**Titulo:** Controles inline de mood e energia nas reviews

---

## Mudancas

1. **ReviewControls.js**: criada uma camada de controles inline para atualizar mood e energia direto na nota de review, sem mudar o contrato de dados existente.
2. **Morning Review Template**: agora exibe botoes embutidos para selecionar `mood_morning` e `energy_morning`.
3. **Evening Review Template**: agora exibe botoes embutidos para selecionar `mood_evening` e `energy_evening`.
4. **Review existente migrada**: `2026-03-19 Morning Review.md` recebeu os controles inline para manter consistencia com as novas reviews.
5. **Persistencia**: os botoes escrevem no frontmatter da propria nota, preservando compatibilidade com dashboards, trackers e queries atuais.
6. **Hardening**: corrigido o encoding dos emojis e strings dos templates de review, evitando mojibake nas opcoes e nas novas notas geradas.

---

## Arquivos modificados

- `_scripts/ReviewControls.js`
- `_templates/daily/Morning Review Template.md`
- `_templates/daily/Evening Review Template.md`
- `03-Daily/Morning Reviews/2026-03-19 Morning Review.md`

---

## Objetivo

Esta versao permite ajustar humor e energia depois da criacao da review, direto dentro da nota, sem reabrir o popup inicial e sem quebrar os dashboards.

[[CHANGELOG INDEX|<- Indice]]
