---
title: Pesquisa
type: index
cssclass: writing-index
---

# Pesquisa

> [!info] Fontes, referências e notas de investigação para escrita ficam indexadas aqui.

```button
name Nova Pesquisa
type command
action QuickAdd: New Research
```

```dataview
TABLE WITHOUT ID
    file.link as "Pesquisa",
    summary as "Resumo",
    topic as "Tópico",
    project as "Projeto",
    reliability as "Confiabilidade",
    created as "Criado"
FROM "01-Writing/Research"
WHERE file.name != "Index"
SORT file.mtime DESC
```

[[Writing Dashboard|<- Painel de Escrita]]
