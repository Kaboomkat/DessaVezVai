---
type: changelog
version: 0.1.0
date: 2026-03-20
tags:
  - meta/changelog
---

# Changelog v0.1.0

**Data:** 2026-03-20
**Titulo:** Limpeza de ownership do Templater

---

## Mudancas

1. **Templater folder ownership removido**: `templates_pairs` foi zerado para que o plugin nao mantenha rotas antigas de criacao por pasta.
2. **Daily Journal Router isolado**: o vault deixa de apontar para o router legado em configuracao ativa.
3. **Arquitetura consolidada**: `Periodic Notes` e `QuickAdd` seguem como unicos criadores de notas, enquanto `Templater` fica apenas como renderizador.

---

## Arquivos modificados

- `.obsidian/plugins/templater-obsidian/data.json`

---

## Objetivo

Esta versao reduz o risco de dupla aplicacao de template e elimina o principal resquicio da arquitetura antiga.

[[CHANGELOG|<- Indice]]
