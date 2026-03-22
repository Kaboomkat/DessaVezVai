---
title: Definições
type: index
---

# Definições

> [!info] Termos, conceitos e definições úteis para escrita e estudo ficam consolidados aqui.

```button
name Nova Definicao
type command
action QuickAdd: New Definition
```

```dataview
TABLE WITHOUT ID
    file.link as "Definição",
    category as "Categoria",
    related_to as "Relacionado a",
    created as "Criado"
FROM "05-Resources/Definitions"
WHERE file.name != "Index"
SORT file.mtime DESC
```

[[Resources Dashboard|<- Painel de Recursos]]
