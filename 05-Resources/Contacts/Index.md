---
title: Contatos
type: index
---

# Contatos

> [!info] Pessoas relevantes para trabalho, escrita, pesquisa e vida pessoal ficam listadas aqui.

```button
name Novo Contato
type command
action QuickAdd: New Contact
```

```dataview
TABLE WITHOUT ID
    file.link as "Nome",
    role as "Cargo",
    company as "Empresa",
    relationship as "Relação",
    last_contact as "Último contato"
FROM "05-Resources/Contacts"
WHERE file.name != "Index"
SORT file.name ASC
```

[[Resources Dashboard|<- Painel de Recursos]]
