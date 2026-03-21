---
title: "{{date:YYYY-MM-DD}}"
type: daily
date: {{date:YYYY-MM-DD}}
day: {{date:dddd}}
highlight:
created: {{date}}
tags:
  - daily
  - journal
---

<%*
const displayDayNames = ["domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"];
const displayMonthNames = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
const currentDate = tp.date.now("YYYY-MM-DD");
const displayDate = new Date(`${currentDate}T12:00:00`);
const formattedDate = `${displayDayNames[displayDate.getDay()]}, ${displayMonthNames[displayDate.getMonth()]} ${displayDate.getDate()}, ${displayDate.getFullYear()}`;
const dailyQuotes = [
  '"Comece a escrever, não importa o que. A água não flui até que a torneira seja aberta." - Louis L\'Amour',
  '"O momento mais assustador é sempre logo antes de começar." - Stephen King',
  '"Você sempre pode editar uma página ruim. Você não pode editar uma página em branco." - Jodi Picoult',
  '"Um escritor é alguém para quem escrever é mais difícil do que para outras pessoas." - Thomas Mann',
  '"Comece onde você está. Use o que você tem. Faça o que você pode." - Arthur Ashe',
  '"O segredo de avançar é começar." - Mark Twain',
  '"Escreva o que não deve ser esquecido." - Isabel Allende',
  '"Ou escreva algo que valha a pena ler, ou faça algo que valha a pena escrever." - Benjamin Franklin',
  '"Se você quer ser escritor, deve fazer duas coisas acima de todas as outras: ler muito e escrever muito." - Stephen King',
  '"Não há maior agonia do que carregar uma história não contada dentro de você." - Maya Angelou'
];
const now = new Date();
const start = new Date(now.getFullYear(), 0, 0);
const dayOfYear = Math.floor((now - start) / 86400000);
const q = dailyQuotes[dayOfYear % dailyQuotes.length];
tR += `# ${formattedDate}\n\n> [!quote]\n> *${q}*`;
%>

---

## Estado do Dia

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
const dayKey = dv.date(dv.current().date).toFormat("yyyy-MM-dd");
const morning = dv.pages('"03-Daily/Morning Reviews"').find(p => p.date && dv.date(p.date).toFormat("yyyy-MM-dd") === dayKey);
const evening = dv.pages('"03-Daily/Evening Reviews"').find(p => p.date && dv.date(p.date).toFormat("yyyy-MM-dd") === dayKey);
const moodMorning = morning?.mood_morning ?? "-";
const energyMorning = morning?.energy_morning ?? "-";
const moodEvening = evening?.mood_evening ?? "-";
const energyEvening = evening?.energy_evening ?? "-";

dv.container.innerHTML = `
<table style="width:100%;border-collapse:separate;border-spacing:0 4px;">
    <thead>
        <tr>
            <th style="text-align:left;padding:4px 8px;color:#888"></th>
            <th style="padding:4px 12px;text-align:center;color:#888">Manhã</th>
            <th style="padding:4px 12px;text-align:center;color:#888">Noite</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td style="padding:4px 8px">Humor</td>
            ${h.cell(moodMorning, "mood")}
            ${h.cell(moodEvening, "mood")}
        </tr>
        <tr>
            <td style="padding:4px 8px">Energia</td>
            ${h.cell(energyMorning, "energy")}
            ${h.cell(energyEvening, "energy")}
        </tr>
    </tbody>
</table>`;
```

*(Preenchido nas revisões do dia.)*

---

## Tarefas do Dia

### Deve Fazer
- [ ] 

### Deveria Fazer
- [ ] 

### Poderia Fazer
- [ ] 

---

## Notas e Pensamentos



---

## Destaque do Dia


---

## Reviews do Dia

```button
name Revisão da Manhã
type link
action obsidian://quickadd?vault=Ebook%20Claude&choice=Morning%20Review&value-review_date=<% tp.file.title %>
templater true
```

```button
name Revisão da Noite
type link
action obsidian://quickadd?vault=Ebook%20Claude&choice=Evening%20Review&value-review_date=<% tp.file.title %>
templater true
```

```button
name Revisão Semanal
type command
action Periodic Notes: Open weekly note
```

Use os botões acima para criar ou reabrir as revisões da data desta nota.

---

## Navegação

```button
name <- Ontem
type command
action Periodic Notes: Open previous daily note
```

```button
name Amanhã ->
type command
action Periodic Notes: Open next daily note
```

[[Daily Dashboard|Daily Dashboard]] | [[03-Daily/Index de Diario|Índice de Diário]]
