---
title: Próximas Ações
type: index
cssclass: tasks-index
---

# Próximas Ações

> [!info] Aqui entram apenas ações físicas, visíveis e executáveis.

```button
name Captura Rápida
type command
action QuickAdd: Quick Capture
```

```dataview
TABLE WITHOUT ID
    file.link as "Ação",
    priority as "Prioridade",
    context as "Contexto",
    project as "Projeto",
    scheduled_for as "Agendado",
    due as "Prazo"
FROM "04-Tasks/Next"
WHERE type = "task" AND status = "next"
SORT scheduled_for ASC, due ASC, file.ctime ASC
```

[[Tasks Dashboard|<- Painel de Tarefas]]
