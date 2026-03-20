---
type: changelog
version: 0.0.6
date: 2026-03-20
tags:
  - meta/changelog
---

# Changelog v0.0.6

**Data:** 2026-03-20
**Titulo:** Correcao de wiring dos botoes e das notas periodicas

---

## Mudancas

1. **Home Dashboard**: o botao de diario passou de um label generico para o comando explicito `Periodic Notes: Open daily note`.
2. **Daily Dashboard**: o botao `Abrir Diario de Hoje` agora usa `Periodic Notes: Open daily note`.
3. **Daily Dashboard**: o botao `Revisao Semanal` agora usa `Periodic Notes: Open weekly note`.
4. **Weekly Dashboard**: o botao `Abrir Revisao Semanal` agora usa `Periodic Notes: Open weekly note`.
5. **Periodic Notes config**: notas semanais e mensais deixaram de ser criadas em `03-Daily/Journal` e passaram para `03-Daily/Reviews`.

---

## Arquivos modificados

- `00-Dashboard/Home.md`
- `00-Dashboard/Daily Dashboard.md`
- `00-Dashboard/Weekly Dashboard.md`
- `.obsidian/plugins/periodic-notes/data.json`

---

## Objetivo

Esta versao fecha as quebras mais provaveis dos botoes de abrir diario e abrir revisao semanal, e realinha o destino das notas periodicas com a estrutura do vault.

[[CHANGELOG INDEX|<- Indice]]
