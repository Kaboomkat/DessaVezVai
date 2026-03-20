---
type: changelog
version: 0.0.3
date: 2026-03-19
tags:
  - meta/changelog
---

# Changelog v0.0.3

**Data:** 2026-03-19
**Título:** Correção do Sistema Daily + Novo Sistema Emoji de Mood/Energia

---

## Mudanças e Bugs corrigidos

1. **QuickAdd Morning/Evening Review: templatePath removido** — QuickAdd não aplica mais template próprio; Templater cuida do conteúdo via folder trigger, eliminando conflito de dupla aplicação

2. **Morning Review Template: sintaxe QuickAdd → Templater** — `{{date:YYYY-MM-DD}}` substituído por `CHANGELOG v0.0.3`; data extraída do nome do arquivo com formatação pt-BR completa

3. **Evening Review Template: sintaxe QuickAdd → Templater** — mesma correção do Morning Review Template

4. **Novo sistema de emoji para mood e energia (escala 1-5):**
   - Mood: 😢 😕 😐 🙂 😄
   - Energia: 💤 😪 😐 🔥 ⚡
   - Gradiente de cor: #A93B16 (1/5) → #0F5D35 (5/5)
   - Dado armazenado no frontmatter como emoji diretamente

5. **Daily Note Template: Estado do Dia** — tabela `= this.mood_morning` substituída por DataviewJS que busca os valores nos review files; `mood_morning/evening`, `energy_morning/evening` removidos do frontmatter do daily note

6. **DashboardHelpers.js: rewrite completo** — funções `_emojiIndex()`, `_indexColor()`, `moodColor(v, type)`, `cell(v, type)`, `parseVal(v, type)`, `closestEmoji(avg, type)` para o novo sistema emoji; parâmetro `type` ('mood'|'energy') em todas as funções públicas

7. **Daily Dashboard "Entradas Recentes": JOIN com reviews** — DataviewJS atualizado para indexar reviews por data e fazer JOIN com daily notes; lê mood/energia diretamente dos review files; funções locais atualizadas para sistema emoji

8. **Daily Dashboard "Abrir Diário de Hoje"**: action atualizada de `Open today's daily note` para `Periodic Notes: Open today's daily note` (prefixo do plugin necessário em versões recentes)

9. **Weekly Dashboard**: chamadas `h.cell()` e `h.parseVal()` atualizadas com parâmetro `type`; linha de média usa `h.closestEmoji()` para exibir o emoji mais próximo da média semanal

---

## Arquitetura de dados (nova)

**Fonte única para mood/energia:** frontmatter dos review files
- `03-Daily/Morning Reviews/YYYY-MM-DD Morning Review.md` → `mood_morning`, `energy_morning`
- `03-Daily/Evening Reviews/YYYY-MM-DD Evening Review.md` → `mood_evening`, `energy_evening`
- Daily notes não carregam mais esses campos no frontmatter

---

## Arquivos modificados

- `.obsidian/plugins/quickadd/data.json`
- `_templates/daily/Morning Review Template.md`
- `_templates/daily/Evening Review Template.md`
- `_templates/daily/Daily Note Template.md`
- `_scripts/DashboardHelpers.js`
- `00-Dashboard/Daily Dashboard.md`
- `00-Dashboard/Weekly Dashboard.md`

## Como verificar

1. Clicar "🔄 Revisão da Manhã" no Daily Dashboard → arquivo criado em `03-Daily/Morning Reviews/` com data real e campos `mood_morning:` e `energy_morning:` vazios
2. Preencher `mood_morning: 🙂` e `energy_morning: 🔥` no frontmatter do review
3. Abrir daily note → "Estado do Dia" exibe 🙂 e 🔥
4. Daily Dashboard "Entradas Recentes" → célula colorida com emoji
5. Weekly Dashboard → tabela de humor/energia renderiza com emojis e cores; linha de média mostra emoji mais próximo

---

## Limitação conhecida (v0.0.4)

**Mood-Energy Tracker (Year/Month/Week):** ainda lê `mood_morning` etc. do frontmatter dos daily notes (agora vazio). Será corrigido na próxima sessão — precisará migrar as queries para os review files e adaptar o gradiente para escala 1-5.

---

[[CHANGELOG INDEX|← Índice]]
