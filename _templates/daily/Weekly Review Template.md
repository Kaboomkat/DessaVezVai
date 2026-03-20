---
title: "{{date:YYYY-[W]ww}} Revisão"
type: review
frequency: weekly
week: "{{date:YYYY-[W]ww}}"
week_start: "{{date:YYYY-MM-DD}}"
created: {{date}}
tags:
  - review/weekly
---

# 🔄 Revisão Semanal — {{date:YYYY-[W]ww}}

<%*
const weeklyQuotes = [
  '"A Revisão Semanal é o momento de reunir e processar tudo, revisar seu sistema, atualizar suas listas e ficar limpo, claro, atual e completo." — David Allen',
  '"Não basta estar ocupado. A questão é: com o quê estamos ocupados?" — Henry David Thoreau',
  '"A chave não é priorizar o que está na sua agenda, mas agendar suas prioridades." — Stephen Covey',
  '"Planos não são nada; planejar é tudo." — Dwight D. Eisenhower',
  '"O que é medido é gerenciado." — Peter Drucker',
  '"Dê-me seis horas para cortar uma árvore e passarei as primeiras quatro afiando o machado." — Abraham Lincoln',
  '"A rotina, em um homem inteligente, é sinal de ambição." — W. H. Auden',
  '"Reflita sobre suas bênçãos presentes, das quais todo homem tem muitas; não sobre seus infortúnios passados, dos quais todos têm alguns." — Charles Dickens',
  '"A vida não examinada não vale a pena ser vivida." — Sócrates',
  '"Revise suas metas duas vezes por dia para manter o foco em alcançá-las." — Les Brown',
  '"Sem reflexão, seguimos cegamente nosso caminho." — Margaret J. Wheatley',
  '"Uma semana não revisada é uma semana semi-vivida." — Anônimo',
  '"A ação expressa prioridades." — Mahatma Gandhi',
  '"A produtividade nunca é um acidente. É sempre o resultado de um compromisso com a excelência, planejamento inteligente e esforço focado." — Paul J. Meyer',
  '"Não espere; o momento certo nunca chegará." — Napoleon Hill',
  '"Sua mente serve para ter ideias, não para armazená-las." — David Allen',
  '"Foque em ser produtivo, não em estar ocupado." — Tim Ferriss',
  '"O sucesso é a soma de pequenos esforços, repetidos dia após dia." — Robert Collier',
  '"A disciplina é a ponte entre metas e realizações." — Jim Rohn',
  '"A única maneira de fazer um grande trabalho é amar o que você faz." — Steve Jobs',
  '"Não conte os dias, faça os dias contarem." — Muhammad Ali',
  '"Para onde vai sua atenção, vai seu tempo." — Idowu Koyenikan',
  '"O tempo é o que mais queremos, mas o que pior usamos." — William Penn',
  '"Comece com o fim em mente." — Stephen Covey',
  '"Amadores sentam e esperam pela inspiração; o resto de nós simplesmente se levanta e vai trabalhar." — Stephen King',
  '"Simplicidade se resume a duas etapas: identificar o essencial, eliminar o resto." — Leo Babauta',
  '"Seu futuro é criado pelo que você faz hoje, não amanhã." — Robert Kiyosaki',
  '"Feito é melhor que perfeito." — Sheryl Sandberg',
  '"Somos o que repetidamente fazemos. A excelência, portanto, não é um ato, mas um hábito." — Aristóteles',
  '"Só adie para amanhã o que você está disposto a morrer tendo deixado por fazer." — Pablo Picasso',
  '"A maneira de começar é parar de falar e começar a fazer." — Walt Disney',
  '"Você nunca encontrará tempo para nada. Se quiser tempo, você deve criá-lo." — Charles Buxton',
  '"Eficiência é fazer as coisas certo; eficácia é fazer as coisas certas." — Peter Drucker',
  '"Até que possamos gerenciar o tempo, não podemos gerenciar mais nada." — Peter Drucker',
  '"A vida é o que acontece quando você está ocupado fazendo outros planos." — John Lennon',
  '"Definir metas é o primeiro passo para transformar o invisível em visível." — Tony Robbins',
  '"O tempo perdido nunca é encontrado novamente." — Benjamin Franklin',
  '"O melhor momento para plantar uma árvore foi há 20 anos. O segundo melhor momento é agora." — Provérbio Chinês',
  '"A inação gera dúvida e medo. A ação gera confiança e coragem." — Dale Carnegie',
];
const now = new Date();
const startOfYear = new Date(now.getFullYear(), 0, 1);
const weekNum = Math.ceil(((now - startOfYear) / 86400000 + startOfYear.getDay() + 1) / 7);
const q = weeklyQuotes[weekNum % weeklyQuotes.length];
tR += `> [!quote]\n> *${q}*`;
%>

**Semana de {{date:MMMM D, YYYY}}**

---

## Parte 1: Clareza

### 📥 Recolher Papéis e Materiais Soltos
- [ ] Reunir notas físicas, cartões de visita, recibos
- [ ] Processar todos os itens nos locais adequados

### 📧 Processar Todas as Caixas de Entrada
- [ ] E-mail(s) → zero ou quase zero
- [ ] [[04-Tasks/Inbox/Inbox|Caixa de Entrada do Obsidian]] → processada
- [ ] App de notas / memos de voz
- [ ] Abas e favoritos do navegador
- [ ] Pasta de Downloads

### ✍️ Revisar Capturas de Escrita
- [ ] Processar [[01-Writing/Snippets/|Fragmentos de Escrita]]
- [ ] Revisar notas de pesquisa

---

## Parte 2: Atualização

### 📅 Revisar Calendário Anterior
Últimas 1–2 semanas:
- [ ] Algum follow-up necessário?
- [ ] Alguma tarefa a capturar?
- [ ] Alguma nota a arquivar?

### 📆 Revisar Calendário Futuro
Próximas 2–4 semanas:
- [ ] Alguma preparação necessária?
- [ ] Alguma tarefa a adicionar?
- [ ] Algum conflito a resolver?

### ✅ Revisar Lista de Próximas Ações
```dataview
LIST
FROM "04-Tasks/Next"
WHERE type = "task" AND status = "next"
```

- [ ] Marcar itens concluídos
- [ ] Adicionar novas Próximas Ações
- [ ] As ações ainda são relevantes?

### ⏳ Revisar Lista de Aguardando Resposta
```dataview
TABLE WITHOUT ID
    file.link as "Item",
    waiting_on as "Aguardando",
    due as "Follow-up"
FROM "04-Tasks/Waiting"
WHERE status = "waiting"
```

- [ ] Algum item para dar seguimento?
- [ ] Algum item concluído?

---

## Parte 3: Criatividade

### 🎯 Revisar Projetos
```dataview
TABLE WITHOUT ID
    file.link as "Projeto",
    status as "Status"
FROM "02-Projects/Active"
WHERE type = "project"
```

Para cada projeto:
- [ ] Qual é a Próxima Ação? (se nenhuma, adicionar uma)
- [ ] O projeto ainda está ativo?
- [ ] Algum projeto deve ser pausado ou concluído?

### 📖 Revisar Projetos de Escrita
```dataview
TABLE WITHOUT ID
    file.link as "Manuscrito",
    status as "Status",
    wordcount as "Palavras"
FROM "01-Writing/Manuscripts"
WHERE status != "complete"
```

- [ ] Algum projeto de escrita precisa de atenção?
- [ ] Qual será o foco da próxima sessão de escrita?

### 💭 Revisar Lista Algum Dia/Talvez
```dataview
LIST
FROM "02-Projects/Someday"
LIMIT 10
```

- [ ] Alguma coisa a ativar?
- [ ] Alguma coisa a remover?
- [ ] Alguma ideia nova a adicionar?

---

## Parte 4: Revisão de Metas

### Vitórias desta Semana 🎉
-
-
-

### Desafios desta Semana
-
-
-

### Foco para a Próxima Semana
1.
2.
3.

### Meta de Escrita para a Próxima Semana
- Meta de palavras:
- Projeto em foco:

---

## Conclusão

- [ ] **Revisei todos os meus projetos**
- [ ] **Há uma Próxima Ação para cada projeto ativo**
- [ ] **Meu calendário está atualizado**
- [ ] **Me sinto claro e pronto para a semana**

---

[[Daily Dashboard|← Voltar ao Daily Dashboard]]
