---
"@stratakit/mui": minor
---

Added `actions` prop to `DialogTitle`. Use it to display additional actions in the header of the `Dialog`, such as a dismiss button. Use `slotProps.wrapper` to customize the wrapper element if needed.

```tsx
<DialogTitle
	actions={[
		<IconButton key="dismiss" label="Dismiss">
			<Icon href={svgDismiss} />
		</IconButton>,
	]}
	slotProps={{
		wrapper: {
			// Props for the wrapper element
		},
	}}
>
	Dialog title
</DialogTitle>
```
