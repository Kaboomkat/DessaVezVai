---
title: Projetos Ativos
type: index
cssclass: tasks-index
---

# Projetos Ativos

> [!info] Todo projeto ativo precisa ter ao menos uma próxima ação, um item de calendário ou um aguardando resposta.

```dataview
TABLE WITHOUT ID
    file.link as "Projeto",
    priority as "Prioridade",
    progress as "Progresso",
    file.mday as "Atualizado"
FROM "02-Projects/Active"
WHERE type = "project"
SORT file.mtime DESC
```

[[Projects Dashboard|<- Painel de Projetos]]
