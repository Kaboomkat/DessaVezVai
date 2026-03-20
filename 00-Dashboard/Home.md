---
title: Home
type: dashboard
include_in_navbar: true
navbar_name: Início
cssclass: dashboard
---

# ✨ Vault de Escrita

> [!quote] 
> *"Comece a escrever, não importa o quê. A água não flui até que a torneira seja aberta."* — Louis L'Amour

---

## 📊 Estatísticas Rápidas

```dataviewjs
const manuscripts = dv.pages('"01-Writing/Manuscripts"');
const drafts = manuscripts.where(p => p.status === "draft").length;
const revisions = manuscripts.where(p => p.status === "revision").length;
const complete = manuscripts.where(p => p.status === "complete").length;

const tasks = dv.pages('"04-Tasks"').where(p => p.type === "task");
const inbox = tasks.where(p => p.status === "inbox").length;
const nextActions = tasks.where(p => p.status === "next").length;

const today = dv.date("today");
const todayPages = dv.pages().where(p => 
    p.file.mday.toISODate() === today.toISODate()
);

dv.container.innerHTML = `
<div class="dashboard-cards">
    <div class="dashboard-card">
        <h3>📝 Manuscritos</h3>
        <div class="stat-number">${manuscripts.length}</div>
        <div class="stat-label">${drafts} rascunhos · ${revisions} revisando · ${complete} concluídos</div>
    </div>
    <div class="dashboard-card">
        <h3>✅ Tarefas</h3>
        <div class="stat-number">${nextActions}</div>
        <div class="stat-label">Próximas Ações · ${inbox} na Caixa de Entrada</div>
    </div>
    <div class="dashboard-card">
        <h3>📅 Hoje</h3>
        <div class="stat-number">${todayPages.length}</div>
        <div class="stat-label">Notas modificadas hoje</div>
    </div>
</div>
`;
```

---

## 🚀 Ações Rápidas

```button
name ✍️ Nova Sessão de Escrita
type command
action QuickAdd: New Scene
```
```button
name 📥 Capturar Ideia
type command
action QuickAdd: Quick Capture
```
```button
name 📓 Diário de Hoje
type command
action Periodic Notes: Open daily note
```
```button
name ✅ Processar Caixa de Entrada
type link
action [[04-Tasks/Inbox/Inbox]]
```

---

## 📖 Projetos de Escrita em Andamento

> [!writing-stats] Manuscritos Ativos

```dataview
TABLE WITHOUT ID
    file.link as "Projeto",
    status as "Status",
    wordcount as "Palavras",
    round((wordcount / 80000) * 100) + "%" as "Progresso"
FROM "01-Writing/Manuscripts"
WHERE status != "complete"
SORT file.mtime DESC
LIMIT 5
```

[[01-Writing/Manuscripts/|→ Ver todos os manuscritos]]

---

## ✅ Próximas Ações

> [!tasks-today] O que fazer agora?

```dataview
TASK
FROM "04-Tasks/Next"
WHERE !completed
LIMIT 7
```

[[04-Tasks/Next/|→ Ver todas as Próximas Ações]]

---

## 📅 Atividade Recente

```dataview
TABLE WITHOUT ID
    file.link as "Nota",
    file.folder as "Pasta",
    file.mday as "Modificado"
FROM ""
WHERE file.name != "Home"
SORT file.mtime DESC
LIMIT 8
```

---

## 🔗 Navegação

| Escrita | Produtividade | Recursos |
|---------|---------------|----------|
| [[01-Writing/Manuscripts/\|📚 Manuscritos]] | [[04-Tasks/Inbox/Inbox\|📥 Caixa de Entrada]] | [[05-Resources/Books/\|📖 Livros]] |
| [[01-Writing/Characters/\|👤 Personagens]] | [[04-Tasks/Next/\|✅ Próximas Ações]] | [[05-Resources/Articles/\|📄 Artigos]] |
| [[01-Writing/Worldbuilding/\|🌍 Worldbuilding]] | [[02-Projects/Active/\|🎯 Projetos]] | [[05-Resources/Contacts/\|👥 Contatos]] |
| [[01-Writing/Research/\|🔬 Pesquisa]] | [[03-Daily/Journal/\|📓 Diário]] | [[05-Resources/Definitions/\|📝 Definições]] |
| [[Writing Dashboard\|📊 Painel de Escrita]] | [[00-Dashboard/Mood-Energy Tracker/Yearly/2026\|📊 Mood Tracker]] | [[06-Archive/\|🗄️ Arquivo]] |

---

*Última atualização: `= date(now)`*
