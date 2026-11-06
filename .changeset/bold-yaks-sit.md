---
"@stratakit/mui": minor
---

Added `actions` prop to `DialogTitle`. Use it to display additional actions in the header of the `Dialog`, such as a dismiss button.

```tsx
<DialogTitle
	actions={[
		<IconButton key="dismiss" label="Dismiss">
			<Icon href={svgDismiss} />
		</IconButton>,
	]}
>
	Dialog title
</DialogTitle>
```
