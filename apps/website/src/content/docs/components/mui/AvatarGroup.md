---
title: AvatarGroup
description: Avatar groups are used to display a collection of avatars.
links:
  muiDocs: https://mui.com/material-ui/react-avatar/#grouped
  apiReference: https://mui.com/material-ui/api/avatar-group/
---

::example{src="mui/AvatarGroup.surplus"}

## StrataKit MUI modifications

- DOM order now matches the visual display order.
- The visual stacking of the `Avatar`s is inverted.
- `Avatar`s use a mask rather than a border to achieve the overlapping cutout effect.
- The `variant` prop is not supported. The **AvatarGroup** will always be _circular_.
- Added list semantics to `AvatarGroup`. Each child `Avatar` is wrapped in a list item element.

## Examples

### Multiple

Multiple **Avatars** shown in a group.

::example{src="mui/AvatarGroups.default}

### Surplus

Multiple **Avatars** shown in a group, exceeding the configured limit. In this case a surplus item is shown.

::example{src="mui/AvatarGroups.surplus}
