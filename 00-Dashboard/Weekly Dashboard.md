---
title: Weekly Dashboard
type: dashboard
include_in_navbar: true
navbar_name: Weekly
cssclass: dashboard
---

# ðŸ“† Weekly Dashboard

```dataviewjs
// â”€â”€â”€ CabeÃ§alho dinÃ¢mico â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const today = dv.date("today");
const weekStart = today.minus({ days: today.weekday - 1 });
const weekEnd   = weekStart.plus({ days: 6 });
const weekNum   = weekStart.toFormat("WW");

dv.container.innerHTML = `
<div style="text-align:center;margin:8px 0 4px;">
    <span style="font-size:1.1em;color:var(--text-muted);">
        Semana <strong style="color:var(--text-normal);">${weekNum}</strong>
        &nbsp;Â·&nbsp;
        ${weekStart.toFormat("d MMM")} â€“ ${weekEnd.toFormat("d MMM yyyy")}
    </span>
</div>`;
```

```button
name ðŸ”„ Abrir RevisÃ£o Semanal
type command
action Periodic Notes: Open weekly note
```

---

## ðŸ“… Esta Semana

```dataviewjs
const today = dv.date("today");
const weekStart = today.minus({ days: today.weekday - 1 });

const weekDays = [];
for (let i = 0; i < 7; i++) {
    const day = weekStart.plus({ days: i });
    const dayNote = dv.page(`03-Daily/Journal/${day.toFormat("yyyy-MM-dd")}`);
    weekDays.push({ date: day, hasNote: !!dayNote, isToday: day.toISODate() === today.toISODate() });
}

const dayLabels = ["Seg","Ter","Qua","Qui","Sex","SÃ¡b","Dom"];

const cells = weekDays.map((d, i) => {
    const bg = d.isToday
        ? "var(--text-accent)"
        : d.hasNote
            ? "var(--background-secondary)"
            : "var(--background-primary)";
    const color = d.isToday ? "var(--text-on-accent)" : "var(--text-normal)";
    const border = d.hasNote || d.isToday ? "2px solid var(--text-accent)" : "1px solid var(--background-modifier-border)";
    return `<div style="display:inline-block;width:50px;text-align:center;margin:4px;">
        <div style="font-size:0.75em;color:var(--text-muted);margin-bottom:3px;">${dayLabels[i]}</div>
        <div style="width:50px;height:50px;line-height:50px;border-radius:10px;background:${bg};color:${color};border:${border};font-weight:bold;">
            ${d.date.toFormat("d")}
        </div>
    </div>`;
}).join('');

const filled = weekDays.filter(d => d.hasNote).length;

dv.container.innerHTML = `
<div style="text-align:center;margin:16px 0 8px;">
    <div>${cells}</div>
    <div style="font-size:0.8em;color:var(--text-muted);margin-top:8px;">
        ${filled}/7 dias com entrada no diÃ¡rio
    </div>
</div>`;
```

---

## ðŸ˜Œ Humor & Energia da Semana

```dataviewjs
const loadDashboardHelpers = async () => {
    if (typeof window.forceLoadCustomJS === "function") {
        try {
            await window.forceLoadCustomJS();
        } catch (error) {
            console.warn("CustomJS reload failed", error);
        }
    }

    if (typeof cJS === "function") {
        try {
            const modules = await cJS();
            if (modules?.DashboardHelpers) return modules.DashboardHelpers;
        } catch (error) {
            console.warn("CustomJS DashboardHelpers unavailable", error);
        }
    }

    const file = app.vault.getAbstractFileByPath("_scripts/DashboardHelpers.js");
    if (!file) throw new Error("DashboardHelpers.js missing from _scripts");
    const source = await app.vault.cachedRead(file);
    const DashboardHelpersClass = new Function(`${source}; return DashboardHelpers;`)();
    return new DashboardHelpersClass();
};

const h = await loadDashboardHelpers();

const today = dv.date("today");
const weekStart = today.minus({ days: today.weekday - 1 });
const weekEnd   = weekStart.plus({ days: 6 });

const mornings = dv.pages('"03-Daily/Morning Reviews"')
    .where(p => p.date && dv.date(p.date) >= weekStart && dv.date(p.date) <= weekEnd);
const evenings = dv.pages('"03-Daily/Evening Reviews"')
    .where(p => p.date && dv.date(p.date) >= weekStart && dv.date(p.date) <= weekEnd);
const journals = dv.pages('"03-Daily/Journal"')
    .where(p => p.date && dv.date(p.date) >= weekStart && dv.date(p.date) <= weekEnd);

const morningMap = {}, eveningMap = {}, journalMap = {};
mornings.forEach(p => { if (p.date) morningMap[dv.date(p.date).toFormat("yyyy-MM-dd")] = p; });
evenings.forEach(p => { if (p.date) eveningMap[dv.date(p.date).toFormat("yyyy-MM-dd")] = p; });
journals.forEach(p => { if (p.date) journalMap[dv.date(p.date).toFormat("yyyy-MM-dd")] = p; });

let sums = {mm:0,em:0,mn:0,en:0}, counts = {mm:0,em:0,mn:0,en:0};
mornings.forEach(p => {
    const mm = h.parseVal(p.mood_morning,   'mood');   if (mm) { sums.mm += mm; counts.mm++; }
    const em = h.parseVal(p.energy_morning, 'energy'); if (em) { sums.em += em; counts.em++; }
});
evenings.forEach(p => {
    const mn = h.parseVal(p.mood_evening,   'mood');   if (mn) { sums.mn += mn; counts.mn++; }
    const en = h.parseVal(p.energy_evening, 'energy'); if (en) { sums.en += en; counts.en++; }
});
const avg = (s, c) => c > 0 ? (s/c).toFixed(1) : null;

const dayLabels = ["Seg","Ter","Qua","Qui","Sex","SÃ¡b","Dom"];
let rows = "";
let hasAnyData = false;

for (let i = 0; i < 7; i++) {
    const d = weekStart.plus({ days: i });
    const key = d.toFormat("yyyy-MM-dd");
    const mp = morningMap[key], ep = eveningMap[key], jp = journalMap[key];
    if (!mp && !ep && !jp) continue;
    hasAnyData = true;

    const dayLabel = dayLabels[i];
    const dateStr  = d.toFormat("dd/MM");
    const filePath = jp ? jp.file.path : (mp ? mp.file.path : ep.file.path);
    const link     = `<a href="${filePath}" class="internal-link">${dateStr} ${dayLabel}</a>`;
    const highlightText = jp ? await h.resolveHighlight(app, jp) : null;
    const highlight = highlightText
        ? `<span style="color:#aaa;font-size:0.85em">${highlightText}</span>`
        : "<span style='color:#555'>â€”</span>";

    rows += `<tr>
        <td style="padding:6px 10px;white-space:nowrap;">${link}</td>
        ${h.cell(mp?.mood_morning,   'mood')}
        ${h.cell(mp?.energy_morning, 'energy')}
        ${h.cell(ep?.mood_evening,   'mood')}
        ${h.cell(ep?.energy_evening, 'energy')}
        <td style="padding:6px 10px;max-width:200px;">${highlight}</td>
    </tr>`;
}

if (!hasAnyData) {
    rows = `<tr><td colspan="6" style="text-align:center;color:#666;padding:20px;">Nenhuma entrada encontrada para esta semana ainda.</td></tr>`;
}

const avgRow = `<tr style="border-top:2px solid #444;font-weight:bold;">
    <td style="padding:6px 10px;">ðŸ“Š MÃ©dia</td>
    ${h.cell(h.closestEmoji(avg(sums.mm,counts.mm), 'mood'),   'mood')}
    ${h.cell(h.closestEmoji(avg(sums.em,counts.em), 'energy'), 'energy')}
    ${h.cell(h.closestEmoji(avg(sums.mn,counts.mn), 'mood'),   'mood')}
    ${h.cell(h.closestEmoji(avg(sums.en,counts.en), 'energy'), 'energy')}
    <td></td>
</tr>`;

dv.container.innerHTML = `
<table style="width:100%;border-collapse:separate;border-spacing:0 4px;">
    <thead>
        <tr style="color:#888;font-size:0.8em;text-align:center;">
            <th style="text-align:left;padding:4px 10px;">Dia</th>
            <th style="padding:4px 8px;">ðŸ˜Œ Humor<br><span style="font-size:0.8em">ManhÃ£</span></th>
            <th style="padding:4px 8px;">âš¡ Energia<br><span style="font-size:0.8em">ManhÃ£</span></th>
            <th style="padding:4px 8px;">ðŸ˜Œ Humor<br><span style="font-size:0.8em">Noite</span></th>
            <th style="padding:4px 8px;">âš¡ Energia<br><span style="font-size:0.8em">Noite</span></th>
            <th style="text-align:left;padding:4px 10px;">âœ¨ Destaque</th>
        </tr>
    </thead>
    <tbody>${rows}${avgRow}</tbody>
</table>`;
```

---

## âœï¸ Escrita Esta Semana

```dataviewjs
const today = dv.date("today");
const weekStart = today.minus({ days: today.weekday - 1 });

const writingActivity = dv.pages('"01-Writing"')
    .where(p => p.file.mday >= weekStart)
    .sort(p => p.file.mday, 'desc');

if (writingActivity.length > 0) {
    let totalWords = 0;
    writingActivity.forEach(p => { if (p.wordcount) totalWords += p.wordcount; });
    dv.paragraph(`**Arquivos tocados:** ${writingActivity.length} | **Palavras em andamento:** ${totalWords.toLocaleString()}`);
    dv.table(
        ["Arquivo", "Tipo", "Modificado"],
        writingActivity.slice(0, 7).map(p => [
            p.file.link,
            p.type || "â€”",
            p.file.mday.toFormat("EEE, dd/MM")
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
const weekStart = today.minus({ days: today.weekday - 1 });

const completed = dv.pages('"04-Tasks"')
    .where(p => p.completed_date && dv.date(p.completed_date) >= weekStart)
    .sort(p => p.completed_date, 'desc');

if (completed.length > 0) {
    dv.paragraph(`**ConcluÃ­das esta semana:** ${completed.length} tarefas ðŸŽ‰`);
    dv.list(completed.map(p => `~~${p.file.name}~~ â€” ${p.completed_date}`));
} else {
    dv.paragraph("*Nenhuma tarefa concluÃ­da esta semana ainda.*");
}
```

---

## ðŸ“‹ RevisÃµes desta Semana

```dataviewjs
const today = dv.date("today");
const weekStart = today.minus({ days: today.weekday - 1 });
const weekEnd   = weekStart.plus({ days: 6 });

const mornings = dv.pages('"03-Daily/Morning Reviews"')
    .where(p => p.date && dv.date(p.date) >= weekStart && dv.date(p.date) <= weekEnd)
    .sort(p => p.date, 'asc');
const evenings = dv.pages('"03-Daily/Evening Reviews"')
    .where(p => p.date && dv.date(p.date) >= weekStart && dv.date(p.date) <= weekEnd)
    .sort(p => p.date, 'asc');

if (mornings.length > 0 || evenings.length > 0) {
    if (mornings.length > 0) {
        dv.paragraph(`**â˜€ï¸ ManhÃ£ (${mornings.length})**`);
        dv.list(mornings.map(p => p.file.link));
    }
    if (evenings.length > 0) {
        dv.paragraph(`**ðŸŒ™ Noite (${evenings.length})**`);
        dv.list(evenings.map(p => p.file.link));
    }
} else {
    dv.paragraph("*Nenhuma revisÃ£o encontrada para esta semana.*");
}
```

---

## ðŸ”— NavegaÃ§Ã£o RÃ¡pida

| DiÃ¡rio | Dashboards | Outros |
|--------|------------|--------|
| [[Daily Dashboard\|ðŸ“… Daily]] | [[Home\|ðŸ  InÃ­cio]] | [[Writing Dashboard\|âœï¸ Escrita]] |
| [[03-Daily/Journal/\|ðŸ““ DiÃ¡rio]] | [[Tasks Dashboard\|âœ… Tarefas]] | [[Projects Dashboard\|ðŸ“‚ Projetos]] |
| [[00-Dashboard/Mood-Energy Tracker/Hub\|ðŸ“Š Mood Hub]] | [[03-Daily/Morning Reviews/\|â˜€ï¸ ManhÃ£]] | [[03-Daily/Evening Reviews/\|ðŸŒ™ Noite]] |

---

*Cada semana Ã© uma chance de recalibrar.*

