---
type: changelog
version: 0.3.5
date: 2026-03-22
tags:
  - meta/changelog
---

# Changelog v0.3.5

**Data:** 2026-03-22
**Título:** Lists recentes de Resources alinhadas com os índices

---

## Mudanças

1. **Dashboard virou visão resumida de verdade**: `Books`, `Articles`, `Contacts` e `Definitions` agora mostram os 15 itens mais recentes, em vez de listas curtas inconsistentes.
2. **`Index.md` saiu das listagens**: todas as queries do `Resources Dashboard` agora filtram `file.name != "Index"`.
3. **Links ficaram menos redundantes**: cada seção aponta explicitamente para “Abrir índice completo”, deixando claro que o dashboard é uma prévia e o índice é a listagem canônica.
4. **Definições agora seguem o mesmo formato visual**: a seção saiu de `LIST` e passou para `TABLE`, alinhando a apresentação com os demais tipos de recurso.

---

## Arquivos modificados

- `00-Dashboard/Resources Dashboard.md`
- `_changelog/CHANGELOG v0.3.5.md`
- `_changelog/CHANGELOG INDEX.md`

---

## Objetivo

Esta versão reduz a redundância entre o dashboard e os índices de resources, mantendo o dashboard como recorte recente e os índices como hubs completos.

[[CHANGELOG INDEX|<- Índice]]
