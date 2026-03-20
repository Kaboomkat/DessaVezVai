<%*
const date = tp.file.title.replace(" Evening Review", "");
const dayNames = ["Domingo", "Segunda-feira", "Terca-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sabado"];
const monthNames = ["Janeiro", "Fevereiro", "Marco", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
const d = new Date(date + "T12:00:00");
const dayName = dayNames[d.getDay()];
const monthName = monthNames[d.getMonth()];
const dayNum = d.getDate();
const year = d.getFullYear();
tR += `---
title: "${tp.file.title}"
type: review
frequency: evening
date: ${date}
created: ${date}
mood_evening:
energy_evening:
tags:
  - review/evening
---

# Revisao da Noite - ${dayName}, ${dayNum} de ${monthName} de ${year}

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
    moodField: "mood_evening",
    energyField: "energy_evening",
    currentMood: dv.current().mood_evening,
    currentEnergy: dv.current().energy_evening
});
\`\`\`

---

## 1. O que consegui fazer hoje?

-

---

## 2. Escrita feita

**Palavras escritas:**

**Projeto trabalhado:**

**Como foi:**

---

## 3. O que esta na minha mente?
*(Capture aqui - vai para a caixa de entrada depois)*

-

---

## 4. Gratidao do dia

1.

---

## 5. Prioridade de amanha

-

---

## Navegacao

[[03-Daily/Journal/${date}|<- Diario do dia]]

\`\`\`button
name Revisao da Manha ->
type link
action obsidian://quickadd?vault=Ebook%20Claude&choice=Morning%20Review&value-review_date=${date}
\`\`\``;
%>
