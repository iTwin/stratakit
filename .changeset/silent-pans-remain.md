---
"@stratakit/mui": minor
---

Removed Ariakit's [`PortalContext`](https://ariakit.com/reference/portal-context) from the `Root`, `Dialog`, `Drawer`, and `Popover` components. StrataKit components that were previously relying on this context now use the `PortalContext` from `@stratakit/foundations` instead.
