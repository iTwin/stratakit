---
"@stratakit/structures": patch
---

Added support for multiple decorations for `AccordionItem` when passed as children in `<AccordionItem.Decoration>`.

```tsx
<AccordionItem.Header>
	<AccordionItem.Marker />
	<AccordionItem.Decoration>
		<Icon href={placeholder} />
		<Icon href={placeholder} />
	</AccordionItem.Decoration>
	<AccordionItem.Button>
		<AccordionItem.Label>Label</AccordionItem.Label>
	</AccordionItem.Button>
</AccordionItem.Header>
```
