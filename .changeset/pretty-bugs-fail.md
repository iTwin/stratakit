---
"@stratakit/bricks": minor
---

`Anchor` now also supports a composition API. This addition requires either updating the imports to continue using the convenience API or to switch to the new composition API.

Continue using the convenience API:

```diff
- import { Anchor } from '@stratakit/bricks';
+ import Anchor from '@stratakit/bricks/anchor';
```

Switch to the new composition API:

```diff
import { Anchor } from '@stratakit/bricks';

- <Anchor>…</Anchor>
+ <Anchor.Root>…</Anchor.Root>
```
