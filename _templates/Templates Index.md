---
title: Templates
type: index
---

# Templates

All templates for the vault. Use with Templater (`Alt + T`) or QuickAdd (`Ctrl/Cmd + Q`).

---

## Writing Templates

| Template | Purpose | Folder |
|----------|---------|--------|
| [[Manuscript Template]] | Novel/book projects | `01-Writing/Manuscripts/` |
| [[Scene Template]] | Individual scenes/chapters | `01-Writing/Manuscripts/` |
| [[Character Template]] | Character profiles | `01-Writing/Characters/` |
| [[Worldbuilding Template]] | World/setting entries | `01-Writing/Worldbuilding/` |
| [[Research Template]] | Research notes | `01-Writing/Research/` |
| [[Snippet Template]] | Quick ideas/fragments | `01-Writing/Snippets/` |

---

## GTD / Task Templates

| Template | Purpose | Folder |
|----------|---------|--------|
| [[Task Template]] | Individual tasks | `04-Tasks/Next/` |
| [[Project Template]] | Multi-step projects | `02-Projects/Active/` |
| [[Quick Capture Template]] | Fast inbox capture | `04-Tasks/Inbox/` |
| [[Someday Template]] | Future ideas | `02-Projects/Someday/` |

---

## Daily / Review Templates

| Template | Purpose | Folder |
|----------|---------|--------|
| [[Daily Note Template]] | Daily journal entry | `03-Daily/Journal/` |
| [[Monthly Review Template]] | Monthly reflection | `03-Daily/Reviews/` |
| [[Morning Review Template]] | Morning planning review | `03-Daily/Morning Reviews/` |
| [[Evening Review Template]] | Evening shutdown review | `03-Daily/Evening Reviews/` |

*Weekly Review is a permanent note at `03-Daily/Reviews/Weekly Review.md`.*

### Review Flow

- `Daily Note Template` is the hub for each day and reads mood/energy from the review notes.
- `Morning Review Template` is the source of truth for `mood_morning` and `energy_morning`.
- `Evening Review Template` is the source of truth for `mood_evening` and `energy_evening`.
- `Weekly Dashboard`, monthly trackers, and yearly trackers should read only from the review files above.

---

## Resource Templates

| Template | Purpose | Folder |
|----------|---------|--------|
| [[Book Template]] | Book notes | `05-Resources/Books/` |
| [[Article Template]] | Article summaries | `05-Resources/Articles/` |
| [[Knowledge Template]] | Permanent notes | `05-Resources/Knowledge/` |
| [[Contact Template]] | People/contacts | `05-Resources/Contacts/` |
| [[Definition Template]] | Terms/concepts | `05-Resources/Definitions/` |

---

## Template Setup

### Templater Configuration

Keep these flags disabled:

- `trigger_on_file_creation = false`
- `enable_folder_templates = false`

Templates should be rendered by `QuickAdd` or `Periodic Notes`, not by folder ownership.

### QuickAdd Configuration

Expected commands:

- `Quick Capture`
- `Process Inbox Item`
- `Complete Task`
- `New Scene`
- `New Character`
- `New Worldbuilding`
- `New Research`
- `New Snippet`
- `New Project`
- `New Someday`
- `New Book Note`
- `New Article`
- `New Knowledge Note`
- `New Contact`
- `New Definition`

### Layer Model

- `04-Tasks/Inbox` handles fleeting operational capture.
- `01-Writing/Snippets` handles fleeting creative capture.
- `03-Daily/Journal` handles fleeting contextual capture.
- `Books`, `Articles`, and `Research` are source notes.
- `Knowledge` stores only rewritten, reusable permanent notes.

---

[[Home|<- Home]]
