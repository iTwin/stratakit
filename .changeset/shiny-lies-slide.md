---
"@stratakit/structures": minor
---

Changed `actions` prop of the `Tree.Item` component to no longer automatically inline some of the actions. Instead consumers can now use newly added `inlineActions` prop to render the inline actions and `actions` prop to render the menu actions.

At most 3 inline actions will be displayed:

- First two inline actions are displayed when action menu is displayed.
- First action is displayed when tree item has an error.

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

Additionally, consumers can now conditionally render the `Tree.ItemAction` in a wrapper component.

```tsx
function MyAction() {
  const enabled = useMyActionEnabled();
  if (!enabled) return null;
  return <Tree.ItemAction label={…} />;
}

// This will correctly render 3 inline actions w/o a menu button OR 2 inline actions with a menu button.
<Tree.Item
  inlineActions={[
    <Tree.ItemAction key={…} icon={…} label={…} />,
    <Tree.ItemAction key={…} icon={…} label={…} />,
    <Tree.ItemAction key={…} icon={…} label={…} />,
  ]}
  actions={[
    <MyAction />,
  ]}
/>
```
