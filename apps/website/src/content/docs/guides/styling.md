---
title: Styling
description: Style custom interfaces with StrataKit components and design tokens
---

Start with a [StrataKit component](/components/overview/) when it meets your needs. Components provide consistent appearance, behavior, and accessibility. For custom layouts and UI, use [StrataKit tokens](/tokens/overview/) to keep styles aligned with the rest of your interface.

## Style component instances

Avoid using [MUI's `sx` prop](https://mui.com/system/getting-started/the-sx-prop/) for application styling. The same applies to MUI's other CSS-in-JS escape hatches, such as the [`styled()`](https://mui.com/system/styled/) utility and [`createTheme`](https://mui.com/material-ui/customization/theming/) style overrides. StrataKit owns the theme, and such overrides can conflict with its styles. Add an application-owned class with `className` and define its styles in CSS instead:

```tsx
<Button className="app-toolbarButton">Save</Button>
```

### Don't target internal class names

Class names applied by StrataKit and MUI, such as `.MuiButton-root` or `.Mui-disabled`, are implementation details. They may change in any release without notice, so selectors that target them are fragile. An application-owned class passed through `className` is the only stable styling hook.

StrataKit and MUI styles use CSS cascade layers. Declare your application layer after them to set override order, rather than increasing selector specificity or using `!important`. See [MDN's guide to cascade layers](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Cascade_layers) for details.

```css
@layer reset, mui, stratakit, app;

@layer app {
	.app-toolbarButton {
		border-radius: var(--stratakit-radius-md);
	}
}
```
