---
"@stratakit/structures": patch
---

Added compositional `Chip.Root`, `Chip.Label` and `Chip.DismissButton` components. These new components can be used when you need fine grained configuration.

To use the compositional components, import them from the `/Chip` subpath:

```tsx
import * as Chip from "@stratakit/structures/Chip";

<Chip.Root>
	<Chip.Label>Label</Chip.Label>
	<Chip.DismissButton onClick={onDismiss} />
</Chip.Root>;
```
