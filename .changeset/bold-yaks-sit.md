---
"@stratakit/mui": minor
---

Added `actions` prop to `DialogTitle`. Use it to display additional actions in the header of the `Dialog`, such as a dismiss button. Use `slotProps.header` to customize the header element if needed.

```tsx
<DialogTitle
	actions={[
		<IconButton key="dismiss" label="Dismiss">
			<Icon href={svgDismiss} />
		</IconButton>,
	]}
	slotProps={{
		header: {
			className: "draggable-header",
			onPointerDown: handlePointerDown,
		},
	}}
>
	Dialog title
</DialogTitle>
```
