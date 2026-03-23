$ErrorActionPreference = "Stop"

$Root = Split-Path -Parent $PSScriptRoot
$Utf8NoBom = New-Object System.Text.UTF8Encoding($false)

function Write-Utf8 {
    param(
        [string]$Path,
        [string]$Content
    )

    [System.IO.File]::WriteAllText($Path, ($Content.TrimStart("`r", "`n") + "`r`n"), $Utf8NoBom)
}

function Get-IsoWeekStart {
    param(
        [int]$Year,
        [int]$Week
    )

    $jan4 = Get-Date -Date "$Year-01-04T12:00:00"
    $offset = ([int]$jan4.DayOfWeek + 6) % 7
    $week1Monday = $jan4.Date.AddDays(-$offset)
    return $week1Monday.AddDays(($Week - 1) * 7)
}

function Get-IsoWeekCount {
    param([int]$Year)

    $calendar = [System.Globalization.CultureInfo]::InvariantCulture.Calendar
    $dec28 = Get-Date -Date "$Year-12-28T12:00:00"
    return $calendar.GetWeekOfYear(
        $dec28,
        [System.Globalization.CalendarWeekRule]::FirstFourDayWeek,
        [DayOfWeek]::Monday
    )
}

function Get-WeekCode {
@'
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

const cur = dv.current();
const weekStart = dv.date(cur.week_start);
const weekEnd = dv.date(cur.week_end);

if (!weekStart || !weekEnd) {
    dv.paragraph("Preencha `week_start` e `week_end` no frontmatter.");
    return;
}

const mornings = dv.pages('"03-Daily/Morning Reviews"').where(p => p.date && dv.date(p.date) >= weekStart && dv.date(p.date) <= weekEnd);
const evenings = dv.pages('"03-Daily/Evening Reviews"').where(p => p.date && dv.date(p.date) >= weekStart && dv.date(p.date) <= weekEnd);
const journals = dv.pages('"03-Daily/Journal"').where(p => p.date && dv.date(p.date) >= weekStart && dv.date(p.date) <= weekEnd);

const morningMap = {};
const eveningMap = {};
const journalMap = {};
mornings.forEach(p => { if (p.date) morningMap[dv.date(p.date).toFormat("yyyy-MM-dd")] = p; });
evenings.forEach(p => { if (p.date) eveningMap[dv.date(p.date).toFormat("yyyy-MM-dd")] = p; });
journals.forEach(p => { if (p.date) journalMap[dv.date(p.date).toFormat("yyyy-MM-dd")] = p; });

const avg = values => {
    const arr = Array.from(values ?? []);
    return arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : null;
};
const attr = value => String(value ?? "").replace(/"/g, "&quot;");
const internalLink = (path, innerHtml, style = "", ariaLabel = path) => {
    if (!path) return innerHtml;
    const safePath = attr(path);
    const safeAria = attr(ariaLabel);
    return `<a href="${safePath}" data-href="${safePath}" aria-label="${safeAria}" class="internal-link" style="${style}">${innerHtml}</a>`;
};
const values = { mm: [], em: [], mn: [], en: [] };
const dayLabels = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom"];
let rows = "";

for (let i = 0; i < 7; i++) {
    const day = weekStart.plus({ days: i });
    const key = day.toFormat("yyyy-MM-dd");
    const morning = morningMap[key];
    const evening = eveningMap[key];
    const journal = journalMap[key];
    if (!morning && !evening && !journal) continue;

    const mm = morning ? h.parseVal(morning.mood_morning, "mood") : null;
    const em = morning ? h.parseVal(morning.energy_morning, "energy") : null;
    const mn = evening ? h.parseVal(evening.mood_evening, "mood") : null;
    const en = evening ? h.parseVal(evening.energy_evening, "energy") : null;
    if (mm) values.mm.push(mm);
    if (em) values.em.push(em);
    if (mn) values.mn.push(mn);
    if (en) values.en.push(en);

    const target = journal || morning || evening;
    const highlightText = journal ? await h.resolveHighlight(app, journal) : null;
    rows += `<tr>
        <td style="padding:6px 10px;white-space:nowrap;">${internalLink(target.file.path, `${day.toFormat("dd/MM")} ${dayLabels[i]}`, "", `Abrir registro ${key}`)}</td>
        ${h.cell(morning?.mood_morning, "mood")}
        ${h.cell(morning?.energy_morning, "energy")}
        ${h.cell(evening?.mood_evening, "mood")}
        ${h.cell(evening?.energy_evening, "energy")}
        <td style="padding:6px 10px;">${highlightText || "-"}</td>
    </tr>`;
}

if (!rows) {
    rows = `<tr><td colspan="6" style="padding:16px;text-align:center;color:var(--text-muted);">Nenhuma entrada encontrada para esta semana.</td></tr>`;
}

rows += `<tr style="font-weight:bold;border-top:2px solid var(--background-modifier-border);">
    <td style="padding:6px 10px;">Média</td>
    ${h.cell(h.closestEmoji(avg(values.mm), "mood"), "mood")}
    ${h.cell(h.closestEmoji(avg(values.em), "energy"), "energy")}
    ${h.cell(h.closestEmoji(avg(values.mn), "mood"), "mood")}
    ${h.cell(h.closestEmoji(avg(values.en), "energy"), "energy")}
    <td></td>
</tr>`;

dv.container.innerHTML = `<table style="width:100%;border-collapse:separate;border-spacing:0 4px;">
    <thead>
        <tr style="color:var(--text-muted);font-size:0.8em;text-align:center;">
            <th style="text-align:left;padding:4px 10px;">Dia</th>
            <th>Humor manhã</th>
            <th>Energia manhã</th>
            <th>Humor noite</th>
            <th>Energia noite</th>
            <th style="text-align:left;padding:4px 10px;">Destaque</th>
        </tr>
    </thead>
    <tbody>${rows}</tbody>
</table>`;
```
'@
}

function Get-MonthCode {
@'
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

const cur = dv.current();
const year = Number(cur.year) || new Date().getFullYear();
const month = Number(cur.month) || (new Date().getMonth() + 1);
const monthNames = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];
const monthName = monthNames[month - 1];
const attr = value => String(value ?? "").replace(/"/g, "&quot;");
const internalLink = (path, innerHtml, style = "", ariaLabel = path) => {
    if (!path) return innerHtml;
    const safePath = attr(path);
    const safeAria = attr(ariaLabel);
    return `<a href="${safePath}" data-href="${safePath}" aria-label="${safeAria}" class="internal-link" style="${style}">${innerHtml}</a>`;
};

const mornings = dv.pages('"03-Daily/Morning Reviews"').where(p => {
    const d = dv.date(p.date);
    return d && d.year === year && d.month === month;
});
const evenings = dv.pages('"03-Daily/Evening Reviews"').where(p => {
    const d = dv.date(p.date);
    return d && d.year === year && d.month === month;
});
const journals = dv.pages('"03-Daily/Journal"').where(p => {
    const d = dv.date(p.date);
    return d && d.year === year && d.month === month;
});

const morningByDay = {};
const eveningByDay = {};
const journalByDay = {};
mornings.forEach(p => { const d = dv.date(p.date); if (d) morningByDay[d.day] = p; });
evenings.forEach(p => { const d = dv.date(p.date); if (d) eveningByDay[d.day] = p; });
journals.forEach(p => { const d = dv.date(p.date); if (d) journalByDay[d.day] = p; });

const avg = values => {
    const arr = Array.from(values ?? []);
    return arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : null;
};
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

const moodForDay = day => {
    const values = [];
    const morning = morningByDay[day];
    const evening = eveningByDay[day];
    const mm = morning ? h.parseVal(morning.mood_morning, "mood") : null;
    const mn = evening ? h.parseVal(evening.mood_evening, "mood") : null;
    if (mm) values.push(mm);
    if (mn) values.push(mn);
    return avg(values);
};

const daysInMonth = new Date(year, month, 0).getDate();
const firstDow = new Date(year, month - 1, 1).getDay();
const offset = firstDow === 0 ? 6 : firstDow - 1;
const cells = [];
for (let i = 0; i < offset; i++) cells.push(null);
for (let day = 1; day <= daysInMonth; day++) cells.push(day);
while (cells.length % 7 !== 0) cells.push(null);

const weekdayLabels = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom"];
const calendarCells = cells.map(day => {
    if (!day) {
        return `<div style="aspect-ratio:1/1;border-radius:10px;background:transparent;"></div>`;
    }

    const mood = moodForDay(day);
    const color = h.scoreColor(mood, "mood");
    const emoji = h.closestEmoji(mood, "mood") || "&nbsp;";
    const journal = journalByDay[day];
    const dayLabel = journal
        ? internalLink(journal.file.path, String(day), "color:#fff;text-decoration:none;", `Abrir diario ${journal.file.name}`)
        : `<span style="color:#fff;">${day}</span>`;

    return `<div style="aspect-ratio:1/1;min-height:72px;padding:6px;border-radius:10px;background:${color};display:flex;flex-direction:column;justify-content:space-between;">
        <div style="font-size:0.78em;line-height:1;text-align:right;">${dayLabel}</div>
        <div style="text-align:center;font-size:1.05em;line-height:1;">${emoji}</div>
    </div>`;
}).join("");

const avgMoodMorning = avg(mornings.map(p => h.parseVal(p.mood_morning, "mood")).filter(Boolean));
const avgEnergyMorning = avg(mornings.map(p => h.parseVal(p.energy_morning, "energy")).filter(Boolean));
const avgMoodEvening = avg(evenings.map(p => h.parseVal(p.mood_evening, "mood")).filter(Boolean));
const avgEnergyEvening = avg(evenings.map(p => h.parseVal(p.energy_evening, "energy")).filter(Boolean));
const totalEntries = new Set([...Object.keys(morningByDay), ...Object.keys(eveningByDay)]).size;

const isoWeeks = new Set();
for (let day = 1; day <= daysInMonth; day++) {
    isoWeeks.add(h.currentWeekNumber(new Date(year, month - 1, day)));
}
const weekLinks = Array.from(isoWeeks).sort((a, b) => a - b).map(week =>
    internalLink(`00-Dashboard/Mood-Energy Tracker/Weekly/${year}/${String(week).padStart(2, "0")}`, `Semana ${week}`, "", `Abrir tracker semanal ${week}`)
).join(" | ");

dv.container.innerHTML = `
<h2 style="margin-bottom:4px;">${monthName} ${year}</h2>
<div style="color:var(--text-muted);font-size:0.85em;margin-bottom:12px;">${totalEntries} dias com registro</div>
<div style="display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:6px;margin-bottom:6px;">
    ${weekdayLabels.map(label => `<div style="padding:4px 0;text-align:center;color:var(--text-muted);font-size:0.85em;">${label}</div>`).join("")}
</div>
<div style="display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:6px;align-items:stretch;">
    ${calendarCells}
</div>
<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-top:16px;">
    ${statHtml("Humor manhã", avgMoodMorning, "mood")}
    ${statHtml("Energia manhã", avgEnergyMorning, "energy")}
    ${statHtml("Humor noite", avgMoodEvening, "mood")}
    ${statHtml("Energia noite", avgEnergyEvening, "energy")}
</div>
<div style="margin-top:16px;color:var(--text-muted);font-size:0.85em;">Semanas: ${weekLinks || "-"}</div>`;
```
'@
}

function Get-YearCode {
@'
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

const cur = dv.current();
const year = Number(cur.year) || new Date().getFullYear();
const monthNames = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];
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

const attr = value => String(value ?? "").replace(/"/g, "&quot;");
const internalLink = (path, innerHtml, style = "", ariaLabel = path) => {
    if (!path) return innerHtml;
    const safePath = attr(path);
    const safeAria = attr(ariaLabel);
    return `<a href="${safePath}" data-href="${safePath}" aria-label="${safeAria}" class="internal-link" style="${style}">${innerHtml}</a>`;
};

const dayMap = {};
const upsertDay = (key, { reviewPath = null, journalPath = null } = {}) => {
    if (!dayMap[key]) {
        dayMap[key] = { moods: [], reviewPath: null, journalPath: null };
    }
    if (reviewPath && !dayMap[key].reviewPath) dayMap[key].reviewPath = reviewPath;
    if (journalPath) dayMap[key].journalPath = journalPath;
};

mornings.forEach(p => {
    const d = dv.date(p.date);
    const mood = h.parseVal(p.mood_morning, "mood");
    const energy = h.parseVal(p.energy_morning, "energy");
    if (mood) byMonth[d.month].moodMorning.push(mood);
    if (energy) byMonth[d.month].energyMorning.push(energy);
    const key = d.toFormat("yyyy-MM-dd");
    upsertDay(key, { reviewPath: p.file.path });
    if (mood) dayMap[key].moods.push(mood);
});
evenings.forEach(p => {
    const d = dv.date(p.date);
    const mood = h.parseVal(p.mood_evening, "mood");
    const energy = h.parseVal(p.energy_evening, "energy");
    if (mood) byMonth[d.month].moodEvening.push(mood);
    if (energy) byMonth[d.month].energyEvening.push(energy);
    const key = d.toFormat("yyyy-MM-dd");
    upsertDay(key, { reviewPath: p.file.path });
    if (mood) dayMap[key].moods.push(mood);
});
journals.forEach(p => {
    const d = dv.date(p.date);
    const key = d.toFormat("yyyy-MM-dd");
    upsertDay(key, { journalPath: p.file.path });
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
        <div>${internalLink(`00-Dashboard/Mood-Energy Tracker/Monthly/${year}/${String(month).padStart(2, "0")}`, monthNames[month - 1], "color:#fff;text-decoration:none;", `Abrir tracker mensal de ${monthNames[month - 1]}`)}</div>
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
    const path = entry?.journalPath || entry?.reviewPath || null;
    cells.push({
        key,
        day: cursor.getDate(),
        month: cursor.getMonth(),
        path,
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
        const title = `${cell.key}${cell.score == null ? "" : ` média do dia ${cell.score.toFixed(1)}`}`;
        const inner = `<div title="${title}" style="width:12px;height:12px;border-radius:3px;background:${bg};"></div>`;
        return cell.path
            ? internalLink(cell.path, inner, "display:block;width:12px;height:12px;", `Abrir registro ${cell.key}`)
            : inner;
    }).join("");
    heatmapColumns += `<div style="display:grid;grid-template-rows:repeat(7,12px);gap:3px;">${column}</div>`;
}

dv.container.innerHTML = `
<h2 style="margin-bottom:4px;">${year}</h2>
<div style="color:var(--text-muted);font-size:0.85em;margin-bottom:12px;">${Object.keys(dayMap).length} dias com registro</div>
<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:16px;">${monthCards}</div>
<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:16px;">
    ${statHtml("Humor manhã", avg(allMoodMorning), "mood")}
    ${statHtml("Energia manhã", avg(allEnergyMorning), "energy")}
    ${statHtml("Humor noite", avg(allMoodEvening), "mood")}
    ${statHtml("Energia noite", avg(allEnergyEvening), "energy")}
</div>
<div style="display:flex;gap:12px;margin-bottom:16px;">
    <div style="flex:1;background:${bestMonth ? h.scoreColor(bestScore, "mood") : "#2a2a2a"};border-radius:10px;padding:12px;text-align:center;">
        <div style="font-size:0.75em;color:#eee;">Melhor mês</div>
        <div style="font-size:1.2em;">${bestMonth ? monthNames[bestMonth - 1] : "-"}</div>
        <div style="color:#fff;">${bestMonth ? bestScore.toFixed(1) : "-"}</div>
    </div>
    <div style="flex:1;background:${worstMonth ? h.scoreColor(worstScore, "mood") : "#2a2a2a"};border-radius:10px;padding:12px;text-align:center;">
        <div style="font-size:0.75em;color:#eee;">Mês mais difícil</div>
        <div style="font-size:1.2em;">${worstMonth ? monthNames[worstMonth - 1] : "-"}</div>
        <div style="color:#fff;">${worstMonth ? worstScore.toFixed(1) : "-"}</div>
    </div>
</div>
<h3 style="margin:0 0 8px;">Heatmap do Ano</h3>
<div style="display:grid;grid-template-columns:repeat(${Math.ceil(cells.length / 7)},15px);gap:3px 4px;margin-bottom:6px;">${monthLabels.join("")}</div>
<div style="display:flex;gap:4px;align-items:flex-start;flex-wrap:nowrap;overflow-x:auto;">${heatmapColumns}</div>`;
```
'@
}

$WeekCode = Get-WeekCode
$MonthCode = Get-MonthCode
$YearCode = Get-YearCode

$MonthTemplate = @"
---
title: "Tracker {{year}}-{{month}}"
type: mood-tracker
frequency: monthly
year:
month:
tags:
  - tracker/monthly
  - tracker/mood
---

# Mood-Energy Tracker Mensal

$MonthCode

---

## Navegação

[[../../Yearly/<% tp.frontmatter.year %>|Tracker Anual <% tp.frontmatter.year %>]]
"@
Write-Utf8 -Path (Join-Path $Root "_templates\daily\Mood-Energy Month Template.md") -Content $MonthTemplate

$YearTemplate = @"
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

$YearCode

---

## Meses

[[../Hub|Mood Tracker Hub]]
"@
Write-Utf8 -Path (Join-Path $Root "_templates\daily\Mood-Energy Year Template.md") -Content $YearTemplate

$WeekTemplate = @"
---
title: "Semana {{week_start}} - {{week_end}}"
type: mood-tracker
frequency: weekly
week_start:
week_end:
year:
tags:
  - tracker/weekly
  - tracker/mood
---

# Mood-Energy Tracker Semanal

$WeekCode

---

## Navegação

[[../../Hub|Mood Tracker Hub]]
"@
Write-Utf8 -Path (Join-Path $Root "_templates\daily\Mood-Energy Week Template.md") -Content $WeekTemplate

foreach ($Year in 2026, 2027) {
    $YearFile = @"
---
title: "Tracker $Year"
type: mood-tracker
frequency: yearly
year: $Year
tags:
  - tracker/yearly
  - tracker/mood
---

# Mood-Energy Tracker Anual

$YearCode

---

## Meses de $Year

[[Monthly/$Year/01|Janeiro]] | [[Monthly/$Year/02|Fevereiro]] | [[Monthly/$Year/03|Março]] | [[Monthly/$Year/04|Abril]] | [[Monthly/$Year/05|Maio]] | [[Monthly/$Year/06|Junho]] | [[Monthly/$Year/07|Julho]] | [[Monthly/$Year/08|Agosto]] | [[Monthly/$Year/09|Setembro]] | [[Monthly/$Year/10|Outubro]] | [[Monthly/$Year/11|Novembro]] | [[Monthly/$Year/12|Dezembro]]

---

[[../Hub|Mood Tracker Hub]]
"@
    Write-Utf8 -Path (Join-Path $Root "00-Dashboard\Mood-Energy Tracker\Yearly\$Year.md") -Content $YearFile
}

foreach ($Year in 2026, 2027) {
    $MonthDir = Join-Path $Root "00-Dashboard\Mood-Energy Tracker\Monthly\$Year"
    if (-not (Test-Path $MonthDir)) {
        New-Item -ItemType Directory -Path $MonthDir | Out-Null
    }

    for ($Month = 1; $Month -le 12; $Month++) {
        $MonthPadded = $Month.ToString("00")
        $MonthFile = @"
---
title: "Tracker $Year-$MonthPadded"
type: mood-tracker
frequency: monthly
year: $Year
month: $Month
tags:
  - tracker/monthly
  - tracker/mood
---

# Mood-Energy Tracker Mensal

$MonthCode

---

## Navegação

[[../../Yearly/$Year|Tracker Anual $Year]]
"@
        Write-Utf8 -Path (Join-Path $MonthDir "$MonthPadded.md") -Content $MonthFile
    }
}

foreach ($Year in 2026, 2027) {
    $WeekDir = Join-Path $Root "00-Dashboard\Mood-Energy Tracker\Weekly\$Year"
    if (-not (Test-Path $WeekDir)) {
        New-Item -ItemType Directory -Path $WeekDir | Out-Null
    }

    $WeekCount = Get-IsoWeekCount -Year $Year
    for ($Week = 1; $Week -le $WeekCount; $Week++) {
        $WeekPadded = $Week.ToString("00")
        $WeekStart = Get-IsoWeekStart -Year $Year -Week $Week
        $WeekEnd = $WeekStart.AddDays(6)
        $WeekFile = @"
---
title: "Semana $($WeekStart.ToString("yyyy-MM-dd")) - $($WeekEnd.ToString("yyyy-MM-dd"))"
type: mood-tracker
frequency: weekly
week_start: $($WeekStart.ToString("yyyy-MM-dd"))
week_end: $($WeekEnd.ToString("yyyy-MM-dd"))
year: $Year
tags:
  - tracker/weekly
  - tracker/mood
---

# Mood-Energy Tracker Semanal

$WeekCode

---

## Navegação

[[../../Yearly/$Year|Tracker Anual $Year]] | [[../../Hub|Mood Tracker Hub]]
"@
        Write-Utf8 -Path (Join-Path $WeekDir "$WeekPadded.md") -Content $WeekFile
    }
}

$HubPath = Join-Path $Root "00-Dashboard\Mood-Energy Tracker\Hub.md"
$HubContent = Get-Content $HubPath -Raw
$HubContent = $HubContent -replace "_templates/Daily/", "_templates/daily/"
Write-Utf8 -Path $HubPath -Content $HubContent

