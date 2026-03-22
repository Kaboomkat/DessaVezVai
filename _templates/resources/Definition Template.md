---
title: "{{title}}"
type: definition
category:
related_to:
source:
created: {{date}}
tags:
  - definition
---

# {{title}}

> [!definition] Definição
> **Categoria:** `= this.category`

---

## 📖 Definição

*O que é?*


---

## 🔍 Detalhes

**Etimologia / Origem:**


**Aspectos principais:**
-

**Exemplos:**
-

---

## 🔗 Conceitos Relacionados

```dataview
LIST
FROM "05-Resources/Definitions"
WHERE contains(related_to, this.file.name) OR contains(this.related_to, file.name)
LIMIT 5
```

---

## 📚 Fontes

- `= this.source`

---

## 📝 Notas


---

## ✍️ Uso na Escrita

*Como este conceito pode aparecer nas minhas histórias?*


---

[[05-Resources/Definitions/Index|← Todas as Definições]] | [[Resources Dashboard|Recursos]]
