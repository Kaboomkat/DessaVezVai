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

const monthNames = [
    "Janeiro",
    "Fevereiro",
    "Mar\u00e7o",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
];

const weekdayLabels = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom"];
const dayLabels = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom"];

const avg = (values) => {
    const arr = Array.from(values ?? []);
    return arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : null;
};

const sourcePath = dv.current()?.file?.path ?? "";
const root = dv.container;
root.innerHTML = "";
root.classList.add("mood-tracker-view");

const createEl = (tag, options = {}) => {
    const element = document.createElement(tag);
    if (options.cls) element.className = options.cls;
    if (options.text !== undefined) element.textContent = options.text;
    if (options.html !== undefined) element.innerHTML = options.html;
    if (options.attr) {
        for (const [key, value] of Object.entries(options.attr)) {
            if (value !== undefined && value !== null) element.setAttribute(key, value);
        }
    }
    if (options.style) Object.assign(element.style, options.style);
    if (options.parent) options.parent.appendChild(element);
    return element;
};

const createInternalLink = (path, options = {}) => {
    const fallbackTag = options.fallbackTag ?? "span";
    const tag = path ? "a" : fallbackTag;
    const element = createEl(tag, options);

    if (!path) return element;

    element.classList.add("internal-link");
    if (options.cls) {
        for (const cls of options.cls.split(/\s+/).filter(Boolean)) element.classList.add(cls);
    }

    element.setAttribute("href", path);
    element.setAttribute("data-href", path);
    element.setAttribute("aria-label", options.ariaLabel ?? path);
    element.addEventListener("click", (event) => {
        event.preventDefault();
        app.workspace.openLinkText(path, sourcePath, false);
    });

    return element;
};

const renderStatCard = (parent, helpers, label, avgValue, type) => {
    const card = createEl("div", { cls: "mood-tracker-stat-card", parent });
    card.style.background = helpers.scoreColor(avgValue, type);

    createEl("div", { cls: "mood-tracker-stat-label", text: label, parent: card });
    createEl("div", { cls: "mood-tracker-stat-emoji", text: helpers.closestEmoji(avgValue, type) || "-", parent: card });
    createEl("div", {
        cls: "mood-tracker-stat-value",
        text: avgValue == null ? "-" : avgValue.toFixed(1),
        parent: card,
    });
};

const renderWeek = async (helpers) => {
    root.classList.add("mood-tracker-week");

    const current = dv.current();
    const weekStart = dv.date(current.week_start);
    const weekEnd = dv.date(current.week_end);

    if (!weekStart || !weekEnd) {
        dv.paragraph("Preencha `week_start` e `week_end` no frontmatter.");
        return;
    }

    const mornings = dv.pages('"03-Daily/Morning Reviews"').where(
        (page) => page.date && dv.date(page.date) >= weekStart && dv.date(page.date) <= weekEnd
    );
    const evenings = dv.pages('"03-Daily/Evening Reviews"').where(
        (page) => page.date && dv.date(page.date) >= weekStart && dv.date(page.date) <= weekEnd
    );
    const journals = dv.pages('"03-Daily/Journal"').where(
        (page) => page.date && dv.date(page.date) >= weekStart && dv.date(page.date) <= weekEnd
    );

    const morningMap = {};
    const eveningMap = {};
    const journalMap = {};

    mornings.forEach((page) => {
        if (page.date) morningMap[dv.date(page.date).toFormat("yyyy-MM-dd")] = page;
    });
    evenings.forEach((page) => {
        if (page.date) eveningMap[dv.date(page.date).toFormat("yyyy-MM-dd")] = page;
    });
    journals.forEach((page) => {
        if (page.date) journalMap[dv.date(page.date).toFormat("yyyy-MM-dd")] = page;
    });

    const values = { mm: [], em: [], mn: [], en: [] };
    const table = createEl("table", { cls: "mood-tracker-week-table", parent: root });
    const thead = createEl("thead", { parent: table });
    const headerRow = createEl("tr", { parent: thead });

    for (const label of ["Dia", "Humor manh\u00e3", "Energia manh\u00e3", "Humor noite", "Energia noite", "Destaque"]) {
        createEl("th", {
            text: label,
            parent: headerRow,
            cls: label === "Dia" || label === "Destaque" ? "mood-tracker-week-left" : "",
        });
    }

    const tbody = createEl("tbody", { parent: table });
    let hasRows = false;

    for (let index = 0; index < 7; index++) {
        const day = weekStart.plus({ days: index });
        const key = day.toFormat("yyyy-MM-dd");
        const morning = morningMap[key];
        const evening = eveningMap[key];
        const journal = journalMap[key];
        if (!morning && !evening && !journal) continue;

        hasRows = true;
        const mm = morning ? helpers.parseVal(morning.mood_morning, "mood") : null;
        const em = morning ? helpers.parseVal(morning.energy_morning, "energy") : null;
        const mn = evening ? helpers.parseVal(evening.mood_evening, "mood") : null;
        const en = evening ? helpers.parseVal(evening.energy_evening, "energy") : null;

        if (mm) values.mm.push(mm);
        if (em) values.em.push(em);
        if (mn) values.mn.push(mn);
        if (en) values.en.push(en);

        const row = createEl("tr", { parent: tbody });
        const dayCell = createEl("td", { parent: row, cls: "mood-tracker-week-left" });
        const target = journal || morning || evening;
        dayCell.appendChild(
            createInternalLink(target.file.path, {
                text: `${day.toFormat("dd/MM")} ${dayLabels[index]}`,
                ariaLabel: `Abrir registro ${key}`,
            })
        );

        const moodMorningCell = createEl("td", { parent: row, cls: "mood-tracker-week-center" });
        moodMorningCell.innerHTML = helpers.cell(morning?.mood_morning, "mood");
        const energyMorningCell = createEl("td", { parent: row, cls: "mood-tracker-week-center" });
        energyMorningCell.innerHTML = helpers.cell(morning?.energy_morning, "energy");
        const moodEveningCell = createEl("td", { parent: row, cls: "mood-tracker-week-center" });
        moodEveningCell.innerHTML = helpers.cell(evening?.mood_evening, "mood");
        const energyEveningCell = createEl("td", { parent: row, cls: "mood-tracker-week-center" });
        energyEveningCell.innerHTML = helpers.cell(evening?.energy_evening, "energy");

        const highlightCell = createEl("td", { parent: row, cls: "mood-tracker-week-left" });
        highlightCell.textContent = journal ? (await helpers.resolveHighlight(app, journal)) || "-" : "-";
    }

    if (!hasRows) {
        const row = createEl("tr", { parent: tbody });
        createEl("td", {
            text: "Nenhuma entrada encontrada para esta semana.",
            parent: row,
            attr: { colspan: "6" },
            cls: "mood-tracker-week-empty",
        });
        return;
    }

    const summary = createEl("tr", { parent: tbody, cls: "mood-tracker-week-summary" });
    createEl("td", { text: "M\u00e9dia", parent: summary, cls: "mood-tracker-week-left" });

    for (const [value, type] of [
        [helpers.closestEmoji(avg(values.mm), "mood"), "mood"],
        [helpers.closestEmoji(avg(values.em), "energy"), "energy"],
        [helpers.closestEmoji(avg(values.mn), "mood"), "mood"],
        [helpers.closestEmoji(avg(values.en), "energy"), "energy"],
    ]) {
        const cell = createEl("td", { parent: summary, cls: "mood-tracker-week-center" });
        cell.innerHTML = helpers.cell(value, type);
    }

    createEl("td", { parent: summary });
};

const renderMonth = async (helpers) => {
    root.classList.add("mood-tracker-month");

    const current = dv.current();
    const year = Number(current.year) || new Date().getFullYear();
    const month = Number(current.month) || new Date().getMonth() + 1;
    const monthName = monthNames[month - 1];

    const mornings = dv.pages('"03-Daily/Morning Reviews"').where((page) => {
        const date = dv.date(page.date);
        return date && date.year === year && date.month === month;
    });
    const evenings = dv.pages('"03-Daily/Evening Reviews"').where((page) => {
        const date = dv.date(page.date);
        return date && date.year === year && date.month === month;
    });
    const journals = dv.pages('"03-Daily/Journal"').where((page) => {
        const date = dv.date(page.date);
        return date && date.year === year && date.month === month;
    });

    const morningByDay = {};
    const eveningByDay = {};
    const journalByDay = {};

    mornings.forEach((page) => {
        const date = dv.date(page.date);
        if (date) morningByDay[date.day] = page;
    });
    evenings.forEach((page) => {
        const date = dv.date(page.date);
        if (date) eveningByDay[date.day] = page;
    });
    journals.forEach((page) => {
        const date = dv.date(page.date);
        if (date) journalByDay[date.day] = page;
    });

    const moodForDay = (day) => {
        const values = [];
        const morning = morningByDay[day];
        const evening = eveningByDay[day];
        const mm = morning ? helpers.parseVal(morning.mood_morning, "mood") : null;
        const mn = evening ? helpers.parseVal(evening.mood_evening, "mood") : null;
        if (mm) values.push(mm);
        if (mn) values.push(mn);
        return avg(values);
    };

    const daysInMonth = new Date(year, month, 0).getDate();
    const firstDow = new Date(year, month - 1, 1).getDay();
    const offset = firstDow === 0 ? 6 : firstDow - 1;
    const cells = [];
    for (let index = 0; index < offset; index++) cells.push(null);
    for (let day = 1; day <= daysInMonth; day++) cells.push(day);
    while (cells.length % 7 !== 0) cells.push(null);

    createEl("h2", { text: `${monthName} ${year}`, parent: root });
    createEl("div", {
        text: `${new Set([...Object.keys(morningByDay), ...Object.keys(eveningByDay)]).size} dias com registro`,
        parent: root,
        cls: "mood-tracker-subtitle",
    });

    const headerGrid = createEl("div", { cls: "mood-tracker-calendar-header", parent: root });
    weekdayLabels.forEach((label) => createEl("div", { text: label, parent: headerGrid }));

    const calendar = createEl("div", { cls: "mood-tracker-calendar-grid", parent: root });
    cells.forEach((day) => {
        if (!day) {
            createEl("div", { cls: "mood-tracker-calendar-blank", parent: calendar });
            return;
        }

        const mood = moodForDay(day);
        const card = createEl("div", { cls: "mood-tracker-calendar-cell", parent: calendar });
        card.style.background = helpers.scoreColor(mood, "mood");

        const top = createEl("div", { cls: "mood-tracker-calendar-day", parent: card });
        const journal = journalByDay[day];
        top.appendChild(
            journal
                ? createInternalLink(journal.file.path, {
                      text: String(day),
                      ariaLabel: `Abrir diario ${journal.file.name}`,
                      cls: "mood-tracker-inline-link",
                  })
                : createEl("span", { text: String(day) })
        );

        createEl("div", {
            text: helpers.closestEmoji(mood, "mood") || "\u00a0",
            parent: card,
            cls: "mood-tracker-calendar-emoji",
        });
    });

    const stats = createEl("div", { cls: "mood-tracker-stat-grid", parent: root });
    renderStatCard(stats, helpers, "Humor manh\u00e3", avg(mornings.map((page) => helpers.parseVal(page.mood_morning, "mood")).filter(Boolean)), "mood");
    renderStatCard(stats, helpers, "Energia manh\u00e3", avg(mornings.map((page) => helpers.parseVal(page.energy_morning, "energy")).filter(Boolean)), "energy");
    renderStatCard(stats, helpers, "Humor noite", avg(evenings.map((page) => helpers.parseVal(page.mood_evening, "mood")).filter(Boolean)), "mood");
    renderStatCard(stats, helpers, "Energia noite", avg(evenings.map((page) => helpers.parseVal(page.energy_evening, "energy")).filter(Boolean)), "energy");

    const isoWeeks = new Set();
    for (let day = 1; day <= daysInMonth; day++) {
        isoWeeks.add(helpers.currentWeekNumber(new Date(year, month - 1, day)));
    }

    const weekLine = createEl("div", { cls: "mood-tracker-subtitle mood-tracker-links-line", parent: root });
    weekLine.appendChild(document.createTextNode("Semanas: "));
    const sortedWeeks = Array.from(isoWeeks).sort((a, b) => a - b);
    sortedWeeks.forEach((week, index) => {
        weekLine.appendChild(
            createInternalLink(`00-Dashboard/Mood-Energy Tracker/Weekly/${year}/${String(week).padStart(2, "0")}`, {
                text: `Semana ${week}`,
                ariaLabel: `Abrir tracker semanal ${week}`,
            })
        );
        if (index < sortedWeeks.length - 1) weekLine.appendChild(document.createTextNode(" | "));
    });
};

const renderYear = async (helpers) => {
    root.classList.add("mood-tracker-year");

    const current = dv.current();
    const year = Number(current.year) || new Date().getFullYear();

    const mornings = dv.pages('"03-Daily/Morning Reviews"').where((page) => {
        const date = dv.date(page.date);
        return date && date.year === year;
    });
    const evenings = dv.pages('"03-Daily/Evening Reviews"').where((page) => {
        const date = dv.date(page.date);
        return date && date.year === year;
    });
    const journals = dv.pages('"03-Daily/Journal"').where((page) => {
        const date = dv.date(page.date);
        return date && date.year === year;
    });

    const byMonth = {};
    for (let month = 1; month <= 12; month++) {
        byMonth[month] = { moodMorning: [], energyMorning: [], moodEvening: [], energyEvening: [] };
    }

    const dayMap = {};
    const upsertDay = (key, { reviewPath = null, journalPath = null } = {}) => {
        if (!dayMap[key]) dayMap[key] = { moods: [], reviewPath: null, journalPath: null };
        if (reviewPath && !dayMap[key].reviewPath) dayMap[key].reviewPath = reviewPath;
        if (journalPath) dayMap[key].journalPath = journalPath;
    };

    mornings.forEach((page) => {
        const date = dv.date(page.date);
        const mood = helpers.parseVal(page.mood_morning, "mood");
        const energy = helpers.parseVal(page.energy_morning, "energy");
        if (mood) byMonth[date.month].moodMorning.push(mood);
        if (energy) byMonth[date.month].energyMorning.push(energy);
        const key = date.toFormat("yyyy-MM-dd");
        upsertDay(key, { reviewPath: page.file.path });
        if (mood) dayMap[key].moods.push(mood);
    });

    evenings.forEach((page) => {
        const date = dv.date(page.date);
        const mood = helpers.parseVal(page.mood_evening, "mood");
        const energy = helpers.parseVal(page.energy_evening, "energy");
        if (mood) byMonth[date.month].moodEvening.push(mood);
        if (energy) byMonth[date.month].energyEvening.push(energy);
        const key = date.toFormat("yyyy-MM-dd");
        upsertDay(key, { reviewPath: page.file.path });
        if (mood) dayMap[key].moods.push(mood);
    });

    journals.forEach((page) => {
        const date = dv.date(page.date);
        upsertDay(date.toFormat("yyyy-MM-dd"), { journalPath: page.file.path });
    });

    createEl("h2", { text: String(year), parent: root });
    createEl("div", {
        text: `${Object.keys(dayMap).length} dias com registro`,
        parent: root,
        cls: "mood-tracker-subtitle",
    });

    const monthGrid = createEl("div", { cls: "mood-tracker-month-card-grid", parent: root });
    let bestMonth = null;
    let bestScore = -Infinity;
    let worstMonth = null;
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

        const card = createEl("div", { cls: "mood-tracker-month-card", parent: monthGrid });
        card.style.background = helpers.scoreColor(moodAvg, "mood");

        const title = createEl("div", { parent: card, cls: "mood-tracker-month-card-title" });
        title.appendChild(
            createInternalLink(`00-Dashboard/Mood-Energy Tracker/Monthly/${year}/${String(month).padStart(2, "0")}`, {
                text: monthNames[month - 1],
                ariaLabel: `Abrir tracker mensal de ${monthNames[month - 1]}`,
                cls: "mood-tracker-inline-link",
            })
        );
        createEl("div", {
            text: helpers.closestEmoji(moodAvg, "mood") || "-",
            parent: card,
            cls: "mood-tracker-month-card-emoji",
        });
        createEl("div", {
            text: moodAvg == null ? "-" : moodAvg.toFixed(1),
            parent: card,
            cls: "mood-tracker-month-card-score",
        });
    }

    const stats = createEl("div", { cls: "mood-tracker-stat-grid", parent: root });
    renderStatCard(stats, helpers, "Humor manh\u00e3", avg(Object.values(byMonth).flatMap((item) => item.moodMorning)), "mood");
    renderStatCard(stats, helpers, "Energia manh\u00e3", avg(Object.values(byMonth).flatMap((item) => item.energyMorning)), "energy");
    renderStatCard(stats, helpers, "Humor noite", avg(Object.values(byMonth).flatMap((item) => item.moodEvening)), "mood");
    renderStatCard(stats, helpers, "Energia noite", avg(Object.values(byMonth).flatMap((item) => item.energyEvening)), "energy");

    const summary = createEl("div", { cls: "mood-tracker-summary-grid", parent: root });
    const best = createEl("div", { cls: "mood-tracker-summary-card", parent: summary });
    best.style.background = bestMonth ? helpers.scoreColor(bestScore, "mood") : "#2a2a2a";
    createEl("div", { text: "Melhor m\u00eas", parent: best, cls: "mood-tracker-stat-label" });
    createEl("div", { text: bestMonth ? monthNames[bestMonth - 1] : "-", parent: best, cls: "mood-tracker-summary-name" });
    createEl("div", { text: bestMonth ? bestScore.toFixed(1) : "-", parent: best, cls: "mood-tracker-summary-score" });

    const worst = createEl("div", { cls: "mood-tracker-summary-card", parent: summary });
    worst.style.background = worstMonth ? helpers.scoreColor(worstScore, "mood") : "#2a2a2a";
    createEl("div", { text: "M\u00eas mais dif\u00edcil", parent: worst, cls: "mood-tracker-stat-label" });
    createEl("div", { text: worstMonth ? monthNames[worstMonth - 1] : "-", parent: worst, cls: "mood-tracker-summary-name" });
    createEl("div", { text: worstMonth ? worstScore.toFixed(1) : "-", parent: worst, cls: "mood-tracker-summary-score" });

    createEl("h3", { text: "Heatmap do Ano", parent: root, cls: "mood-tracker-section-title" });

    const start = new Date(year, 0, 1);
    const end = new Date(year, 11, 31);
    const offset = (start.getDay() + 6) % 7;
    const cells = [];
    for (let index = 0; index < offset; index++) cells.push(null);

    for (let cursor = new Date(start); cursor <= end; cursor.setDate(cursor.getDate() + 1)) {
        const key = `${cursor.getFullYear()}-${String(cursor.getMonth() + 1).padStart(2, "0")}-${String(cursor.getDate()).padStart(2, "0")}`;
        const entry = dayMap[key];
        cells.push({
            key,
            score: avg(entry?.moods),
            path: entry?.journalPath || entry?.reviewPath || null,
        });
    }
    while (cells.length % 7 !== 0) cells.push(null);

    const columns = Math.ceil(cells.length / 7);
    const labels = createEl("div", { cls: "mood-tracker-month-labels", parent: root });
    labels.style.gridTemplateColumns = `repeat(${columns}, 15px)`;

    for (let month = 0; month < 12; month++) {
        const first = new Date(year, month, 1);
        const index = offset + Math.floor((first - start) / 86400000);
        const label = createEl("div", {
            text: monthNames[month].slice(0, 3),
            parent: labels,
            cls: "mood-tracker-month-label",
        });
        label.style.gridColumn = String(Math.floor(index / 7) + 1);
    }

    const heatmap = createEl("div", { cls: "mood-tracker-heatmap", parent: root });
    for (let index = 0; index < cells.length; index += 7) {
        const column = createEl("div", { cls: "mood-tracker-heatmap-column", parent: heatmap });
        cells.slice(index, index + 7).forEach((cell) => {
            if (!cell) {
                createEl("div", { cls: "mood-tracker-heatmap-empty", parent: column });
                return;
            }

            const square = createEl("div", {
                cls: "mood-tracker-heatmap-square",
                parent: cell.path ? undefined : column,
                attr: {
                    title: cell.score == null ? cell.key : `${cell.key} m\u00e9dia do dia ${cell.score.toFixed(1)}`,
                },
            });
            square.style.background = cell.score == null ? "var(--background-secondary)" : helpers.scoreColor(cell.score, "mood");

            if (cell.path) {
                const link = createInternalLink(cell.path, {
                    parent: column,
                    ariaLabel: `Abrir registro ${cell.key}`,
                    cls: "mood-tracker-heatmap-link",
                });
                link.appendChild(square);
            }
        });
    }
};

const helpers = await loadDashboardHelpers();
const mode = input?.mode ?? "year";

if (mode === "month") {
    await renderMonth(helpers);
} else if (mode === "week") {
    await renderWeek(helpers);
} else if (mode === "year") {
    await renderYear(helpers);
} else {
    dv.paragraph(`Modo de tracker desconhecido: ${mode}`);
}
