---
"@stratakit/bricks": patch
---

Added compositional `Anchor.Root` and `Anchor.Icon` components. These new components can be used when you need fine grained configuration.

To use the compositional components, import them from the `/Anchor` subpath:

```tsx
import * as Anchor from "@stratakit/bricks/Anchor";
import windowPopoutIconHref from "@stratakit/icons/window-popout.svg";

<Anchor.Root href="https://www.example.com">
	Open in new window
	<Anchor.Icon href={windowPopoutIconHref} alt="External link" />
</Anchor.Root>;
```
