<%*
const date = tp.file.title.replace(" Evening Review", "");
const dayNames = ["Domingo","Segunda-feira","Terça-feira","Quarta-feira","Quinta-feira","Sexta-feira","Sábado"];
const monthNames = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];
const d = new Date(date + "T12:00:00");
const dayName   = dayNames[d.getDay()];
const monthName = monthNames[d.getMonth()];
const dayNum    = d.getDate();
const year      = d.getFullYear();

// Guard: se QuickAdd já aplicou o template antes do Templater folder trigger,
// o frontmatter já tem valor — reutilizamos para não exibir o picker duas vezes.
const alreadyFilled = String(tp.frontmatter?.mood_evening ?? "").trim() !== "";

let mood   = tp.frontmatter?.mood_evening   ?? "";
let energy = tp.frontmatter?.energy_evening ?? "";

if (!alreadyFilled) {
    mood = await tp.system.suggester(
        ["😢  Muito mal", "😕  Mal", "😐  Neutro", "🙂  Bem", "😄  Ótimo"],
        ["😢", "😕", "😐", "🙂", "😄"],
        false,
        "🌙 Como foi seu humor hoje?"
    ) ?? "";
    energy = await tp.system.suggester(
        ["💤  Sem energia", "😪  Cansado", "😐  Neutro", "🔥  Disposto", "⚡  Energizado"],
        ["💤", "😪", "😐", "🔥", "⚡"],
        false,
        "⚡ Como estava sua energia hoje?"
    ) ?? "";
}

tR += `---
title: "${tp.file.title}"
type: review
frequency: evening
date: ${date}
created: ${date}
mood_evening: ${mood}
energy_evening: ${energy}
tags:
  - review/evening
---

# 🌙 Revisão da Noite — ${dayName}, ${dayNum} de ${monthName} de ${year}

---

```dataviewjs
const { ReviewControls } = await cJS();
const controls = new ReviewControls(app);
await controls.renderReviewPicker(dv, {
    filePath: dv.current().file.path,
    moodField: "mood_evening",
    energyField: "energy_evening",
    currentMood: dv.current().mood_evening,
    currentEnergy: dv.current().energy_evening
});
```

---

## 1. ✅ O que consegui fazer hoje?

-

---

## 2. ✍️ Escrita feita

**Palavras escritas:**

**Projeto trabalhado:**

**Como foi:**

---

## 3. 💭 O que está na minha mente?
*(Capture aqui — vai para a caixa de entrada depois)*

-

---

## 4. 🙏 Gratidão do dia

1.

---

## 5. 🔮 Prioridade de amanhã

-

---

## 🔗 Navegação

[[03-Daily/Journal/${date}|← Diário do dia]] | [[03-Daily/Morning Reviews/${date} Morning Review|☀️ Revisão da Manhã →]]`;
%>
