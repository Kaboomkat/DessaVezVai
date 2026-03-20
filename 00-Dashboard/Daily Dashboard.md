---
title: Daily Dashboard
type: dashboard
include_in_navbar: true
navbar_name: Daily
cssclass: dashboard
---

# 📅 Daily Dashboard

> [!quote]
> *"Como gastamos nossos dias é, claro, como gastamos nossas vidas."* — Annie Dillard

---

## 📊 Esta Semana

```dataviewjs
const today = dv.date("today");
const weekStart = today.minus({days: today.weekday - 1});

const weekDays = [];
for (let i = 0; i < 7; i++) {
    const day = weekStart.plus({days: i});
    const dayNote = dv.page(`03-Daily/Journal/${day.toFormat("yyyy-MM-dd")}`);
    weekDays.push({
        date: day,
        hasNote: !!dayNote,
        isToday: day.toISODate() === today.toISODate()
    });
}

const html = weekDays.map(d => {
    const classes = [];
    if (d.hasNote) classes.push("has-note");
    if (d.isToday) classes.push("is-today");
    
    return `<div class="week-day ${classes.join(' ')}" style="
        display: inline-block;
        width: 40px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        margin: 4px;
        border-radius: 8px;
        background: ${d.isToday ? 'var(--text-accent)' : d.hasNote ? 'var(--background-secondary)' : 'var(--background-primary)'};
        color: ${d.isToday ? 'var(--text-on-accent)' : 'var(--text-normal)'};
        border: 1px solid var(--background-modifier-border);
    ">${d.date.toFormat("d")}</div>`;
}).join('');

dv.container.innerHTML = `
<div style="text-align: center; margin: 20px 0;">
    <div style="font-size: 0.9em; color: var(--text-muted); margin-bottom: 8px;">
        ${weekStart.toFormat("MMMM yyyy")}
    </div>
    <div>${html}</div>
    <div style="font-size: 0.8em; color: var(--text-muted); margin-top: 8px;">
        Seg — Dom
    </div>
</div>
`;
```

---

## 🚀 Ações Rápidas

```button
name 📓 Abrir Diário de Hoje
type command
action Periodic Notes: Open daily note
```
```button
name 🔄 Revisão da Manhã
type command
action QuickAdd: Morning Review
```
```button
name 🌙 Revisão da Noite
type command
action QuickAdd: Evening Review
```
```button
name 📊 Revisão Semanal
type command
action Periodic Notes: Open weekly note
```

---

## 📓 Entradas Recentes do Diário

```dataviewjs
const { DashboardHelpers } = await cJS();
const h = new DashboardHelpers();

// Indexar reviews por data
const morningMap = {}, eveningMap = {};
dv.pages('"03-Daily/Morning Reviews"').forEach(p => {
    if (p.date) morningMap[dv.date(p.date).toFormat("yyyy-MM-dd")] = p;
});
dv.pages('"03-Daily/Evening Reviews"').forEach(p => {
    if (p.date) eveningMap[dv.date(p.date).toFormat("yyyy-MM-dd")] = p;
});

const pages = dv.pages('"03-Daily/Journal"')
    .where(p => p.type === "daily")
    .sort(p => p.file.name, 'desc')
    .slice(0, 7);

let rows = "";
pages.forEach(p => {
    const key = p.file.name; // "YYYY-MM-DD"
    const mp = morningMap[key];
    const ep = eveningMap[key];
    const highlight = p.highlight ? `<span style="color:#aaa;font-size:0.85em">${p.highlight}</span>` : "<span style='color:#555'>—</span>";
    rows += `<tr>
        <td style="padding:4px 10px;white-space:nowrap;"><a href="${p.file.path}" class="internal-link">${p.file.name}</a></td>
        ${h.cell(mp?.mood_morning, 'mood')}
        ${h.cell(mp?.energy_morning, 'energy')}
        ${h.cell(ep?.mood_evening, 'mood')}
        ${h.cell(ep?.energy_evening, 'energy')}
        <td style="padding:4px 10px;max-width:180px;">${highlight}</td>
    </tr>`;
});

dv.container.innerHTML = `<table style="width:100%;border-collapse:separate;border-spacing:0 3px;">
    <thead><tr style="color:#888;font-size:0.78em;text-align:center;">
        <th style="text-align:left;padding:4px 10px;">Data</th>
        <th>😌 Manhã</th><th>⚡ Manhã</th><th>😌 Noite</th><th>⚡ Noite</th>
        <th style="text-align:left;padding:4px 10px;">✨ Destaque</th>
    </tr></thead>
    <tbody>${rows}</tbody>
</table>`;
```

[[03-Daily/Journal/|→ Todas as entradas do diário]] | [[00-Dashboard/Mood-Energy Tracker/Yearly/2026|📊 Mood Tracker 2026]]

---

## ✍️ Atividade de Escrita Esta Semana

```dataviewjs
const today = dv.date("today");
const weekAgo = today.minus({days: 7});

const writingActivity = dv.pages('"01-Writing"')
    .where(p => p.file.mday >= weekAgo)
    .sort(p => p.file.mday, 'desc');

if (writingActivity.length > 0) {
    let totalWords = 0;
    writingActivity.forEach(p => {
        if (p.wordcount) totalWords += p.wordcount;
    });
    
    dv.paragraph(`**Arquivos tocados:** ${writingActivity.length} | **Palavras estimadas em andamento:** ${totalWords.toLocaleString()}`);
    
    dv.table(
        ["Arquivo", "Tipo", "Modificado"],
        writingActivity.slice(0, 5).map(p => [
            p.file.link,
            p.type || "—",
            p.file.mday.toFormat("EEE, MMM d")
        ])
    );
} else {
    dv.paragraph("*Nenhuma atividade de escrita esta semana ainda.*");
}
```

---

## ✅ Tarefas Concluídas Esta Semana

```dataviewjs
const today = dv.date("today");
const weekAgo = today.minus({days: 7});

const completed = dv.pages('"04-Tasks"')
    .where(p => p.completed_date && dv.date(p.completed_date) >= weekAgo)
    .sort(p => p.completed_date, 'desc');

if (completed.length > 0) {
    dv.paragraph(`**Concluídas:** ${completed.length} tarefas 🎉`);
    dv.list(completed.map(p => `~~${p.file.name}~~ — ${p.completed_date}`));
} else {
    dv.paragraph("*Nenhuma tarefa concluída esta semana ainda.*");
}
```

---

## 🔄 Revisões

### Revisão Diária
1. **Esvaziar Caixa de Entrada** — Processar itens capturados
2. **Verificar calendário** — O que está agendado hoje?
3. **Revisar Próximas Ações** — O que você vai fazer hoje?
4. **Verificar Aguardando Resposta** — Algum follow-up necessário?

### Lista de Verificação Semanal
- [ ] Zerar a Caixa de Entrada
- [ ] Revisar calendário anterior
- [ ] Revisar calendário futuro
- [ ] Revisar lista de Aguardando Resposta
- [ ] Revisar lista de Projetos
- [ ] Revisar lista Algum Dia/Talvez
- [ ] Revisar metas

[[03-Daily/Journal/|→ Ver todas as entradas do diário]]

---

## 📈 Sequências e Hábitos

```dataviewjs
const journals = dv.pages('"03-Daily/Journal"')
    .sort(p => p.file.name, 'desc')
    .map(p => p.file.name);

let streak = 0;
let checkDate = dv.date("today");

for (let i = 0; i < journals.length && i < 100; i++) {
    const expectedDate = checkDate.minus({days: i}).toFormat("yyyy-MM-dd");
    if (journals.includes(expectedDate)) {
        streak++;
    } else {
        break;
    }
}

dv.container.innerHTML = `
<div class="dashboard-card" style="text-align: center;">
    <h3>🔥 Sequência do Diário</h3>
    <div class="stat-number">${streak}</div>
    <div class="stat-label">dias consecutivos</div>
</div>
`;
```

---

## 🔗 Navegação Rápida

| Diário | Revisões | Outros |
|--------|----------|--------|
| [[03-Daily/Journal/\|📓 Diário]] | [[03-Daily/Morning Reviews/\|☀️ Revisões Manhã]] | [[Home\|🏠 Início]] |
| [[03-Daily/Evening Reviews/\|🌙 Revisões Noite]] | [[03-Daily/Reviews/Weekly Review\|🔄 Revisão Semanal]] | [[Writing Dashboard\|✍️ Escrita]] |
| [[Weekly Dashboard\|📆 Semanal]] | | |

---

*Hoje é uma nova página. Escreva bem.*
