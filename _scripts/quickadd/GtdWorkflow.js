const { MarkdownView, Notice, normalizePath, TFile } = require("obsidian");

const GTD = {
    inboxFolder: "04-Tasks/Inbox",
    inboxNote: "04-Tasks/Inbox/Inbox.md",
    nextFolder: "04-Tasks/Next",
    nextIndex: "04-Tasks/Next/Index.md",
    waitingFolder: "04-Tasks/Waiting",
    waitingIndex: "04-Tasks/Waiting/Index.md",
    referenceFolder: "04-Tasks/Reference",
    referenceIndex: "04-Tasks/Reference/Index.md",
    activeProjectsFolder: "02-Projects/Active",
    activeProjectsIndex: "02-Projects/Active/Index.md",
    somedayFolder: "02-Projects/Someday",
    somedayIndex: "02-Projects/Someday/Index.md",
    archiveProjectsIndex: "02-Projects/Archive/Index.md",
    snippetsFolder: "01-Writing/Snippets",
    snippetsIndex: "01-Writing/Snippets/Index.md",
    taskDashboard: "00-Dashboard/Tasks Dashboard.md",
    projectsDashboard: "00-Dashboard/Projects Dashboard.md",
    priorities: ["alta", "média", "baixa"],
    contexts: ["@casa", "@computador", "@rua", "@ligações"],
    somedayCategories: ["projeto", "aprendizado", "viagem", "compra", "pessoal", "outro"],
};

module.exports = async function gtdWorkflow(params, settings = {}) {
    const action = settings.action;

    switch (action) {
        case "capture":
            return captureInboxItem(params);
        case "process":
            return processInboxItem(params);
        case "complete":
            return completeTask(params);
        default:
            throw new Error(`Ação GTD não suportada: ${String(action || "")}`);
    }
};

function nowDate() {
    return window.moment().format("YYYY-MM-DD");
}

function nowDateTime() {
    return window.moment().format("YYYY-MM-DD HH:mm");
}

function yamlQuote(value) {
    return `"${String(value ?? "").replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
}

function trimToNull(value) {
    const text = String(value ?? "").replace(/\r/g, "").trim();
    return text.length > 0 ? text : null;
}

// ── Duplicata intencional de DashboardHelpers._normalizeHeading ──────────
// GtdWorkflow roda como macro QuickAdd (CommonJS module.exports),
// DashboardHelpers roda como classe CustomJS (global).
// Não há mecanismo de import compartilhado entre os dois contextos.
// Se alterar stripAccents/normalizeHeading aqui, alinhe com
// DashboardHelpers._normalizeHeading em _scripts/DashboardHelpers.js.
function stripAccents(value) {
    return String(value ?? "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}

function normalizeHeading(value) {
    return stripAccents(value).toLowerCase().trim();
}

function slugify(value) {
    const fallback = "Item da Inbox";
    const text = trimToNull(value) ?? fallback;
    const ascii = stripAccents(text)
        .replace(/[<>:"/\\|?*]/g, " ")
        .replace(/[\u0000-\u001f]/g, " ")
        .replace(/\s+/g, " ")
        .trim();

    return ascii.length > 0 ? ascii.slice(0, 120).trim() : fallback;
}

async function ensureFolder(app, folderPath) {
    const normalized = normalizePath(folderPath);
    if (!normalized || normalized === ".") {
        return;
    }

    const parts = normalized.split("/");
    let current = "";

    for (const part of parts) {
        current = current ? `${current}/${part}` : part;
        if (!app.vault.getAbstractFileByPath(current)) {
            await app.vault.createFolder(current);
        }
    }
}

async function getUniquePath(app, folder, preferredName, currentPath = null) {
    const safeFolder = normalizePath(folder);
    const baseName = slugify(preferredName);
    let counter = 1;

    while (true) {
        const candidateName = counter === 1 ? baseName : `${baseName} ${counter}`;
        const candidatePath = normalizePath(`${safeFolder}/${candidateName}.md`);
        const existing = app.vault.getAbstractFileByPath(candidatePath);

        if (!existing || candidatePath === normalizePath(currentPath || "")) {
            return candidatePath;
        }

        counter += 1;
    }
}

async function openFile(app, file) {
    const leaf = app.workspace.getLeaf("tab");
    await leaf.openFile(file, { active: true });
    app.workspace.setActiveLeaf(leaf, { focus: true });
}

function getActiveMarkdownFile(app) {
    const view = app.workspace.getActiveViewOfType(MarkdownView);
    return view?.file instanceof TFile ? view.file : null;
}

function getSelectedText(app) {
    const view = app.workspace.getActiveViewOfType(MarkdownView);
    if (!view) {
        return "";
    }

    return view.editor?.getSelection?.() ?? "";
}

function splitFrontmatter(markdown) {
    const text = String(markdown ?? "").replace(/\r/g, "");
    const match = text.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);

    if (!match) {
        return { frontmatter: "", body: text };
    }

    return { frontmatter: match[1], body: match[2] ?? "" };
}

// ── Similar a DashboardHelpers.extractSectionText, mas com diferenças: ───
// 1. Aceita múltiplos headings alternativos (array)
// 2. Aplica cleanBoilerplate no resultado (remove dataview, buttons, etc.)
// 3. Usa /^---+$/ como separador (extractSectionText usa /^([-*_])\1{2,}$/)
function findSection(markdown, headings) {
    const { body } = splitFrontmatter(markdown);
    const lines = body.split("\n");
    const wanted = new Set(headings.map(normalizeHeading));
    let start = -1;
    let level = 0;

    for (let index = 0; index < lines.length; index += 1) {
        const match = lines[index].match(/^(#{1,6})\s+(.*)$/);
        if (!match) {
            continue;
        }

        if (wanted.has(normalizeHeading(match[2]))) {
            start = index + 1;
            level = match[1].length;
            break;
        }
    }

    if (start === -1) {
        return null;
    }

    const collected = [];
    for (let index = start; index < lines.length; index += 1) {
        const line = lines[index];
        const match = line.match(/^(#{1,6})\s+(.*)$/);
        if (match && match[1].length <= level) {
            break;
        }
        if (/^---+$/.test(line.trim())) {
            continue;
        }
        collected.push(line);
    }

    return trimToNull(cleanBoilerplate(collected.join("\n")));
}

function cleanBoilerplate(markdown) {
    return String(markdown ?? "")
        .replace(/<!--[\s\S]*?-->/g, "")
        .replace(/^```button[\s\S]*?```$/gm, "")
        .replace(/^```dataview[\s\S]*?```$/gm, "")
        .replace(/^```dataviewjs[\s\S]*?```$/gm, "")
        .replace(/^\[\[[^\]]+\]\]$/gm, "")
        .replace(/^\*\s*A preencher.*$/gim, "")
        .replace(/^\*\*E acion[aá]vel\?\*\*.*$/gim, "")
        .replace(/^\*\*Se n[aã]o:\*\*.*$/gim, "")
        .replace(/^\*\*Se sim:\*\*.*$/gim, "")
        .replace(/^\*\*Qual [ée] a Pr[oó]xima A[cç][aã]o\?\*\*.*$/gim, "")
        .replace(/^\*\*Projeto \(se multi-etapas\):\*\*.*$/gim, "")
        .replace(/^\*\*Contexto:\*\*.*$/gim, "")
        .replace(/^\*\*Mover para:\*\*.*$/gim, "")
        .replace(/^- \[(?: |x)\] (?:Descartar|Algum Dia\/Talvez|Material de Refer[eê]ncia|Pr[oó]ximas A[cç][oõ]es|Aguardando Resposta|Calend[aá]rio).*$/gim, "")
        .replace(/^\s+$/gm, "")
        .replace(/\n{3,}/g, "\n\n")
        .trim();
}

function looksLikeTimestampTitle(title) {
    const text = String(title ?? "").trim();
    return /^(\d{4}-\d{2}-\d{2}[-_ ]\d{6}|\d{4}-\d{2}-\d{2}[-_ ]\d{2}:\d{2}|untitled)$/i.test(text);
}

function extractTitleCandidate(app, markdown, file) {
    const cacheTitle = appSafeFrontmatter(app, file)?.title;
    if (trimToNull(cacheTitle) && !looksLikeTimestampTitle(cacheTitle)) {
        return trimToNull(cacheTitle);
    }

    const headingMatch = String(markdown ?? "").match(/^#\s+(.+)$/m);
    if (headingMatch && !looksLikeTimestampTitle(headingMatch[1])) {
        return trimToNull(headingMatch[1]);
    }

    const details = extractMeaningfulNotes(markdown);
    if (details) {
        const firstLine = details.split("\n").map(line => line.trim()).find(Boolean);
        if (firstLine) {
            return firstLine.slice(0, 120);
        }
    }

    if (file?.basename && !looksLikeTimestampTitle(file.basename)) {
        return file.basename;
    }

    return "Item da Inbox";
}

function extractMeaningfulNotes(markdown) {
    const preferredSections = [
        findSection(markdown, ["Detalhes", "The Idea", "Idea", "Notas", "Notes"]),
        findSection(markdown, ["Suporte", "Support"]),
    ].filter(Boolean);

    if (preferredSections.length > 0) {
        return trimToNull(preferredSections.join("\n\n"));
    }

    const { body } = splitFrontmatter(markdown);
    const cleaned = cleanBoilerplate(
        body
            .replace(/^# .+$/gm, "")
            .replace(/^> \[![^\]]+\].*$/gm, "")
    );

    return trimToNull(cleaned);
}

function appSafeFrontmatter(app, file) {
    if (!file) {
        return {};
    }

    return app.metadataCache.getFileCache(file)?.frontmatter ?? {};
}

function currentFileDates(file, fallbackFrontmatter = {}) {
    const frontmatter = fallbackFrontmatter ?? {};
    return {
        created: trimToNull(frontmatter.created) ?? nowDate(),
        captured: trimToNull(frontmatter.captured) ?? nowDateTime(),
    };
}

function parseOptionalDate(value) {
    const text = trimToNull(value);
    if (!text) {
        return "";
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(text)) {
        throw new Error(`Data inválida '${text}'. Use YYYY-MM-DD.`);
    }

    return text;
}

function buildFrontmatter(lines) {
    return `---\n${lines.filter(Boolean).join("\n")}\n---`;
}

function renderInboxNote({ title, created, captured, notes }) {
    const body = trimToNull(notes);

    return `${buildFrontmatter([
        `title: ${yamlQuote(title)}`,
        "type: task",
        "status: inbox",
        `captured: ${yamlQuote(captured)}`,
        `created: ${yamlQuote(created)}`,
        "tags:",
        "  - task/inbox",
    ])}

# ${title}

> [!inbox] Capturado em ${captured}

\`\`\`button
name Process Inbox Item
type command
action QuickAdd: Process Inbox Item
\`\`\`

## Notas

${body ?? "*Adicione qualquer detalhe que ajude no processamento depois.*"}

---

[[04-Tasks/Inbox/Inbox|<- Inbox]]
`;
}

function renderTaskNote({
    title,
    status,
    priority,
    context,
    project,
    due,
    scheduledFor,
    waitingOn,
    created,
    captured,
    completedDate,
    notes,
}) {
    const checkbox = status === "done" ? "[x]" : "[ ]";
    const tag = status === "waiting" ? "task/waiting" : status === "done" ? "task/done" : "task/next";
    const callout = status === "waiting" ? "info" : status === "done" ? "success" : "todo";
    const label = status === "waiting" ? "Aguardando resposta" : status === "done" ? "Tarefa concluída" : "Próxima ação";
    const body = trimToNull(notes);

    return `${buildFrontmatter([
        `title: ${yamlQuote(title)}`,
        "type: task",
        `status: ${yamlQuote(status)}`,
        `priority: ${yamlQuote(priority)}`,
        due ? `due: ${yamlQuote(due)}` : "due:",
        scheduledFor ? `scheduled_for: ${yamlQuote(scheduledFor)}` : "scheduled_for:",
        project ? `project: ${yamlQuote(project)}` : "project:",
        context ? `context: ${yamlQuote(context)}` : "context:",
        "energy:",
        "time_required:",
        waitingOn ? `waiting_on: ${yamlQuote(waitingOn)}` : "waiting_on:",
        `created: ${yamlQuote(created)}`,
        `captured: ${yamlQuote(captured)}`,
        completedDate ? `completed_date: ${yamlQuote(completedDate)}` : "completed_date:",
        "tags:",
        `  - ${tag}`,
    ])}

# ${title}

> [!${callout}] ${label}
> **Status:** \`= this.status\` | **Prioridade:** \`= this.priority\` | **Contexto:** \`= this.context\`

\`\`\`button
name Complete Task
type command
action QuickAdd: Complete Task
\`\`\`

## Ação

- ${checkbox} ${title}

## Detalhes

${body ?? "*Nenhum detalhe extra capturado ainda.*"}

## Metadados

- Projeto: \`= this.project\`
- Prazo: \`= this.due\`
- Agendado: \`= this.scheduled_for\`
- Aguardando: \`= this.waiting_on\`

---

[[Tasks Dashboard|<- Painel de Tarefas]]
`;
}

function renderProjectNote({ title, priority, created, notes, supportNoteName }) {
    const supportLine = supportNoteName ? `- [[04-Tasks/Reference/${supportNoteName}|Suporte do projeto]]` : "-";
    const body = trimToNull(notes);

    return `${buildFrontmatter([
        `title: ${yamlQuote(title)}`,
        "type: project",
        `status: ${yamlQuote("active")}`,
        "area: \"outro\"",
        `priority: ${yamlQuote(priority)}`,
        `start_date: ${yamlQuote(created)}`,
        "target_date:",
        "completed_date:",
        "progress: 0",
        `outcome: ${yamlQuote(title)}`,
        `created: ${yamlQuote(created)}`,
        `modified: ${yamlQuote(created)}`,
        "tags:",
        "  - project/active",
    ])}

# ${title}

> [!goal] Resultado desejado
> ${title}

## Suporte ativo

${supportLine}

## Compromissos atuais

- [ ] Todo projeto ativo precisa ter ao menos uma próxima ação, um item de calendário ou um aguardando resposta.

## Próximas ações

\`\`\`dataview
TABLE WITHOUT ID
    file.link as "Ação",
    status as "Status",
    context as "Contexto",
    scheduled_for as "Agendado",
    due as "Prazo"
FROM "04-Tasks"
WHERE type = "task" AND project = this.file.name AND status != "done"
SORT status ASC, file.ctime ASC
\`\`\`

## Notas

${body ?? "*Capture aqui o resultado, as restrições e o raciocínio relevante.*"}

---

[[Projects Dashboard|<- Painel de Projetos]]
`;
}

function renderSomedayNote({ title, created, notes }) {
    const body = trimToNull(notes);

    return `${buildFrontmatter([
        `title: ${yamlQuote(title)}`,
        "type: someday",
        `category: ${yamlQuote("outro")}`,
        `interest_level: ${yamlQuote("média")}`,
        `created: ${yamlQuote(created)}`,
        "review_date:",
        "tags:",
        "  - someday",
    ])}

# ${title}

> [!abstract] Algum Dia / Talvez
> Revise este item na Revisão Semanal antes de ativá-lo.

## Ideia

${body ?? "*Capture a ideia aqui.*"}

## Primeiras notas

1. Por que isso é interessante?
2. Como seria um bom resultado?
3. O que precisa ser verdade antes de ativar?

---

[[02-Projects/Someday/Index|<- Índice Algum Dia / Talvez]] | [[Projects Dashboard|Painel de Projetos]]
`;
}

function renderReferenceNote({ title, created, notes, relatedProject }) {
    const body = trimToNull(notes);

    return `${buildFrontmatter([
        `title: ${yamlQuote(title)}`,
        "type: reference",
        `source: ${yamlQuote("inbox")}`,
        relatedProject ? `related_project: ${yamlQuote(relatedProject)}` : "related_project:",
        `created: ${yamlQuote(created)}`,
        "tags:",
        "  - reference/task",
    ])}

# ${title}

> [!info] Material de suporte
> Guarde aqui suporte operacional e de projeto. Conhecimento durável pode ser promovido depois para \`05-Resources\`.

## Notas

${body ?? "*Notas de referência ficam aqui.*"}

## Links

- Projeto relacionado: \`= this.related_project\`

---

[[04-Tasks/Reference/Index|<- Índice de Referência]]
`;
}

function renderSnippetNote({ title, created, notes }) {
    const body = trimToNull(notes);

    return `${buildFrontmatter([
        `title: ${yamlQuote(title)}`,
        "type: snippet",
        `category: ${yamlQuote("idea")}`,
        "project:",
        "mood:",
        `created: ${yamlQuote(created)}`,
        "tags:",
        "  - writing/snippet",
    ])}

# ${title}

> [!tip] Fragmento de escrita
> Revise isso no fluxo de escrita e decida se vira cena, nota ou material de suporte.

## A ideia

${body ?? "*Capture o fragmento aqui.*"}

## Uso possível

- Pode entrar no projeto:
- Pode virar:

---

[[01-Writing/Snippets/Index|<- Índice de Fragmentos]] | [[Writing Dashboard|Painel de Escrita]]
`;
}

async function createOrUpdateFile(app, filePath, content) {
    const normalizedPath = normalizePath(filePath);
    await ensureFolder(app, normalizedPath.split("/").slice(0, -1).join("/"));

    let file = app.vault.getAbstractFileByPath(normalizedPath);
    if (!file) {
        file = await app.vault.create(normalizedPath, content);
        return file;
    }

    if (!(file instanceof TFile)) {
        throw new Error(`O caminho de destino não é um arquivo markdown: ${normalizedPath}`);
    }

    await app.vault.modify(file, content);
    return file;
}

async function captureInboxItem(params) {
    const { app, quickAddApi } = params;
    const selected = trimToNull(getSelectedText(app)) ?? "";

    const values = await quickAddApi.requestInputs([
        {
            id: "summary",
            label: "Item da inbox",
            type: "text",
            placeholder: "O que você capturou?",
            defaultValue: selected ? selected.split("\n")[0].trim() : "",
        },
        {
            id: "notes",
            label: "Notas",
            type: "textarea",
            placeholder: "Texto de suporte opcional",
            defaultValue: selected,
        },
    ]);

    const summary = trimToNull(values.summary);
    if (!summary) {
        params.abort("Captura cancelada: o título é obrigatório.");
    }

    const created = nowDate();
    const captured = nowDateTime();
    const path = await getUniquePath(app, GTD.inboxFolder, summary);
    const content = renderInboxNote({
        title: summary,
        created,
        captured,
        notes: values.notes,
    });

    const file = await createOrUpdateFile(app, path, content);
    await openFile(app, file);
    new Notice("Item criado na inbox.");
}

async function processInboxItem(params) {
    const { app, quickAddApi } = params;
    const file = getActiveMarkdownFile(app);

    if (!file) {
        params.abort("Abra uma nota da inbox antes de processar.");
    }

    const cache = app.metadataCache.getFileCache(file) ?? {};
    const frontmatter = cache.frontmatter ?? {};
    const isInboxPath = normalizePath(file.path).startsWith(`${GTD.inboxFolder}/`);
    const isInboxItem = isInboxPath && file.basename !== "Inbox" && String(frontmatter.status ?? "").toLowerCase() === "inbox";

    if (!isInboxItem) {
        params.abort("Process Inbox Item só funciona em notas dentro de 04-Tasks/Inbox com status inbox.");
    }

    const markdown = await app.vault.read(file);
    const baseTitle = extractTitleCandidate(app, markdown, file);
    const notes = extractMeaningfulNotes(markdown);
    const dates = currentFileDates(file, frontmatter);

    const route = await quickAddApi.suggester(
        [
            "Próxima ação",
            "Aguardando resposta",
            "Projeto",
            "Algum Dia / Talvez",
            "Referência",
            "Ideia de escrita",
            "Descartar",
        ],
        [
            "next",
            "waiting",
            "project",
            "someday",
            "reference",
            "snippet",
            "discard",
        ],
        "Como este item deve ser organizado?"
    );

    if (route === "discard") {
        const confirmed = await quickAddApi.yesNoPrompt(
            "Descartar este item da inbox?",
            "Isso apagará a nota atual."
        );

        if (!confirmed) {
            return;
        }

        await app.vault.delete(file, true);
        const inbox = app.vault.getAbstractFileByPath(GTD.inboxNote);
        if (inbox instanceof TFile) {
            await openFile(app, inbox);
        }
        new Notice("Item descartado da inbox.");
        return;
    }

    if (route === "next" || route === "waiting") {
        await convertInboxToAction({
            params,
            file,
            title: baseTitle,
            notes,
            dates,
            status: route,
        });
        return;
    }

    if (route === "project") {
        await promoteInboxToProject({
            params,
            file,
            title: baseTitle,
            notes,
            dates,
        });
        return;
    }

    if (route === "someday") {
        const values = await quickAddApi.requestInputs([
            {
                id: "title",
                label: "Item Algum Dia / Talvez",
                type: "text",
                defaultValue: baseTitle,
            },
        ]);

        const title = trimToNull(values.title) ?? baseTitle;
        const targetPath = await getUniquePath(app, GTD.somedayFolder, title, file.path);
        await app.fileManager.renameFile(file, targetPath);

        const movedFile = app.vault.getAbstractFileByPath(targetPath);
        if (!(movedFile instanceof TFile)) {
            throw new Error("Falha ao mover o item da inbox para Algum Dia / Talvez.");
        }

        await app.vault.modify(movedFile, renderSomedayNote({
            title,
            created: dates.created,
            notes,
        }));
        await openFile(app, movedFile);
        new Notice("Item movido para Algum Dia / Talvez.");
        return;
    }

    if (route === "reference") {
        const values = await quickAddApi.requestInputs([
            {
                id: "title",
                label: "Título da referência",
                type: "text",
                defaultValue: baseTitle,
            },
        ]);

        const title = trimToNull(values.title) ?? baseTitle;
        const targetPath = await getUniquePath(app, GTD.referenceFolder, title, file.path);
        await app.fileManager.renameFile(file, targetPath);

        const movedFile = app.vault.getAbstractFileByPath(targetPath);
        if (!(movedFile instanceof TFile)) {
            throw new Error("Falha ao mover o item da inbox para Referência.");
        }

        await app.vault.modify(movedFile, renderReferenceNote({
            title,
            created: dates.created,
            notes,
        }));
        await openFile(app, movedFile);
        new Notice("Item movido para Referência.");
        return;
    }

    if (route === "snippet") {
        const values = await quickAddApi.requestInputs([
            {
                id: "title",
                label: "Título do fragmento",
                type: "text",
                defaultValue: baseTitle,
            },
        ]);

        const title = trimToNull(values.title) ?? baseTitle;
        const targetPath = await getUniquePath(app, GTD.snippetsFolder, title);
        const snippetFile = await createOrUpdateFile(app, targetPath, renderSnippetNote({
            title,
            created: dates.created,
            notes,
        }));

        await app.vault.delete(file, true);
        await openFile(app, snippetFile);
        new Notice("Item promovido para Fragmentos de Escrita.");
    }
}

async function convertInboxToAction({ params, file, title, notes, dates, status }) {
    const { app, quickAddApi } = params;
    const values = await quickAddApi.requestInputs([
        {
            id: "title",
            label: status === "waiting" ? "Item aguardando resposta" : "Próxima ação",
            type: "text",
            defaultValue: title,
        },
        {
            id: "priority",
            label: "Prioridade",
            type: "dropdown",
            options: GTD.priorities,
            defaultValue: "média",
        },
        {
            id: "context",
            label: "Contexto",
            type: "dropdown",
            options: GTD.contexts,
            defaultValue: "@computador",
        },
        {
            id: "project",
            label: "Projeto",
            type: "text",
            placeholder: "Opcional: nome do arquivo do projeto",
            defaultValue: "",
        },
        {
            id: "due",
            label: "Prazo",
            type: "date",
            dateFormat: "YYYY-MM-DD",
            defaultValue: "",
        },
        {
            id: "scheduled_for",
            label: "Agendado para",
            type: "date",
            dateFormat: "YYYY-MM-DD",
            defaultValue: "",
        },
        ...(status === "waiting"
            ? [
                {
                    id: "waiting_on",
                    label: "Aguardando",
                    type: "text",
                    placeholder: "Pessoa ou dependência",
                    defaultValue: "",
                },
            ]
            : []),
    ]);

    const actionTitle = trimToNull(values.title) ?? title;
    const due = parseOptionalDate(values.due);
    const scheduledFor = parseOptionalDate(values.scheduled_for);
    const waitingOn = status === "waiting" ? trimToNull(values.waiting_on) ?? "" : "";
    const targetFolder = status === "waiting" ? GTD.waitingFolder : GTD.nextFolder;
    const targetPath = await getUniquePath(app, targetFolder, actionTitle, file.path);

    await app.fileManager.renameFile(file, targetPath);
    const movedFile = app.vault.getAbstractFileByPath(targetPath);
    if (!(movedFile instanceof TFile)) {
        throw new Error("Falha ao mover a tarefa para a pasta de destino.");
    }

    await app.vault.modify(movedFile, renderTaskNote({
        title: actionTitle,
        status,
        priority: trimToNull(values.priority) ?? "média",
        context: trimToNull(values.context) ?? "@computador",
        project: trimToNull(values.project) ?? "",
        due,
        scheduledFor,
        waitingOn,
        created: dates.created,
        captured: dates.captured,
        completedDate: "",
        notes,
    }));

    await openFile(app, movedFile);
    new Notice(status === "waiting" ? "Item movido para Aguardando Resposta." : "Item movido para Próximas Ações.");
}

async function promoteInboxToProject({ params, file, title, notes, dates }) {
    const { app, quickAddApi } = params;
    const values = await quickAddApi.requestInputs([
        {
            id: "project_title",
            label: "Título do projeto",
            type: "text",
            defaultValue: title,
        },
        {
            id: "next_action_title",
            label: "Primeira próxima ação",
            type: "text",
            placeholder: "Qual é a próxima ação física e visível?",
            defaultValue: "",
        },
        {
            id: "priority",
            label: "Prioridade",
            type: "dropdown",
            options: GTD.priorities,
            defaultValue: "média",
        },
        {
            id: "context",
            label: "Contexto da próxima ação",
            type: "dropdown",
            options: GTD.contexts,
            defaultValue: "@computador",
        },
        {
            id: "due",
            label: "Prazo",
            type: "date",
            dateFormat: "YYYY-MM-DD",
            defaultValue: "",
        },
        {
            id: "scheduled_for",
            label: "Agendado para",
            type: "date",
            dateFormat: "YYYY-MM-DD",
            defaultValue: "",
        },
    ]);

    const projectTitle = trimToNull(values.project_title) ?? title;
    const nextActionTitle = trimToNull(values.next_action_title);
    if (!nextActionTitle) {
        params.abort("Promover para projeto exige a primeira próxima ação.");
    }

    const projectPath = await getUniquePath(app, GTD.activeProjectsFolder, projectTitle);
    const supportNeeded = Boolean(notes && notes.split(/\s+/).filter(Boolean).length > 4);
    let supportNoteName = "";

    if (supportNeeded) {
        const supportTitle = `${projectTitle} Suporte`;
        const supportPath = await getUniquePath(app, GTD.referenceFolder, supportTitle);
        const supportFile = await createOrUpdateFile(app, supportPath, renderReferenceNote({
            title: supportTitle,
            created: dates.created,
            notes,
            relatedProject: projectTitle,
        }));
        supportNoteName = supportFile.basename;
    }

    const projectFile = await createOrUpdateFile(app, projectPath, renderProjectNote({
        title: projectTitle,
        priority: trimToNull(values.priority) ?? "média",
        created: dates.created,
        notes,
        supportNoteName,
    }));

    const actionPath = await getUniquePath(app, GTD.nextFolder, nextActionTitle);
    await createOrUpdateFile(app, actionPath, renderTaskNote({
        title: nextActionTitle,
        status: "next",
        priority: trimToNull(values.priority) ?? "média",
        context: trimToNull(values.context) ?? "@computador",
        project: projectFile.basename,
        due: parseOptionalDate(values.due),
        scheduledFor: parseOptionalDate(values.scheduled_for),
        waitingOn: "",
        created: dates.created,
        captured: dates.captured,
        completedDate: "",
        notes: supportNeeded ? `Suporte do projeto: [[${supportNoteName}]]` : notes,
    }));

    await app.vault.delete(file, true);
    await openFile(app, projectFile);
    new Notice("Projeto criado com a primeira próxima ação.");
}

async function completeTask(params) {
    const { app } = params;
    const file = getActiveMarkdownFile(app);

    if (!file) {
        params.abort("Abra uma nota de tarefa antes de concluir.");
    }

    const cache = app.metadataCache.getFileCache(file) ?? {};
    const frontmatter = cache.frontmatter ?? {};
    const isTask = String(frontmatter.type ?? "").toLowerCase() === "task";

    if (!isTask) {
        params.abort("Complete Task só funciona em notas com type task.");
    }

    if (String(frontmatter.status ?? "").toLowerCase() === "done") {
        new Notice("Esta tarefa já está concluída.");
        return;
    }

    const completedDate = nowDate();
    const title = trimToNull(frontmatter.title) ?? file.basename;

    await app.fileManager.processFrontMatter(file, fm => {
        fm.status = "done";
        fm.completed_date = completedDate;
        fm.tags = ["task/done"];
        if (!fm.title) {
            fm.title = title;
        }
    });

    let content = await app.vault.read(file);

    if (/- \[ \]/.test(content)) {
        content = content.replace(/- \[ \]/, "- [x]");
    }

    if (!content.includes("- [x]")) {
        content = `${content.trim()}\n\n## Conclusão\n\n- [x] ${title}\n`;
    }

    await app.vault.modify(file, content);
    new Notice("Tarefa marcada como concluída.");
}
