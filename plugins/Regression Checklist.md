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

## Configuracao

- [ ] `Templater.trigger_on_file_creation = false`
- [ ] `Templater.enable_folder_templates = false`
- [ ] `CustomJS.jsFolder = _scripts`
- [ ] `Periodic Notes` weekly/monthly apontam para `03-Daily/Reviews`
