---
title: "{{title}}"
type: contact
role:
company:
email:
phone:
location:
linkedin:
instagram:
site:
met_at:
relationship:
last_contact:
created: {{date}}
tags:
  - contact
---

# {{title}}

> [!contact] Contrato da Nota
> Preencha `role`, `company`, `email`, `phone`, `location`, `linkedin`, `instagram`, `site`, `relationship` e `last_contact` nas propriedades da nota.
> Use o corpo abaixo apenas para contexto, histórico e follow-ups.

---

## 📇 Dados de Contato

```dataviewjs
const contact = dv.current();
const value = (field) => {
    if (field === null || field === undefined || field === "") return "—";
    return field;
};

dv.table(
    ["Campo", "Valor"],
    [
        ["Cargo", value(contact.role)],
        ["Empresa", value(contact.company)],
        ["E-mail", value(contact.email)],
        ["Telefone", value(contact.phone)],
        ["Localização", value(contact.location)],
        ["LinkedIn", value(contact.linkedin)],
        ["Instagram", value(contact.instagram)],
        ["Site", value(contact.site)],
        ["Conheci em", value(contact.met_at)],
        ["Relação", value(contact.relationship)],
        ["Último contato", value(contact.last_contact)],
    ]
);
```

Valores esperados para `relationship`: `pessoal`, `profissional`, `escrita` ou `outro`.

---

## 👤 Sobre

**Como nos conhecemos:**


**Contexto profissional / o que faz na prática:**


**Áreas de expertise:**
-

---

## 🔗 Notas de Relacionamento

**Dinâmica da relação / observações:**


**Interesses em comum:**
-

**Como posso ajudá-lo(a):**
-

**Como pode me ajudar:**
-

---

## 📝 Registro de Interações

| Data | Tipo | Notas |
|------|------|-------|
| | | |

---

## 💭 Notas


---

## 📋 Follow-ups

- [ ]

---

[[05-Resources/Contacts/Index|← Todos os Contatos]] | [[Resources Dashboard|Recursos]]
