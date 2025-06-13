---
"@stratakit/structures": patch
"@stratakit/bricks": patch
---

Added [subpath exports](https://nodejs.org/api/packages.html#subpath-exports) for individual components. These new exports allow StrataKit to expose both convenience and compositional APIs of the same component.

```tsx
// Convenience import
import Chip from "@stratakit/structures/Chip";
// Alternative
import { default as Chip } from "@stratakit/structures/Chip";

<Chip />;
```

```tsx
// Compositional import
import * as Chip from "@stratakit/structures/Chip";

<Chip.Root>
	<Chip.Label>Label</Chip.Label>
	<Chip.DismissButton />
</Chip.Root>;
```

Compositional components are useful for building custom components that require more control over the structure and behavior, while convenience components provide a ready-to-use solution for common use cases. See [#405](https://github.com/iTwin/design-system/discussions/405) for more details.

APIs exported from the barrel file are not changed in this release. Some exported components are compositional, while others are convenience components.

```tsx
// Chip is exported as a convenience API in the barrel file:
import { Chip } from "@stratakit/structures";

<Chip />;
```
