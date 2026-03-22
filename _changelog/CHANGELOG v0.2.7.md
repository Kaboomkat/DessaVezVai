---
type: changelog
version: 0.2.7
date: 2026-03-22
tags:
  - meta/changelog
---

# Changelog v0.2.7

**Data:** 2026-03-22  
**Titulo:** Ponte de automacao externa via Local REST API

---

## Mudancas

1. **Camada nova em `_scripts/obsidian/`**: foi criado um modulo PowerShell para conversar com o plugin `obsidian-local-rest-api` sem tocar no wiring interno de dashboards, reviews ou templates diarios.
2. **Wrappers de alto nivel**: `Open-Inbox`, `Run-QuickCapture`, `Open-Daily`, `Open-WeeklyReview`, `Open-Review` e `Get-ObsidianCommands` passaram a existir como pontos de entrada prontos para automacao externa.
3. **Fallback seguro por URI**: onde a API nao for necessaria ou estiver offline, os scripts conseguem reutilizar `obsidian://open` e `obsidian://quickadd` sem depender de clique em interface nativa.
4. **Guardrail contra nota vazia**: a abertura de arquivo por script nao cria arquivo inexistente por padrao; isso evita reproduzir o problema de navegacao perigosa por alvo ambiguo.
5. **Documentacao operacional**: o vault agora tem uma nota dedicada descrevendo como usar a automacao, como a autenticacao e resolvida e quais fluxos continuam oficiais.

---

## Arquivos adicionados

- `_scripts/obsidian/ObsidianAutomation.psm1`
- `_scripts/obsidian/Test-ObsidianAutomation.ps1`
- `_scripts/obsidian/Open-Inbox.ps1`
- `_scripts/obsidian/Run-QuickCapture.ps1`
- `_scripts/obsidian/Open-Daily.ps1`
- `_scripts/obsidian/Open-WeeklyReview.ps1`
- `_scripts/obsidian/Open-Review.ps1`
- `_scripts/obsidian/Get-ObsidianCommands.ps1`
- `plugins/Obsidian Automation.md`

---

## Objetivo

Esta versao habilita automacao real do Obsidian por comando/API, mas sem reabrir os pontos frageis ja estabilizados em `00-Dashboard` e `03-Daily`.

[[CHANGELOG INDEX|<- Indice]]
