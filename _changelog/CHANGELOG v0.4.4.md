---
type: changelog
version: 0.4.4
date: 2026-03-23
tags:
  - meta/changelog
---

# Changelog v0.4.4

**Data:** 2026-03-23
**Titulo:** Hotfix do QuickAdd em Resources, Writing e Projects

---

## Mudancas

1. **Choices legadas do QuickAdd normalizadas**: as 11 choices `Template` antigas agora incluem `fileNameFormat` padrao e `openFile: true`, evitando falha ao acessar `fileNameFormat.enabled` na versao atual do plugin.
2. **Resources revisado ponta a ponta**: botoes e atalhos de artigo, livro, contato e definicao foram conferidos contra `quickadd/data.json`.
3. **Writing e Projects revisados ponta a ponta**: botoes de cena, personagem, worldbuilding, research, snippet, project e someday foram conferidos nos indices e dashboards; nao ha atalhos dedicados para esse grupo em `hotkeys.json`.
4. **Validacao estrutural concluida**: o JSON do QuickAdd continua valido e todas as choices `Template` afetadas agora possuem os campos esperados pela versao 2.12.0.

---

## Arquivos modificados

- `.obsidian/plugins/quickadd/data.json` - normalizacao das choices `Template` legadas
- `_changelog/CHANGELOG v0.4.4.md`
- `_changelog/CHANGELOG INDEX.md`

---

## Objetivo

Eliminar o erro `Cannot read properties of undefined (reading 'enabled')` nos fluxos de criacao por botao ou atalho e alinhar os acionamentos de Resources, Writing e Projects com a estrutura atual do QuickAdd.

[[CHANGELOG INDEX|<- Indice]]
