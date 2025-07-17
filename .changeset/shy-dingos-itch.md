---
"@stratakit/structures": patch
---

Added support for placing `<AccordionItem.Marker>` before and `<AccordionItem.Decoration>` after the rest of the content in `<AccordionItem.Header>`.

The `<AccordionItem.Marker>` is now recommended to be placed before the rest of the header content.

```tsx
<AccordionItem.Header>
	<AccordionItem.Marker />
	<AccordionItem.Button>
		<AccordionItem.Label>Label</AccordionItem.Label>
	</AccordionItem.Button>
</AccordionItem.Header>
```
