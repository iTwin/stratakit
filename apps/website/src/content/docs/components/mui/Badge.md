---
title: Badge
description: Badges show notifications, counts, or status information.
links:
  muiDocs: https://mui.com/material-ui/react-badge/
  apiReference: https://mui.com/material-ui/api/badge/
---

::example{src="mui/Badge.default"}

## Use cases

Make sure the **Badge** is suitable for your use case. There may be other, more appropriate components available.

| Use case                                             | [Badge](/components/badge) | [Chip](/components/chip) |
| ---------------------------------------------------- | -------------------------- | ------------------------ |
| Showing notifications, counts, or status information | ✅                         | ❌                       |
| Filtering content and triggering actions             | ❌                         | ✅                       |

## StrataKit MUI modifications

- Added [`inline`](#inline) prop.
- The `"default"` color has been removed. The default color is now `"secondary"`.

## Examples

### Inline

Set the `inline` prop to display the badge in normal document flow instead of positioned relative to its child.

::example{src="mui/Badge.inline"}

### Colors

- **Secondary:** The default.
- **Primary:** Use accent when high emphasis is required.
- **Info:** Use to call out an object or action as having an important attribute.
- **Success:** Use to indicate a successful or completed state when it’s important to provide positive reinforcement.
- **Warning:** Use for warnings and time-sensitive issues that require attention and potential action.
- **Error:** Use for critical and irreversible issues that requires attention and potential action. Apply sparingly.

::example{src="mui/Badge.colors"}

:::caution[Using icons]
In most cases, you should supplement the `color` with [iconography](#icons).
:::

### Icons

All [colors](#colors) except **secondary** and **primary** convey a specific type of status. Supplement those colors with an icon so that color is not the only means of communication. See [WCAG’s Use Of Color](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html).

For example, include the `status-warning` icon when applying the ‘error’ color.

::example{src="mui/Badge.error"}

## ✅ Do

- Use **Badge** for indicating state or status.
- Include a concise and descriptive label.
- Use an [`icon`](#icons) to communicate a status `color` in a color-independent fashion.

## 🚫 Don’t

- Don’t make **Badge** interactive. It is for indicating status, not controlling it.
- Don’t override colors set using `color` prop. These have been chosen carefully for their [contrast](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html).
