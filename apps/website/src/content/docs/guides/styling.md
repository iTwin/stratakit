---
title: Styling
description: Style custom interfaces with StrataKit components and design tokens
---

Start with a [StrataKit component](/components/overview/) when it meets your needs. Components provide consistent appearance, behavior, and accessibility. For custom layouts and UI, use [StrataKit tokens](/tokens/overview/) to keep styles aligned with the rest of your interface.

## Style component instances

Avoid using [MUI's `sx` prop](https://mui.com/system/getting-started/the-sx-prop/) for application styling. Add an application-owned class with `className` and define its styles in CSS instead:

```tsx
<Button className="app-toolbarButton">Save</Button>
```

StrataKit and MUI styles use CSS cascade layers. Declare your application layer after them to set override order, rather than increasing selector specificity or using `!important`. See [MDN's guide to cascade layers](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Cascade_layers) for details.

```css
@layer reset, mui, stratakit, app;

@layer app {
	.app-toolbarButton {
		border-radius: var(--stratakit-radius-md);
	}
}
```
