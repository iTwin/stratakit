---
"@stratakit/structures": patch
---

Added compositional `Chip.Root`, `Chip.Label` and `Chip.DismissButton` components to the `@stratakit/structures` package. These new components should be preferred over an existing convenience `Chip` component by consumers that need a fine grained configuration. To use the compositional components, use the subpath import:

```tsx
import * as Chip from "@stratakit/structures/Chip";

<Chip.Root>
	<Chip.Label>Label</Chip.Label>
	<Chip.DismissButton onClick={onDismiss} />
</Chip.Root>;
```

To continue using the convenience `Chip` component:

```tsx
import { Chip } from "@stratakit/structures";

<Chip label="Value" />;
```
