---
title: Link
description: Links are styled hyperlinks between pages and sections within pages.
links:
  muiDocs: https://mui.com/material-ui/react-link/
  apiReference: https://mui.com/material-ui/api/link/
---

::example{src="mui/Link.default"}

## Use cases

Make sure the **Link** is suitable for your use case. There may be other, more appropriate components available.

| Use case                                                                         | [Link](/components/link) | [Button](/components/button) |
| -------------------------------------------------------------------------------- | ------------------------ | ---------------------------- |
| Navigating between interface screens or sections                                 | ✅                       | ❌                           |
| Submitting forms, confirming or cancelling dialogs, creating or deleting content | ❌                       | ✅                           |

## ✅ Do

- Use **Link** to link between pages and page sections (fragments).
- Add `tabindex="-1"` to the element representing the target section (fragment) to ensure it receives keyboard focus.
- Provide a label that describes the purpose of the link. This label should still be understandable when removed from context.

## 🚫 Don’t

- Don't use **Link** for non-navigational (linking) actions. Use a component like [**Button**](/components/button), [**IconButton**](/components/iconbutton), or [**Switch**](/components/switch) (depending on your use case).
- Don't include **Links** with the same label but pointing to different locations. For “read more” links, you can include clarifying text with the [**VisuallyHidden**](/components/visuallyhidden) component. That is, two links appearing as “read more” can become “read more about x” and "read more about y" in screen reader output.
