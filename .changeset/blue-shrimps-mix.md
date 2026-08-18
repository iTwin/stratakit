---
"@stratakit/mui": patch
---

`IconButton` now automatically maps the `title` prop to `label` for better compatibility with external components that use the native `title` attribute. The recommended approach is still to use the `label` prop.
