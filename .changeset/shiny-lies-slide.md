---
"@stratakit/structures": minor
---

Added `Tree.ItemOverflowAction` component to display the tree item actions in the overflow menu.

```tsx
<Tree.ItemOverflowAction label={…} actions={[
   <Tree.ItemAction key={…} icon={…} label={…} />,
	 <Tree.ItemAction key={…} icon={…} label={…} />,
]} />
```

Updated `Tree.Item` component to no longer handle the overflow of specified actions. Instead, consumers can now use the `Tree.ItemOverflowAction` component to render the overflow actions manually.

```tsx
actions={[
  <Tree.ItemAction key={…} icon={…} label={…} />,
  <Tree.ItemAction key={…} icon={…} label={…} />,
  <Tree.ItemOverflowAction key={…} actions={[
    <Tree.ItemAction key={…} icon={…} label={…} />,
    <Tree.ItemAction key={…} icon={…} label={…} />,
  ]} />,
]}
```
