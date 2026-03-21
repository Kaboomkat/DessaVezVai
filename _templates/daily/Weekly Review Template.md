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

# Revisão Semanal - {{date:YYYY-[W]ww}}

<%*
const weekStartDate = tp.date.now("YYYY-MM-DD");
const displayMonthNames = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
const displayDate = new Date(`${weekStartDate}T12:00:00`);
const formattedWeekStart = `${displayDate.getDate()} de ${displayMonthNames[displayDate.getMonth()]} de ${displayDate.getFullYear()}`;
const weeklyQuotes = [
  '"A Revisão Semanal é o momento de reunir e processar tudo, revisar seu sistema, atualizar suas listas e ficar limpo, claro, atual e completo." - David Allen',
  '"Não basta estar ocupado. A questão é: com o que estamos ocupados?" - Henry David Thoreau',
  '"A chave não é priorizar o que está na sua agenda, mas agendar suas prioridades." - Stephen Covey',
  '"Planos não são nada; planejar é tudo." - Dwight D. Eisenhower',
  '"O que é medido é gerenciado." - Peter Drucker',
  '"Sua mente serve para ter ideias, não para armazená-las." - David Allen',
  '"Foque em ser produtivo, não em estar ocupado." - Tim Ferriss',
  '"Feito é melhor que perfeito." - Sheryl Sandberg'
];
const now = new Date();
const startOfYear = new Date(now.getFullYear(), 0, 1);
const weekNum = Math.ceil(((now - startOfYear) / 86400000 + startOfYear.getDay() + 1) / 7);
const q = weeklyQuotes[weekNum % weeklyQuotes.length];
tR += `> [!quote]\n> *${q}*\n\n**Semana de ${formattedWeekStart}**`;
%>

---

## Parte 1: Clareza

### Recolher Papéis e Materiais Soltos
- [ ] Reunir notas físicas, cartões de visita e recibos
- [ ] Processar todos os itens nos locais adequados

### Processar Todas as Caixas de Entrada
- [ ] E-mail(s) -> zero ou quase zero
- [ ] [[04-Tasks/Inbox/Inbox|Caixa de Entrada do Obsidian]] -> processada
- [ ] App de notas / memos de voz
- [ ] Abas e favoritos do navegador
- [ ] Pasta de Downloads

### Revisar Capturas de Escrita
- [ ] Processar [[01-Writing/Snippets/|Fragmentos de Escrita]]
- [ ] Revisar notas de pesquisa

---

## Parte 2: Atualização

### Revisar Calendário Anterior
Últimas 1-2 semanas:
- [ ] Algum follow-up necessário?
- [ ] Alguma tarefa a capturar?
- [ ] Alguma nota a arquivar?

### Revisar Calendário Futuro
Próximas 2-4 semanas:
- [ ] Alguma preparação necessária?
- [ ] Alguma tarefa a adicionar?
- [ ] Algum conflito a resolver?

### Revisar Lista de Próximas Ações
```dataview
LIST
FROM "04-Tasks/Next"
WHERE type = "task" AND status = "next"
```

- [ ] Marcar itens concluídos
- [ ] Adicionar novas Próximas Ações
- [ ] As ações ainda são relevantes?

### Revisar Lista de Aguardando Resposta
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

### Revisar Projetos
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

### Revisar Projetos de Escrita
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

### Revisar Lista Algum Dia/Talvez
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

### Vitórias desta Semana
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

- [ ] Revisei todos os meus projetos
- [ ] Há uma Próxima Ação para cada projeto ativo
- [ ] Meu calendário está atualizado
- [ ] Me sinto claro e pronto para a semana

---

[[Daily Dashboard|<- Voltar ao Daily Dashboard]]
