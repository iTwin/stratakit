---
"@stratakit/foundations": patch
"@stratakit/structures": patch
"@stratakit/bricks": patch
---

Decoupled the styles for `@stratakit/bricks` and `@stratakit/structures` from `@stratakit/foundations` so that the latter does not indirectly depend on the former two. This change also reduces the need for these packages to remain in lockstep.
