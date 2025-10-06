---
title: Anchor
description: The Anchor creates a styled hyperlink between pages and sections within pages.
status: stable
links:
  demo: tests/anchor
  github: packages/bricks/src/Anchor.tsx
  figma: https://www.figma.com/design/VcGw3L2IIlboxNlOdsKdai/%F0%9F%A5%9D-Kiwi-Component-Library?node-id=12080-1966&t=FX2fZYZ93vfliX17-4
---

## Use cases

Make sure the **Anchor** is suitable for your use case. There may be other, more appropriate components available.

| Use case                                                                         | [Anchor](/components/anchor) | [Button](/components/button) |
| -------------------------------------------------------------------------------- | :--------------------------: | :--------------------------: |
| Navigating between interface screens or sections                                 |              ✅              |              ❌              |
| Submitting forms, confirming or cancelling dialogs, creating or deleting content |              ❌              |              ✅              |

## Anatomy

### Structure

```jsx
<Anchor href="https://youtu.be/dQw4w9WgXcQ">Rick Astley’s biggest hit</Anchor>
```

- `<Anchor>`: The `Anchor` component renders an HTML `<a>` element. All standard `<a>` attributes are supported.
  - [`href`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/a#href): If the `href` is omitted, the element will not behave correctly as an interactive element. For example, it will not be focusable by keyboard.
  - `children`: The accessible, text label. The text must describe [the purpose of the link](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context.html).

## Usage

<!--
The **Anchor** supports both the _convenience_ and _composition_ APIs. The _convenience_ API is less code and suitable for most use cases. Choose the composition API where customization is needed. The following example uses the composition API to include a marker for an external link.

```jsx
<Anchor.Root href="https://youtu.be/dQw4w9WgXcQ" target="_blank">
	<Anchor.Text>Rick Astley’s biggest hit<Anchor.Text>
	<Anchor.ExternalMarker alt="opens in new tab" />
</Anchor.Root>
```

- `<Anchor.Root>`: The `Anchor.Root` component renders an HTML `<a>` element. All standard `<a>` attributes are supported.
  - `<Anchor.Text>`: Encapsulates the main label.
  - `<Anchor.ExternalMarker>` (optional): This subcomponent will render an arrow indicating the **Anchor’s** `href` points to an external URL (not belonging to the current site or application).
    - `alt` (default: `"external"`): This appends visually hidden text to the main label. It will be announced alongside the main label in screen reader output. Use it to inform screen reader users that the **Anchor** is external.
-->

### Tones

- **Neutral:** The default tone. If unsure, use this.
- **Accent:** Reserved for calls-to-action and other links of unusual significance

```jsx
<Anchor tone="accent" href="/path/to/cta/url">
	Take the tour!
</Anchor>
```

### ✅ Do

- Use Anchor to link between pages and page sections (fragments).
- Add `tabindex="-1"` to the element representing the target section (fragment) to ensure it receives keyboard focus.
- Provide a label that describes the purpose of the link. This label should still be understandable when removed from context.

### 🚫 Don’t

- Don't use **Anchor** for non-navigational (linking) actions. Use a component like [**Button**](/components/button), [**IconButton**](/components/iconbutton), or [**Switch**](/components/switch) (depending on your use case).
- Don't include **Anchors** with the same label but pointing to different locations. For “read more” links, you can include clarifying text with the [**VisuallyHidden**](/components/visuallyhidden) component. That is, two links appearing as “read more” can become “read more about x” and "read more about y" in screen reader output.
- Don't use the `disabled` property. This is not supported on `<a>`. To “disable” an Anchor, you can remove the `href` or replace the component with plain text.
