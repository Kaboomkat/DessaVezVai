---
type: changelog
version: 0.2.1
date: 2026-03-20
tags:
  - meta/changelog
---

# Changelog v0.2.1

**Data:** 2026-03-20
**Titulo:** Destaque resiliente e weekly trackers canonicos

---

## Mudancas

1. **Fallback real para o Destaque do Dia**: dashboards e trackers semanais agora usam `highlight` do frontmatter quando ele existir e, se estiver vazio, leem o texto escrito dentro da secao `## Destaque do Dia` da daily note.
2. **Daily notes simplificadas**: o bloco `Destaque do Dia` deixou de depender de `` `= this.highlight` `` e passou a funcionar como area de texto livre, sem obrigar edicao de frontmatter.
3. **Indice do diario alinhado**: `03-Daily/Index de Diario.md` deixou de depender apenas do campo `highlight` e agora mostra o mesmo fallback do restante do vault.
4. **Weekly trackers gerados de forma canonica**: o script `RefreshMoodTrackers.ps1` agora emite os trackers semanais de 2026 e 2027, com `week_start`, `week_end` e navegacao valida, evitando que o tracker mensal aponte para notas inexistentes.
5. **Template semanal endurecido**: o template `Mood-Energy Week Template` passou a usar o mesmo fallback de destaque e a navegar para o hub do tracker, em vez de links genericos que podiam criar notas vazias.

---

## Arquivos modificados

- `00-Dashboard/Daily Dashboard.md`
- `00-Dashboard/Weekly Dashboard.md`
- `03-Daily/Index de Diario.md`
- `03-Daily/Journal/2026-03-19.md`
- `03-Daily/Journal/2026-03-20.md`
- `00-Dashboard/Mood-Energy Tracker/Weekly/2026/*.md`
- `00-Dashboard/Mood-Energy Tracker/Weekly/2027/*.md`
- `_scripts/DashboardHelpers.js`
- `_scripts/RefreshMoodTrackers.ps1`
- `_templates/daily/Daily Note Template.md`
- `_templates/daily/Mood-Energy Week Template.md`
- `_changelog/CHANGELOG INDEX.md`

---

## Objetivo

Esta versao faz o campo de destaque funcionar do jeito que voce escreve no diario e remove o ultimo caminho obvio do tracker mensal para criar nota semanal vazia.

[[CHANGELOG INDEX|<- Indice]]
