---
type: changelog
version: 0.2.3
date: 2026-03-20
tags:
  - meta/changelog
---

# Changelog v0.2.3

**Data:** 2026-03-20  
**Título:** Normalização visível de PT-BR e hardening da navegação rápida

---

## Mudanças

1. **PT-BR visível normalizado nas superfícies ativas**: dashboards, índice do diário, templates diários, templates dos trackers e o `README.md` ficaram com acentuação correta sem renomear arquivos, pastas, wikilinks, comandos, URIs do QuickAdd ou chaves de frontmatter.
2. **Navegação rápida reestruturada**: `Daily Dashboard` e `Weekly Dashboard` deixaram de usar tabela com links que quebravam por causa de `|` e passaram a usar uma navegação simples e legível.
3. **Reviews da navegação rápida deixaram de apontar para pastas**: os atalhos de manhã e noite agora reutilizam o fluxo atual do QuickAdd para abrir ou criar a review do dia, em vez de gerar nota vazia por wikilink de pasta.
4. **Notas materializadas limpas**: as daily notes e reviews já existentes de `2026-03-19`, `2026-03-20` e a weekly review `2026-W12` tiveram mojibake removido e texto visível normalizado.
5. **Trackers preservados com texto correto**: o gerador e os templates do `Mood-Energy Tracker` foram mantidos em UTF-8 limpo para que os arquivos gerados continuem legíveis nas próximas regenerações.

---

## Guardrails preservados

- Nenhum filename foi renomeado.
- Nenhum folder path foi alterado.
- Nenhuma URI `obsidian://quickadd` foi trocada.
- Nenhum nome interno de choice/comando foi traduzido.
- Nenhuma key de frontmatter foi alterada.

---

## Arquivos principais

- `README.md`
- `00-Dashboard/Daily Dashboard.md`
- `00-Dashboard/Weekly Dashboard.md`
- `03-Daily/Index de Diario.md`
- `03-Daily/Journal/2026-03-19.md`
- `03-Daily/Journal/2026-03-20.md`
- `03-Daily/Morning Reviews/2026-03-19 Morning Review.md`
- `03-Daily/Morning Reviews/2026-03-20 Morning Review.md`
- `03-Daily/Evening Reviews/2026-03-19 Evening Review.md`
- `03-Daily/Evening Reviews/2026-03-20 Evening Review.md`
- `03-Daily/Reviews/2026-W12.md`
- `_templates/daily/`
- `_scripts/RefreshMoodTrackers.ps1`

---

## Objetivo

Esta versão fecha a rodada de normalização de texto visível em PT-BR sem reabrir os bugs antigos de criação de notas, de paths ambíguos ou de integração entre `Buttons`, `QuickAdd`, `Templater` e `Periodic Notes`.

[[CHANGELOG INDEX|<- Índice]]
