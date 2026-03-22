---
title: Worldbuilding
type: index
cssclass: writing-index
---

# Worldbuilding

> [!info] Lugares, culturas, histórias, sistemas e demais peças do mundo ficam centralizados aqui.

```button
name Nova Entrada de Mundo
type command
action QuickAdd: New Worldbuilding
```

```dataview
TABLE WITHOUT ID
    file.link as "Entrada",
    summary as "Resumo",
    category as "Categoria",
    project as "Projeto",
    file.mtime as "Atualizado"
FROM "01-Writing/Worldbuilding"
WHERE file.name != "Index"
SORT file.mtime DESC
```

[[Writing Dashboard|<- Painel de Escrita]]
