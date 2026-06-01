---
"@stratakit/mui": minor
---

Disabled the `storageManager` in `ThemeProvider`. The `colorScheme` must now be manually synchronized to `localStorage` if you want to persist it across sessions.
