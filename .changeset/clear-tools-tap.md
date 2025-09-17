---
"@stratakit/bricks": patch
---

Fixed `IconButton` active state semantics. It will now use `aria-current` instead of `aria-pressed` when rendered as an anchor.
