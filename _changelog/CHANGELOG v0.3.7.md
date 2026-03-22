---
type: changelog
version: 0.3.7
date: 2026-03-22
tags:
  - meta/changelog
---

# Changelog v0.3.7

**Data:** 2026-03-22
**Título:** Contrato canônico dos contatos sem `= this.*` no corpo

---

## Mudanças

1. **Template de contato simplificado**: `_templates/resources/Contact Template.md` deixou de espelhar `role`, `company`, `email`, `phone`, `location` e `relationship` no corpo da nota. Agora esses dados vivem apenas no frontmatter.
2. **Campos estruturados ampliados**: `linkedin`, `instagram` e `site` passaram a existir como propriedades canônicas da nota de contato, junto com `relationship` vazio por padrão para evitar lixo em tabelas.
3. **Notas existentes alinhadas**: `Dra. Carmen` e `Sara P&P` foram atualizadas para o mesmo contrato, mantendo o corpo só para contexto profissional, relação e histórico.
4. **Tables mais robustas**: o índice de contatos e o bloco de contatos recentes no `Resources Dashboard` agora usam `default(..., "—")`, evitando células quebradas quando algum campo estiver vazio.

---

## Arquivos modificados

- `00-Dashboard/Resources Dashboard.md`
- `05-Resources/Contacts/Dra. Carmen.md`
- `05-Resources/Contacts/Index.md`
- `05-Resources/Contacts/Sara P&P.md`
- `_changelog/CHANGELOG v0.3.7.md`
- `_templates/resources/Contact Template.md`

---

## Objetivo

Esta versão fecha o contrato dos contatos para que Dataview leia apenas propriedades canônicas, sem competir com placeholders inline no corpo da nota.

[[CHANGELOG INDEX|<- Índice]]
