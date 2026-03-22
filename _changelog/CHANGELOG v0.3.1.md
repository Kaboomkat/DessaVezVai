---
type: changelog
version: 0.3.1
date: 2026-03-22
tags:
  - meta/changelog
---

# Changelog v0.3.1

**Data:** 2026-03-22
**Título:** Hotfix do fluxo diário após a regressão do GTD

---

## Mudanças

1. **Daily note voltou a nascer sem depender de Templater**: `_templates/daily/Daily Note Template.md` deixou de usar blocos `<%* ... %>` no caminho do `Periodic Notes` e agora renderiza cabeçalho e quote via `dataviewjs`, com a data da própria nota.
2. **Botões de review ficaram seguros de novo**: os links de `Morning Review` e `Evening Review` no template diário passaram a usar `{{date:YYYY-MM-DD}}`, eliminando o `value-review_date=<% tp.file.title %>` que estava sendo salvo cru dentro do diário.
3. **Templates periódicos endurecidos**: os templates semanal e mensal também deixaram de depender de Templater no momento da criação, evitando que `Calendar`/`Periodic Notes` salvem código cru nas notas.
4. **Notas quebradas reparadas**: `03-Daily/Journal/2026-03-21.md` e `03-Daily/Journal/2026-03-22.md` foram corrigidas com quote materializada, `day` em PT-BR e botões de review apontando para a data certa.

---

## Arquivos modificados

- `_templates/daily/Daily Note Template.md`
- `_templates/daily/Weekly Review Template.md`
- `_templates/daily/Monthly Review Template.md`
- `03-Daily/Journal/2026-03-21.md`
- `03-Daily/Journal/2026-03-22.md`
- `_changelog/CHANGELOG v0.3.1.md`
- `_changelog/CHANGELOG INDEX.md`

---

## Objetivo

Esta versão fecha a regressão que quebrou criação diária, quotes e botões de review, sem reabrir o wiring já estabilizado entre `03-Daily`, `00-Dashboard`, `QuickAdd` e `Periodic Notes`.

[[CHANGELOG INDEX|<- Índice]]
