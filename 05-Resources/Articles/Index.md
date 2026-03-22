---
title: Artigos
type: index
---

# Artigos

> [!info] Artigos, ensaios e leituras curtas com relevância prática ficam organizados aqui.

```button
name Novo Artigo
type command
action QuickAdd: New Article
```

```dataview
TABLE WITHOUT ID
    file.link as "Artigo",
    source as "Fonte",
    topic as "Tópico",
    date_read as "Lido em"
FROM "05-Resources/Articles"
WHERE file.name != "Index"
SORT file.mtime DESC
```

[[Resources Dashboard|<- Painel de Recursos]]
