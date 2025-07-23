---
"@stratakit/structures": patch
---

Added compositional `Banner.Root`, `Banner.Icon`, `Banner.Label`, `Banner.Message`, `Banner.Actions`, and `Banner.DismissButton` components. These new components can be used when you need fine grained configuration.

To use the compositional components, import them from the `/unstable_Banner` subpath:

```tsx
import * as Banner from "@stratakit/structures/unstable_Banner";

<Banner.Root>
	<Banner.Icon href={placeholderIcon} />
	<Banner.Label>Label</Banner.Label>
	<Banner.Message>Message</Banner.Message>
	<Banner.Actions>
		<Button>Action</Button>
	</Banner.Actions>
	<Banner.DismissButton onClick={onDismiss} />
</Banner.Root>;
```
