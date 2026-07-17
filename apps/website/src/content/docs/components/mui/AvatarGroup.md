---
title: AvatarGroup
description: Avatar groups are used to display a collection of avatars.
links:
  muiDocs: https://mui.com/material-ui/react-avatar/#grouped
  apiReference: https://mui.com/material-ui/api/avatar-group/
---

::example{src="mui/AvatarGroup.default"}

## StrataKit MUI modifications

- DOM order now matches the visual display order.
- The visual stacking of the `Avatar`s is inverted.
- `Avatar`s use a mask rather than a border to achieve the overlapping cutout effect.
- The `variant` prop is not supported. The **AvatarGroup** will always be _circular_.
- Added list semantics to `AvatarGroup`. Each child `Avatar` is wrapped in a list item element.

## Examples

### Surplus

When multiple **Avatars** exceed the configured [`max`](https://mui.com/material-ui/api/avatar-group/#avatar-group-prop-max) limit of the **AvatarGroup**, a surplus item can be shown using the [`renderSurplus`](https://mui.com/material-ui/api/avatar-group/#avatar-group-prop-renderSurplus) prop.

::example{src="mui/AvatarGroup.surplus"}
