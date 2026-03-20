---
title: "Index de Diário"
type: index
section: daily
tags:
  - index/daily
---

# Index de Diário

> [!info]
> Todas as daily notes ficam listadas aqui automaticamente.
> Reviews da manhã, noite e semana ficam fora deste índice.

```dataviewjs
const loadDashboardHelpers = async () => {
    if (typeof window.forceLoadCustomJS === "function") {
        try {
            await window.forceLoadCustomJS();
        } catch (error) {
            console.warn("CustomJS reload failed", error);
        }
    }

    if (typeof cJS === "function") {
        try {
            const modules = await cJS();
            if (modules?.DashboardHelpers) return modules.DashboardHelpers;
        } catch (error) {
            console.warn("CustomJS DashboardHelpers unavailable", error);
        }
    }

    const file = app.vault.getAbstractFileByPath("_scripts/DashboardHelpers.js");
    if (!file) throw new Error("DashboardHelpers.js missing from _scripts");
    const source = await app.vault.cachedRead(file);
    const DashboardHelpersClass = new Function(`${source}; return DashboardHelpers;`)();
    return new DashboardHelpersClass();
};

const h = await loadDashboardHelpers();
const pages = dv.pages('"03-Daily/Journal"')
    .where(p => p.type === "daily")
    .sort(p => p.file.name, "desc")
    .array();

const rows = [];
for (const p of pages) {
    rows.push([
        p.file.link,
        p.day || "-",
        (await h.resolveHighlight(app, p)) || "-",
        p.file.cday,
        p.file.mday
    ]);
}

dv.table(["Diario", "Dia", "Destaque", "Criado", "Atualizado"], rows);
```

[[Daily Dashboard|<- Daily Dashboard]]
