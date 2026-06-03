---
title: Root
description: Root is the required wrapper for all StrataKit components.
status: stable
links:
  apiReference: /reference/mui/Root
---

The **Root** component must wrap your application to load StrataKit styles and fonts. It enables the use of StrataKit components and applies the StrataKit theme for MUI, allowing you to use [MUI components](https://mui.com/material-ui/all-components/) with StrataKit's visual language.

Additionally, it allows you to configure the [color scheme](#color-scheme) and [accent color](/components/root/#accent-color-unstable) for all descendant StrataKit components.

## Color scheme

Set the required [`colorScheme`](/reference/mui/Root#Root.Root.colorScheme) prop to apply a color scheme to all StrataKit components on the page.

```tsx
<Root colorScheme="dark">{/* Your app goes here */}</Root>
```

:::note

StrataKit synchronizes the color scheme with the parent document or a shadow-root host.

:::

## Root node

Use the [`rootNode`](/reference/mui/Root#Root.Root.rootNode) prop to customize the [root node](https://developer.mozilla.org/en-US/docs/Web/API/Node/getRootNode) to which this **Root** component is attached. This needs to be set when the **Root** is rendered within [shadow DOM](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_shadow_DOM) or a [popup window](https://developer.mozilla.org/en-US/docs/Web/API/Window/open#description).

```tsx
<Root rootNode={popup.document}>
```

## Accent color

Use the [`unstable_accentColor`](/reference/mui/Root#Root.Root.unstable_accentColor) prop to set the accent color applied to all StrataKit components under the **Root**.

- **Aurora**: Default and preferred green accent color.
- **Cobalt**: Blue accent color to ensure compatibility with older applications.

```tsx
<Root unstable_accentColor="cobalt">
```

:::note

StrataKit synchronizes the accent color with the parent document or a shadow-root host.

:::

## ✅ Do

- Render `<Root>` at the top level of your application.
- Take [user's preference](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-color-scheme) into account when specifying the `colorScheme` prop.
- Provide `rootNode` prop when using shadow DOM or popup windows.

## 🚫 Don't

- Don't render multiple `<Root>` components in the same document or [shadow root](https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot).
- Don't use MUI's `ThemeProvider`, `StyledEngineProvider`, or `CssBaseline` directly — **Root** handles all of that for you.
