---
type: changelog
version: 0.1.6
date: 2026-03-20
tags:
  - meta/changelog
---

# Changelog v0.1.6

**Data:** 2026-03-20
**Titulo:** Arquitetura de review via QuickAdd URI

---

## Mudancas

1. **QuickAdd restaurado**: o arquivo `.obsidian/plugins/quickadd/data.json` voltou ao estado versionado com as choices registradas, incluindo `Morning Review` e `Evening Review`.
2. **Buttons desacoplado de command lookup**: os botoes de review no Daily Dashboard e nas daily notes passaram de `type command` para `type link` com `obsidian://quickadd?...`.
3. **Create-or-open canonico**: as choices de `Morning Review` e `Evening Review` agora usam `fileExistsMode: "Nothing"`, que no QuickAdd atual cria o arquivo se nao existir e abre o existente sem tentar sobrescrever.
4. **Template futuro alinhado**: o `Daily Note Template` foi atualizado para usar a mesma arquitetura dos arquivos diarios ja existentes.

---

## Arquivos modificados

- `.obsidian/plugins/quickadd/data.json`
- `00-Dashboard/Daily Dashboard.md`
- `03-Daily/Journal/2026-03-19.md`
- `03-Daily/Journal/2026-03-20.md`
- `_templates/daily/Daily Note Template.md`

---

## Arquitetura

`Buttons (link) -> obsidian://quickadd?choice=... -> QuickAdd choice -> Templater on file creation -> review file`

---

## Objetivo

Esta versao remove a dependencia fragil de lookup por nome do `Buttons` e passa a usar o handler nativo de URI do QuickAdd para reviews.

[[CHANGELOG INDEX|<- Indice]]
