---
type: changelog
version: 0.1.9
date: 2026-03-20
tags:
  - meta/changelog
---

# Changelog v0.1.9

**Data:** 2026-03-20
**Titulo:** Indice canonico do diario

---

## Mudancas

1. **Indice explicito para o diario**: a navegacao deixou de apontar para a pasta `03-Daily/Journal/` e passou a usar a nota dedicada `03-Daily/Index de Diario.md`.
2. **Dataview como fonte viva do historico**: o novo indice lista automaticamente todas as daily notes em `03-Daily/Journal`, ordenadas da mais recente para a mais antiga e sem incluir reviews.
3. **Links do dashboard sanitizados**: os atalhos "Todas as entradas do diario", "Ver todas as entradas do diario" e "Diario" agora abrem a nota de indice, evitando a criacao acidental de `Journal.md`.

---

## Arquivos modificados

- `00-Dashboard/Daily Dashboard.md`
- `03-Daily/Index de Diario.md`
- `_changelog/CHANGELOG INDEX.md`

---

## Objetivo

Esta versao fecha a arquitetura ambigua de link para pasta e estabelece um destino canonico, estavel e dinamico para o historico de daily notes.

[[CHANGELOG INDEX|<- Indice]]
