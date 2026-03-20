---
title: Command Contract
type: setup
tags:
  - meta/setup
  - plugins
  - commands
---

# Command Contract

## Dashboards e comandos

| Local | Botao | Plugin dono | Comando esperado |
|-------|-------|-------------|------------------|
| `00-Dashboard/Home.md` | Diario de Hoje | Periodic Notes | `Periodic Notes: Open daily note` |
| `00-Dashboard/Home.md` | Nova Sessao de Escrita | QuickAdd | `QuickAdd: New Scene` |
| `00-Dashboard/Home.md` | Capturar Ideia | QuickAdd | `QuickAdd: Quick Capture` |
| `00-Dashboard/Daily Dashboard.md` | Abrir Diario de Hoje | Periodic Notes | `Periodic Notes: Open daily note` |
| `00-Dashboard/Daily Dashboard.md` | Revisao da Manha | QuickAdd | `QuickAdd: Morning Review` |
| `00-Dashboard/Daily Dashboard.md` | Revisao da Noite | QuickAdd | `QuickAdd: Evening Review` |
| `00-Dashboard/Daily Dashboard.md` | Revisao Semanal | Periodic Notes | `Periodic Notes: Open weekly note` |
| `00-Dashboard/Weekly Dashboard.md` | Abrir Revisao Semanal | Periodic Notes | `Periodic Notes: Open weekly note` |
| `00-Dashboard/Writing Dashboard.md` | Nova Cena | QuickAdd | `QuickAdd: New Scene` |
| `00-Dashboard/Writing Dashboard.md` | Novo Personagem | QuickAdd | `QuickAdd: New Character` |
| `00-Dashboard/Writing Dashboard.md` | Nova Entrada de Mundo | QuickAdd | `QuickAdd: New Worldbuilding` |
| `00-Dashboard/Writing Dashboard.md` | Capturar Fragmento | QuickAdd | `QuickAdd: New Snippet` |
| `00-Dashboard/Projects Dashboard.md` | Novo Projeto | QuickAdd | `QuickAdd: New Project` |
| `00-Dashboard/Projects Dashboard.md` | Nova Ideia Algum Dia/Talvez | QuickAdd | `QuickAdd: New Someday` |
| `00-Dashboard/Resources Dashboard.md` | Adicionar Nota de Livro | QuickAdd | `QuickAdd: New Book Note` |
| `00-Dashboard/Resources Dashboard.md` | Adicionar Artigo | QuickAdd | `QuickAdd: New Article` |
| `00-Dashboard/Resources Dashboard.md` | Adicionar Contato | QuickAdd | `QuickAdd: New Contact` |
| `00-Dashboard/Resources Dashboard.md` | Adicionar Definicao | QuickAdd | `QuickAdd: New Definition` |
| `00-Dashboard/Tasks Dashboard.md` | Captura Rapida | QuickAdd | `QuickAdd: Quick Capture` |

## Regra

Se um botao novo for adicionado a um dashboard, ele deve apontar para um comando cujo plugin dono esteja documentado aqui.
