# Vault de Escrita Integrado

Vault Obsidian focado em escrita, rotina diaria e organizacao GTD. O repositorio inclui templates, dashboards, scripts CustomJS e a configuracao do `.obsidian` necessaria para reproduzir o fluxo principal.

## O que este vault faz

- Centraliza a rotina diaria em `03-Daily/`
- Separa reviews da manha e da noite como fonte oficial de mood e energia
- Usa dashboards em `00-Dashboard/` para leitura e navegacao
- Usa `QuickAdd`, `Periodic Notes`, `Templater`, `Dataview`, `CustomJS` e `Buttons` como camada operacional
- Mantem changelogs em `_changelog/` para registrar cada lote de correcoes

## Estado atual da arquitetura

- `Periodic Notes` e o dono de `03-Daily/Journal` e `03-Daily/Reviews`
- `QuickAdd` e o dono das reviews ad hoc e das notas de criacao rapida
- `Templater` nao cria notas por pasta; ele apenas renderiza templates quando chamado pelos fluxos acima
- `Morning Reviews` e `Evening Reviews` sao a unica fonte de verdade para `mood_*` e `energy_*`
- Dashboards e trackers leem review files, nao o frontmatter das daily notes

## Plugins obrigatorios

- `Dataview`
- `Templater`
- `CustomJS`
- `QuickAdd`
- `Periodic Notes`
- `Buttons`

O contrato detalhado esta em [plugins/Plugin Setup.md](./plugins/Plugin%20Setup.md), [plugins/Command Contract.md](./plugins/Command%20Contract.md) e [plugins/Regression Checklist.md](./plugins/Regression%20Checklist.md).

## Estrutura principal

```text
00-Dashboard/   Dashboards operacionais
01-Writing/     Escrita criativa
03-Daily/       Diario, reviews e revisoes
04-Tasks/       Captura e tarefas
05-Resources/   Base de referencia
06-Archive/     Arquivo
_scripts/       CustomJS e automacoes
_templates/     Templates do vault
_changelog/     Historico de mudancas
.obsidian/      Configuracao versionada do Obsidian
```

## Fluxo recomendado

1. Abra o vault no Obsidian.
2. Confirme que os plugins da comunidade estao habilitados.
3. Use `Home` ou `Daily Dashboard` para abrir o diario do dia.
4. Crie `Morning Review` e `Evening Review` pelos botoes do dashboard.
5. Preencha mood e energia pelos controles inline da propria review.
6. Consulte `Weekly Dashboard` e `Mood-Energy Tracker` para consolidacao.

## Git e changelog

O repositorio agora esta preparado para commits pequenos e auditaveis. Cada lote de mudancas deve idealmente seguir este ciclo:

1. editar
2. revisar com `git diff`
3. atualizar ou criar o changelog da versao
4. `git add .`
5. `git commit -m "vX.Y.Z descricao curta"`
6. `git push`

## Validacao

Antes de considerar uma mudanca concluida, rode a checklist em [plugins/Regression Checklist.md](./plugins/Regression%20Checklist.md).
