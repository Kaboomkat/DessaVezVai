---
title: Projetos Arquivados
type: index
cssclass: tasks-index
---

# Projetos Arquivados

> [!info] Projetos concluídos ficam aqui como referência.

```dataview
TABLE WITHOUT ID
    file.link as "Projeto",
    completed_date as "Concluído em",
    outcome as "Resultado"
FROM "02-Projects/Archive"
WHERE file.name != "Index"
SORT completed_date DESC, file.mtime DESC
```

[[Projects Dashboard|<- Painel de Projetos]]
