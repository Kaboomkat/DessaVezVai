---
title: Inbox
type: index
cssclass: inbox
---

# Inbox

> [!info] Capture primeiro. Clarifique depois.

Este é o ponto único de captura do GTD para tarefas, lembretes e compromissos soltos.

## Captura rápida

```button
name Adicionar na Inbox
type command
action QuickAdd: Quick Capture
```

## Como processar

1. Abra uma nota na tabela abaixo.
2. Rode `QuickAdd: Process Inbox Item`.
3. Deixe a macro decidir entre `Próximas Ações`, `Aguardando Resposta`, `Projeto`, `Algum Dia / Talvez`, `Referência` ou `Fragmentos`.

## Itens na Inbox

```dataview
TABLE WITHOUT ID
    file.link as "Item",
    file.cday as "Capturado",
    tags as "Tags"
FROM "04-Tasks/Inbox"
WHERE file.name != "Inbox"
SORT file.ctime ASC
```

## Estado da Inbox

```dataviewjs
const items = dv.pages('"04-Tasks/Inbox"').where(p => p.file.name !== "Inbox");
const count = items.length;

let message = "";
if (count === 0) {
    message = "Inbox Zero. O ponto de captura está limpo.";
} else if (count <= 5) {
    message = `${count} item(ns) esperando. Uma sessão curta de processamento resolve.`;
} else if (count <= 15) {
    message = `${count} item(ns) esperando. Está na hora de clarificar a inbox.`;
} else {
    message = `${count} item(ns) esperando. Reserve um bloco maior para processar.`;
}

dv.paragraph(message);
```

## Buckets do GTD

| Se este item for... | Direcione para... |
|---|---|
| Uma ação física clara | [[04-Tasks/Next/Index|Próximas Ações]] |
| Delegado ou dependente | [[04-Tasks/Waiting/Index|Aguardando Resposta]] |
| Um resultado com múltiplos passos | [[02-Projects/Active/Index|Projetos Ativos]] |
| Não acionável, mas útil | [[04-Tasks/Reference/Index|Referência Operacional]] |
| Algo para incubar | [[02-Projects/Someday/Index|Algum Dia / Talvez]] |
| Um fragmento ou ideia de escrita | [[01-Writing/Snippets/Index|Fragmentos]] |

---

[[Tasks Dashboard|<- Painel de Tarefas]]
