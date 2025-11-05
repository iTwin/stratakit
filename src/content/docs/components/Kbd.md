---
title: Kbd
status: stable
description: Keyboard keys are used to educate users about shortcuts.
links:
  demo: tests/kbd
  github: packages/bricks/src/Kbd.tsx
---

## Usage

::example{src="Kbd.default"}

The **Kbd** component is a styled wrapper over the HTML [`<kbd>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/kbd) element. It’s typically used for showing keyboard commands and shortcuts.

```jsx
<Kbd>A</Kbd>
```

### Supported symbols

Some common keys, including [modifier keys](https://en.wikipedia.org/wiki/Modifier_key), are available as _symbols_ using the `symbol` prop. All supported symbols:

::example{src="Kbd.symbols"}

```jsx
<Kbd symbol="Backspace" />
<Kbd symbol="Command" />
<Kbd symbol="Control" />
<Kbd symbol="Down" />
<Kbd symbol="Eject" />
<Kbd symbol="Enter" />
<Kbd symbol="Escape" />
<Kbd symbol="Left" />
<Kbd symbol="Option" />
<Kbd symbol="Right" />
<Kbd symbol="Shift" />
<Kbd symbol="Space" />
<Kbd symbol="Tab" />
<Kbd symbol="Up" />
```

:::note[Alternative text]
Each symbol includes a text alternative for accessibility.
:::

## Configurations

### Variants

- **Solid:** Default styling. If you’re not sure which variant to use, use this one.
- **Outline:** Reduce visual weight.
- **Ghost:** Minimum visual weight.

::example{src="Kbd.variants"}

## ✅ Do

- Use `symbol` where the key is supported, especially if there’s limited space.
- Use just one character, representing one key, per **Kbd** instance.

## 🚫 Don’t

- Don’t use the `ghost` variant in a paragraph or other text element, since it may not be easily differentiated from surrounding text.
- Don’t add multiple characters/keys inside a single **Kbd** instance.
- Don’t offer shortcuts that may not be supported by your users’ expected platform and keyboard layout.
