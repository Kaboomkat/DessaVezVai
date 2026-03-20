class DashboardHelpers {

    constructor() {
        // Mood: 😢(1) → 😕(2) → 😐(3) → 🙂(4) → 😄(5)
        this.MOOD_EMOJIS   = ['😢', '😕', '😐', '🙂', '😄'];
        // Energia: 💤(1) → 😪(2) → 😐(3) → 🔥(4) → ⚡(5)
        this.ENERGY_EMOJIS = ['💤', '😪', '😐', '🔥', '⚡'];
    }

    // ─── Mapeia emoji → índice 1-5 ────────────────────────────────────────────
    _emojiIndex(value, arr) {
        if (!value) return null;
        const idx = arr.indexOf(String(value).trim());
        return idx >= 0 ? idx + 1 : null;
    }

    _scoreIndex(value, type = 'mood') {
        if (value == null || value === '') return null;
        if (typeof value === 'number') {
            return Math.max(1, Math.min(5, value));
        }

        const trimmed = String(value).trim();
        const numeric = Number(trimmed);
        if (!Number.isNaN(numeric) && trimmed !== '') {
            return Math.max(1, Math.min(5, numeric));
        }

        const arr = type === 'energy' ? this.ENERGY_EMOJIS : this.MOOD_EMOJIS;
        return this._emojiIndex(trimmed, arr);
    }

    // ─── Índice 1-5 → cor hex (vermelho → verde) ──────────────────────────────
    _indexColor(v) {
        if (!v) return "#2a2a2a";
        const t = (v - 1) / 4; // 0.0 a 1.0 em 5 passos
        const r = Math.round(169 + (15  - 169) * t);
        const g = Math.round(59  + (93  - 59)  * t);
        const b = Math.round(22  + (53  - 22)  * t);
        return `#${r.toString(16).padStart(2,'0')}${g.toString(16).padStart(2,'0')}${b.toString(16).padStart(2,'0')}`;
    }

    // ─── Cor de fundo para um emoji ───────────────────────────────────────────
    // type: 'mood' | 'energy'
    moodColor(value, type = 'mood') {
        const arr = type === 'energy' ? this.ENERGY_EMOJIS : this.MOOD_EMOJIS;
        return this._indexColor(this._emojiIndex(value, arr));
    }

    scoreColor(value, type = 'mood') {
        return this._indexColor(this._scoreIndex(value, type));
    }

    // ─── Célula <td> colorida com o emoji ─────────────────────────────────────
    // type: 'mood' | 'energy'
    cell(value, type = 'mood') {
        const arr = type === 'energy' ? this.ENERGY_EMOJIS : this.MOOD_EMOJIS;
        const idx = this._emojiIndex(value, arr);
        const color = this._indexColor(idx);
        const text  = value ? String(value).trim() : "—";
        const textColor = idx ? "#fff" : "#555";
        return `<td style="background:${color};color:${textColor};text-align:center;border-radius:6px;padding:6px 12px;font-size:1.3em;">${text}</td>`;
    }

    // ─── Índice numérico 1-5 (para cálculo de médias) ─────────────────────────
    // type: 'mood' | 'energy'
    parseVal(v, type = 'mood') {
        if (!v) return null;
        const arr = type === 'energy' ? this.ENERGY_EMOJIS : this.MOOD_EMOJIS;
        return this._emojiIndex(v, arr);
    }

    // ─── Emoji mais próximo de uma média numérica ─────────────────────────────
    // avg: número 1.0-5.0; type: 'mood' | 'energy'
    closestEmoji(avg, type = 'mood') {
        if (avg == null) return null;
        const arr = type === 'energy' ? this.ENERGY_EMOJIS : this.MOOD_EMOJIS;
        const idx = Math.max(0, Math.min(4, Math.round(avg) - 1));
        return arr[idx];
    }

    // ─── Número ISO da semana corrente ────────────────────────────────────────
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
