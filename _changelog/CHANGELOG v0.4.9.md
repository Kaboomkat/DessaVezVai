---
type: changelog
version: 0.4.9
date: 2026-03-25
tags:
  - meta/changelog
---

# Changelog v0.4.9

**Data:** 2026-03-25
**Titulo:** Sync automatico do Destaque do Dia para frontmatter

---

## Mudancas

1. **Novo metodo `syncHighlightToFrontmatter()`**: adicionado em `DashboardHelpers.js`. Extrai o texto da secao "## Destaque do Dia" do corpo da nota e grava na propriedade `highlight` do frontmatter via `processFrontMatter()`. So atualiza se o conteudo for diferente do atual.
2. **Sync automatico na Revisao da Noite**: o Evening Review Template agora chama `syncHighlightToFrontmatter()` ao ser criado, sincronizando o destaque da nota diaria correspondente.
3. **Botao de sync manual no Daily Note Template**: botao "Sincronizar Destaque" adicionado na secao Destaque do Dia, permitindo sync a qualquer momento sem esperar a revisao da noite.

---

## Arquivos modificados

- `_scripts/DashboardHelpers.js` - novo metodo `syncHighlightToFrontmatter()`
- `_templates/daily/Evening Review Template.md` - chamada automatica do sync
- `_templates/daily/Daily Note Template.md` - botao de sync manual
- `_changelog/CHANGELOG v0.4.9.md`
- `_changelog/CHANGELOG INDEX.md`

---

## Contexto tecnico

A propriedade `highlight` no frontmatter YAML e a secao `## Destaque do Dia` no corpo da nota eram independentes — o usuario escrevia na secao do corpo mas a propriedade ficava vazia. O `DashboardHelpers` ja tinha `resolveHighlight()` que fazia fallback do frontmatter pro corpo, mas nao sincronizava. O novo metodo fecha esse gap usando a mesma API (`processFrontMatter`) ja utilizada em `ReviewControls.updateFrontmatterField()`.

[[CHANGELOG INDEX|<- Indice]]
