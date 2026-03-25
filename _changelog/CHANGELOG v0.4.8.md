---
type: changelog
version: 0.4.8
date: 2026-03-24
tags:
  - meta/changelog
---

# Changelog v0.4.8

**Data:** 2026-03-24
**Titulo:** Hotfix do timezone de eventos ICS no Full Calendar

---

## Mudancas

1. **Corrigido offset de +3h em eventos ICS**: eventos do Google Calendar via feed ICS apareciam com horario UTC em vez do horario local. Patch aplicado em `getTime3()` e nova funcao `getDateLocal()` para converter timestamps de eventos nao-recorrentes pro timezone do sistema (GMT-3).
2. **Timezone do Full Calendar ajustado para `local`**: removido `America/Bahia` (nao suportado sem plugin extra) e setado `local` que delega pro timezone do Windows.

---

## Arquivos modificados

- `.obsidian/plugins/obsidian-full-calendar/main.js` - patch de timezone no parsing ICS (funcoes `getTime3`, `getDateLocal`, bloco `icsToOFC`)
- `.obsidian/plugins/obsidian-full-calendar/data.json` - timeZone alterado para `local`
- `_changelog/CHANGELOG v0.4.8.md`
- `_changelog/CHANGELOG INDEX.md`

---

## Contexto tecnico

O bug e conhecido no repositorio do plugin (issues #311, #481, #580, #608) com multiplos PRs abertos e nunca mergeados (#464, #527, #539, #540). A funcao `getTime3()` formatava timestamps com `zone: "UTC"` hardcoded. Eventos ICS do Google gravam `DTSTART` em UTC (ex: `20260325T130000Z`), resultando em exibicao 3h adiantada. O patch adiciona parametro `useLocal` que usa `zone: "local"` via Luxon, resolvendo a conversao pelo timezone do SO.

**Nota:** patch aplicado no JS compilado do plugin. Sera sobrescrito se o plugin atualizar — nesse caso, reaplicar o fix ou verificar se a versao nova corrigiu nativamente.

[[CHANGELOG INDEX|<- Indice]]
