---
"@stratakit/structures": patch
---

Added active and active-hover states to the `Table.Row` component. Use `aria-selected` prop to indicate the active state of a row. The active-hover state is applied when the row is hovered while it is active.

```tsx
<Table.Row aria-selected={true}>{row1}</Table.Row> // displayed as active
<Table.Row aria-selected={false}>{row2}</Table.Row>
```
