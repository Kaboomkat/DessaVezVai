---
type: changelog
version: 0.0.1
date: 2026-03-19
tags:
  - meta/changelog
---

# Changelog v0.0.1

**Data:** 2026-03-19
**Título:** Correção de 5 bugs no Mood-Energy Tracker e QuickAdd

---

## Bugs corrigidos

1. **QuickAdd Month Tracker pasta errada** — `mood-month-tracker` apontava para `Yearly/`, agora aponta para `Monthly/`
2. **QuickAdd Week Tracker pasta errada** — `mood-week-tracker` apontava para `Yearly/`, agora aponta para `Weekly/` + pasta `Weekly/` criada
3. **Year Tracker: href dos cards mensais** — `href="Monthly/{year}/{mStr}"` corrigido para `href="00-Dashboard/Mood-Energy Tracker/Monthly/{year}/{mStr}"` (caminho vault-relativo completo)
4. **Month Tracker: wiki links de semanas** — `[[Weekly/...]]` dentro de `dv.container.innerHTML` não funciona (Obsidian não processa wiki links em HTML injetado); substituído por `<a class="internal-link">` com href completo
5. **2026-03-17.md frontmatter antigo** — chaves `mood:` e `energy:` substituídas por `mood_morning`, `energy_morning`, `mood_evening`, `energy_evening` (todos "5")

## Arquivos modificados

- `.obsidian/plugins/quickadd/data.json`
- `_templates/daily/Mood-Energy Year Template.md`
- `_templates/daily/Mood-Energy Month Template.md`
- `00-Dashboard/Mood-Energy Tracker/Yearly/2026.md`
- `00-Dashboard/Mood-Energy Tracker/Yearly/2027.md`
- `00-Dashboard/Mood-Energy Tracker/Monthly/2026/01.md` até `12.md` (12 arquivos)
- `03-Daily/Journal/2026-03-17.md`
- `00-Dashboard/Mood-Energy Tracker/Weekly/.gitkeep` (criado)

## Como verificar

- QuickAdd → "New Month Tracker" → arquivo criado em `Monthly/2026/`
- QuickAdd → "New Week Tracker" → arquivo criado em `Weekly/2026/`
- `Yearly/2026.md` → clicar card de mês → navega para tracker mensal correto
- `Monthly/2026/03.md` → seção "Semanas:" mostra links clicáveis (não texto `[[...]]`)
- `Monthly/2026/03.md` → dia 17 aparece colorido no calendário (5/10 = laranja médio)

---

[[CHANGELOG|← Índice]]
