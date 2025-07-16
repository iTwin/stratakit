---
"@stratakit/structures": minor
---

Changed `actions` prop of the `Tree.Item` component to no longer automatically inline some of the actions. Instead newly added `inlineActions` prop can be used to display up to two inline actions. All actions specified in a `actions` prop will be rendered in the action menu.

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

A single error-related action should be specified when the tree item has an error.

```tsx
<Tree.Item
  error={error}
  inlineActions={
	  error
	    ? [
	        <Tree.ItemAction key={…} icon={…} label={…} />
	      ]
	    : [
	        <Tree.ItemAction key={…} icon={…} label={…} />,
	        <Tree.ItemAction key={…} icon={…} label={…} />,
	      ]
	}
/>
```
