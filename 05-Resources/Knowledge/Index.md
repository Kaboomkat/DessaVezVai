---
title: Knowledge
type: index
---

# Knowledge

> [!info] Aqui ficam apenas notas permanentes: ideias claras, autocontidas e conectadas.

```button
name Nova Nota Permanente
type command
action QuickAdd: New Knowledge Note
```

---

## Fluxo da camada de conhecimento

- `04-Tasks/Inbox` cobre fleeting operacional.
- `01-Writing/Snippets` cobre fleeting criativa.
- `03-Daily/Journal` cobre fleeting contextual.
- `05-Resources/Books`, `05-Resources/Articles` e `01-Writing/Research` guardam notas-fonte.
- `05-Resources/Knowledge` guarda apenas o que sobreviveu a revisao e merece virar conhecimento reutilizavel.

---

## Notas recentes

```dataview
TABLE WITHOUT ID
    file.link as "Nota",
    default(topic, "—") as "Topico",
    default(summary, "—") as "Resumo",
    file.mtime as "Atualizado"
FROM "05-Resources/Knowledge"
WHERE file.name != "Index"
SORT file.mtime DESC
```

---

## Por topico

```dataviewjs
const pages = dv.pages('"05-Resources/Knowledge"').where((p) => p.file.name !== "Index");
const groups = Array.from(pages.groupBy((p) => p.topic || "Sem topico")).sort((a, b) => String(a.key).localeCompare(String(b.key)));

dv.table(
    ["Topico", "Notas"],
    groups.map((group) => [group.key, group.rows.map((row) => row.file.link)])
);
```

---

## Notas sem fontes registradas

```dataviewjs
const pages = dv
    .pages('"05-Resources/Knowledge"')
    .where((p) => p.file.name !== "Index" && (!p.source_notes || p.source_notes.length === 0))
    .sort((p) => p.file.mtime, "desc");

dv.table(
    ["Nota", "Topico", "Resumo"],
    pages.map((page) => [page.file.link, page.topic || "—", page.summary || "—"])
);
```

---

[[Resources Dashboard|<- Painel de Recursos]]
