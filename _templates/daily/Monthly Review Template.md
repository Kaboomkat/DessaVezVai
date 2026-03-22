---
title: "{{date:YYYY-MM}} Revisão"
type: review
frequency: monthly
month: {{date:MMMM YYYY}}
created: {{date:YYYY-MM-DD}}
tags:
  - review/monthly
---

# {{date:MMMM YYYY}} — Revisão Mensal

```dataviewjs
const monthlyQuotes = [
  "\"Na profundeza do inverno, aprendi finalmente que dentro de mim havia um verão invencível.\" — Albert Camus",
  "\"A vida só pode ser compreendida olhando para trás; mas só pode ser vivida olhando para frente.\" — Søren Kierkegaard",
  "\"O que está atrás de nós e o que está à nossa frente são questões pequenas comparadas ao que está dentro de nós.\" — Ralph Waldo Emerson",
  "\"A única jornada impossível é aquela que você nunca começa.\" — Tony Robbins",
  "\"Daqui a vinte anos você se arrependerá mais das coisas que não fez do que das que fez.\" — Mark Twain",
  "\"Sempre parece impossível até que seja feito.\" — Nelson Mandela",
  "\"Crescimento é a única evidência de vida.\" — John Henry Newman",
  "\"Conhecer a si mesmo é o começo de toda sabedoria.\" — Aristóteles",
  "\"Cada mês é uma página na história da sua vida. Escreva bem.\" — Anônimo",
  "\"Nunca é tarde demais para definir uma nova meta ou sonhar um novo sonho.\" — C. S. Lewis",
  "\"Daqui a um ano você vai querer ter começado hoje.\" — Karen Lamb",
  "\"O segredo da mudança é focar toda a sua energia não em combater o velho, mas em construir o novo.\" — Sócrates"
];

const monthMatch = String(dv.current().file.name ?? "{{date:YYYY-MM}}").match(/(\d{4})-(\d{2})/);
const monthIndex = monthMatch ? Number(monthMatch[2]) - 1 : 0;
const quote = monthlyQuotes[((monthIndex % monthlyQuotes.length) + monthlyQuotes.length) % monthlyQuotes.length];

const infoLead = dv.el("p", "Reflexão Mensal");
infoLead.style.fontWeight = "600";
const quoteBlock = dv.el("blockquote", "");
quoteBlock.innerHTML = `<p><em>${quote}</em></p>`;
```

---

## 📊 Visão Geral do Mês

### ✍️ Estatísticas de Escrita

**Total de palavras escritas:**

**Projetos trabalhados:**
-

**Progresso dos manuscritos:**

| Projeto | Palavras no início | Palavras no fim | Adicionadas |
|---------|-------------------|-----------------|-------------|
| | | | |

### ✅ Tarefas Concluídas

```dataview
LIST
FROM "04-Tasks"
WHERE completed_date AND dateformat(date(completed_date), "yyyy-MM") = "{{date:YYYY-MM}}"
LIMIT 20
```

### 🎯 Projetos Concluídos

-

---

## 🏆 Vitórias do Mês

1.
2.
3.

---

## 🎓 O que Aprendi

### Sobre Escrita


### Sobre Produtividade


### Sobre Mim Mesmo


---

## 😤 Desafios e Dificuldades

-

**Como lidei com eles:**


**O que faria diferente:**


---

## 📖 Livros / Artigos / Mídia

**Lido:**
-

**Assistido:**
-

**Principais aprendizados:**
-

---

## 🎯 Revisão de Metas

### Metas que Defini

| Meta | Status | Observações |
|------|--------|-------------|
| | | |

### Vivi de acordo com meus valores?

-

---

## 🔮 Próximo Mês

### Áreas de Foco

1.
2.
3.

### Metas de Escrita

**Projeto principal:**

**Meta de palavras:**

**Marcos específicos:**
-

### Prioridades Principais

1.
2.
3.

### O que Começar / Parar / Continuar

**Começar:**
-

**Parar:**
-

**Continuar:**
-

---

## 📝 Notas Adicionais


---

[[Daily Dashboard|← Daily Dashboard]]
