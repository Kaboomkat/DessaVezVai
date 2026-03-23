---
type: changelog
version: 0.4.5
date: 2026-03-23
tags:
  - meta/changelog
---

# Changelog v0.4.5

**Data:** 2026-03-23
**Titulo:** Hotfix do QuickAdd nas template choices legadas

---

## Mudancas

1. **Schema antigo do QuickAdd normalizado**: as template choices legadas agora incluem `appendLink: false`, evitando a falha ao acessar `appendLink.enabled` na versao atual do plugin.
2. **Campos basicos de criacao padronizados**: as choices antigas de escrita, projetos e recursos agora tambem incluem `fileNameFormat` padrao e `openFile: true`, alinhando o contrato com o QuickAdd atual.
3. **Escopo do hotfix ampliado para evitar regressao lateral**: alem de `New Book Note`, `New Article`, `New Contact` e `New Definition`, o ajuste cobre `Quick Capture`, `New Scene`, `New Character`, `New Worldbuilding`, `New Snippet`, `New Project`, `New Someday` e os trackers anual, mensal e semanal.
4. **Configuracao validada**: o `data.json` continua valido e todas as `Template` choices agora possuem os campos esperados pela execucao do plugin.

---

## Arquivos modificados

- `.obsidian/plugins/quickadd/data.json` - backfill de `appendLink`, `fileNameFormat` e `openFile` nas template choices legadas
- `_changelog/CHANGELOG v0.4.5.md`
- `_changelog/CHANGELOG INDEX.md`

---

## Objetivo

Eliminar o erro `Cannot read properties of undefined (reading 'enabled')` ao acionar criacoes por QuickAdd e deixar as template choices antigas compativeis com a estrutura exigida pela versao atual do plugin.

[[CHANGELOG INDEX|<- Indice]]
