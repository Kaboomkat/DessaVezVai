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
const books = dv.pages('"05-Resources/Books"').length;
const articles = dv.pages('"05-Resources/Articles"').length;
const contacts = dv.pages('"05-Resources/Contacts"').length;
const definitions = dv.pages('"05-Resources/Definitions"').length;

dv.container.innerHTML = `
<div class="dashboard-cards">
    <div class="dashboard-card">
        <h3>📖 Livros</h3>
        <div class="stat-number">${books}</div>
        <div class="stat-label">Notas de livros</div>
    </div>
    <div class="dashboard-card">
        <h3>📄 Artigos</h3>
        <div class="stat-number">${articles}</div>
        <div class="stat-label">Resumos de artigos</div>
    </div>
    <div class="dashboard-card">
        <h3>👥 Contatos</h3>
        <div class="stat-number">${contacts}</div>
        <div class="stat-label">Pessoas</div>
    </div>
    <div class="dashboard-card">
        <h3>📝 Definições</h3>
        <div class="stat-number">${definitions}</div>
        <div class="stat-label">Termos e conceitos</div>
    </div>
</div>
`;
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

[[05-Resources/Books/|→ Todos os livros]]

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

[[05-Resources/Articles/|→ Todos os artigos]]

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

[[05-Resources/Contacts/|→ Todos os contatos]]

---

## 📝 Definições Recentes

```dataview
LIST
FROM "05-Resources/Definitions"
SORT file.ctime DESC
LIMIT 8
```

[[05-Resources/Definitions/|→ Todas as definições]]

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
| [[05-Resources/Books/\|📖 Livros]] | [[Writing Dashboard\|✍️ Escrita]] |
| [[05-Resources/Articles/\|📄 Artigos]] | [[01-Writing/Research/\|🔬 Pesquisa]] |
| [[05-Resources/Contacts/\|👥 Contatos]] | [[Home\|🏠 Início]] |
| [[05-Resources/Definitions/\|📝 Definições]] | [[Tasks Dashboard\|✅ Tarefas]] |

---

*Recursos só têm valor quando conectados ao seu trabalho.*
