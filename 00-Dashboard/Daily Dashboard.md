---
title: Daily Dashboard
type: dashboard
include_in_navbar: true
navbar_name: Daily
cssclass: dashboard
---

# ðŸ“… Daily Dashboard

> [!quote]
> *"Como gastamos nossos dias Ã©, claro, como gastamos nossas vidas."* â€” Annie Dillard

---

## ðŸ“Š Esta Semana

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
        Seg â€” Dom
    </div>
</div>
`;
```

---

## ðŸš€ AÃ§Ãµes RÃ¡pidas

```button
name ðŸ““ Abrir DiÃ¡rio de Hoje
type command
action Periodic Notes: Open daily note
```
```button
name ðŸ”„ RevisÃ£o da ManhÃ£
type command
action QuickAdd: Morning Review
```
```button
name ðŸŒ™ RevisÃ£o da Noite
type command
action QuickAdd: Evening Review
```
```button
name ðŸ“Š RevisÃ£o Semanal
type command
action Periodic Notes: Open weekly note
```

---

## ðŸ““ Entradas Recentes do DiÃ¡rio

```dataviewjs
const { DashboardHelpers } = await cJS();
const h = DashboardHelpers;

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
    const highlight = p.highlight ? `<span style="color:#aaa;font-size:0.85em">${p.highlight}</span>` : "<span style='color:#555'>â€”</span>";
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
        <th>ðŸ˜Œ ManhÃ£</th><th>âš¡ ManhÃ£</th><th>ðŸ˜Œ Noite</th><th>âš¡ Noite</th>
        <th style="text-align:left;padding:4px 10px;">âœ¨ Destaque</th>
    </tr></thead>
    <tbody>${rows}</tbody>
</table>`;
```

[[03-Daily/Journal/|â†’ Todas as entradas do diÃ¡rio]] | [[00-Dashboard/Mood-Energy Tracker/Yearly/2026|ðŸ“Š Mood Tracker 2026]]

---

## âœï¸ Atividade de Escrita Esta Semana

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
            p.type || "â€”",
            p.file.mday.toFormat("EEE, MMM d")
        ])
    );
} else {
    dv.paragraph("*Nenhuma atividade de escrita esta semana ainda.*");
}
```

---

## âœ… Tarefas ConcluÃ­das Esta Semana

```dataviewjs
const today = dv.date("today");
const weekAgo = today.minus({days: 7});

const completed = dv.pages('"04-Tasks"')
    .where(p => p.completed_date && dv.date(p.completed_date) >= weekAgo)
    .sort(p => p.completed_date, 'desc');

if (completed.length > 0) {
    dv.paragraph(`**ConcluÃ­das:** ${completed.length} tarefas ðŸŽ‰`);
    dv.list(completed.map(p => `~~${p.file.name}~~ â€” ${p.completed_date}`));
} else {
    dv.paragraph("*Nenhuma tarefa concluÃ­da esta semana ainda.*");
}
```

---

## ðŸ”„ RevisÃµes

### RevisÃ£o DiÃ¡ria
1. **Esvaziar Caixa de Entrada** â€” Processar itens capturados
2. **Verificar calendÃ¡rio** â€” O que estÃ¡ agendado hoje?
3. **Revisar PrÃ³ximas AÃ§Ãµes** â€” O que vocÃª vai fazer hoje?
4. **Verificar Aguardando Resposta** â€” Algum follow-up necessÃ¡rio?

### Lista de VerificaÃ§Ã£o Semanal
- [ ] Zerar a Caixa de Entrada
- [ ] Revisar calendÃ¡rio anterior
- [ ] Revisar calendÃ¡rio futuro
- [ ] Revisar lista de Aguardando Resposta
- [ ] Revisar lista de Projetos
- [ ] Revisar lista Algum Dia/Talvez
- [ ] Revisar metas

[[03-Daily/Journal/|â†’ Ver todas as entradas do diÃ¡rio]]

---

## ðŸ“ˆ SequÃªncias e HÃ¡bitos

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
    <h3>ðŸ”¥ SequÃªncia do DiÃ¡rio</h3>
    <div class="stat-number">${streak}</div>
    <div class="stat-label">dias consecutivos</div>
</div>
`;
```

---

## ðŸ”— NavegaÃ§Ã£o RÃ¡pida

| DiÃ¡rio | RevisÃµes | Outros |
|--------|----------|--------|
| [[03-Daily/Journal/\|ðŸ““ DiÃ¡rio]] | [[03-Daily/Morning Reviews/\|â˜€ï¸ RevisÃµes ManhÃ£]] | [[Home\|ðŸ  InÃ­cio]] |
| [[03-Daily/Evening Reviews/\|ðŸŒ™ RevisÃµes Noite]] | [[03-Daily/Reviews/Weekly Review\|ðŸ”„ RevisÃ£o Semanal]] | [[Writing Dashboard\|âœï¸ Escrita]] |
| [[Weekly Dashboard\|ðŸ“† Semanal]] | | |

---

*Hoje Ã© uma nova pÃ¡gina. Escreva bem.*

