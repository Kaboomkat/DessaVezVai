---
type: changelog
version: 0.3.2
date: 2026-03-22
tags:
  - meta/changelog
---

# Changelog v0.3.2

**Data:** 2026-03-22
**Título:** Hotfix de ownership entre Templater e QuickAdd

---

## Mudanças

1. **Templater deixou de carregar scripts do QuickAdd**: `.obsidian/plugins/templater-obsidian/data.json` passou de `user_scripts_folder: "_scripts"` para `user_scripts_folder: "_scripts/templater"`, impedindo que o plugin tente inicializar `_scripts/quickadd/GtdWorkflow.js`.
2. **Pasta de user scripts ficou explícita**: `_scripts/templater/README.md` documenta que esse espaço é exclusivo do Templater e não deve receber automações do QuickAdd.
3. **Reviews quebradas do dia 2026-03-21 reparadas**: as notas de manhã e noite que haviam sido salvas com código cru de Templater foram regravadas em Markdown final, com links de navegação e botões válidos.

---

## Arquivos modificados

- `.obsidian/plugins/templater-obsidian/data.json`
- `_scripts/templater/README.md`
- `03-Daily/Morning Reviews/2026-03-21 Morning Review.md`
- `03-Daily/Evening Reviews/2026-03-21 Evening Review.md`
- `_changelog/CHANGELOG v0.3.2.md`
- `_changelog/CHANGELOG INDEX.md`

---

## Objetivo

Esta versão restaura o runtime do Templater sem mexer no script GTD do QuickAdd, fechando a colisão de ownership que estava derrubando as reviews e gerando popups no fluxo diário.

[[CHANGELOG INDEX|<- Índice]]
