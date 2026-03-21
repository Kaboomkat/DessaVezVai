---
type: changelog
version: 0.2.4
date: 2026-03-20
tags:
  - meta/changelog
---

# Changelog v0.2.4

**Data:** 2026-03-20  
**Título:** Destaque do dia confiável no índice e README reescrito

---

## Mudanças

1. **Extração do `Destaque do Dia` corrigida**: o helper deixou de tratar separadores `---` como se fossem conteúdo real do destaque.
2. **Blank highlight deixa de poluir tabelas**: quando a seção está vazia, o retorno agora é `null`, então `Index de Diario` e outras tabelas mostram placeholder limpo em vez de lixo estrutural.
3. **README reescrito com base no vault real**: o arquivo passou a refletir a arquitetura efetiva do sistema, usando [CLAUDE.md](../CLAUDE.md) como referência estrutural e operacional.
4. **Descrição do vault ficou mais concreta**: a documentação agora deixa claro quem cria o quê, onde ficam as fontes de verdade e como o fluxo diário/reviews/trackers se encaixa.

---

## Arquivos modificados

- `_scripts/DashboardHelpers.js`
- `README.md`
- `_changelog/CHANGELOG INDEX.md`

---

## Nota de validação

- `extractSectionText("## Destaque do Dia ...")` foi validado com dois cenários:
  - texto real antes do separador: retorna o texto
  - seção vazia seguida de `---`: retorna `null`

---

## Objetivo

Esta versão fecha um bug silencioso de leitura do destaque e substitui um `README` genérico por uma documentação útil para manutenção real do vault.

[[CHANGELOG INDEX|<- Índice]]
