---
title: Regression Checklist
type: qa
tags:
  - meta/qa
  - checklist
---

# Regression Checklist

## Criacao de notas

- [ ] `Periodic Notes: Open daily note` cria ou abre `03-Daily/Journal/YYYY-MM-DD.md`
- [ ] `Periodic Notes: Open weekly note` cria ou abre uma nota em `03-Daily/Reviews/`
- [ ] `QuickAdd: Morning Review` cria ou abre `03-Daily/Morning Reviews/YYYY-MM-DD Morning Review.md`
- [ ] `QuickAdd: Evening Review` cria ou abre `03-Daily/Evening Reviews/YYYY-MM-DD Evening Review.md`

## Reviews

- [ ] A review da manha abre com frontmatter `mood_morning` e `energy_morning`
- [ ] A review da noite abre com frontmatter `mood_evening` e `energy_evening`
- [ ] Os botoes inline de emoji atualizam o frontmatter sem apagar o corpo da nota

## Dashboards

- [ ] `Daily Dashboard` mostra mood e energia dos review files
- [ ] `Weekly Dashboard` mostra a tabela de humor e energia sem erro de CustomJS
- [ ] `Mood-Energy Tracker` anual e mensal le review files, nao daily frontmatter
- [ ] `Mood-Energy Tracker` anual usa a media do dia entre manha e noite e abre a daily note quando ela existir
- [ ] `Daily Dashboard` mostra `scheduled_for = hoje` em um bloco separado de hard landscape
- [ ] `Weekly Dashboard` mostra tarefas agendadas da semana sem interferir no fluxo do `Periodic Notes`

## GTD

- [ ] `QuickAdd: Quick Capture` cria uma nota semantica em `04-Tasks/Inbox/` sem formulario manual de triagem
- [ ] `QuickAdd: Process Inbox Item` move corretamente para `Next`, `Waiting`, `Reference`, `Someday`, `Project` ou `Snippets`
- [ ] Promover um item para projeto cria 1 nota em `02-Projects/Active` e 1 proxima acao em `04-Tasks/Next`
- [ ] `QuickAdd: Complete Task` sincroniza checkbox, `status: done` e `completed_date`
- [ ] Links GTD para Inbox, Next, Waiting, Reference, Projects e Snippets abrem notas-canone e nao criam arquivos vazios

## Configuracao

- [ ] `Templater.trigger_on_file_creation = false`
- [ ] `Templater.enable_folder_templates = false`
- [ ] `CustomJS.jsFolder = _scripts`
- [ ] `Periodic Notes` weekly/monthly apontam para `03-Daily/Reviews`
- [ ] `Obsidian Sync -> Sync all other types` esta ativo nos devices que usam o vault
- [ ] Reviews e trackers continuam abrindo sem erro mesmo quando o `CustomJS` ainda nao reidratou a configuracao no mobile

## Automacao externa

- [ ] `_scripts/obsidian/Test-ObsidianAutomation.ps1` retorna `api_online = True` quando o Obsidian desktop esta aberto
- [ ] `_scripts/obsidian/Open-Inbox.ps1` abre `04-Tasks/Inbox/Inbox.md` sem criar arquivo vazio
- [ ] `_scripts/obsidian/Run-QuickCapture.ps1` aciona o fluxo de `Quick Capture`
- [ ] `_scripts/obsidian/Open-Daily.ps1` abre a nota diaria pelo comando real do `Periodic Notes`
- [ ] `_scripts/obsidian/Open-WeeklyReview.ps1` abre a nota semanal pelo comando real do `Periodic Notes`
- [ ] `_scripts/obsidian/Open-Review.ps1 -Type Morning|Evening` reaproveita o URI contextual do `QuickAdd`
