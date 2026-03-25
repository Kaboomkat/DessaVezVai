---
title: Resources Dashboard
type: dashboard
include_in_navbar: true
navbar_name: Recursos
cssclass: dashboard
---

# Painel de Recursos

> [!quote]
> "O conhecimento so ganha valor quando se conecta ao trabalho."

---

## Visao Geral dos Recursos

```dataviewjs
const countNotes = (path) => dv.pages(path).where((p) => p.file.name !== "Index").length;

dv.table(
    ["Area", "Total", "Escopo"],
    [
        ["Livros", countNotes('"05-Resources/Books"'), "Notas de leitura e resenhas"],
        ["Artigos", countNotes('"05-Resources/Articles"'), "Resumos e leituras curtas"],
        ["Knowledge", countNotes('"05-Resources/Knowledge"'), "Notas permanentes em palavras proprias"],
        ["Contatos", countNotes('"05-Resources/Contacts"'), "Pessoas e relacoes"],
        ["Definicoes", countNotes('"05-Resources/Definitions"'), "Termos e conceitos"],
    ]
);
```

---

## Acoes Rapidas

```button
name Adicionar Nota de Livro
type command
action QuickAdd: New Book Note
```
```button
name Adicionar Artigo
type command
action QuickAdd: New Article
```
```button
name Adicionar Nota Permanente
type command
action QuickAdd: New Knowledge Note
```
```button
name Adicionar Contato
type command
action QuickAdd: New Contact
```
```button
name Adicionar Definicao
type command
action QuickAdd: New Definition
```

---

## Notas Permanentes Recentes

```dataview
TABLE WITHOUT ID
    file.link as "Nota",
    default(topic, "—") as "Topico",
    default(summary, "—") as "Resumo",
    file.mtime as "Atualizado"
FROM "05-Resources/Knowledge"
WHERE file.name != "Index"
SORT file.mtime DESC
LIMIT 15
```

[[05-Resources/Knowledge/Index|-> Abrir indice de conhecimento]]

---

## Notas de Livros Recentes

```dataview
TABLE WITHOUT ID
    file.link as "Livro",
    author as "Autor",
    rating as "Avaliacao",
    status as "Status",
    file.mtime as "Atualizado"
FROM "05-Resources/Books"
WHERE file.name != "Index"
SORT file.mtime DESC
LIMIT 15
```

[[05-Resources/Books/Index|-> Abrir indice completo de livros]]

---

## Artigos Recentes

```dataview
TABLE WITHOUT ID
    file.link as "Artigo",
    source as "Fonte",
    topic as "Topico",
    file.mtime as "Atualizado"
FROM "05-Resources/Articles"
WHERE file.name != "Index"
SORT file.mtime DESC
LIMIT 15
```

[[05-Resources/Articles/Index|-> Abrir indice completo de artigos]]

---

## Contatos Recentes

```dataview
TABLE WITHOUT ID
    file.link as "Nome",
    default(role, "—") as "Cargo",
    default(company, "—") as "Empresa",
    file.mtime as "Atualizado"
FROM "05-Resources/Contacts"
WHERE file.name != "Index"
SORT file.mtime DESC
LIMIT 15
```

[[05-Resources/Contacts/Index|-> Abrir indice completo de contatos]]

---

## Definicoes Recentes

```dataview
TABLE WITHOUT ID
    file.link as "Definicao",
    category as "Categoria",
    related_to as "Relacionado a",
    file.mtime as "Atualizado"
FROM "05-Resources/Definitions"
WHERE file.name != "Index"
SORT file.mtime DESC
LIMIT 15
```

[[05-Resources/Definitions/Index|-> Abrir indice completo de definicoes]]

---

## Buscar Recursos

Use `Ctrl/Cmd + O` para busca rapida, ou tente:
- `path:05-Resources` - Todos os recursos
- `path:05-Resources/Knowledge` - Apenas notas permanentes
- `path:Books` - Apenas notas de livros
- `tag:#knowledge` - Notas permanentes

---

## Navegacao Rapida

| Recursos | Relacionados |
|----------|-------------|
| [[05-Resources/Books/Index\|Livros]] | [[Writing Dashboard\|Escrita]] |
| [[05-Resources/Articles/Index\|Artigos]] | [[01-Writing/Research/Index\|Pesquisa]] |
| [[05-Resources/Knowledge/Index\|Knowledge]] | [[01-Writing/Snippets/Index\|Snippets]] |
| [[05-Resources/Contacts/Index\|Contatos]] | [[Home\|Inicio]] |
| [[05-Resources/Definitions/Index\|Definicoes]] | [[Tasks Dashboard\|Tarefas]] |

---

*Recursos so tem valor quando se conectam entre si.*
