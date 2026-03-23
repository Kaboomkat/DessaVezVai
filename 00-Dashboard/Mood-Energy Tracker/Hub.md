---
title: Mood and Energy Tracker
type: hub
tags:
  - tracker/hub
  - tracker/mood
---

# Mood and Energy Tracker

Central hub for yearly, monthly, and weekly mood trackers.

## Yearly Trackers

```dataviewjs
const trackers = dv.pages('"00-Dashboard/Mood-Energy Tracker/Yearly"')
    .where(p => p.year)
    .sort(p => p.year, 'desc');

if (trackers.length === 0) {
    dv.paragraph("No yearly tracker found.");
} else {
    dv.list(trackers.map(t => t.file.link));
}
```

## Create a New Year

1. Use the template [[_templates/daily/Mood-Energy Year Template|Mood-Energy Year Template]].
2. Create the new file inside `00-Dashboard/Mood-Energy Tracker/Yearly/`.
3. Generate monthly files for that year if you want direct month navigation.

## Data Contract

- Morning mood and energy come from `03-Daily/Morning Reviews/`.
- Evening mood and energy come from `03-Daily/Evening Reviews/`.
- Daily notes only aggregate and display those values.

[[00-Dashboard/Daily Dashboard|Back to Daily Dashboard]]
