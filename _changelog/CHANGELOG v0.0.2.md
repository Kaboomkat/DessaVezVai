---
type: changelog
version: 0.0.2
date: 2026-03-19
tags:
  - meta/changelog
---

# Changelog v0.0.2

**Data:** 2026-03-19
**Título:** Weekly Dashboard + CustomJS DashboardHelpers + reestruturação do CHANGELOG

---

## Mudanças

1. **Weekly Dashboard criado** — `00-Dashboard/Weekly Dashboard.md` — dashboard fixo e automático para a semana corrente, com calendário, mood/energy, escrita, tarefas e revisões
2. **CustomJS DashboardHelpers** — `_scripts/DashboardHelpers.js` — classe reusável com `moodColor()`, `cell()`, `parseVal()` e `currentWeekNumber()`; elimina duplicação entre `Daily Dashboard.md` e `Mood-Energy Week Template.md`
3. **Daily Dashboard atualizado** — link `[[Weekly Dashboard|📆 Semanal]]` adicionado na tabela de navegação
4. **CHANGELOG reestruturado** — movido de `00-Dashboard/CHANGELOG.md` para pasta `_changelog/`; cada versão é um arquivo separado; `CHANGELOG.md` funciona como índice

## Arquivos criados

- `_scripts/DashboardHelpers.js`
- `00-Dashboard/Weekly Dashboard.md`
- `_changelog/CHANGELOG v0.0.1.md` (conteúdo migrado)
- `_changelog/CHANGELOG v0.0.2.md` (este arquivo)
- `_changelog/CHANGELOG.md` (índice)

## Arquivos modificados

- `00-Dashboard/Daily Dashboard.md` — link Weekly Dashboard na nav
- `00-Dashboard/CHANGELOG.md` — deletado (substituído por `_changelog/`)

## Como verificar

- `00-Dashboard/Weekly Dashboard.md` em modo Preview → calendário da semana renderiza, tabela mood/energy aparece com cores
- `_scripts/DashboardHelpers.js` → confirmar que CustomJS está apontando para `_scripts` em Settings
- `00-Dashboard/Daily Dashboard.md` → tabela de navegação tem link `📆 Semanal`
- `_changelog/CHANGELOG.md` → índice lista v0.0.1 e v0.0.2 com links

---

[[CHANGELOG|← Índice]]
