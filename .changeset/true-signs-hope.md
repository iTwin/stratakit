---
"@stratakit/foundations": minor
---

The prefix for all CSS variables has changed to `--stratakit`.

To handle this breaking change, replace all instances of "--ids" with "--stratakit". For example:

```diff
- background-color: var(--ids-color-bg-page-base);
+ background-color: var(--stratakit-color-bg-page-base);
```
