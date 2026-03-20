---
type: changelog
version: 0.1.2
date: 2026-03-20
tags:
  - meta/changelog
---

# Changelog v0.1.2

**Data:** 2026-03-20
**Titulo:** Hotfix do sistema daily e reviews inline

---

## Mudancas

1. **DashboardHelpers restaurado**: o helper voltou a um estado valido para `CustomJS`, com escala de humor e energia operacional.
2. **Estado do Dia corrigido**: o diario deixou de instanciar `DashboardHelpers` incorretamente e voltou a renderizar a tabela.
3. **Daily note refeito**: o template e as daily notes existentes ganharam estrutura limpa, quote funcional e botoes reais de review.
4. **Reviews existentes normalizadas**: as reviews ja criadas foram recriadas com frontmatter valido e controles inline operacionais.

---

## Arquivos modificados

- `_scripts/DashboardHelpers.js`
- `_templates/daily/Daily Note Template.md`
- `03-Daily/Journal/2026-03-19.md`
- `03-Daily/Journal/2026-03-20.md`
- `03-Daily/Morning Reviews/2026-03-19 Morning Review.md`
- `03-Daily/Morning Reviews/2026-03-20 Morning Review.md`
- `03-Daily/Evening Reviews/2026-03-20 Evening Review.md`

---

## Objetivo

Esta versao tirou o diario do estado quebrado e devolveu o fluxo minimo de uso diario.

[[CHANGELOG|<- Indice]]
