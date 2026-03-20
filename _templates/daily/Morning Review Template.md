<%*
const date = tp.file.title.replace(" Morning Review", "");
const dayNames = ["Domingo","Segunda-feira","Terça-feira","Quarta-feira","Quinta-feira","Sexta-feira","Sábado"];
const monthNames = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];
const d = new Date(date + "T12:00:00");
const dayName  = dayNames[d.getDay()];
const monthName = monthNames[d.getMonth()];
const dayNum   = d.getDate();
const year     = d.getFullYear();

// Guard: se QuickAdd já aplicou o template antes do Templater folder trigger,
// o frontmatter já tem valor — reutilizamos para não exibir o picker duas vezes.
const alreadyFilled = String(tp.frontmatter?.mood_morning ?? "").trim() !== "";

let mood   = tp.frontmatter?.mood_morning   ?? "";
let energy = tp.frontmatter?.energy_morning ?? "";

if (!alreadyFilled) {
    mood = await tp.system.suggester(
        ["😢  Muito mal", "😕  Mal", "😐  Neutro", "🙂  Bem", "😄  Ótimo"],
        ["😢", "😕", "😐", "🙂", "😄"],
        false,
        "☀️ Como está seu humor esta manhã?"
    ) ?? "";
    energy = await tp.system.suggester(
        ["💤  Sem energia", "😪  Cansado", "😐  Neutro", "🔥  Disposto", "⚡  Energizado"],
        ["💤", "😪", "😐", "🔥", "⚡"],
        false,
        "⚡ Qual é seu nível de energia?"
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

# ☀️ Revisão da Manhã — ${dayName}, ${dayNum} de ${monthName} de ${year}

---

```dataviewjs
const { ReviewControls } = await cJS();
const controls = new ReviewControls(app);
await controls.renderReviewPicker(dv, {
    filePath: dv.current().file.path,
    moodField: "mood_morning",
    energyField: "energy_morning",
    currentMood: dv.current().mood_morning,
    currentEnergy: dv.current().energy_morning
});
```

---

## 1. 📅 Calendário
O que está agendado para hoje?


---

## 2. 🎯 Top 3 Prioridades

- [ ]
- [ ]
- [ ]

---

## 3. ✍️ Intenção de Escrita

**Projeto:**

**Meta:** ___ palavras / ___ minutos

**Foco:**

---

## 4. 🧠 Intenção do Dia
Com qual energia / intenção quero atravessar hoje?


---

## 🔗 Navegação

[[03-Daily/Journal/${date}|← Diário do dia]] | [[03-Daily/Evening Reviews/${date} Evening Review|🌙 Revisão da Noite →]]`;
%>
