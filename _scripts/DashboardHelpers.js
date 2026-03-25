class DashboardHelpers {

    constructor() {
        this.MOOD_EMOJIS = [
            "\uD83D\uDE22",
            "\uD83D\uDE15",
            "\uD83D\uDE10",
            "\uD83D\uDE42",
            "\uD83D\uDE04"
        ];
        this.ENERGY_EMOJIS = [
            "\uD83D\uDCA4",
            "\uD83D\uDE2A",
            "\uD83D\uDE10",
            "\uD83D\uDD25",
            "\u26A1"
        ];
    }

    _emojiIndex(value, arr) {
        if (!value) return null;
        const idx = arr.indexOf(String(value).trim());
        return idx >= 0 ? idx + 1 : null;
    }

    _scoreIndex(value, type = "mood") {
        if (value == null || value === "") return null;
        if (typeof value === "number") {
            return Math.max(1, Math.min(5, value));
        }

        const trimmed = String(value).trim();
        const numeric = Number(trimmed);
        if (!Number.isNaN(numeric) && trimmed !== "") {
            return Math.max(1, Math.min(5, numeric));
        }

        const arr = type === "energy" ? this.ENERGY_EMOJIS : this.MOOD_EMOJIS;
        return this._emojiIndex(trimmed, arr);
    }

    _indexColor(v) {
        if (!v) return "#2a2a2a";
        const t = (v - 1) / 4;
        const r = Math.round(169 + (15 - 169) * t);
        const g = Math.round(59 + (93 - 59) * t);
        const b = Math.round(22 + (53 - 22) * t);
        return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
    }

    moodColor(value, type = "mood") {
        const arr = type === "energy" ? this.ENERGY_EMOJIS : this.MOOD_EMOJIS;
        return this._indexColor(this._emojiIndex(value, arr));
    }

    scoreColor(value, type = "mood") {
        return this._indexColor(this._scoreIndex(value, type));
    }

    cell(value, type = "mood") {
        const arr = type === "energy" ? this.ENERGY_EMOJIS : this.MOOD_EMOJIS;
        const idx = this._emojiIndex(value, arr);
        const color = this._indexColor(idx);
        const text = value ? String(value).trim() : "-";
        const textColor = idx ? "#fff" : "#555";
        return `<td style="background:${color};color:${textColor};text-align:center;border-radius:6px;padding:6px 12px;font-size:1.3em;">${text}</td>`;
    }

    parseVal(v, type = "mood") {
        if (!v) return null;
        const arr = type === "energy" ? this.ENERGY_EMOJIS : this.MOOD_EMOJIS;
        return this._emojiIndex(v, arr);
    }

    closestEmoji(avg, type = "mood") {
        if (avg == null) return null;
        const arr = type === "energy" ? this.ENERGY_EMOJIS : this.MOOD_EMOJIS;
        const idx = Math.max(0, Math.min(4, Math.round(Number(avg)) - 1));
        return arr[idx];
    }

    currentWeekNumber(dateInput = new Date()) {
        const d = new Date(dateInput);
        d.setHours(0, 0, 0, 0);
        d.setDate(d.getDate() + 3 - ((d.getDay() + 6) % 7));
        const week1 = new Date(d.getFullYear(), 0, 4);
        return 1 + Math.round(
            ((d.getTime() - week1.getTime()) / 86400000 - 3 + ((week1.getDay() + 6) % 7)) / 7
        );
    }

    normalizeHighlight(value) {
        if (value == null) return null;
        const text = String(value).replace(/\s+/g, " ").trim();
        return text ? text : null;
    }

    internalLink(path, innerHtml, style = "", ariaLabel = null) {
        if (!path) return innerHtml;
        const attr = v => String(v ?? "").replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        const safePath = attr(path);
        const safeAria = attr(ariaLabel ?? path);
        return `<a href="${safePath}" data-href="${safePath}" aria-label="${safeAria}" class="internal-link" style="${style}">${innerHtml}</a>`;
    }

    _normalizeHeading(text) {
        return String(text ?? "")
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .trim();
    }

    extractSectionText(source, heading) {
        if (!source) return null;
        const wanted = this._normalizeHeading(heading);
        const lines = String(source).replace(/\r/g, "").split("\n");
        let startIndex = -1;
        let level = 0;
        const isSeparator = line => /^([-*_])\1{2,}$/.test(String(line).trim());

        for (let i = 0; i < lines.length; i++) {
            const match = lines[i].match(/^(#{1,6})\s+(.*)$/);
            if (!match) continue;
            if (this._normalizeHeading(match[2]) === wanted) {
                startIndex = i + 1;
                level = match[1].length;
                break;
            }
        }

        if (startIndex === -1) return null;

        const collected = [];
        for (let i = startIndex; i < lines.length; i++) {
            const line = lines[i];
            const match = line.match(/^(#{1,6})\s+(.*)$/);
            if (match && match[1].length <= level) break;
            if (isSeparator(line)) break;
            collected.push(line);
        }

        const cleaned = collected
            .filter(line => !isSeparator(line))
            .filter(line => !/^`?=\s*this\.highlight`?$/.test(line.trim()))
            .join("\n")
            .trim();

        return this.normalizeHighlight(cleaned);
    }

    async syncHighlightToFrontmatter(app, filePath, heading = "Destaque do Dia") {
        if (!app?.vault || !filePath) return false;
        const file = app.vault.getAbstractFileByPath(filePath);
        if (!file) return false;

        const source = await app.vault.cachedRead(file);
        const bodyText = this.extractSectionText(source, heading);
        if (!bodyText) return false;

        try {
            await app.fileManager.processFrontMatter(file, frontmatter => {
                const current = this.normalizeHighlight(frontmatter.highlight);
                if (current !== bodyText) {
                    frontmatter.highlight = bodyText;
                }
            });
            return true;
        } catch (error) {
            console.warn(`Falha ao sincronizar highlight em ${filePath}`, error);
            return false;
        }
    }

    async resolveHighlight(app, pageOrPath, heading = "Destaque do Dia") {
        const page = typeof pageOrPath === "string" ? null : pageOrPath;
        const filePath = typeof pageOrPath === "string" ? pageOrPath : page?.file?.path;
        const metaHighlight = this.normalizeHighlight(page?.highlight);
        if (metaHighlight) return metaHighlight;
        if (!app?.vault || !filePath) return null;

        const file = app.vault.getAbstractFileByPath(filePath);
        if (!file) return null;

        const source = await app.vault.cachedRead(file);
        return this.extractSectionText(source, heading);
    }
}
