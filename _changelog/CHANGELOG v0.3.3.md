---
type: changelog
version: 0.3.3
date: 2026-03-22
tags:
  - meta/changelog
---

# Changelog v0.3.3

**Data:** 2026-03-22
**Título:** Templates rápidos e índices canônicos para Resources e Writing

---

## Mudanças

1. **Resources com hotkeys versionadas**: `New Contact`, `New Book Note`, `New Article` e `New Definition` agora têm atalhos definidos em `.obsidian/hotkeys.json`.
2. **Research entrou no fluxo oficial do QuickAdd**: foi adicionada a choice `New Research`, criando notas em `01-Writing/Research` como comando estável do vault.
3. **Templates de escrita ganharam resumo canônico**: `Worldbuilding`, `Character` e `Research` agora usam `summary:` no frontmatter para alimentar índices e visões Dataview.
4. **Índices seguros criados**: `Worldbuilding`, `Characters`, `Research`, `Contacts`, `Books`, `Articles` e `Definitions` passaram a ter `Index.md` real com botão de criação e tabela Dataview.
5. **Navegação endurecida**: dashboards e templates deixaram de apontar para pastas nuas e passaram a abrir os novos índices canônicos.

---

## Arquivos modificados

- `.obsidian/hotkeys.json`
- `.obsidian/plugins/quickadd/data.json`
- `_templates/writing/Worldbuilding Template.md`
- `_templates/writing/Character Template.md`
- `_templates/writing/Research Template.md`
- `_templates/resources/Contact Template.md`
- `_templates/resources/Book Template.md`
- `_templates/resources/Article Template.md`
- `_templates/resources/Definition Template.md`
- `00-Dashboard/Writing Dashboard.md`
- `00-Dashboard/Resources Dashboard.md`
- `plugins/Command Contract.md`
- `01-Writing/Worldbuilding/Index.md`
- `01-Writing/Characters/Index.md`
- `01-Writing/Research/Index.md`
- `05-Resources/Contacts/Index.md`
- `05-Resources/Books/Index.md`
- `05-Resources/Articles/Index.md`
- `05-Resources/Definitions/Index.md`
- `_changelog/CHANGELOG v0.3.3.md`
- `_changelog/CHANGELOG INDEX.md`

---

## Objetivo

Esta versão transforma templates já existentes em fluxo utilizável por comando e hotkey, e fecha a navegação perigosa por link de pasta nas áreas de Resources e Writing.

[[CHANGELOG INDEX|<- Índice]]
