---
"@stratakit/structures": minor
---

Removed unintentionally exposed `TreeItem` [subpath export](https://nodejs.org/api/packages.html#subpath-exports). Tree item components are available under the `Tree` subpath or the main entry point of the package.

```diff
- import * as TreeItem from "@stratakit/structures/TreeItem";
+ import * as Tree from "@stratakit/structures/Tree";

- <TreeItem.Root />
+ <Tree.Item />

- <TreeItem.Action />
+ <Tree.ItemAction />
```
