---
title: "Index de Diário"
type: index
section: daily
tags:
  - index/daily
---

# Index de Diário

> [!info]
> Todas as daily notes ficam listadas aqui automaticamente.
> Reviews da manhã, noite e semana ficam fora deste índice.

```dataview
TABLE WITHOUT ID
  file.link AS "Diario",
  day AS "Dia",
  highlight AS "Destaque",
  file.cday AS "Criado",
  file.mday AS "Atualizado"
FROM "03-Daily/Journal"
WHERE type = "daily"
SORT file.name DESC
```

[[Daily Dashboard|<- Daily Dashboard]]
