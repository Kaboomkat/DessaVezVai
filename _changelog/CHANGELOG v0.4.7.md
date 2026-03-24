---
type: changelog
version: 0.4.7
date: 2026-03-24
tags:
  - meta/changelog
---

# Changelog v0.4.7

**Data:** 2026-03-24
**Titulo:** Calendar Bases + configuracao do Full Calendar com fontes do vault

---

## Mudancas

1. **Calendar Bases instalado (v0.2.2)**: plugin `calendar-bases` adicionado ao vault. Estende o core Bases com vista de calendario — zero config, leitura pura do frontmatter.
2. **Full Calendar configurado com 4 fontes locais**: o plugin agora le eventos de `04-Tasks/Next` (cor laranja), `04-Tasks/Inbox` (cor amarela), `03-Daily/Events` (cor verde) e `02-Projects/Active` (cor azul). Usa os campos `date`, `due`, `startTime`, `endTime` ja padronizados no vault.
3. **Pasta `03-Daily/Events/` criada**: local dedicado para eventos de calendario. O Full Calendar cria notas aqui por padrao ao clicar no calendario.
4. **Template de evento criado**: `_templates/daily/Event Template.md` com frontmatter alinhado ao padrao do vault (`type`, `date`, `created`, `tags`) e campos do Full Calendar (`startTime`, `endTime`, `endDate`, `allDay`).

---

## Arquivos modificados

- `.obsidian/plugins/calendar-bases/manifest.json` - plugin v0.2.2 (novo)
- `.obsidian/plugins/calendar-bases/main.js` - codigo do plugin (novo)
- `.obsidian/plugins/calendar-bases/styles.css` - estilos do plugin (novo)
- `.obsidian/plugins/obsidian-full-calendar/data.json` - 4 fontes locais configuradas
- `.obsidian/community-plugins.json` - adicionado `calendar-bases`
- `03-Daily/Events/.gitkeep` - pasta de eventos (nova)
- `_templates/daily/Event Template.md` - template de evento (novo)
- `_changelog/CHANGELOG v0.4.7.md`
- `_changelog/CHANGELOG INDEX.md`

---

## Objetivo

Completar o ecossistema de calendario no vault: Calendar Beta (mini-calendario lateral), Full Calendar (vista de pagina cheia lendo tarefas e eventos do vault) e Calendar Bases (vista de calendario dentro do Bases nativo). Workflow planejado: editar eventos localmente no Full Calendar e sincronizar com Google Calendar via MCP gcal sob demanda.

[[CHANGELOG INDEX|<- Indice]]
