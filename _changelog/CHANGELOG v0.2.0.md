---
type: changelog
version: 0.2.0
date: 2026-03-20
tags:
  - meta/changelog
---

# Changelog v0.2.0

**Data:** 2026-03-20
**Titulo:** Criacao segura de reviews e navegacao periodica

---

## Mudancas

1. **Templates de review corrigidos**: `Morning Review Template` e `Evening Review Template` deixaram de quebrar o parse do Templater ao gerar reviews para datas futuras.
2. **Navegacao diaria segura**: o bloco de navegacao das daily notes saiu de wikilinks crus e passou a usar os comandos `Periodic Notes: Open previous daily note` e `Periodic Notes: Open next daily note`, que criam ou abrem notas com o fluxo correto do vault.
3. **Fim do atalho perigoso para review vazia**: os links auxiliares que podiam criar `Morning Review` ou `Evening Review` vazias foram removidos das daily notes; o caminho suportado passa a ser exclusivamente o botao via `QuickAdd` URI.
4. **Navegacao entre reviews endurecida**: os templates de review agora usam `QuickAdd` URI para abrir ou criar a review complementar da mesma data, em vez de depender de wikilink para um arquivo que pode ainda nao existir.

---

## Arquivos modificados

- `03-Daily/Journal/2026-03-19.md`
- `03-Daily/Journal/2026-03-20.md`
- `_templates/daily/Daily Note Template.md`
- `_templates/daily/Morning Review Template.md`
- `_templates/daily/Evening Review Template.md`
- `_changelog/CHANGELOG INDEX.md`

---

## Objetivo

Esta versao elimina os dois pontos mais frageis do fluxo diario: reviews futuras abortando no Templater e navegacao lateral criando notas vazias fora do contrato do `Periodic Notes`.

[[CHANGELOG INDEX|<- Indice]]
