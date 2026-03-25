---
title: "{{title}}"
type: research
topic:
project:
summary:
source:
url:
reliability: alta | media | baixa
created: {{date}}
modified: {{date}}
tags:
  - writing/research
---

# {{title}}

> [!info] Nota de Pesquisa
> **Topico:** `= this.topic` | **Projeto:** `= this.project` | **Confiabilidade:** `= this.reliability`
> **Resumo:** `= this.summary`

---

## Fonte

**Fonte:** `= this.source`

**URL:** `= this.url`

**Data de acesso:** {{date}}

---

## Resumo

*Pontos principais desta pesquisa:*


---

## Notas Detalhadas

### Conteudo Principal


### Fatos-chave

-

### Citacoes

>

---

## Aplicacao na Escrita

**Como isso se aplica a minha historia:**


**Cenas / capitulos relevantes:**
-

**Personagens afetados:**
-

---

## Questoes Levantadas

-

---

## Pesquisas Relacionadas

```dataview
LIST
FROM "01-Writing/Research"
WHERE topic = this.topic AND file.name != this.file.name
LIMIT 5
```

---

## Notas permanentes derivadas

Promova para `Knowledge` apenas os conceitos que sobrevivem a fonte e podem ser reutilizados na escrita.

- [[ ]]
- [[ ]]

---

## Notas


---

[[01-Writing/Research/Index|<- Indice de Pesquisa]] | [[Writing Dashboard|Painel de Escrita]]
