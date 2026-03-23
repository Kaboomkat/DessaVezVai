---
title: "{{title}}"
type: manuscript
status: rascunho
wordcount: 0
wordgoal: 80000
project: "{{title}}"
genre:
target_audience:
created: {{date}}
modified: {{date}}
tags:
  - writing/novel
  - project/active
---

# {{title}}

> [!info] Visão Geral do Manuscrito
> **Status:** `= this.status` | **Palavras:** `= this.wordcount` / `= this.wordgoal` | **Progresso:** `= round((this.wordcount / this.wordgoal) * 100)`%

---

## 📖 Premissa

*Resumo em uma frase:*


*Premissa expandida (1 parágrafo):*


---

## 🎯 Objetivo da História

**Qual é a questão central que esta história responde?**


**Tema(s):**
-

**Tom:**


---

## 🏗️ Estrutura

### Ato 1: Apresentação
- **Gancho:**
- **Incidente Incitante:**
- **Primeiro Ponto de Virada:**

### Ato 2: Confronto
- **Ação Crescente:**
- **Ponto Médio:**
- **Momento das Trevas:**

### Ato 3: Resolução
- **Clímax:**
- **Resolução:**
- **Imagem Final:**

---

## 👥 Personagens Principais

```dataview
TABLE WITHOUT ID
    file.link as "Personagem",
    role as "Papel",
    arc as "Arco"
FROM "01-Writing/Characters"
WHERE project = this.file.name
```

[[_templates/writing/Character Template|+ Adicionar Personagem]]

---

## 🌍 Mundo e Cenário

```dataview
LIST
FROM "01-Writing/Worldbuilding"
WHERE project = this.file.name
```

[[_templates/writing/Worldbuilding Template|+ Adicionar Entrada de Mundo]]

---

## 📚 Cenas / Capítulos

> [!tip] Use o plugin Longform para gerenciar cenas. Abra o painel com `Ctrl/Cmd + Shift + L`

```dataview
TABLE WITHOUT ID
    file.link as "Cena",
    status as "Status",
    wordcount as "Palavras",
    pov as "POV"
FROM "01-Writing/Manuscripts"
WHERE project = this.file.name AND type = "scene"
SORT file.name ASC
```

---

## 🔬 Pesquisa

```dataview
LIST
FROM "01-Writing/Research"
WHERE project = this.file.name
```

---

## 📝 Notas

### Notas da História


### Notas de Revisão


### Feedback


---

## 📊 Registro de Progresso

| Data | Palavras adicionadas | Total | Notas |
|------|---------------------|-------|-------|
| | | | |

---

## 🔗 Links

[[Writing Dashboard|← Painel de Escrita]] | [[01-Writing/Manuscripts/|Todos os Manuscritos]]
