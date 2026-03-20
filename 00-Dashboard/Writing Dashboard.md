---
title: Writing Dashboard
type: dashboard
include_in_navbar: true
navbar_name: Escrita
cssclass: dashboard
---

# ✍️ Painel de Escrita

> [!quote]
> *"Não há nada para escrever. Tudo que você faz é sentar na máquina de escrever e sangrar."* — Ernest Hemingway

---

## 📊 Visão Geral da Escrita

```dataviewjs
const manuscripts = dv.pages('"01-Writing/Manuscripts"');
const characters = dv.pages('"01-Writing/Characters"');
const worldbuilding = dv.pages('"01-Writing/Worldbuilding"');

let totalWords = 0;
manuscripts.forEach(p => {
    if (p.wordcount) totalWords += p.wordcount;
});

const drafts = manuscripts.where(p => p.status === "draft").length;
const revisions = manuscripts.where(p => p.status === "revision").length;
const complete = manuscripts.where(p => p.status === "complete").length;

dv.container.innerHTML = `
<div class="dashboard-cards">
    <div class="dashboard-card">
        <h3>📝 Total de Palavras</h3>
        <div class="stat-number">${totalWords.toLocaleString()}</div>
        <div class="stat-label">Em todos os manuscritos</div>
    </div>
    <div class="dashboard-card">
        <h3>📚 Manuscritos</h3>
        <div class="stat-number">${manuscripts.length}</div>
        <div class="stat-label">${drafts} rascunho · ${revisions} revisando · ${complete} concluído</div>
    </div>
    <div class="dashboard-card">
        <h3>👤 Personagens</h3>
        <div class="stat-number">${characters.length}</div>
        <div class="stat-label">Perfis de personagens</div>
    </div>
    <div class="dashboard-card">
        <h3>🌍 Notas de Mundo</h3>
        <div class="stat-number">${worldbuilding.length}</div>
        <div class="stat-label">Entradas de worldbuilding</div>
    </div>
</div>
`;
```

---

## 🚀 Ações Rápidas

```button
name ✍️ Nova Cena
type command
action QuickAdd: New Scene
```
```button
name 👤 Novo Personagem
type command
action QuickAdd: New Character
```
```button
name 🌍 Nova Entrada de Mundo
type command
action QuickAdd: New Worldbuilding
```
```button
name 💡 Capturar Fragmento
type command
action QuickAdd: New Snippet
```

---

## 📖 Manuscritos Ativos

> [!callout|writing-stats] Trabalhando Atualmente

```dataview
TABLE WITHOUT ID
    file.link as "Manuscrito",
    status as "Status",
    wordcount as "Palavras",
    "<progress value='" + (wordcount / 80000 * 100) + "' max='100'></progress>" as "Progresso"
FROM "01-Writing/Manuscripts"
WHERE status = "draft" OR status = "revision"
SORT file.mtime DESC
```

---

## 📅 Sessões de Escrita Esta Semana

```dataviewjs
const today = dv.date("today");
const weekAgo = today.minus({days: 7});

const recentWriting = dv.pages('"01-Writing"')
    .where(p => p.file.mday >= weekAgo)
    .sort(p => p.file.mday, 'desc');

if (recentWriting.length > 0) {
    dv.table(
        ["Data", "Arquivo", "Tipo"],
        recentWriting.map(p => [
            p.file.mday.toFormat("EEE, MMM d"),
            p.file.link,
            p.type || "nota"
        ])
    );
} else {
    dv.paragraph("*Nenhuma atividade de escrita esta semana. Hora de escrever!*");
}
```

---

## 👤 Personagens Recentes

```dataview
TABLE WITHOUT ID
    file.link as "Personagem",
    role as "Papel",
    project as "Projeto"
FROM "01-Writing/Characters"
SORT file.mtime DESC
LIMIT 5
```

[[01-Writing/Characters/|→ Todos os personagens]]

---

## 🌍 Entradas de Worldbuilding

```dataview
TABLE WITHOUT ID
    file.link as "Entrada",
    category as "Categoria",
    project as "Projeto"
FROM "01-Writing/Worldbuilding"
SORT file.mtime DESC
LIMIT 5
```

[[01-Writing/Worldbuilding/|→ Todo o worldbuilding]]

---

## 🔬 Notas de Pesquisa

```dataview
TABLE WITHOUT ID
    file.link as "Pesquisa",
    topic as "Tópico",
    project as "Projeto Relacionado"
FROM "01-Writing/Research"
SORT file.mtime DESC
LIMIT 5
```

[[01-Writing/Research/|→ Todas as pesquisas]]

---

## 💡 Fragmentos e Ideias Recentes

```dataview
LIST
FROM "01-Writing/Snippets"
SORT file.ctime DESC
LIMIT 8
```

[[01-Writing/Snippets/|→ Todos os fragmentos]]

---

## 📈 Metas de Contagem de Palavras

> [!info] Defina suas metas no frontmatter do manuscrito com `wordgoal: 80000`

```dataviewjs
const manuscripts = dv.pages('"01-Writing/Manuscripts"')
    .where(p => p.wordgoal && p.wordcount);

if (manuscripts.length > 0) {
    dv.table(
        ["Projeto", "Atual", "Meta", "Progresso"],
        manuscripts.map(p => {
            const pct = Math.round((p.wordcount / p.wordgoal) * 100);
            return [
                p.file.link,
                p.wordcount.toLocaleString(),
                p.wordgoal.toLocaleString(),
                `${pct}%`
            ];
        })
    );
} else {
    dv.paragraph("*Adicione `wordgoal` e `wordcount` ao frontmatter do manuscrito para acompanhar o progresso.*");
}
```

---

## 🔗 Links Rápidos

| Longform | Templates | Ferramentas |
|----------|-----------|-------------|
| [[01-Writing/Manuscripts/\|📚 Todos os Manuscritos]] | [[_templates/writing/Manuscript Template\|📝 Manuscrito]] | [[Home\|🏠 Início]] |
| Abrir painel Longform → `Ctrl/Cmd + Shift + L` | [[_templates/writing/Character Template\|👤 Personagem]] | [[Tasks Dashboard\|✅ Tarefas]] |
| | [[_templates/writing/Scene Template\|🎬 Cena]] | [[Projects Dashboard\|🎯 Projetos]] |

---

*Boas escritas! Lembre-se: rascunhos são feitos para ser imperfeitos.*
