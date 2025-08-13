---
"@stratakit/structures": patch
---

Added proper styling for `Divider` rendered inside a `Toolbar.Group`.

```tsx
<Toolbar.Group variant="solid">
  <Toolbar.Item render={…} />
  <Divider orientation="vertical" />
  <Toolbar.Item render={…} />
  <Toolbar.Item render={…} />
</Toolbar.Group>
```
