---
title: Tokens
description: An overview of StrataKit's design tokens
sidebar:
  hidden: true
---

Design **tokens** are named values for StrataKit's colors, spacing, typography, and other visual styles. They keep designs and implementations consistent without requiring hard-coded values.

StrataKit defines the following general categories of **tokens**:

- Color
- Space
- Typography
- Border radius
- Shadows

## Usage in code

StrataKit exposes **tokens** as [CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/--*) (aka "CSS variables") through the `@stratakit/foundations` package. These CSS variables remain in sync with StrataKit's Figma variables.

First, make sure you have [set up StrataKit](/getting-started/develop/). The [Root](/components/root) component automatically provides the global styles and contexts necessary for **tokens** to work correctly.

Once StrataKit is set up, you can reference **tokens** in any CSS file using the [`var()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/var) function:

```css
.custom-surface {
	padding: var(--stratakit-space-400);
	border-radius: var(--stratakit-radius-md);
	background-color: var(--stratakit-color-bg-elevation-base);
	color: var(--stratakit-color-text-neutral-primary);
}
```

Always prefer existing [components](/components/overview/) when they meet your needs. Use **tokens** for custom UI or layouts that complement those **components**.

## Naming convention

StrataKit's **tokens** follow a consistent naming convention to make their purpose and usage easy to understand.

All public StrataKit token names are prefixed with `--stratakit-`. Any variables without this prefix are considered private and should not be used directly.

:::caution[MUI variables]
Because [StrataKit builds upon MUI](/components/overview/#mui-components), you may see some variables that originate from MUI. These variables are prefixed with `--stratakit-mui-*` to help distinguish them from StrataKit's first-party **tokens**.

StrataKit maps MUI variables to its own tokens for compatibility. However, you should _avoid_ relying on MUI variables. StrataKit's sophisticated design language cannot be fully expressed using MUI's variables alone.
:::

## Theming

StrataKit includes built-in support for light and dark color modes.

The [Root](/components/root/) component requires the [`colorScheme`](/components/root/#color-scheme) prop to specify the desired color mode (`"light"` or `"dark"`). Changing the `colorScheme` prop will automatically update the values of the relevant color **tokens**.

Alternatively, the color mode can also be set through the `data-color-scheme` attribute. The **Root** component automatically manages this attribute on the `<html>` element based on the value of the `colorScheme` prop, but it can also be manually set to `"light"` or `"dark"`. This can be useful for server-side rendering or when you need to control the color mode outside of the React component tree.
