---
title: Archive Index
type: index
section: archive
---

# 🗄️ Arquivo

> Notas que saíram do fluxo ativo ficam listadas aqui.

```dataview
TABLE WITHOUT ID
    file.link as "Nota",
    file.mtime as "Atualizado"
FROM "06-Archive"
WHERE file.name != "Index"
SORT file.mtime DESC
```

[[Home|← Home]]
