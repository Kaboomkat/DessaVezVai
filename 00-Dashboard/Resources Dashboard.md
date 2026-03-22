---
title: Resources Dashboard
type: dashboard
include_in_navbar: true
navbar_name: Recursos
cssclass: dashboard
---

# 📚 Painel de Recursos

> [!quote]
> *"O conhecimento não tem valor a menos que você o coloque em prática."* — Anton Chekhov

---

## 📊 Visão Geral dos Recursos

```dataviewjs
const countNotes = (path) => dv.pages(path).where(p => p.file.name !== "Index").length;

dv.table(
    ["Área", "Total", "Escopo"],
    [
        ["📖 Livros", countNotes('"05-Resources/Books"'), "Notas de leitura e resenhas"],
        ["📄 Artigos", countNotes('"05-Resources/Articles"'), "Resumos e leituras curtas"],
        ["👥 Contatos", countNotes('"05-Resources/Contacts"'), "Pessoas e relações"],
        ["📝 Definições", countNotes('"05-Resources/Definitions"'), "Termos e conceitos"],
    ]
);
```

---

## 🚀 Ações Rápidas

```button
name 📖 Adicionar Nota de Livro
type command
action QuickAdd: New Book Note
```
```button
name 📄 Adicionar Artigo
type command
action QuickAdd: New Article
```
```button
name 👤 Adicionar Contato
type command
action QuickAdd: New Contact
```
```button
name 📝 Adicionar Definição
type command
action QuickAdd: New Definition
```

---

## 📖 Notas de Livros Recentes

```dataview
TABLE WITHOUT ID
    file.link as "Livro",
    author as "Autor",
    rating as "Avaliação",
    status as "Status"
FROM "05-Resources/Books"
SORT file.mtime DESC
LIMIT 5
```

[[05-Resources/Books/Index|→ Todos os livros]]

---

## 📄 Artigos Recentes

```dataview
TABLE WITHOUT ID
    file.link as "Artigo",
    source as "Fonte",
    file.cday as "Adicionado"
FROM "05-Resources/Articles"
SORT file.ctime DESC
LIMIT 5
```

[[05-Resources/Articles/Index|→ Todos os artigos]]

---

## 👥 Contatos

```dataview
TABLE WITHOUT ID
    file.link as "Nome",
    role as "Cargo",
    company as "Empresa"
FROM "05-Resources/Contacts"
SORT file.name ASC
LIMIT 10
```

[[05-Resources/Contacts/Index|→ Todos os contatos]]

---

## 📝 Definições Recentes

```dataview
LIST
FROM "05-Resources/Definitions"
SORT file.ctime DESC
LIMIT 8
```

[[05-Resources/Definitions/Index|→ Todas as definições]]

---

## 🔍 Buscar Recursos

Use `Ctrl/Cmd + O` para busca rápida, ou tente:
- `path:05-Resources` — Todos os recursos
- `path:Books` — Apenas notas de livros
- `tag:#reference` — Materiais de referência

---

## 🔗 Navegação Rápida

| Recursos | Relacionados |
|----------|-------------|
| [[05-Resources/Books/Index\|📖 Livros]] | [[Writing Dashboard\|✍️ Escrita]] |
| [[05-Resources/Articles/Index\|📄 Artigos]] | [[01-Writing/Research/Index\|🔬 Pesquisa]] |
| [[05-Resources/Contacts/Index\|👥 Contatos]] | [[Home\|🏠 Início]] |
| [[05-Resources/Definitions/Index\|📝 Definições]] | [[Tasks Dashboard\|✅ Tarefas]] |

---

*Recursos só têm valor quando conectados ao seu trabalho.*
