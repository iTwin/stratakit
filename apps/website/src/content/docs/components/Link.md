---
title: Link
description: The Link creates a styled hyperlink between pages and sections within pages.
---

## Use cases

Make sure the **Link** is suitable for your use case. There may be other, more appropriate components available.

| Use case                                                                         | [Link](/components/link) | [Button](/components/button) |
| -------------------------------------------------------------------------------- | :----------------------: | :--------------------------: |
| Navigating between interface screens or sections                                 |            ✅            |              ❌              |
| Submitting forms, confirming or cancelling dialogs, creating or deleting content |            ❌            |              ✅              |

## Usage

::example{src="mui/Link.default"}

The **Link** inherits the standard HTML `<a>` element’s API and supports all the same attributes. As with a standard `<a>`, omitting the `href` will make the element a [placeholder link](https://www.scottohara.me/note/2019/07/17/placeholder-link.html).

### External marker

::example{src="Link.external"}

The **Link** supports [decomposition](/guides/composition/#decomposition). For external links, you can recompose **Link** to include an external marker. In this case, the marker comes with an `alt` describing the `target="_blank"` behavior:

## Configurations

### Tones

- **Neutral:** The default tone. If unsure, use this.
- **Accent:** Reserved for calls-to-action and other links of unusual significance

::example{src="Link.tones"}

## ✅ Do

- Use **Link** to link between pages and page sections (fragments).
- Add `tabindex="-1"` to the element representing the target section (fragment) to ensure it receives keyboard focus.
- Provide a label that describes the purpose of the link. This label should still be understandable when removed from context.

## 🚫 Don’t

- Don't use **Link** for non-navigational (linking) actions. Use a component like [**Button**](/components/button), [**IconButton**](/components/iconbutton), or [**Switch**](/components/switch) (depending on your use case).
- Don't include **Links** with the same label but pointing to different locations. For “read more” links, you can include clarifying text with the [**VisuallyHidden**](/components/visuallyhidden) component. That is, two links appearing as “read more” can become “read more about x” and "read more about y" in screen reader output.
- Don't use the `disabled` property. This is not supported on `<a>`. To “disable” a Link, you can remove the `href` or replace the component with plain text.
