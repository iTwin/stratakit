---
"@stratakit/structures": patch
---

Added support for dividers in the `Toolbar` component. To display a divider, render the `Divider` inside a `Toolbar.Group` component.

```tsx
<Toolbar.Group variant="solid">
  <Toolbar.Item render={…} />
  <Divider orientation="vertical" />
  <Toolbar.Item render={…} />
  <Toolbar.Item render={…} />
</Toolbar.Group>
```
