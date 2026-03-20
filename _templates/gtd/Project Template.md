---
title: "{{title}}"
type: project
status: active
area: pessoal | trabalho | escrita | aprendizado | outro
priority: alta | média | baixa
start_date: {{date}}
target_date:
completed_date:
progress: 0
outcome:
created: {{date}}
modified: {{date}}
tags:
  - project/active
---

# {{title}}

> [!info] Visão Geral do Projeto
> **Status:** `= this.status` | **Área:** `= this.area` | **Progresso:** `= this.progress`%

---

## 🎯 Resultado Desejado

*Como é o "pronto"? Seja específico.*


---

## ❓ Por que isso importa

*Por que este projeto é importante? O que acontece se não for feito?*


---

## 📋 Próximas Ações

```dataview
TASK
FROM "04-Tasks"
WHERE project = this.file.name AND !completed
```

**Próxima ação imediata:**
- [ ]

---

## 🗺️ Plano do Projeto

### Marcos Principais

- [ ] **Marco 1:**
- [ ] **Marco 2:**
- [ ] **Marco 3:**
- [ ] **Concluído:**

### Brainstorm / Todas as Tarefas

- [ ]
- [ ]
- [ ]

---

## 📅 Cronograma

| Marco | Data Alvo | Status |
|-------|-----------|--------|
| | | |

**Data de início:** `= this.start_date`

**Conclusão prevista:** `= this.target_date`

---

## 📚 Materiais de Referência

*Links para recursos e documentos relevantes.*

-

---

## 👥 Partes Envolvidas

| Pessoa | Papel | Contato |
|--------|-------|---------|
| | | |

---

## 📝 Notas do Projeto

### Notas de Reuniões


### Decisões Tomadas


### Questões em Aberto

-

---

## 📊 Atualizações de Progresso

| Data | Atualização | Próximo Passo |
|------|-------------|---------------|
| | | |

---

## ✅ Conclusão

**Data de conclusão:** `= this.completed_date`

**Resultado final:**


**Lições aprendidas:**


---

[[Projects Dashboard|← Painel de Projetos]]
