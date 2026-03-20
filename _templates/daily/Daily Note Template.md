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
  '"Comece a escrever, não importa o quê. A água não flui até que a torneira seja aberta." — Louis L\'Amour',
  '"O momento mais assustador é sempre logo antes de começar." — Stephen King',
  '"Você sempre pode editar uma página ruim. Você não pode editar uma página em branco." — Jodi Picoult',
  '"Um escritor é alguém para quem escrever é mais difícil do que para outras pessoas." — Thomas Mann',
  '"Comece onde você está. Use o que você tem. Faça o que você pode." — Arthur Ashe',
  '"O segredo de avançar é começar." — Mark Twain',
  '"Escreva o que não deve ser esquecido." — Isabel Allende',
  '"Ou escreva algo que valha a pena ler, ou faça algo que valha a pena escrever." — Benjamin Franklin',
  '"Se você quer ser escritor, deve fazer duas coisas acima de todas as outras: ler muito e escrever muito." — Stephen King',
  '"Não há maior agonia do que carregar uma história não contada dentro de você." — Maya Angelou',
  '"Você não começa escrevendo boas histórias. Você começa escrevendo lixo e achando que é bom, e gradualmente vai melhorando." — Octavia E. Butler',
  '"O primeiro rascunho é apenas você contando a história para si mesmo." — Terry Pratchett',
  '"Escrevo para descobrir o que sei." — Flannery O\'Connor',
  '"A imaginação é o começo da criação." — George Bernard Shaw',
  '"Feche a porta. Escreva sem ninguém olhando por cima do seu ombro." — Barbara Kingsolver',
  '"Para sobreviver, você deve contar histórias." — Umberto Eco',
  '"Escrevemos para saborear a vida duas vezes, no momento e em retrospecto." — Anaïs Nin',
  '"Preencha seu papel com as respirações do seu coração." — William Wordsworth',
  '"O desejo de escrever cresce com a escrita." — Erasmus',
  '"Criatividade é a inteligência se divertindo." — Albert Einstein',
  '"Posso sacudir tudo enquanto escrevo; minhas tristezas desaparecem, minha coragem renasce." — Anne Frank',
  '"As palavras são uma lente para focar a mente." — Ayn Rand',
  '"Sem lágrimas no escritor, sem lágrimas no leitor." — Robert Frost',
  '"Quase toda boa escrita começa com esforços terríveis." — Anne Lamott',
  '"Escreva com força e clareza sobre o que dói." — Ernest Hemingway',
  '"Leia, leia, leia. Leia tudo." — William Faulkner',
  '"Um dia vou encontrar as palavras certas, e serão simples." — Jack Kerouac',
  '"O papel do escritor não é dizer o que todos podemos dizer, mas o que somos incapazes de dizer." — Anaïs Nin',
  '"Amanhã pode ser o inferno, mas hoje foi um bom dia de escrita, e nos bons dias de escrita nada mais importa." — Neil Gaiman',
  '"Não intelectualizo demais o processo. Tento manter simples: conte a maldita história." — Tom Clancy',
];
const now = new Date();
const start = new Date(now.getFullYear(), 0, 0);
const dayOfYear = Math.floor((now - start) / 86400000);
const q = dailyQuotes[dayOfYear % dailyQuotes.length];
tR += `> [!quote]\n> *${q}*`;
%>

---

## 📊 Estado do Dia

```dataviewjs
const { DashboardHelpers } = await cJS();
const h = new DashboardHelpers();
const _d = dv.date(dv.current().date).toFormat("yyyy-MM-dd");
const _mp = dv.pages('"03-Daily/Morning Reviews"').find(p => p.date && dv.date(p.date).toFormat("yyyy-MM-dd") === _d);
const _ep = dv.pages('"03-Daily/Evening Reviews"').find(p => p.date && dv.date(p.date).toFormat("yyyy-MM-dd") === _d);
const _mm = _mp?.mood_morning    ?? "—";
const _em = _mp?.energy_morning  ?? "—";
const _mn = _ep?.mood_evening    ?? "—";
const _en = _ep?.energy_evening  ?? "—";
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
            <td style="padding:4px 8px">😌 Humor</td>
            ${h.cell(_mm, 'mood')}
            ${h.cell(_mn, 'mood')}
        </tr>
        <tr>
            <td style="padding:4px 8px">⚡ Energia</td>
            ${h.cell(_em, 'energy')}
            ${h.cell(_en, 'energy')}
        </tr>
    </tbody>
</table>`;
```

*(Preenchido nos Reviews — ver links abaixo)*

---

## 📋 Tarefas do Dia

### Deve Fazer
- [ ]

### Deveria Fazer
- [ ]

### Poderia Fazer
- [ ]

---

## 📝 Notas & Pensamentos



---

## ✨ Destaque do Dia
`= this.highlight`

---

## 🔗 Navegação

[[{{date-1d:YYYY-MM-DD}}|← Ontem]] | [[{{date+1d:YYYY-MM-DD}}|Amanhã →]]

**Reviews do dia:**
- [[03-Daily/Morning Reviews/{{date:YYYY-MM-DD}} Morning Review|☀️ Revisão da Manhã]]
- [[03-Daily/Evening Reviews/{{date:YYYY-MM-DD}} Evening Review|🌙 Revisão da Noite]]
- [[03-Daily/Reviews/Weekly Review|🔄 Revisão Semanal]]

[[Daily Dashboard|⬆ Daily Dashboard]]
