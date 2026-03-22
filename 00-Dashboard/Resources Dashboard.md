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
    status as "Status",
    file.mtime as "Atualizado"
FROM "05-Resources/Books"
WHERE file.name != "Index"
SORT file.mtime DESC
LIMIT 15
```

[[05-Resources/Books/Index|→ Abrir índice completo de livros]]

---

## 📄 Artigos Recentes

```dataview
TABLE WITHOUT ID
    file.link as "Artigo",
    source as "Fonte",
    topic as "Tópico",
    file.mtime as "Atualizado"
FROM "05-Resources/Articles"
WHERE file.name != "Index"
SORT file.mtime DESC
LIMIT 15
```

[[05-Resources/Articles/Index|→ Abrir índice completo de artigos]]

---

## 👥 Contatos Recentes

```dataview
TABLE WITHOUT ID
    file.link as "Nome",
    role as "Cargo",
    company as "Empresa",
    file.mtime as "Atualizado"
FROM "05-Resources/Contacts"
WHERE file.name != "Index"
SORT file.mtime DESC
LIMIT 15
```

[[05-Resources/Contacts/Index|→ Abrir índice completo de contatos]]

---

## 📝 Definições Recentes

```dataview
TABLE WITHOUT ID
    file.link as "Definição",
    category as "Categoria",
    related_to as "Relacionado a",
    file.mtime as "Atualizado"
FROM "05-Resources/Definitions"
WHERE file.name != "Index"
SORT file.mtime DESC
LIMIT 15
```

[[05-Resources/Definitions/Index|→ Abrir índice completo de definições]]

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
