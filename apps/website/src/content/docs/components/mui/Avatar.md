---
title: Avatar
description: Avatars are used to show a representation of an individual.
links:
  muiDocs: https://mui.com/material-ui/react-avatar/
  apiReference: https://mui.com/material-ui/api/avatar/
---

::example{src="mui/Avatar.default"}

## Examples

### Initials

If an image isn’t available, display an individual’s initials as a single character in an [`<abbr>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/abbr) element with an `aria-hidden="true"`.

If an accessible name is not provided by other means, apply [`role="img"`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/img_role) to the **Avatar** and set [`aria-label`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-label) to the individual’s full name so assistive technologies announce the name instead of the initials.

::example{src="mui/Avatar.initials"}

### Icon

Icon **Avatars** are useful in cases where an image is not available or when a more abstract representation is desired.

::example{src="mui/Avatar.icon"}

### Decorative

In some cases, the **Avatar** may be considered presentational, since text identifying the individual or organization is available separately. In these cases, just omit the `alt` and `aria-label` props and the **Avatar** will not be identified programmatically.

::example{src="mui/Avatar.decorative"}

## ✅ Do

- Supply an image for the **Avatar** if available.
- Use a correctly sized image in a high performance format like `avif` or `webp`.
- If an accessible name is not provided by other means, supply a name using `alt` for [`<img>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/img) **Avatars** and `aria-label` for [`role="img"`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/img_role) **Avatars**.
- Display a single character [initial](#initials) if an image is not available.

## 🚫 Don’t

- Don‘t resort to displaying initials if an image is available.
- Don’t omit an accessible label if there is no other label in place.
