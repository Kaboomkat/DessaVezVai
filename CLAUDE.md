# CLAUDE.md — Vault de Escrita Integrado

## Visão Geral do Vault
Este é um vault Obsidian focado em escrita, com gestão de tarefas GTD integrada, widgets de dashboard e assistência por IA com Claude. O propósito principal é escrita criativa (romances, histórias, artigos) com sistemas de produtividade de suporte.

## Estrutura de Pastas
```
/
├── 00-Dashboard/         # Base de operações, widgets de visão geral
├── 01-Writing/           # PRIMÁRIO: Todo o trabalho de escrita criativa
│   ├── Manuscripts/      # Projetos longos (romances, livros)
│   ├── Research/         # Materiais de pesquisa de escrita
│   ├── Characters/       # Fichas e perfis de personagens
│   ├── Worldbuilding/    # Cenários, lore, detalhes do mundo
│   └── Snippets/         # Peças curtas, ideias, fragmentos
├── 02-Projects/          # Projetos não relacionados à escrita
│   ├── Active/           # Projetos em andamento
│   ├── Archive/          # Projetos concluídos
│   └── Someday/          # Ideias de projetos futuros
├── 03-Daily/             # Notas diárias e revisões
│   ├── Journal/          # Entradas do diário
│   ├── Morning Reviews/  # Revisões da manhã
│   ├── Evening Reviews/  # Revisões da noite
│   └── Reviews/          # Revisões semanais e mensais
├── 04-Tasks/             # Gestão de tarefas estilo GTD
│   ├── Inbox/            # Capture tudo aqui
│   ├── Next/             # Próximas Ações
│   ├── Waiting/          # Itens delegados ou aguardando resposta
│   └── Reference/        # Materiais de referência
├── 05-Resources/         # Base de conhecimento
│   ├── Books/            # Notas de livros
│   ├── Articles/         # Resumos de artigos
│   ├── Contacts/         # Pessoas e contatos
│   └── Definitions/      # Termos e definições
├── 06-Archive/           # Conteúdo arquivado
├── _templates/           # Todos os templates
├── _attachments/         # Imagens e arquivos
└── _scripts/             # Scripts DataviewJS
```

## Convenções Principais

### Tags
- `#writing/novel` — Manuscritos de romances
- `#writing/short` — Contos
- `#writing/article` — Artigos e ensaios
- `#writing/research` — Notas de pesquisa
- `#project/active` — Projetos ativos
- `#project/someday` — Ideias futuras
- `#task/next` — Próximas Ações
- `#task/waiting` — Aguardando Resposta
- `#review/morning` — Revisões da manhã
- `#review/evening` — Revisões da noite
- `#review/weekly` — Revisões semanais

### Frontmatter YAML
Projetos de escrita usam:
```yaml
---
type: manuscript | character | worldbuilding | research
status: draft | revision | complete
wordcount: 0
project: "Nome do Projeto"
created: {{date}}
modified: {{date}}
---
```

Tarefas usam:
```yaml
---
type: task
status: inbox | next | waiting | done
priority: alta | média | baixa
due: YYYY-MM-DD
project: "Nome do Projeto"
context: @casa | @computador | @rua | @ligações
---
```

### Nomenclatura de Arquivos
- Manuscritos: `Título - Capítulo XX.md`
- Personagens: `Nome - Personagem.md`
- Notas diárias: `YYYY-MM-DD.md`
- Revisões da manhã: `YYYY-MM-DD Morning Review.md`
- Revisões da noite: `YYYY-MM-DD Evening Review.md`
- Tarefas: título descritivo com contexto

## Skills Claude Disponíveis

### /query
Encontre e busque pelo vault
- `query projects active` — Listar projetos ativos
- `query tasks next` — Mostrar Próximas Ações
- `query writing novel` — Encontrar manuscritos de romances

### /write
Assistir com tarefas de escrita
- `write character "Nome"` — Gerar perfil de personagem
- `write scene "descrição"` — Rascunhar uma cena
- `write outline "projeto"` — Criar esboço da história

### /review
Revisões diárias e semanais
- `review morning` — Rotina de planejamento da manhã
- `review evening` — Reflexão da noite
- `review weekly` — Revisão GTD semanal

### /task
Gestão de tarefas
- `task add "descrição"` — Adicionar à Caixa de Entrada
- `task next` — Mostrar Próximas Ações
- `task process` — Processar itens da Caixa de Entrada

## Workflow de Escrita

1. **Capturar** → Ideias vão para `04-Tasks/Inbox` ou `01-Writing/Snippets`
2. **Esclarecer** → Processar durante as revisões, mover para o local adequado
3. **Organizar** → Usar o plugin Longform para organizar manuscritos
4. **Escrever** → Modo foco com mínimas distrações
5. **Revisar** → Contagem de palavras diária, acompanhamento de progresso semanal

## Arquivos Importantes
- `00-Dashboard/Home.md` — Dashboard principal
- `00-Dashboard/Writing Dashboard.md` — Visão geral focada em escrita
- `03-Daily/Journal/{{date}}.md` — Nota diária de hoje
- `03-Daily/Morning Reviews/YYYY-MM-DD Morning Review.md` — fonte de verdade do humor/energia da manhã
- `03-Daily/Evening Reviews/YYYY-MM-DD Evening Review.md` — fonte de verdade do humor/energia da noite
- `04-Tasks/Inbox/Inbox.md` — Visão da Caixa de Entrada de tarefas
