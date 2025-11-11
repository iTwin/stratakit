---
"@stratakit/structures": patch
---

Added new `unstable_Popover` component that displays custom content in a non-modal window overlay that is placed relative to a trigger element.

```tsx
<Popover content={<>Popover content</>}>
	<Button>Open popover</Button>
</Popover>
```
