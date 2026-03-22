---
title: "{{title}}"
type: project
status: active
area: outro
priority: média
start_date: {{date}}
target_date:
completed_date:
progress: 0
outcome: "{{title}}"
created: {{date}}
modified: {{date}}
tags:
  - project/active
---

# {{title}}

> [!goal] Resultado desejado
> {{title}}

## Compromissos atuais

- [ ] Este projeto tem ao menos uma próxima ação, um item agendado ou um aguardando resposta.

## Próximas ações

```dataview
TABLE WITHOUT ID
    file.link as "Ação",
    status as "Status",
    context as "Contexto",
    scheduled_for as "Agendado",
    due as "Prazo"
FROM "04-Tasks"
WHERE type = "task" AND project = this.file.name AND status != "done"
SORT status ASC, file.ctime ASC
```

## Notas

*Capture aqui suporte, resultado desejado e decisões relevantes.*

---

[[Projects Dashboard|<- Painel de Projetos]]
