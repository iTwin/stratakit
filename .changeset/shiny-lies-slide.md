---
"@stratakit/structures": minor
---

Changed `actions` prop of the `Tree.Item` component to no longer automatically inline some of the actions. Instead consumers can now use newly added `inlineActions` prop to render the inline actions and `actions` prop to render the menu actions.

At most 2 inline actions will be displayed.

```tsx
<Tree.Item
  inlineActions={[
    <Tree.ItemAction key={…} icon={…} label={…} />,
    <Tree.ItemAction key={…} icon={…} label={…} />,
  ]}
  actions={[
    <Tree.ItemAction key={…} label={…} />,
    <Tree.ItemAction key={…} label={…} />,
  ]}
/>
```
