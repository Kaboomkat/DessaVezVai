---
type: changelog
version: 0.4.6
date: 2026-03-24
date: 2026-03-23
tags:
  - meta/changelog
---

# Changelog v0.4.6

**Data:** 2026-03-24
**Titulo:** Full Calendar + fix de duplicacao no Calendar Beta

---

## Mudancas

1. **Full Calendar instalado (v0.10.7)**: plugin `obsidian-full-calendar` adicionado ao vault com config padrao segura (semana comeca na segunda, vista semanal no desktop, formato 24h). Roda ao lado do `calendar-beta` sem conflitos.
2. **Calendar Beta: fix de duplicacao no settings**: corrigido bug no `registerSource` que empurrava fontes duplicadas toda vez que o painel reabria. Adicionado guard de idempotencia (`if (val.some(...))`) no `main.js`.
3. **Calendar Beta: sourceSettings explicitados**: substituido `sourceSettings: {}` por config explicita com as cores e modos de exibicao canonicos, eliminando a geracao duplicada de defaults pelo plugin.
**Data:** 2026-03-23
**Título:** Reestruturação do Definition Template para formato orientado a tabelas

---

## Mudanças

1. **Definition Template reestruturado**: a nota agora segue o mesmo contrato visual dos contatos reais, com um callout explicando o papel das propriedades e do corpo da nota.
2. **Remoção de inline Dataview**: saíram os trechos `= this.category` e `= this.source`, evitando dependência de inline queries para ler metadados básicos.
3. **Resumo estruturado em tabela**: foi adicionada uma tabela `dataviewjs` para exibir categoria, relações, fonte principal, data de criação e tags do conceito.
4. **Corpo mais preenchível e menos mágico**: seções como detalhamento, conceitos relacionados, exemplos, fontes e uso na escrita agora usam tabelas Markdown simples, mais próximas do fluxo de edição manual.
5. **Fim do bloco automático de relacionados baseado em `this`**: a seção de relações passou a ser explícita e editável, reduzindo fragilidade de template e melhorando legibilidade.

---

## Arquivos modificados

- `.obsidian/plugins/obsidian-full-calendar/manifest.json` - plugin v0.10.7 (novo)
- `.obsidian/plugins/obsidian-full-calendar/main.js` - codigo do plugin (novo)
- `.obsidian/plugins/obsidian-full-calendar/styles.css` - estilos do plugin (novo)
- `.obsidian/plugins/obsidian-full-calendar/data.json` - config padrao segura (novo)
- `.obsidian/community-plugins.json` - adicionado `obsidian-full-calendar` a lista de plugins habilitados
- `.obsidian/plugins/calendar/main.js` - guard de duplicacao no `registerSource`
- `.obsidian/plugins/calendar/data.json` - sourceSettings explicitos com campos canonicos
- `_templates/resources/Definition Template.md` — template reestruturado para tables + dataviewjs de resumo
- `_changelog/CHANGELOG v0.4.6.md`
- `_changelog/CHANGELOG INDEX.md`

---

## Objetivo

Adicionar visualizacao de calendario em pagina cheia (Full Calendar) mantendo o mini-calendario lateral (Calendar Beta), e corrigir bug visual de fontes triplicadas no settings do Calendar Beta.

[[CHANGELOG INDEX|<- Indice]]
Deixar a criação de notas em `Definitions` mais consistente com a estrutura já usada em `Contacts`, com menos dependência de sintaxe inline do Dataview e com um corpo mais fácil de preencher e revisar.

[[CHANGELOG INDEX|<- Índice]]
