---
type: changelog
version: 0.3.8
date: 2026-03-22
tags:
  - meta/changelog
---

# Changelog v0.3.8

**Data:** 2026-03-22
**Título:** Tabela inline de propriedades nas notas de contato

---

## Mudanças

1. **Tabela dentro da nota**: o template de contato agora renderiza `Cargo`, `Empresa`, `E-mail`, `Telefone`, `Localização`, links sociais, `met_at`, `relationship` e `last_contact` em uma tabela `dataviewjs`.
2. **Visualização sem duplicar fonte de verdade**: as notas continuam usando as Properties como origem canônica, mas agora mostram esses dados também no corpo da nota.
3. **Contatos existentes alinhados**: `Dra. Carmen` e `Sara P&P` receberam a mesma tabela inline para manter consistência visual com o novo template.

---

## Arquivos modificados

- `05-Resources/Contacts/Dra. Carmen.md`
- `05-Resources/Contacts/Sara P&P.md`
- `_changelog/CHANGELOG v0.3.8.md`
- `_templates/resources/Contact Template.md`

---

## Objetivo

Esta versão mantém o contrato canônico dos contatos nas propriedades e adiciona uma visualização estável, em tabela, dentro da própria nota.

[[CHANGELOG INDEX|<- Índice]]
