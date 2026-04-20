---
title: Skeleton
description: Skeleton loaders are used to show placeholder content for a loading state.
links:
  muiDocs: https://mui.com/material-ui/react-skeleton/
  apiReference: https://mui.com/material-ui/api/skeleton/
---

::example{src="mui/Skeleton.default" min-width="300px"}

## Use cases

Make sure the **Skeleton** is suitable for your use case. There may be other, more appropriate components available.

| Use case                                                                | [Progress](/components/progress) | [Skeleton](/components/skeleton) |
| ----------------------------------------------------------------------- | -------------------------------- | -------------------------------- |
| Showing a loading (or other) process where the progress is determinable | ✅                               | ❌                               |
| Showing an indeterminable loading progress                              | ✅                               | ✅                               |
| Showing a process other than loading, such as a calculation             | ✅                               | ❌                               |

### Variants

Use the [`variant`](https://mui.com/material-ui/api/skeleton/#skeleton-prop-variant) prop to choose the appropriate skeleton shape for the content being loaded.

- **Circular:** Use to represent avatars and other circular elements.
- **Rectangular:** Use to represent images and other rectangular elements.
- **Rounded:** Use to represent icons and other rounded non-text artifacts.
- **Text:** Default skeleton styling. Use to represent blocks of text.

::example{src="mui/Skeleton.variants" min-width="300px" min-height="200px"}

:::tip
Accurately representing the shape and structure of a loading interface is a case of combining multiple individual **Skeletons** of differing [variants](#variants) and sizes. The **Skeleton** itself is a visual component and is not conveyed to assistive technologies. Include only one visually hidden “Loading…” label since multiple loading messages are repetitive and unhelpful.
:::

## ✅ Do

- Combine different sizes and [variants](#variants) to best approximate the shape and size of the interface being loaded.
- Use multiple **Skeletons** with the “text” variant to represent a multi-line text paragraph.
- Include a _single_ visually hidden message per loading state.

## ❌ Don’t

- Don’t use **Skeleton** where the size and shape of the content and functionality being loaded is not known.
- Don’t use **Skeleton** to indicate the progress of any process except loading. For indicating the progress of calculations and other processes within a loaded interface, use [**Progress**](/components/progress).
