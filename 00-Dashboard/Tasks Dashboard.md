---
title: Tasks Dashboard
type: dashboard
include_in_navbar: true
navbar_name: Tarefas
cssclass: dashboard
---

# ✅ Painel de Tarefas

> [!quote]
> *"Sua mente serve para ter ideias, não para armazená-las."* — David Allen

---

## 📊 Visão Geral das Tarefas

```dataviewjs
const tasks = dv.pages('"04-Tasks"').where(p => p.type === "task");
const inbox = tasks.where(p => p.status === "inbox").length;
const next = tasks.where(p => p.status === "next").length;
const waiting = tasks.where(p => p.status === "waiting").length;
const done = tasks.where(p => p.status === "done").length;

dv.container.innerHTML = `
<div class="dashboard-cards">
    <div class="dashboard-card">
        <h3>📥 Caixa de Entrada</h3>
        <div class="stat-number">${inbox}</div>
        <div class="stat-label">Itens a processar</div>
    </div>
    <div class="dashboard-card">
        <h3>⚡ Próximas Ações</h3>
        <div class="stat-number">${next}</div>
        <div class="stat-label">Prontas para fazer</div>
    </div>
    <div class="dashboard-card">
        <h3>⏳ Aguardando</h3>
        <div class="stat-number">${waiting}</div>
        <div class="stat-label">Delegadas / aguardando</div>
    </div>
    <div class="dashboard-card">
        <h3>✅ Concluídas</h3>
        <div class="stat-number">${done}</div>
        <div class="stat-label">Feitas</div>
    </div>
</div>
`;
```

---

## 🚀 Ações Rápidas

```button
name 📥 Captura Rápida
type command
action QuickAdd: Quick Capture
```
```button
name ✅ Processar Caixa de Entrada
type link
action [[04-Tasks/Inbox/Inbox]]
```
```button
name 🔄 Revisão Semanal
type link
action [[03-Daily/Reviews/Weekly Review]]
```

---

## 📥 Caixa de Entrada (Processar)

> [!tasks-today] Itens não processados precisam da sua atenção

```dataview
TABLE WITHOUT ID
    file.link as "Item",
    file.cday as "Capturado"
FROM "04-Tasks/Inbox"
WHERE type = "task" AND status = "inbox"
SORT file.ctime ASC
```

**Perguntas de processamento:**
1. O que é isso?
2. É acionável? → Se não: descartar / Material de Referência / Algum Dia
3. Qual é a Próxima Ação? → Se < 2 min, faça agora
4. Sou a pessoa certa? → Se não, delegue (Aguardando Resposta)
5. Mover para Próximas Ações com contexto

---

## ⚡ Próximas Ações

> [!callout|tasks-today] Prontas para fazer agora

### 🔥 Alta Prioridade

```dataview
TASK
FROM "04-Tasks/Next"
WHERE !completed AND priority = "high"
SORT file.ctime ASC
```

### 📋 Todas as Próximas Ações por Contexto

```dataview
TABLE WITHOUT ID
    file.link as "Ação",
    context as "Contexto",
    project as "Projeto",
    due as "Prazo"
FROM "04-Tasks/Next"
WHERE type = "task" AND status = "next" AND !completed
SORT context ASC, priority DESC
```

---

## ⏳ Aguardando Resposta

> [!info] Delegadas ou aguardando input externo

```dataview
TABLE WITHOUT ID
    file.link as "Item",
    waiting_on as "Aguardando",
    due as "Follow-up",
    project as "Projeto"
FROM "04-Tasks/Waiting"
WHERE type = "task" AND status = "waiting"
SORT due ASC
```

---

## 📅 Vencendo Em Breve

```dataviewjs
const today = dv.date("today");
const nextWeek = today.plus({days: 7});

const dueSoon = dv.pages('"04-Tasks"')
    .where(p => p.due && dv.date(p.due) <= nextWeek && p.status !== "done")
    .sort(p => p.due);

if (dueSoon.length > 0) {
    dv.table(
        ["Tarefa", "Prazo", "Prioridade"],
        dueSoon.map(p => [
            p.file.link,
            p.due,
            p.priority || "—"
        ])
    );
} else {
    dv.paragraph("*Nenhuma tarefa vencendo nos próximos 7 dias. 🎉*");
}
```

---

## 📊 Tarefas por Projeto

```dataviewjs
const tasks = dv.pages('"04-Tasks"')
    .where(p => p.type === "task" && p.project && p.status !== "done");

const byProject = {};
tasks.forEach(t => {
    const proj = t.project;
    if (!byProject[proj]) byProject[proj] = [];
    byProject[proj].push(t);
});

for (const [project, items] of Object.entries(byProject)) {
    dv.header(4, project);
    dv.list(items.map(t => t.file.link));
}
```

---

## 🔗 Navegação Rápida

| Listas GTD | Ações | Revisões |
|------------|-------|----------|
| [[04-Tasks/Inbox/\|📥 Caixa de Entrada]] | [[04-Tasks/Next/\|⚡ Próximas Ações]] | [[Daily Dashboard\|📅 Diária]] |
| [[04-Tasks/Waiting/\|⏳ Aguardando]] | [[04-Tasks/Reference/\|📚 Referência]] | [[03-Daily/Reviews/Weekly Review\|🔄 Semanal]] |

---

*Lembre-se: uma mente limpa é uma mente produtiva.*
