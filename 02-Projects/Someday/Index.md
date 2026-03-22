---
title: Algum Dia / Talvez
type: index
cssclass: tasks-index
---

# Algum Dia / Talvez

> [!info] Mantenha aqui ideias incubadas e revisite-as na Revisão Semanal.

```dataview
TABLE WITHOUT ID
    file.link as "Ideia",
    category as "Categoria",
    interest_level as "Interesse",
    review_date as "Revisar em"
FROM "02-Projects/Someday"
WHERE file.name != "Index"
SORT file.ctime DESC
```

[[Projects Dashboard|<- Painel de Projetos]]
