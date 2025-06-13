---
"@stratakit/bricks": patch
---

Added compositional `Anchor.Root` component. This new component can be used when you need fine grained configuration.

To use the compositional components, import them from the `/Anchor` subpath:

```tsx
import * as Anchor from "@stratakit/bricks/Anchor";

<Anchor.Root href="https://www.example.com">Example</Anchor.Root>;
```
