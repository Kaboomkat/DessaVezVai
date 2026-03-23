---
type: changelog
version: 0.4.3
date: 2026-03-22
tags:
  - meta/changelog
---

# Changelog v0.4.3

**Data:** 2026-03-22
**Título:** Skills de workflow, hook de validação JSON e regras de segurança no CLAUDE.md

---

## Mudanças

1. **Custom Skill `/obsidian-debug`**: diagnóstico sistemático do vault em 5 etapas — configs, plugins, templates, scripts e relatório — sem fazer nenhuma mudança até aprovação do usuário.
2. **Custom Skill `/verify-first`**: workflow "leia primeiro, mude depois" que exige leitura e verificação de todos os caminhos antes de propor qualquer alteração.
3. **Custom Skill `/fix-one`**: workflow de mudança incremental — uma correção por vez, com verificação entre cada passo.
4. **Custom Skill `/diagnose`**: debugging estruturado com agentes paralelos investigando configs, caminhos e scripts simultaneamente.
5. **Hook PostToolUse para JSON**: validação automática de arquivos `.json` após cada Edit/Write, com aviso se a sintaxe estiver malformada.
6. **Regras de segurança no CLAUDE.md**: três regras adicionadas — verificação obrigatória de caminhos no Obsidian, uso de `where.exe`/`Get-Command` para configs Windows/MCP, e preservação de dados personalizados do usuário.

---

## Arquivos modificados

- `.claude/commands/obsidian-debug.md` — novo skill de diagnóstico
- `.claude/commands/verify-first.md` — novo skill de verificação prévia
- `.claude/commands/fix-one.md` — novo skill de correção incremental
- `.claude/commands/diagnose.md` — novo skill de debugging paralelo
- `.claude/settings.json` — novo hook de validação JSON
- `CLAUDE.md` — seção "Regras de Segurança" adicionada
- `_changelog/CHANGELOG v0.4.3.md`

---

## Objetivo

Implementar as sugestões do relatório `/insights` para prevenir os padrões problemáticos mais frequentes: adivinhação de caminhos, mudanças excessivas em cascata, e falta de verificação antes de declarar pronto.

[[CHANGELOG INDEX|<- Índice]]
