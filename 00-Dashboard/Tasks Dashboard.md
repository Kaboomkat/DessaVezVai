---
title: Tasks Dashboard
type: dashboard
include_in_navbar: true
navbar_name: Tarefas
cssclass: dashboard
---

# Painel de Tarefas

> [!quote]
> *"Sua mente serve para ter ideias, não para armazená-las."* - David Allen

## Visão Geral das Tarefas

```dataviewjs
const pages = dv.pages('"04-Tasks"');
const tasks = pages.where(p => p.type === "task");
const today = dv.date("today");

const inbox = tasks.where(p => p.status === "inbox").length;
const next = tasks.where(p => p.status === "next").length;
const waiting = tasks.where(p => p.status === "waiting").length;
const done = tasks.where(p => p.status === "done").length;
const scheduled = tasks.where(p => p.scheduled_for && dv.date(p.scheduled_for)?.toISODate() === today.toISODate() && p.status !== "done").length;
const due = tasks.where(p => p.due && p.status !== "done").length;

dv.container.innerHTML = `
<div class="dashboard-cards">
    <div class="dashboard-card">
        <h3>Inbox</h3>
        <div class="stat-number">${inbox}</div>
        <div class="stat-label">Capturas esperando clarificação</div>
    </div>
    <div class="dashboard-card">
        <h3>Próximas</h3>
        <div class="stat-number">${next}</div>
        <div class="stat-label">Ações claras</div>
    </div>
    <div class="dashboard-card">
        <h3>Aguardando</h3>
        <div class="stat-number">${waiting}</div>
        <div class="stat-label">Delegadas ou bloqueadas</div>
    </div>
    <div class="dashboard-card">
        <h3>Hoje</h3>
        <div class="stat-number">${scheduled}</div>
        <div class="stat-label">Hard landscape do dia</div>
    </div>
    <div class="dashboard-card">
        <h3>Prazos</h3>
        <div class="stat-number">${due}</div>
        <div class="stat-label">Itens com data</div>
    </div>
    <div class="dashboard-card">
        <h3>Concluídas</h3>
        <div class="stat-number">${done}</div>
        <div class="stat-label">Tarefas finalizadas</div>
    </div>
</div>
`;
```

## Ações Rápidas

```button
name Captura Rápida
type command
action QuickAdd: Quick Capture
```
```button
name Abrir Inbox
type link
action [[04-Tasks/Inbox/Inbox]]
```
```button
name Revisão Semanal
type link
action [[03-Daily/Reviews/Weekly Review]]
```

> [!tip] Para processar um item da inbox, abra a nota e rode `QuickAdd: Process Inbox Item`.

## Hoje / Hard Landscape

```dataview
TABLE WITHOUT ID
    file.link as "Tarefa",
    status as "Status",
    context as "Contexto",
    project as "Projeto",
    due as "Prazo"
FROM "04-Tasks"
WHERE type = "task" AND scheduled_for = date(today) AND status != "done"
SORT due ASC, file.ctime ASC
```

## Inbox

```dataview
TABLE WITHOUT ID
    file.link as "Item",
    file.cday as "Capturado"
FROM "04-Tasks/Inbox"
WHERE type = "task" AND status = "inbox"
SORT file.ctime ASC
```

## Próximas Ações

### Alta prioridade

```dataview
TASK
FROM "04-Tasks/Next"
WHERE !completed AND priority = "alta"
SORT file.ctime ASC
```

### Por contexto

```dataview
TABLE WITHOUT ID
    file.link as "Ação",
    context as "Contexto",
    project as "Projeto",
    scheduled_for as "Agendado",
    due as "Prazo"
FROM "04-Tasks/Next"
WHERE type = "task" AND status = "next" AND !completed
SORT context ASC, scheduled_for ASC, due ASC
```

## Aguardando Resposta

```dataview
TABLE WITHOUT ID
    file.link as "Item",
    waiting_on as "Aguardando",
    scheduled_for as "Agendado",
    due as "Follow-up",
    project as "Projeto"
FROM "04-Tasks/Waiting"
WHERE type = "task" AND status = "waiting"
SORT scheduled_for ASC, due ASC
```

## Prazos da Próxima Semana

```dataviewjs
const today = dv.date("today");
const nextWeek = today.plus({ days: 7 });

const dueSoon = dv.pages('"04-Tasks"')
    .where(p => p.due && dv.date(p.due) <= nextWeek && p.status !== "done")
    .sort(p => p.due);

if (dueSoon.length > 0) {
    dv.table(
        ["Tarefa", "Prazo", "Prioridade"],
        dueSoon.map(p => [
            p.file.link,
            p.due,
            p.priority || "-"
        ])
    );
} else {
    dv.paragraph("*Nenhuma tarefa com prazo nos próximos 7 dias.*");
}
```

## Tarefas por Projeto

```dataviewjs
const tasks = dv.pages('"04-Tasks"')
    .where(p => p.type === "task" && p.project && p.status !== "done");

const byProject = {};
tasks.forEach(t => {
    const key = t.project;
    if (!byProject[key]) {
        byProject[key] = [];
    }
    byProject[key].push(t);
});

for (const [project, items] of Object.entries(byProject)) {
    dv.header(4, project);
    dv.list(items.map(t => t.file.link));
}
```

## Navegação Rápida

| Listas GTD | Relacionados | Reviews |
|---|---|---|
| [[04-Tasks/Inbox/Inbox|Inbox]] | [[04-Tasks/Next/Index|Próximas Ações]] | [[Daily Dashboard|Daily]] |
| [[04-Tasks/Waiting/Index|Aguardando Resposta]] | [[04-Tasks/Reference/Index|Referência Operacional]] | [[03-Daily/Reviews/Weekly Review|Weekly Review]] |
| [[02-Projects/Active/Index|Projetos Ativos]] | [[02-Projects/Someday/Index|Algum Dia / Talvez]] | [[Projects Dashboard|Projetos]] |

---

*Um sistema claro torna a ação mais simples.*
