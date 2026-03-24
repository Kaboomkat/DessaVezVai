---
type: changelog
version: 0.4.6
date: 2026-03-24
tags:
  - meta/changelog
---

# Changelog v0.4.6

**Data:** 2026-03-24
**Titulo:** Full Calendar + fix de duplicacao no Calendar Beta

---

## Mudancas

1. **Full Calendar instalado (v0.10.7)**: plugin `obsidian-full-calendar` adicionado ao vault com config padrao segura (semana comeca na segunda, vista semanal no desktop, formato 24h). Roda ao lado do `calendar-beta` sem conflitos.
2. **Calendar Beta: fix de duplicacao no settings**: corrigido bug no `registerSource` que empurrava fontes duplicadas toda vez que o painel reabria. Adicionado guard de idempotencia (`if (val.some(...))`) no `main.js`.
3. **Calendar Beta: sourceSettings explicitados**: substituido `sourceSettings: {}` por config explicita com as cores e modos de exibicao canonicos, eliminando a geracao duplicada de defaults pelo plugin.

---

## Arquivos modificados

- `.obsidian/plugins/obsidian-full-calendar/manifest.json` - plugin v0.10.7 (novo)
- `.obsidian/plugins/obsidian-full-calendar/main.js` - codigo do plugin (novo)
- `.obsidian/plugins/obsidian-full-calendar/styles.css` - estilos do plugin (novo)
- `.obsidian/plugins/obsidian-full-calendar/data.json` - config padrao segura (novo)
- `.obsidian/community-plugins.json` - adicionado `obsidian-full-calendar` a lista de plugins habilitados
- `.obsidian/plugins/calendar/main.js` - guard de duplicacao no `registerSource`
- `.obsidian/plugins/calendar/data.json` - sourceSettings explicitos com campos canonicos
- `_changelog/CHANGELOG v0.4.6.md`
- `_changelog/CHANGELOG INDEX.md`

---

## Objetivo

Adicionar visualizacao de calendario em pagina cheia (Full Calendar) mantendo o mini-calendario lateral (Calendar Beta), e corrigir bug visual de fontes triplicadas no settings do Calendar Beta.

[[CHANGELOG INDEX|<- Indice]]
