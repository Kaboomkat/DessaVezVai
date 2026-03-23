---
type: changelog
version: 0.4.2
date: 2026-03-22
tags:
  - meta/changelog
---

# Changelog v0.4.2

**Data:** 2026-03-22
**Título:** Correção de interações frágeis e centralização do internalLink

---

## Mudanças

1. **Race condition em `completeTask()` corrigida**: o `vault.read(file)` agora acontece *depois* de `processFrontMatter`, evitando que o conteúdo antigo sobrescreva silenciosamente as mudanças de frontmatter (`status: "done"`, `completed_date`, `tags`).
2. **`internalLink` centralizado em DashboardHelpers**: a função que antes era definida 3 vezes no [RefreshMoodTrackers.ps1](_scripts/RefreshMoodTrackers.ps1) e embutida em cada tracker agora vive como método canônico em [DashboardHelpers.js](_scripts/DashboardHelpers.js). Os 130+ trackers e 3 templates foram regenerados para usar `h.internalLink(...)`.
3. **HTML escaping completo**: o helper `attr` dentro de `internalLink` agora escapa `&`, `"`, `<` e `>` (antes só escapava `"`).
4. **ReviewControls delega cor para DashboardHelpers**: `_indexColor` em [ReviewControls.js](_scripts/ReviewControls.js) aceita um `helpers` opcional e delega quando disponível, eliminando risco de divergência silenciosa de cores entre dashboards e pickers.
5. **Rename `_emojiIndex` → `_optionIndex`** em ReviewControls: torna explícita a diferença de assinatura entre o método de ReviewControls (`{value,label}[]`) e o de DashboardHelpers (`string[]`).
6. **Links do Manuscript Template corrigidos**: `[[_templates/Character Template|...]]` e `[[_templates/Worldbuilding Template|...]]` agora apontam para `_templates/writing/`.
7. **Documentação de duplicação intencional**: comentários em [GtdWorkflow.js](_scripts/quickadd/GtdWorkflow.js) explicam que `stripAccents`/`normalizeHeading`/`findSection` são duplicatas intencionais de DashboardHelpers (módulos incompatíveis: CommonJS vs CustomJS).

---

## Arquivos modificados

- `_scripts/DashboardHelpers.js` — novo método `internalLink` com escaping completo
- `_scripts/ReviewControls.js` — delegação de `_indexColor` + rename `_optionIndex`
- `_scripts/quickadd/GtdWorkflow.js` — fix race condition + comentários de documentação
- `_scripts/RefreshMoodTrackers.ps1` — removidas 3 definições inline de `internalLink`/`attr`
- `_templates/writing/Manuscript Template.md` — links corrigidos
- `_templates/daily/Mood-Energy Week Template.md` — migrado para `h.internalLink`
- `_templates/daily/Mood-Energy Month Template.md` — migrado para `h.internalLink`
- `_templates/daily/Mood-Energy Year Template.md` — migrado para `h.internalLink`
- `00-Dashboard/Mood-Energy Tracker/` — 130+ trackers regenerados
- `_changelog/CHANGELOG v0.4.2.md`

---

## Objetivo

Eliminar fragilidades estruturais identificadas por code review: uma race condition que corrompia dados de tarefas, lógica duplicada entre scripts que divergia silenciosamente, e um padrão de geração que causava cascatas de 152+ arquivos quebrados quando o formato de link mudava.

[[CHANGELOG INDEX|<- Índice]]
