# Vault de Escrita Integrado

Vault Obsidian focado em escrita, rotina diária e organização GTD. O repositório inclui dashboards, templates, scripts CustomJS, trackers e a configuração do `.obsidian` necessária para reproduzir o fluxo principal do sistema.

## O que este vault faz

- Centraliza a rotina diária em `03-Daily/`.
- Separa `Morning Reviews` e `Evening Reviews` como fonte oficial de humor e energia.
- Usa dashboards em `00-Dashboard/` para leitura, navegação e acompanhamento semanal.
- Usa `QuickAdd`, `Periodic Notes`, `Templater`, `Dataview`, `CustomJS` e `Buttons` como camada operacional.
- Mantém changelogs em `_changelog/` para registrar cada lote de correções.

## Estado atual da arquitetura

- `Periodic Notes` é o dono de `03-Daily/Journal` e `03-Daily/Reviews`.
- `QuickAdd` é o dono das reviews ad hoc e das notas de criação rápida.
- `Templater` não cria notas por pasta; ele apenas renderiza templates quando chamado pelos fluxos acima.
- `Morning Reviews` e `Evening Reviews` são a única fonte de verdade para `mood_*` e `energy_*`.
- Dashboards e trackers leem review files, não o frontmatter das daily notes.
- `03-Daily/Index de Diario.md` é o índice oficial das daily notes; a pasta `03-Daily/Journal/` fica reservada apenas para os arquivos do diário.

## Plugins obrigatórios

- `Dataview`
- `Templater`
- `CustomJS`
- `QuickAdd`
- `Periodic Notes`
- `Buttons`

O contrato detalhado está em [plugins/Plugin Setup.md](./plugins/Plugin%20Setup.md), [plugins/Command Contract.md](./plugins/Command%20Contract.md) e [plugins/Regression Checklist.md](./plugins/Regression%20Checklist.md).

## Estrutura principal

```text
00-Dashboard/   Dashboards operacionais
01-Writing/     Escrita criativa
03-Daily/       Diário, reviews e revisões
04-Tasks/       Captura e tarefas
05-Resources/   Base de referência
06-Archive/     Arquivo
_scripts/       CustomJS e automações
_templates/     Templates do vault
_changelog/     Histórico de mudanças
.obsidian/      Configuração versionada do Obsidian
```

## Fluxo recomendado

1. Abra o vault no Obsidian.
2. Confirme que os plugins da comunidade estão habilitados.
3. Use `Home` ou `Daily Dashboard` para abrir o diário do dia.
4. Crie `Morning Review` e `Evening Review` pelos botões do dashboard ou da daily note.
5. Preencha humor e energia pelos controles inline da própria review.
6. Registre o `Destaque do Dia` no corpo da daily note.
7. Consulte `Weekly Dashboard` e `Mood-Energy Tracker` para consolidação.

## Componentes principais

- `Daily Dashboard`: visão operacional do dia, reviews, entradas recentes e hábitos.
- `Weekly Dashboard`: consolidação semanal de diário, reviews, escrita e tarefas.
- `Mood-Energy Tracker`: visões mensal, semanal e anual com leitura direta dos review files.
- `Index de Diario`: índice canônico das daily notes já escritas.
- `RefreshMoodTrackers.ps1`: gerador dos trackers materializados do vault.

## Git e changelog

O repositório está preparado para commits pequenos e auditáveis. Cada lote de mudanças deve idealmente seguir este ciclo:

1. editar
2. revisar com `git diff`
3. atualizar ou criar o changelog da versão
4. `git add .`
5. `git commit -m "vX.Y.Z descricao curta"`
6. `git push`

## Validação

Antes de considerar uma mudança concluída, rode a checklist em [plugins/Regression Checklist.md](./plugins/Regression%20Checklist.md).
