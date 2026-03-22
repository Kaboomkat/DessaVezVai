---
type: changelog
version: 0.3.0
date: 2026-03-22
tags:
  - meta/changelog
---

# Changelog v0.3.0

**Data:** 2026-03-22  
**Título:** Arquitetura GTD do `04-Tasks` com automação leve e navegação segura

---

## Mudanças

1. **Inbox GTD redesenhada**: a inbox deixou de ser formulário manual e passou a ser um ponto único de captura com processamento guiado por macro.
2. **QuickAdd com JS**: `Quick Capture`, `Process Inbox Item` e `Complete Task` agora rodam por `Macro + User Script`, com criação semântica de arquivos, roteamento GTD e sincronização de conclusão.
3. **Buckets canônicos**: `Next`, `Waiting`, `Reference`, `Active`, `Someday`, `Archive` e `Snippets` passaram a ter notas-índice reais, eliminando links perigosos para pastas nuas.
4. **Contrato GTD unificado**: `priority`, `status`, `scheduled_for`, `project` e `context` foram alinhados entre script, templates, dashboards e reviews.
5. **Superfícies diárias e semanais**: `Daily Dashboard`, `Weekly Dashboard`, `Tasks Dashboard`, `Projects Dashboard` e `Weekly Review` passaram a consumir `scheduled_for` sem tocar no ownership do `Periodic Notes`.
6. **Documentação operacional**: o contrato de comandos e a checklist de regressão agora cobrem o fluxo GTD novo.

---

## Arquivos adicionados

- `_scripts/quickadd/GtdWorkflow.js`
- `04-Tasks/Next/Index.md`
- `04-Tasks/Waiting/Index.md`
- `04-Tasks/Reference/Index.md`
- `02-Projects/Active/Index.md`
- `02-Projects/Someday/Index.md`
- `02-Projects/Archive/Index.md`
- `01-Writing/Snippets/Index.md`

---

## Arquivos principais alterados

- `.obsidian/plugins/quickadd/data.json`
- `04-Tasks/Inbox/Inbox.md`
- `00-Dashboard/Tasks Dashboard.md`
- `00-Dashboard/Projects Dashboard.md`
- `00-Dashboard/Daily Dashboard.md`
- `00-Dashboard/Weekly Dashboard.md`
- `03-Daily/Reviews/Weekly Review.md`
- `03-Daily/Reviews/2026-W12.md`
- `_templates/daily/Weekly Review Template.md`
- `_templates/gtd/Quick Capture Template.md`
- `_templates/gtd/Task Template.md`
- `_templates/gtd/Project Template.md`
- `_templates/gtd/Someday Template.md`
- `_templates/writing/Snippet Template.md`
- `plugins/Command Contract.md`
- `plugins/Regression Checklist.md`

---

## Objetivo

Esta versão aplica o fluxo oficial do GTD em `04-Tasks` sem reabrir os pontos frágeis já estabilizados em `00-Dashboard` e `03-Daily`.

[[CHANGELOG INDEX|<- Índice]]
