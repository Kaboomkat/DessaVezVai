---
title: "Tracker <% tp.file.title %>"
type: mood-tracker
frequency: yearly
year: <% tp.file.title %>
tags:
  - tracker/yearly
  - tracker/mood
---

# Mood-Energy Tracker Anual

```dataviewjs
const { DashboardHelpers: h } = await cJS();

const cur = dv.current();
const year = Number(cur.year) || new Date().getFullYear();
const monthNames = ["Janeiro","Fevereiro","Marco","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];
const avg = values => {
    const arr = Array.from(values ?? []);
    return arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : null;
};

const mornings = dv.pages('"03-Daily/Morning Reviews"').where(p => {
    const d = dv.date(p.date);
    return d && d.year === year;
});
const evenings = dv.pages('"03-Daily/Evening Reviews"').where(p => {
    const d = dv.date(p.date);
    return d && d.year === year;
});
const journals = dv.pages('"03-Daily/Journal"').where(p => {
    const d = dv.date(p.date);
    return d && d.year === year;
});

const byMonth = {};
for (let month = 1; month <= 12; month++) {
    byMonth[month] = { moodMorning: [], energyMorning: [], moodEvening: [], energyEvening: [] };
}

const dayMap = {};
const upsertDay = (key, path) => {
    if (!dayMap[key]) dayMap[key] = { moods: [], path };
    if (!dayMap[key].path) dayMap[key].path = path;
};

mornings.forEach(p => {
    const d = dv.date(p.date);
    const mood = h.parseVal(p.mood_morning, "mood");
    const energy = h.parseVal(p.energy_morning, "energy");
    if (mood) byMonth[d.month].moodMorning.push(mood);
    if (energy) byMonth[d.month].energyMorning.push(energy);
    const key = d.toFormat("yyyy-MM-dd");
    upsertDay(key, p.file.path);
    if (mood) dayMap[key].moods.push(mood);
});
evenings.forEach(p => {
    const d = dv.date(p.date);
    const mood = h.parseVal(p.mood_evening, "mood");
    const energy = h.parseVal(p.energy_evening, "energy");
    if (mood) byMonth[d.month].moodEvening.push(mood);
    if (energy) byMonth[d.month].energyEvening.push(energy);
    const key = d.toFormat("yyyy-MM-dd");
    upsertDay(key, p.file.path);
    if (mood) dayMap[key].moods.push(mood);
});
journals.forEach(p => {
    const d = dv.date(p.date);
    const key = d.toFormat("yyyy-MM-dd");
    upsertDay(key, p.file.path);
});

const statHtml = (label, avgValue, type) => {
    const emoji = h.closestEmoji(avgValue, type) || "-";
    const numeric = avgValue == null ? "-" : avgValue.toFixed(1);
    const color = h.scoreColor(avgValue, type);
    return `<div style="background:${color};border-radius:10px;padding:10px;text-align:center;">
        <div style="font-size:0.75em;color:#eee;">${label}</div>
        <div style="font-size:1.4em;">${emoji}</div>
        <div style="font-size:0.9em;color:#fff;">${numeric}</div>
    </div>`;
};

let monthCards = "";
let bestMonth = null;
let worstMonth = null;
let bestScore = -Infinity;
let worstScore = Infinity;
for (let month = 1; month <= 12; month++) {
    const data = byMonth[month];
    const moodAvg = avg([...data.moodMorning, ...data.moodEvening]);
    if (moodAvg != null && moodAvg > bestScore) {
        bestScore = moodAvg;
        bestMonth = month;
    }
    if (moodAvg != null && moodAvg < worstScore) {
        worstScore = moodAvg;
        worstMonth = month;
    }
    monthCards += `<div style="background:${h.scoreColor(moodAvg, "mood")};border-radius:10px;padding:12px;text-align:center;">
        <div><a href="00-Dashboard/Mood-Energy Tracker/Monthly/${year}/${String(month).padStart(2, "0")}" class="internal-link" style="color:#fff;text-decoration:none;">${monthNames[month - 1]}</a></div>
        <div style="font-size:1.4em;margin-top:4px;">${h.closestEmoji(moodAvg, "mood") || "-"}</div>
        <div style="font-size:0.85em;color:#fff;">${moodAvg == null ? "-" : moodAvg.toFixed(1)}</div>
    </div>`;
}

const allMoodMorning = Object.values(byMonth).flatMap(m => m.moodMorning);
const allEnergyMorning = Object.values(byMonth).flatMap(m => m.energyMorning);
const allMoodEvening = Object.values(byMonth).flatMap(m => m.moodEvening);
const allEnergyEvening = Object.values(byMonth).flatMap(m => m.energyEvening);

const start = new Date(year, 0, 1);
const end = new Date(year, 11, 31);
const offset = (start.getDay() + 6) % 7;
const cells = [];
for (let i = 0; i < offset; i++) cells.push(null);
for (let cursor = new Date(start); cursor <= end; cursor.setDate(cursor.getDate() + 1)) {
    const key = `${cursor.getFullYear()}-${String(cursor.getMonth() + 1).padStart(2, "0")}-${String(cursor.getDate()).padStart(2, "0")}`;
    const entry = dayMap[key];
    const score = avg(entry?.moods);
    cells.push({
        key,
        day: cursor.getDate(),
        month: cursor.getMonth(),
        path: entry?.path,
        score
    });
}
while (cells.length % 7 !== 0) cells.push(null);

const monthLabels = [];
for (let month = 0; month < 12; month++) {
    const first = new Date(year, month, 1);
    const index = offset + Math.floor((first - start) / 86400000);
    const column = Math.floor(index / 7);
    monthLabels.push(`<div style="grid-column:${column + 1};font-size:0.75em;color:var(--text-muted);">${monthNames[month].slice(0, 3)}</div>`);
}

let heatmapColumns = "";
for (let i = 0; i < cells.length; i += 7) {
    const week = cells.slice(i, i + 7);
    const column = week.map(cell => {
        if (!cell) {
            return `<div style="width:12px;height:12px;border-radius:3px;background:transparent;"></div>`;
        }
        const bg = cell.score == null ? "var(--background-secondary)" : h.scoreColor(cell.score, "mood");
        const title = `${cell.key}${cell.score == null ? "" : ` mood ${cell.score.toFixed(1)}`}`;
        const inner = `<div title="${title}" style="width:12px;height:12px;border-radius:3px;background:${bg};"></div>`;
        return cell.path
            ? `<a href="${cell.path}" class="internal-link" style="display:block;width:12px;height:12px;">${inner}</a>`
            : inner;
    }).join("");
    heatmapColumns += `<div style="display:grid;grid-template-rows:repeat(7,12px);gap:3px;">${column}</div>`;
}

dv.container.innerHTML = `
<h2 style="margin-bottom:4px;">${year}</h2>
<div style="color:var(--text-muted);font-size:0.85em;margin-bottom:12px;">${Object.keys(dayMap).length} dias com registro</div>
<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:16px;">${monthCards}</div>
<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:16px;">
    ${statHtml("Humor manha", avg(allMoodMorning), "mood")}
    ${statHtml("Energia manha", avg(allEnergyMorning), "energy")}
    ${statHtml("Humor noite", avg(allMoodEvening), "mood")}
    ${statHtml("Energia noite", avg(allEnergyEvening), "energy")}
</div>
<div style="display:flex;gap:12px;margin-bottom:16px;">
    <div style="flex:1;background:${bestMonth ? h.scoreColor(bestScore, "mood") : "#2a2a2a"};border-radius:10px;padding:12px;text-align:center;">
        <div style="font-size:0.75em;color:#eee;">Melhor mes</div>
        <div style="font-size:1.2em;">${bestMonth ? monthNames[bestMonth - 1] : "-"}</div>
        <div style="color:#fff;">${bestMonth ? bestScore.toFixed(1) : "-"}</div>
    </div>
    <div style="flex:1;background:${worstMonth ? h.scoreColor(worstScore, "mood") : "#2a2a2a"};border-radius:10px;padding:12px;text-align:center;">
        <div style="font-size:0.75em;color:#eee;">Mes mais dificil</div>
        <div style="font-size:1.2em;">${worstMonth ? monthNames[worstMonth - 1] : "-"}</div>
        <div style="color:#fff;">${worstMonth ? worstScore.toFixed(1) : "-"}</div>
    </div>
</div>
<h3 style="margin:0 0 8px;">Heatmap do Ano</h3>
<div style="display:grid;grid-template-columns:repeat(${Math.ceil(cells.length / 7)},15px);gap:3px 4px;margin-bottom:6px;">${monthLabels.join("")}</div>
<div style="display:flex;gap:4px;align-items:flex-start;flex-wrap:nowrap;overflow-x:auto;">${heatmapColumns}</div>`;
```

---

## Meses

[[../Hub|Mood Tracker Hub]]
