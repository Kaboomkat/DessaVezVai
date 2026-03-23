class ReviewControls {

    constructor(appInstance = app, helpers = null) {
        this.app = appInstance;
        this._helpers = helpers;
        this.moodOptions = [
            { value: "\uD83D\uDE22", label: "Muito mal" },
            { value: "\uD83D\uDE15", label: "Mal" },
            { value: "\uD83D\uDE10", label: "Neutro" },
            { value: "\uD83D\uDE42", label: "Bem" },
            { value: "\uD83D\uDE04", label: "Otimo" }
        ];
        this.energyOptions = [
            { value: "\uD83D\uDCA4", label: "Sem energia" },
            { value: "\uD83D\uDE2A", label: "Cansado" },
            { value: "\uD83D\uDE10", label: "Neutro" },
            { value: "\uD83D\uDD25", label: "Disposto" },
            { value: "\u26A1", label: "Energizado" }
        ];
    }

    _optionIndex(value, options) {
        const idx = options.findIndex(option => option.value === String(value).trim());
        return idx >= 0 ? idx + 1 : null;
    }

    _indexColor(v) {
        if (this._helpers) return this._helpers._indexColor(v);
        if (!v) return "#2a2a2a";
        const t = (v - 1) / 4;
        const r = Math.round(169 + (15 - 169) * t);
        const g = Math.round(59 + (93 - 59) * t);
        const b = Math.round(22 + (53 - 22) * t);
        return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
    }

    _colorForValue(value, type) {
        const options = type === "energy" ? this.energyOptions : this.moodOptions;
        return this._indexColor(this._optionIndex(value, options));
    }

    async updateFrontmatterField(filePath, field, value) {
        const file = this.app.vault.getAbstractFileByPath(filePath);
        if (!file) {
            console.warn(`Arquivo nao encontrado: ${filePath}`);
            return false;
        }

        try {
            await this.app.fileManager.processFrontMatter(file, frontmatter => {
                frontmatter[field] = value;
            });
            return true;
        } catch (error) {
            console.warn(`Falha ao atualizar ${field} em ${filePath}`, error);
            return false;
        }
    }

    _buttonStyle(isSelected, background) {
        const border = isSelected ? "2px solid #ffffff" : "1px solid var(--background-modifier-border)";
        const shadow = isSelected ? "0 0 0 1px rgba(0,0,0,0.35)" : "none";
        return [
            "display:flex",
            "align-items:center",
            "justify-content:center",
            "gap:6px",
            "min-width:56px",
            "padding:8px 10px",
            "border-radius:10px",
            `border:${border}`,
            `background:${background}`,
            "color:#fff",
            `box-shadow:${shadow}`,
            "cursor:pointer",
            "font-size:1.1em"
        ].join(";");
    }

    _renderOptionGroup(container, label, options, currentValue, getColor, onSelect) {
        const section = container.createDiv({ attr: { style: "margin:10px 0 14px;" } });
        section.createEl("div", {
            text: label,
            attr: { style: "font-size:0.85em;color:var(--text-muted);margin-bottom:8px;font-weight:600;" }
        });

        const row = section.createDiv({
            attr: {
                style: "display:flex;flex-wrap:wrap;gap:8px;"
            }
        });

        for (const option of options) {
            const button = row.createEl("button", {
                text: option.value,
                attr: {
                    type: "button",
                    title: option.label,
                    "aria-pressed": option.value === currentValue ? "true" : "false",
                    style: this._buttonStyle(option.value === currentValue, getColor(option.value))
                }
            });

            button.addEventListener("click", async () => {
                await onSelect(option.value);
            });
        }
    }

    async renderReviewPicker(dv, config) {
        const filePath = config.filePath;
        const currentMood = config.currentMood ?? "";
        const currentEnergy = config.currentEnergy ?? "";

        dv.header(2, "Mood e Energia");
        const wrapper = dv.container.createDiv({
            attr: {
                style: "margin:8px 0 16px;padding:12px;border:1px solid var(--background-modifier-border);border-radius:12px;background:var(--background-secondary);"
            }
        });

        const status = wrapper.createDiv({
            attr: { style: "font-size:0.85em;color:var(--text-muted);margin-bottom:6px;" }
        });
        status.textContent = "Clique para atualizar o frontmatter desta review.";

        const refresh = async (field, value) => {
            const ok = await this.updateFrontmatterField(filePath, field, value);
            if (!ok) return;
            status.textContent = `${field} atualizado para ${value}. Reabra a nota ou aguarde o refresh do Dataview.`;
        };

        this._renderOptionGroup(
            wrapper,
            "Humor",
            this.moodOptions,
            currentMood,
            value => this._colorForValue(value, "mood"),
            async value => refresh(config.moodField, value)
        );

        this._renderOptionGroup(
            wrapper,
            "Energia",
            this.energyOptions,
            currentEnergy,
            value => this._colorForValue(value, "energy"),
            async value => refresh(config.energyField, value)
        );
    }
}
