---
title: Fragmentos
type: index
cssclass: writing-index
---

# Fragmentos

> [!info] Fragmentos, diálogos, ideias e sementes de cena ficam aqui até virarem cena, nota ou projeto.

```button
name Novo Fragmento
type command
action QuickAdd: New Snippet
```

```dataview
TABLE WITHOUT ID
    file.link as "Fragmento",
    category as "Categoria",
    project as "Projeto",
    created as "Criado"
FROM "01-Writing/Snippets"
WHERE file.name != "Index"
SORT file.ctime DESC
```

[[Writing Dashboard|<- Painel de Escrita]]
