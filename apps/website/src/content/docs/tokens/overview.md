---
title: Tokens
---

Design **tokens** are named values for StrataKit's colors, spacing, typography, and other visual styles. They keep designs and implementations consistent without hard-coding values.

StrataKit defines the following categories of **tokens**:

- Color
- Space
- Typography
- Border radius
- Shadows

## Usage

StrataKit exposes **tokens** as [CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/--*) (aka "CSS variables") through the `@stratakit/foundations` package. These CSS variables remain in sync with StrataKit's Figma variables.

With StrataKit [set up](/getting-started/develop/), you can reference **tokens** in any CSS file using [`var()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/var):

```css
.custom-surface {
	padding: var(--stratakit-space-400);
	border-radius: var(--stratakit-radius-md);
	background-color: var(--stratakit-color-bg-elevation-base);
	color: var(--stratakit-color-text-neutral-primary);
}
```

All available token names are prefixed with `--stratakit-`. Any variable that does not use this prefix is considered private and should not be used directly.

Color names describe intended use: `--stratakit-color-text-neutral-primary` is for primary neutral text. Their values automatically adapt to the color scheme configured through the [Root](/components/root/) component.

Always prefer existing [**components**](/components/overview/) when they meet your needs. Use **tokens** for custom UI that complements those **components**.
