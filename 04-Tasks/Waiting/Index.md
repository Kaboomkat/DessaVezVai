---
title: Aguardando Resposta
type: index
cssclass: tasks-index
---

# Aguardando Resposta

> [!info] Use esta lista para itens delegados e dependências que exigem acompanhamento.

```dataview
TABLE WITHOUT ID
    file.link as "Item",
    waiting_on as "Aguardando",
    scheduled_for as "Agendado",
    due as "Follow-up",
    project as "Projeto"
FROM "04-Tasks/Waiting"
WHERE type = "task" AND status = "waiting"
SORT scheduled_for ASC, due ASC, file.ctime ASC
```

[[Tasks Dashboard|<- Painel de Tarefas]]
