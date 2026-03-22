---
title: Obsidian Automation
type: setup
tags:
  - meta/setup
  - plugins
  - automation
---

# Obsidian Automation

Esta camada adiciona automacao externa segura para o vault sem depender de clique por coordenada.

## Principio

- `00-Dashboard` e `03-Daily` continuam usando `Buttons`, `QuickAdd`, `Templater` e `Periodic Notes`.
- A automacao externa fala com o Obsidian por `Local REST API` quando o app esta aberto.
- Onde fizer mais sentido, os scripts usam `obsidian://` como fallback sem tocar nos arquivos sensiveis do fluxo diario.

## Onde estao os scripts

- `_scripts/obsidian/ObsidianAutomation.psm1`
- `_scripts/obsidian/Test-ObsidianAutomation.ps1`
- `_scripts/obsidian/Open-Inbox.ps1`
- `_scripts/obsidian/Run-QuickCapture.ps1`
- `_scripts/obsidian/Open-Daily.ps1`
- `_scripts/obsidian/Open-WeeklyReview.ps1`
- `_scripts/obsidian/Open-Review.ps1`
- `_scripts/obsidian/Get-ObsidianCommands.ps1`

## Como a autenticacao funciona

Os scripts tentam nesta ordem:

1. `OBSIDIAN_REST_API_KEY`
2. `OBSIDIAN_LOCAL_REST_API_KEY`
3. `apiKey` em `.obsidian/plugins/obsidian-local-rest-api/data.json`

Para evitar expor a chave no historico do terminal, prefira usar variavel de ambiente:

```powershell
$env:OBSIDIAN_REST_API_KEY = "sua-chave-aqui"
```

## Comandos prontos

```powershell
powershell -ExecutionPolicy Bypass -File "_scripts\\obsidian\\Test-ObsidianAutomation.ps1"
powershell -ExecutionPolicy Bypass -File "_scripts\\obsidian\\Open-Inbox.ps1"
powershell -ExecutionPolicy Bypass -File "_scripts\\obsidian\\Run-QuickCapture.ps1"
powershell -ExecutionPolicy Bypass -File "_scripts\\obsidian\\Open-Daily.ps1"
powershell -ExecutionPolicy Bypass -File "_scripts\\obsidian\\Open-WeeklyReview.ps1"
powershell -ExecutionPolicy Bypass -File "_scripts\\obsidian\\Open-Review.ps1" -Type Morning
powershell -ExecutionPolicy Bypass -File "_scripts\\obsidian\\Open-Review.ps1" -Type Evening -Date 2026-03-22
```

## Guardrails

- `Open-Inbox.ps1` nao abre arquivo inexistente por padrao.
- `Open-Daily.ps1` e `Open-WeeklyReview.ps1` usam os IDs reais do plugin `periodic-notes`.
- `Run-QuickCapture.ps1` usa `quickadd:choice:quick-capture` quando a API esta online e cai para URI do QuickAdd quando necessario.
- `Open-Review.ps1` usa URI do QuickAdd com `review_date`, preservando o fluxo contextual que ja existe nas daily notes.

## Quando a API esta offline

Se `Test-ObsidianAutomation.ps1` mostrar `api_online = False`, abra o Obsidian desktop e mantenha o plugin `Local REST API` ativo.

Hoje, neste ambiente, a configuracao existe, mas a porta `27124` estava recusando conexao no momento do teste. Isso indica app fechado, plugin pausado ou servidor ainda nao inicializado.
