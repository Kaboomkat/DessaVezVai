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

# {{date:dddd, MMMM D, YYYY}}

<%*
const dailyQuotes = [
  '"Comece a escrever, nao importa o que. A agua nao flui ate que a torneira seja aberta." - Louis L\'Amour',
  '"O momento mais assustador e sempre logo antes de comecar." - Stephen King',
  '"Voce sempre pode editar uma pagina ruim. Voce nao pode editar uma pagina em branco." - Jodi Picoult',
  '"Um escritor e alguem para quem escrever e mais dificil do que para outras pessoas." - Thomas Mann',
  '"Comece onde voce esta. Use o que voce tem. Faca o que voce pode." - Arthur Ashe',
  '"O segredo de avancar e comecar." - Mark Twain',
  '"Escreva o que nao deve ser esquecido." - Isabel Allende',
  '"Ou escreva algo que valha a pena ler, ou faca algo que valha a pena escrever." - Benjamin Franklin',
  '"Se voce quer ser escritor, deve fazer duas coisas acima de todas as outras: ler muito e escrever muito." - Stephen King',
  '"Nao ha maior agonia do que carregar uma historia nao contada dentro de voce." - Maya Angelou'
];
const now = new Date();
const start = new Date(now.getFullYear(), 0, 0);
const dayOfYear = Math.floor((now - start) / 86400000);
const q = dailyQuotes[dayOfYear % dailyQuotes.length];
tR += `> [!quote]\n> *${q}*`;
%>

---

## Estado do Dia

```dataviewjs
const { DashboardHelpers: h } = await cJS();
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
            <th style="padding:4px 12px;text-align:center;color:#888">Manha</th>
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

*(Preenchido nos reviews do dia.)*

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
`= this.highlight`

---

## Reviews do Dia

```button
name Revisao da Manha
type link
action obsidian://quickadd?vault=Ebook%20Claude&choice=Morning%20Review&value-review_date=<% tp.file.title %>
templater true
```

```button
name Revisao da Noite
type link
action obsidian://quickadd?vault=Ebook%20Claude&choice=Evening%20Review&value-review_date=<% tp.file.title %>
templater true
```

```button
name Revisao Semanal
type command
action Periodic Notes: Open weekly note
```

- [[03-Daily/Morning Reviews/<% tp.file.title %> Morning Review|Abrir review da manha]]
- [[03-Daily/Evening Reviews/<% tp.file.title %> Evening Review|Abrir review da noite]]
- [[03-Daily/Reviews/Weekly Review|Abrir review semanal]]

---

## Navegacao

[[{{date-1d:YYYY-MM-DD}}|<- Ontem]] | [[{{date+1d:YYYY-MM-DD}}|Amanha ->]]

[[Daily Dashboard|Daily Dashboard]]
