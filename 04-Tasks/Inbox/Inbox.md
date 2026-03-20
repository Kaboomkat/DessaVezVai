---
title: Inbox
type: index
cssclass: inbox
---

# 📥 Inbox

> [!info] Capture everything here. Process daily.

This is your GTD inbox. Capture any thought, task, idea, or reminder here. During your daily review, process each item by asking:

1. **What is it?**
2. **Is it actionable?**
   - No → Trash, Someday/Maybe, or Reference
   - Yes → Continue...
3. **What's the next action?**
   - Takes <2 minutes? → Do it now
   - Takes longer? → Continue...
4. **Am I the best person?**
   - No → Delegate (Waiting For)
   - Yes → Add to Next Actions

---

## ➕ Quick Capture

```button
name 📥 Add to Inbox
type command
action QuickAdd: Quick Capture
```

---

## 📋 Inbox Items

```dataview
TABLE WITHOUT ID
    file.link as "Item",
    file.cday as "Captured",
    tags as "Tags"
FROM "04-Tasks/Inbox"
WHERE file.name != "Inbox"
SORT file.ctime ASC
```

---

## 📊 Inbox Stats

```dataviewjs
const items = dv.pages('"04-Tasks/Inbox"').where(p => p.file.name !== "Inbox");
const count = items.length;

let message = "";
if (count === 0) {
    message = "🎉 **Inbox Zero!** Great job keeping things clear.";
} else if (count <= 5) {
    message = `📬 ${count} items to process. Quick review should do it.`;
} else if (count <= 15) {
    message = `📮 ${count} items waiting. Time for a processing session.`;
} else {
    message = `📦 ${count} items piling up! Schedule a longer review session.`;
}

dv.paragraph(message);
```

---

## 🔄 Processing Workflow

When processing inbox items, move them to:

| If... | Then move to... |
|-------|-----------------|
| Not actionable, not needed | 🗑️ Delete |
| Might be useful someday | [[02-Projects/Someday/\|💭 Someday]] |
| Reference material | [[04-Tasks/Reference/\|📚 Reference]] |
| Next physical action clear | [[04-Tasks/Next/\|⚡ Next Actions]] |
| Waiting on someone else | [[04-Tasks/Waiting/\|⏳ Waiting]] |
| Multi-step outcome | [[02-Projects/Active/\|🎯 New Project]] |
| Writing idea | [[01-Writing/Snippets/\|💡 Snippets]] |

---

[[Tasks Dashboard|← Back to Tasks Dashboard]]
