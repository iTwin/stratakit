---
"@stratakit/structures": patch
---

Added active and active-hover states to the `Table.Row` component for styling selected rows. To enable selection, consumers should render a `Checkbox` component within the row. A row is considered selected when its checkbox is checked. The active-hover state is applied when a selected row is hovered.

```tsx
<Table.Row>
	<Table.Cell>
		<Checkbox checked />
	</Table.Cell>
	<Table.Cell>Item 1</Table.Cell>
</Table.Row>
```
