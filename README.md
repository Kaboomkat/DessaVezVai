# Vault de Escrita Integrado

Um vault Obsidian para escritores, combinando workflows de escrita criativa com produtividade GTD e assistência por IA com Claude.

## 🎯 O que está incluído

### Design Focado em Escrita
- **Integração com Longform** — Gerencie romances, livros e projetos de longa duração
- **Perfis de Personagens** — Templates de desenvolvimento profundo de personagens
- **Worldbuilding** — Organize cenários, lore e detalhes do mundo
- **Notas de Pesquisa** — Conecte pesquisas diretamente à sua escrita

### Produtividade GTD
- **Caixa de Entrada → Próximas Ações** — Capture e processe tarefas
- **Gestão de Projetos** — Acompanhe resultados multi-etapas
- **Revisões Diárias/Semanais** — Mantenha tudo sob controle
- **Algum Dia/Talvez** — Estacione ideias para o futuro

### Sistema de Dashboards
- **Dashboard Início** — Estatísticas rápidas e navegação
- **Dashboard de Escrita** — Contagem de palavras, manuscritos, progresso
- **Dashboard de Tarefas** — Visão geral GTD
- **Dashboard de Projetos** — Projetos ativos e arquivados
- **Daily Dashboard** — Acompanhamento de diário e revisões

### Integração com Claude
- **Consultar** — Busque no vault de forma inteligente
- **Escrever** — Tarefas de escrita assistidas por IA
- **Revisar** — Revisões diárias/semanais guiadas
- **Tarefa** — Gestão rápida de tarefas

---

## 🚀 Como Começar

### 1. Abrir o Vault
1. Baixe/clone este vault
2. Abra o Obsidian
3. Clique em "Open folder as vault"
4. Selecione esta pasta
5. **Confie nos plugins** quando solicitado

### 2. Instalar os Plugins Necessários
O vault vai solicitar a instalação de plugins da comunidade. Aceite todos.

Plugins principais:
- **Dataview** — Alimenta todos os dashboards
- **Templater** — Sistema de templates
- **Longform** — Gestão de projetos de escrita
- **Tasks** — Acompanhamento de tarefas
- **QuickAdd** — Captura rápida
- **Periodic Notes** — Notas diárias

### 2.1 Contrato operacional dos plugins
- **Dataview** alimenta todos os dashboards e trackers.
- **Templater** rende os templates em `_templates/`.
- **CustomJS** precisa apontar para `_scripts` para carregar `DashboardHelpers.js`.
- **QuickAdd** precisa expor exatamente estas actions: `Morning Review`, `Evening Review`, `Quick Capture`, `New Scene`, `New Character`, `New Worldbuilding`, `New Snippet`, `New Project`, `New Someday`, `New Book Note`, `New Article`, `New Contact`, `New Definition`.
- **Periodic Notes** precisa ter os comandos de nota diária e semanal habilitados.
- **Buttons** é obrigatório para os blocos `button` dos dashboards.

Este repositório não inclui `.obsidian/`, então as configurações acima precisam ser recriadas manualmente no Obsidian.

### 3. Instalar o Tema
- Vá em Settings → Appearance → Themes
- Busque por "Minimal"
- Instale e ative

### 4. Começar a Usar
- Pressione `Ctrl/Cmd + Q` → Menu de ações rápidas
- Pressione `Alt + T` → Inserir template
- Clique em **Início** na barra lateral para ir ao dashboard

---

## 📁 Estrutura de Pastas

```
/
├── 00-Dashboard/        # Início e dashboards
├── 01-Writing/          # Toda a escrita criativa
│   ├── Manuscripts/     # Projetos longos
│   ├── Characters/      # Perfis de personagens
│   ├── Worldbuilding/   # Detalhes do mundo
│   ├── Research/        # Pesquisa de escrita
│   └── Snippets/        # Ideias rápidas e fragmentos
├── 02-Projects/         # Projetos não relacionados à escrita
│   ├── Active/
│   ├── Someday/
│   └── Archive/
├── 03-Daily/            # Notas diárias e revisões
│   ├── Journal/
│   └── Reviews/
├── 04-Tasks/            # Gestão de tarefas GTD
│   ├── Inbox/
│   ├── Next/
│   ├── Waiting/
│   └── Reference/
├── 05-Resources/        # Base de conhecimento
│   ├── Books/
│   ├── Articles/
│   ├── Contacts/
│   └── Definitions/
├── 06-Archive/          # Conteúdo arquivado
├── _templates/          # Todos os templates
├── _attachments/        # Imagens e arquivos
├── _scripts/            # Scripts DataviewJS
└── .obsidian/           # Configurações do Obsidian
```

---

## ⌨️ Atalhos de Teclado

| Atalho | Ação |
|--------|------|
| `Ctrl/Cmd + Q` | Menu QuickAdd |
| `Alt + T` | Inserir template |
| `Ctrl/Cmd + Enter` | Marcar tarefa como feita |
| `Ctrl/Cmd + Shift + Enter` | Alternar checklist |
| `Alt + ←/→` | Navegar voltar/avançar |
| `Ctrl/Cmd + Shift + V` | Dividir verticalmente |
| `Ctrl/Cmd + Shift + H` | Dividir horizontalmente |

---

## 🤖 Usando com Claude

1. Navegue até a pasta do vault no terminal
2. Execute `claude`
3. Experimente estes comandos:
   - `/query tasks next`
   - `/write character "Nome"`
   - `/review morning`
   - `/task add "Nova tarefa"`

Veja `.claude/skills/` para documentação completa.

---

## 📝 Créditos

Este vault integra conceitos de:
- [Asha's Writing Vault Template](https://github.com/katuall/Asha-s-Writing-Vault-Template) — Workflows de escrita
- [Monroy Template Vault](https://github.com/Enigmatic-Mind/Monroy_Template_Vault) — Sistema GTD
- [SoRobby's ObsidianStarterVault](https://github.com/SoRobby/ObsidianStarterVault) — Design de dashboards
- [Claude Code Obsidian Starter](https://github.com/ArtemXTech/claude-code-obsidian-starter) — Integração com IA

---

## 📄 Licença

Licença MIT — Use livremente, créditos são apreciados.
