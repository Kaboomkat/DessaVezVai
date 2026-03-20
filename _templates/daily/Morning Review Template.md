<%*
const date = tp.file.title.replace(" Morning Review", "");
const dayNames = ["Domingo", "Segunda-feira", "Terca-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sabado"];
const monthNames = ["Janeiro", "Fevereiro", "Marco", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
const d = new Date(date + "T12:00:00");
const dayName = dayNames[d.getDay()];
const monthName = monthNames[d.getMonth()];
const dayNum = d.getDate();
const year = d.getFullYear();

// Se o frontmatter ja veio preenchido pelo fluxo de criacao, evita abrir o picker duas vezes.
const alreadyFilled = String(tp.frontmatter?.mood_morning ?? "").trim() !== "";

let mood = tp.frontmatter?.mood_morning ?? "";
let energy = tp.frontmatter?.energy_morning ?? "";

if (!alreadyFilled) {
    mood = await tp.system.suggester(
        ["😢  Muito mal", "😕  Mal", "😐  Neutro", "🙂  Bem", "😄  Otimo"],
        ["😢", "😕", "😐", "🙂", "😄"],
        false,
        "Como esta seu humor esta manha?"
    ) ?? "";
    energy = await tp.system.suggester(
        ["💤  Sem energia", "😪  Cansado", "😐  Neutro", "🔥  Disposto", "⚡  Energizado"],
        ["💤", "😪", "😐", "🔥", "⚡"],
        false,
        "Qual e seu nivel de energia?"
    ) ?? "";
}

tR += `---
title: "${tp.file.title}"
type: review
frequency: morning
date: ${date}
created: ${date}
mood_morning: ${mood}
energy_morning: ${energy}
tags:
  - review/morning
---

# Revisao da Manha - ${dayName}, ${dayNum} de ${monthName} de ${year}

---

\`\`\`dataviewjs
const { ReviewControls } = await cJS();
const controls = new ReviewControls(app);
await controls.renderReviewPicker(dv, {
    filePath: dv.current().file.path,
    moodField: "mood_morning",
    energyField: "energy_morning",
    currentMood: dv.current().mood_morning,
    currentEnergy: dv.current().energy_morning
});
\`\`\`

---

## 1. Calendario
O que esta agendado para hoje?


---

## 2. Top 3 Prioridades

- [ ]
- [ ]
- [ ]

---

## 3. Intencao de Escrita

**Projeto:**

**Meta:** ___ palavras / ___ minutos

**Foco:**

---

## 4. Intencao do Dia
Com qual energia / intencao quero atravessar hoje?


---

## Navegacao

[[03-Daily/Journal/${date}|<- Diario do dia]] | [[03-Daily/Evening Reviews/${date} Evening Review|Revisao da Noite ->]]`;
%>
