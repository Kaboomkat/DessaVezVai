---
type: changelog
version: 0.4.6
date: 2026-03-23
tags:
  - meta/changelog
---

# Changelog v0.4.6

**Data:** 2026-03-23
**Título:** Reestruturação do Definition Template para formato orientado a tabelas

---

## Mudanças

1. **Definition Template reestruturado**: a nota agora segue o mesmo contrato visual dos contatos reais, com um callout explicando o papel das propriedades e do corpo da nota.
2. **Remoção de inline Dataview**: saíram os trechos `= this.category` e `= this.source`, evitando dependência de inline queries para ler metadados básicos.
3. **Resumo estruturado em tabela**: foi adicionada uma tabela `dataviewjs` para exibir categoria, relações, fonte principal, data de criação e tags do conceito.
4. **Corpo mais preenchível e menos mágico**: seções como detalhamento, conceitos relacionados, exemplos, fontes e uso na escrita agora usam tabelas Markdown simples, mais próximas do fluxo de edição manual.
5. **Fim do bloco automático de relacionados baseado em `this`**: a seção de relações passou a ser explícita e editável, reduzindo fragilidade de template e melhorando legibilidade.

---

## Arquivos modificados

- `_templates/resources/Definition Template.md` — template reestruturado para tables + dataviewjs de resumo
- `_changelog/CHANGELOG v0.4.6.md`
- `_changelog/CHANGELOG INDEX.md`

---

## Objetivo

Deixar a criação de notas em `Definitions` mais consistente com a estrutura já usada em `Contacts`, com menos dependência de sintaxe inline do Dataview e com um corpo mais fácil de preencher e revisar.

[[CHANGELOG INDEX|<- Índice]]
