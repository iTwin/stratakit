---
"@stratakit/foundations": minor
---

Renamed `--stratakit-color-icon-neutral-hover` to `--stratakit-color-icon-neutral-primary` for consistency and accuracy.

To handle this breaking change, do a find-and-replace for all existing references in your codebase.

```diff
- var(--stratakit-color-icon-neutral-hover)
+ var(--stratakit-color-icon-neutral-primary)
```
