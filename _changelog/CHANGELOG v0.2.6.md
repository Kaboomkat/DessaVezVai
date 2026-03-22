---
type: changelog
version: 0.2.6
date: 2026-03-22
tags:
  - meta/changelog
---

# Changelog v0.2.6

**Data:** 2026-03-22  
**Título:** Navegação segura no Home sem perder os emojis

---

## Mudanças

1. **Wikilinks perigosos removidos do `Home`**: o dashboard deixou de apontar para pastas nuas como `Journal/`, `Manuscripts/`, `Next/`, `Books/` e similares.
2. **Navegação passou a usar alvos canônicos**: onde já existia dashboard ou nota real, o `Home` passou a apontar para ela.
3. **Tabela de manuscritos endurecida**: a Dataview de `Projetos de Escrita em Andamento` agora trata `wordcount` nulo como `0`, evitando o erro `No implementation found for 'null / number'`.
4. **Emojis preservados**: os labels continuaram fofos e legíveis; só o destino foi endurecido.
5. **Arquivo ganhou uma nota-índice mínima**: foi criada [06-Archive/Index.md](../06-Archive/Index.md) para que o atalho de arquivo não dependa mais de pasta vazia.

---

## Arquivos modificados

- `00-Dashboard/Home.md`
- `06-Archive/Index.md`
- `_changelog/CHANGELOG INDEX.md`

---

## Objetivo

Esta versão fecha mais uma superfície de navegação que ainda podia gerar `.md` vazio por link ambíguo de pasta, sem empobrecer a UI do dashboard principal.

[[CHANGELOG INDEX|<- Índice]]
