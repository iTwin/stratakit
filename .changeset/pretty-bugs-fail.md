---
"@stratakit/bricks": patch
---

Added a compositional `Anchor.Root` component. These new components should be preferred over the existing convenience `Anchor` component by consumers that need fine grained configuration. To use the compositional components, use the subpath import:

```tsx
import * as Anchor from "@stratakit/bricks/Anchor";

<Anchor.Root href="https://www.example.com">Example</Anchor.Root>;
```

To continue using the convenience `Anchor` component:

```tsx
import { Anchor } from "@stratakit/bricks";

<Anchor.Root href="https://www.example.com">Example</Anchor.Root>;
```
