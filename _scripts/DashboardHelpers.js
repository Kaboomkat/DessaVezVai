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
}
