---
title: Livros
type: index
---

# Livros

> [!info] Notas de leitura, resenhas e aplicações práticas de livros ficam reunidas aqui.

```button
name Novo Livro
type command
action QuickAdd: New Book Note
```

```dataview
TABLE WITHOUT ID
    file.link as "Livro",
    author as "Autor",
    status as "Status",
    rating as "Avaliação"
FROM "05-Resources/Books"
WHERE file.name != "Index"
SORT file.mtime DESC
```

[[Resources Dashboard|<- Painel de Recursos]]
