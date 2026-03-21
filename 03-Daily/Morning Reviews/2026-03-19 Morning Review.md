---
title: "2026-03-19 Morning Review"
type: review
frequency: morning
date: 2026-03-19
created: 2026-03-19
mood_morning: 😕
energy_morning: 😐
tags:
  - review/morning
---

# Revisão da Manhã - Quinta-feira, 19 de Março de 2026

---

```dataviewjs
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
    const ReviewControlsClass = new Function(`${source}; return ReviewControls;`)();
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
```

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

[[03-Daily/Journal/2026-03-19|<- Diário do dia]] | [[03-Daily/Evening Reviews/2026-03-19 Evening Review|Revisão da Noite ->]]
