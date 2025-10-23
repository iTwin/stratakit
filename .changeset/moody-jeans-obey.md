---
"@stratakit/structures": minor
---

Removed unintentionally exposed `TreeItem` [subpath export](https://nodejs.org/api/packages.html#subpath-exports). Tree item components are available under the `Tree` subpath or the main entry point of the package.

```tsx
// Before
import * as TreeItem from "@stratakit/structures/TreeItem";
<TreeItem.Root />
<TreeItem.Action />

// After
import * as Tree from "@stratakit/structures/Tree";
<Tree.Item />
<Tree.ItemAction />

// After (using main entry point)
import { Tree } from "@stratakit/structures";
<Tree.Item />
<Tree.ItemAction />
```
