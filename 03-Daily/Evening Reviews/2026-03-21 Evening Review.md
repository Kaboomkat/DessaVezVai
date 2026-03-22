---
title: "2026-03-21 Evening Review"
type: review
frequency: evening
date: 2026-03-21
created: 2026-03-21
mood_evening:
energy_evening:
tags:
  - review/evening
---

# Revisão da Noite - Sábado, 21 de Março de 2026

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
    moodField: "mood_evening",
    energyField: "energy_evening",
    currentMood: dv.current().mood_evening,
    currentEnergy: dv.current().energy_evening
});
```

---

## 1. O que consegui fazer hoje?

-

---

## 2. Escrita feita

**Palavras escritas:**

**Projeto trabalhado:**

**Como foi:**

---

## 3. O que está na minha mente?
*(Capture aqui: vai para a caixa de entrada depois.)*

-

---

## 4. Gratidão do dia

1.

---

## 5. Prioridade de amanhã

-

---

## Navegação

[[03-Daily/Journal/2026-03-21|<- Diário do dia]]

```button
name Revisão da Manhã ->
type link
action obsidian://quickadd?vault=Ebook%20Claude&choice=Morning%20Review&value-review_date=2026-03-21
```
