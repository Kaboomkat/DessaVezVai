---
title: Projects Dashboard
type: dashboard
include_in_navbar: true
navbar_name: Projetos
cssclass: dashboard
---

# Painel de Projetos

> [!quote]
> *"Um projeto é qualquer resultado desejado que pode ser alcançado em menos de um ano e exige mais de uma ação."* - David Allen

## Visão Geral dos Projetos

```dataviewjs
const projects = dv.pages('"02-Projects"').where(p => p.type === "project");
const active = projects.where(p => p.status === "active").length;
const onHold = projects.where(p => p.status === "on-hold").length;
const someday = dv.pages('"02-Projects/Someday"').where(p => p.file.name !== "Index").length;
const archived = dv.pages('"02-Projects/Archive"').where(p => p.file.name !== "Index").length;

dv.container.innerHTML = `
<div class="dashboard-cards">
    <div class="dashboard-card">
        <h3>Ativos</h3>
        <div class="stat-number">${active}</div>
        <div class="stat-label">Em andamento</div>
    </div>
    <div class="dashboard-card">
        <h3>Em pausa</h3>
        <div class="stat-number">${onHold}</div>
        <div class="stat-label">Pausados</div>
    </div>
    <div class="dashboard-card">
        <h3>Algum dia</h3>
        <div class="stat-number">${someday}</div>
        <div class="stat-label">Incubados</div>
    </div>
    <div class="dashboard-card">
        <h3>Arquivados</h3>
        <div class="stat-number">${archived}</div>
        <div class="stat-label">Concluídos</div>
    </div>
</div>
`;
```

## Ações Rápidas

```button
name Novo Projeto
type command
action QuickAdd: New Project
```
```button
name Nova Ideia Algum Dia/Talvez
type command
action QuickAdd: New Someday
```
```button
name Revisão de Projetos
type link
action [[03-Daily/Reviews/Weekly Review]]
```

## Projetos Ativos

> [!info] Todo projeto ativo precisa ter ao menos uma próxima ação, um item agendado ou um aguardando resposta.

```dataview
TABLE WITHOUT ID
    file.link as "Projeto",
    area as "Área",
    progress as "Progresso",
    file.mday as "Atualizado"
FROM "02-Projects/Active"
WHERE type = "project"
SORT file.mtime DESC
```

## Detalhes dos Projetos

```dataviewjs
const activeProjects = dv.pages('"02-Projects/Active"')
    .where(p => p.type === "project")
    .sort(p => p.file.mtime, 'desc');

for (const project of activeProjects) {
    dv.header(3, project.file.link);

    const projectTasks = dv.pages('"04-Tasks"')
        .where(p => p.project === project.file.name && p.status !== "done");

    if (projectTasks.length > 0) {
        dv.paragraph(`**Itens ativos:** ${projectTasks.length}`);
        dv.list(projectTasks.slice(0, 3).map(t => t.file.link));
    } else {
        dv.paragraph("*Nenhum item ativo. Defina a próxima ação, um agendamento ou um aguardando resposta.*");
    }

    dv.paragraph("---");
}
```

## Em Pausa

```dataview
TABLE WITHOUT ID
    file.link as "Projeto",
    reason as "Motivo",
    resume_date as "Retomar em"
FROM "02-Projects/Active"
WHERE type = "project" AND status = "on-hold"
SORT resume_date ASC
```

## Algum Dia / Talvez

> [!info] Ideias incubadas para revisar na Revisão Semanal.

```dataview
LIST
FROM "02-Projects/Someday"
WHERE file.name != "Index"
SORT file.ctime DESC
LIMIT 10
```

[[02-Projects/Someday/Index|→ Ver todas as ideias Algum Dia / Talvez]]

## Concluídos Recentemente

```dataview
TABLE WITHOUT ID
    file.link as "Projeto",
    completed_date as "Concluído em",
    outcome as "Resultado"
FROM "02-Projects/Archive"
WHERE type = "project"
SORT completed_date DESC
LIMIT 5
```

[[02-Projects/Archive/Index|→ Ver arquivo]]

## Navegação Rápida

| Projetos | Relacionados |
|---|---|
| [[02-Projects/Active/Index|Projetos Ativos]] | [[Tasks Dashboard|Tarefas]] |
| [[02-Projects/Someday/Index|Algum Dia / Talvez]] | [[Writing Dashboard|Escrita]] |
| [[02-Projects/Archive/Index|Arquivo]] | [[Home|Início]] |

---

*Todo projeto precisa de um próximo movimento claro.*
