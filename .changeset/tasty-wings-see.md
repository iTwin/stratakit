---
"@stratakit/structures": patch
"@stratakit/bricks": patch
---

Added [subpath exports](https://nodejs.org/api/packages.html#subpath-exports) to StrataKit packages. These new exports should be preferred over an existing barrel file to improve the performance of build tools. Additionally, subpath exports allow StrataKit to expose both convenience and compositional components.

```tsx
// Convenience import
import Chip from "@stratakit/structures/Chip";
// Alternative
import { default as Chip } from "@stratakit/structures/Chip";

<Chip />;

// Compositional import
import * as Chip from "@stratakit/structures/Chip";

<Chip.Root>
	<Chip.Label>Label</Chip.Label>
	<Chip.DismissButton />
</Chip.Root>;
```

Compositional components are useful for building custom components that require more control over the structure and behavior, while convenience components provide a ready-to-use solution for common use cases.

APIs exported from the barrel files are not changed. Some exported components are compositional, while others are convenience components.

```tsx
// Chip is exported as a convenience API in the barrel file:
import { Chip } from "@stratakit/structures";

<Chip />;
```
