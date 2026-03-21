<%*
const date = tp.file.title.replace(" Morning Review", "");
const dayNames = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
const d = new Date(date + "T12:00:00");
const dayName = dayNames[d.getDay()];
const monthName = monthNames[d.getMonth()];
const dayNum = d.getDate();
const year = d.getFullYear();
tR += `---
title: "${tp.file.title}"
type: review
frequency: morning
date: ${date}
created: ${date}
mood_morning:
energy_morning:
tags:
  - review/morning
---

# Revisão da Manhã - ${dayName}, ${dayNum} de ${monthName} de ${year}

---

\`\`\`dataviewjs
const loadReviewControls = async () => {
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
            if (modules?.ReviewControls) return modules.ReviewControls;
        } catch (error) {
            console.warn("CustomJS ReviewControls unavailable", error);
        }
    }

    const file = app.vault.getAbstractFileByPath("_scripts/ReviewControls.js");
    if (!file) throw new Error("ReviewControls.js missing from _scripts");
    const source = await app.vault.cachedRead(file);
    const ReviewControlsClass = new Function(\`\${source}; return ReviewControls;\`)();
    return new ReviewControlsClass(app);
};

const controls = await loadReviewControls();
await controls.renderReviewPicker(dv, {
    filePath: dv.current().file.path,
    moodField: "mood_morning",
    energyField: "energy_morning",
    currentMood: dv.current().mood_morning,
    currentEnergy: dv.current().energy_morning
});
\`\`\`

---

## 1. Calendário
O que está agendado para hoje?

---

## 2. Top 3 Prioridades

- [ ]
- [ ]
- [ ]

---

## 3. Intenção de Escrita

**Projeto:**

**Meta:** ___ palavras / ___ minutos

**Foco:**

---

## 4. Intenção do Dia
Com qual energia / intenção quero atravessar hoje?

---

## Navegação

[[03-Daily/Journal/${date}|<- Diário do dia]]

\`\`\`button
name Revisão da Noite ->
type link
action obsidian://quickadd?vault=Ebook%20Claude&choice=Evening%20Review&value-review_date=${date}
\`\`\``;
%>
