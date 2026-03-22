---
title: Personagens
type: index
cssclass: writing-index
---

# Personagens

> [!info] Perfis, arcos, relações e notas rápidas de personagem ficam reunidos aqui.

```button
name Novo Personagem
type command
action QuickAdd: New Character
```

```dataview
TABLE WITHOUT ID
    file.link as "Personagem",
    summary as "Resumo",
    role as "Papel",
    project as "Projeto",
    status as "Status"
FROM "01-Writing/Characters"
WHERE file.name != "Index"
SORT file.mtime DESC
```

[[Writing Dashboard|<- Painel de Escrita]]
