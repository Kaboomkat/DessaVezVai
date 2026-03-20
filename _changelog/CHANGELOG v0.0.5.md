---
type: changelog
version: 0.0.5
date: 2026-03-20
tags:
  - meta/changelog
---

# Changelog v0.0.5

**Data:** 2026-03-20
**Titulo:** Contrato operacional do vault + consolidacao do sistema daily

---

## Mudancas

1. **DashboardHelpers.js**: `currentWeekNumber()` agora calcula semana ISO real e o helper ganhou `scoreColor()` para colorir valores numericos ou emojis sem duplicar logica.
2. **Daily Dashboard**: removeu a duplicacao local de `cell()` e passou a usar `DashboardHelpers` via CustomJS.
3. **Daily Note Template**: o bloco "Estado do Dia" agora usa o helper compartilhado e manteve a daily note apenas como agregadora dos review files.
4. **Weekly Review hub**: criada a nota fixa `03-Daily/Reviews/Weekly Review.md` para eliminar links mortos e dar um ponto de entrada estavel para a revisao semanal.
5. **Tasks Dashboard**: a navegacao deixou de apontar para a pasta `03-Daily/Reviews/` e passou a abrir notas reais.
6. **Templates Index**: documentado o fluxo de reviews, a fonte de verdade de humor/energia e o contrato minimo de plugins.
7. **README.md**: adicionada a secao de contrato operacional explicando macros QuickAdd, CustomJS, Buttons e a dependencia de `.obsidian/`.
8. **CLAUDE.md**: atualizada a estrutura real de `03-Daily/` e os arquivos que sao fonte de verdade para humor/energia.
9. **Plugin Setup**: criado `plugins/Plugin Setup.md` com os plugins obrigatorios, nomes esperados de macros e o contrato de dados do vault.
10. **Daily Journal Router**: marcado como template legado para evitar que o fluxo antigo reintroduza campos quebrados no frontmatter das daily notes.

---

## Arquivos modificados

- `_scripts/DashboardHelpers.js`
- `00-Dashboard/Daily Dashboard.md`
- `00-Dashboard/Tasks Dashboard.md`
- `_templates/daily/Daily Note Template.md`
- `_templates/daily/Daily Journal Router.md`
- `_templates/Templates Index.md`
- `03-Daily/Reviews/Weekly Review.md`
- `plugins/Plugin Setup.md`
- `README.md`
- `CLAUDE.md`

---

## Objetivo

Esta versao fecha as quebras de fluxo entre daily note, morning review, evening review e revisao semanal, e deixa explicito o que ainda depende de configuracao manual fora do repositorio.

[[CHANGELOG|← Índice]]
