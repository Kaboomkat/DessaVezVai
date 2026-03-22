---
title: "{{title}}"
type: task
status: next
priority: média
due:
scheduled_for:
project:
context: @computador
energy:
time_required:
waiting_on:
created: {{date}}
captured: {{date}} {{time}}
completed_date:
tags:
  - task/next
---

# {{title}}

> [!todo] Próxima ação
> **Status:** `= this.status` | **Prioridade:** `= this.priority` | **Contexto:** `= this.context`

```button
name Complete Task
type command
action QuickAdd: Complete Task
```

## Ação

- [ ] {{title}}

## Detalhes

*O que exatamente precisa acontecer?*

## Metadados

- Projeto: `= this.project`
- Prazo: `= this.due`
- Agendado: `= this.scheduled_for`
- Aguardando: `= this.waiting_on`

---

[[Tasks Dashboard|<- Painel de Tarefas]]
