---
title: Templates
type: index
---

# 📋 Templates

All templates for the vault. Use with Templater plugin (`Alt + T`) or QuickAdd (`Ctrl/Cmd + Q`).

---

## ✍️ Writing Templates

| Template | Purpose | Folder |
|----------|---------|--------|
| [[Manuscript Template]] | Novel/book projects | `01-Writing/Manuscripts/` |
| [[Scene Template]] | Individual scenes/chapters | `01-Writing/Manuscripts/` |
| [[Character Template]] | Character profiles | `01-Writing/Characters/` |
| [[Worldbuilding Template]] | World/setting entries | `01-Writing/Worldbuilding/` |
| [[Research Template]] | Research notes | `01-Writing/Research/` |
| [[Snippet Template]] | Quick ideas/fragments | `01-Writing/Snippets/` |

---

## ✅ GTD / Task Templates

| Template | Purpose | Folder |
|----------|---------|--------|
| [[Task Template]] | Individual tasks | `04-Tasks/Next/` |
| [[Project Template]] | Multi-step projects | `02-Projects/Active/` |
| [[Quick Capture Template]] | Fast inbox capture | `04-Tasks/Inbox/` |
| [[Someday Template]] | Future ideas | `02-Projects/Someday/` |

---

## 📅 Daily / Review Templates

| Template | Purpose | Folder |
|----------|---------|--------|
| [[Daily Note Template]] | Daily journal entry | `03-Daily/Journal/` |
| [[Monthly Review Template]] | Monthly reflection | `03-Daily/Reviews/` |
| [[Morning Review Template]] | Morning planning review | `03-Daily/Morning Reviews/` |
| [[Evening Review Template]] | Evening shutdown review | `03-Daily/Evening Reviews/` |

*Weekly Review is a permanent note at `03-Daily/Reviews/Weekly Review.md`*

### Review Flow

- `Daily Note Template` is the hub for each day and reads mood/energy from the review notes.
- `Morning Review Template` is the source of truth for `mood_morning` and `energy_morning`.
- `Evening Review Template` is the source of truth for `mood_evening` and `energy_evening`.
- `Weekly Dashboard`, monthly trackers, and yearly trackers should read only from the review files above.

---

## 📚 Resource Templates

| Template | Purpose | Folder |
|----------|---------|--------|
| [[Book Template]] | Book notes | `05-Resources/Books/` |
| [[Article Template]] | Article summaries | `05-Resources/Articles/` |
| [[Contact Template]] | People/contacts | `05-Resources/Contacts/` |
| [[Definition Template]] | Terms/concepts | `05-Resources/Definitions/` |

---

## ⚙️ Template Setup

### Templater Configuration

In Templater settings, set template folder paths:

| Folder Path | Template |
|-------------|----------|
| `01-Writing/Manuscripts` | `_templates/writing/Manuscript Template` |
| `01-Writing/Characters` | `_templates/writing/Character Template` |
| `01-Writing/Worldbuilding` | `_templates/writing/Worldbuilding Template` |
| `01-Writing/Research` | `_templates/writing/Research Template` |
| `01-Writing/Snippets` | `_templates/writing/Snippet Template` |
| `02-Projects/Active` | `_templates/gtd/Project Template` |
| `02-Projects/Someday` | `_templates/gtd/Someday Template` |
| `03-Daily/Journal` | `_templates/daily/Daily Note Template` |
| `04-Tasks/Inbox` | `_templates/gtd/Quick Capture Template` |
| `04-Tasks/Next` | `_templates/gtd/Task Template` |
| `05-Resources/Books` | `_templates/resources/Book Template` |
| `05-Resources/Articles` | `_templates/resources/Article Template` |
| `05-Resources/Contacts` | `_templates/resources/Contact Template` |
| `05-Resources/Definitions` | `_templates/resources/Definition Template` |

### QuickAdd Configuration

Set up these QuickAdd macros:
- **New Writing Session** → Opens today's writing focus
- **Quick Capture** → Creates inbox item
- **New Scene** → Scene Template in Manuscripts
- **New Character** → Character Template
- **Morning Review** → Opens daily note + tasks
- **Evening Review** → Opens daily note evening section

### Plugin Contract

Required for the current vault logic:
- **Dataview** → all dashboards and trackers
- **Templater** → all templates under `_templates/`
- **CustomJS** → loads `_scripts/DashboardHelpers.js`
- **QuickAdd** → buttons that create notes or run review flows
- **Periodic Notes** → `Open today's daily note` and weekly note commands
- **Buttons** → dashboard action buttons

Operational rule:
- This repo does not currently version `.obsidian/`, so plugin installation alone is not enough. Recreate the plugin settings and macro names documented in the vault.

---

[[Home|← Home]]
