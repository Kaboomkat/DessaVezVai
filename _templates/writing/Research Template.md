---
title: "{{title}}"
type: research
topic:
project:
source:
url:
reliability: alta | média | baixa
created: {{date}}
modified: {{date}}
tags:
  - writing/research
---

# {{title}}

> [!info] Nota de Pesquisa
> **Tópico:** `= this.topic` | **Projeto:** `= this.project` | **Confiabilidade:** `= this.reliability`

---

## 📚 Fonte

**Fonte:** `= this.source`

**URL:** `= this.url`

**Data de acesso:** {{date}}

---

## 📝 Resumo

*Pontos principais desta pesquisa:*


---

## 🔍 Notas Detalhadas

### Conteúdo Principal


### Fatos-chave

-

### Citações

>

---

## ✍️ Aplicação na Escrita

**Como isso se aplica à minha história:**


**Cenas / capítulos relevantes:**
-

**Personagens afetados:**
-

---

## ❓ Questões Levantadas

-

---

## 🔗 Pesquisas Relacionadas

```dataview
LIST
FROM "01-Writing/Research"
WHERE topic = this.topic AND file.name != this.file.name
LIMIT 5
```

---

## 📝 Notas


---

[[01-Writing/Research/|← Todas as Pesquisas]] | [[{{project}}|Voltar ao Manuscrito]]
