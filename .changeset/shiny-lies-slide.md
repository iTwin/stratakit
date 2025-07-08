---
"@stratakit/structures": minor
---

Replaced `actions` prop of `Tree.Item` component with `inlineActions` and `menuActions` props.

At most 3 inline actions will be displayed:

- First two inline actions are displayed when action menu is displayed.
- First action is displayed when tree item has an error.

```tsx
<Tree.Item
  inlineActions={[
    <Tree.ItemAction key={…} icon={…} label={…} />,
    <Tree.ItemAction key={…} icon={…} label={…} />,
  ]}
  menuActions={[
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
  menuActions={[
    <MyAction />,
  ]}
/>
```
