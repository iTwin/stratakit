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

// Alternatively you can import each component individually:
import {
	DismissButton as ChipDismiss,
	Label as ChipLabel,
	Root as ChipRoot,
} from "@stratakit/structures/Chip";

<ChipRoot>
	<ChipLabel>Label</ChipLabel>
	<ChipDismissButton onClick={onDismiss} />
</ChipRoot>;
```

To continue using the convenience `Chip` component:

```tsx
import { Chip } from "@stratakit/structures";

<Chip label="Value" />;

// Alternatively, you can import the default export from the subpath:
import { default as Chip } from "@stratakit/structures/Chip";
```
