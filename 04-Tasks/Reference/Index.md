---
title: Referência Operacional
type: index
cssclass: tasks-index
---

# Referência Operacional

> [!info] Guarde aqui suporte operacional e de projeto. Conhecimento durável só deve ir para `05-Resources` quando esse destino for explícito.

```dataview
TABLE WITHOUT ID
    file.link as "Nota",
    related_project as "Projeto",
    created as "Criado"
FROM "04-Tasks/Reference"
WHERE file.name != "Index"
SORT file.mtime DESC
```

[[Tasks Dashboard|<- Painel de Tarefas]]
