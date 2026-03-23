---
title: Skeleton
description: Skeleton loaders are used to show placeholder content for a loading state.
links:
  muiDocs: https://mui.com/material-ui/react-skeleton/
  apiReference: https://mui.com/material-ui/api/skeleton/
---

::example{src="mui/Skeleton.default"}

## Use cases

Make sure the **Skeleton** is suitable for your use case. There may be other, more appropriate components available.

| Use case                                                                | [Progress](/components/progress) | [Skeleton](/components/skeleton) |
| ----------------------------------------------------------------------- | -------------------------------- | -------------------------------- |
| Showing a loading (or other) process where the progress is determinable | ✅                               | ❌                               |
| Showing an indeterminable loading progress                              | ✅                               | ✅                               |
| Showing a process other than loading, such as a calculation             | ✅                               | ❌                               |

### Variants

- **Text:** Default skeleton styling. Use to represent blocks of text.
- **Circular:** Use to represent avatars and other circular elements.
- **Rectangular:** Use to represent images and other rectangular elements.
- **Rounded:** Use to represent icons and other rounded non-text artifacts.

::example{src="mui/Skeleton.variants"}

:::tip
Accurately representing the shape and structure of a loading interface is a case of combining multiple individual **Skeletons** of differing [variants](#variants) and sizes. Only include one visually hidden “Loading…” label. Multiple loading messages are repetitive and unhelpful. The **Skeleton** itself is not communicated nonvisually.
:::

## ✅ Do

- Combine different sizes and [variants](#variants) to best approximate the shape and size of the interface being loaded.
- Include a _single_ visually hidden message per loading state.

## ❌ Don’t

- Don’t use **Skeleton** where the size and shape of the content and functionality being loaded is not known.
- Don’t use **Skeleton** to indicate the progress of any process except loading. For indicating the progress of calculations and other processes within a loaded interface, use [**Progress**](/components/progress).
