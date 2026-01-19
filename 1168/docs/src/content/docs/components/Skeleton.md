---
title: Skeleton
description: Skeleton loaders are used to show placeholder content for a loading state.
status: stable
links:
  demo: tests/skeleton
  github: packages/bricks/src/Skeleton.tsx
  figma: https://www.figma.com/design/VcGw3L2IIlboxNlOdsKdai/%F0%9F%A5%9D-Kiwi-Component-Library?m=auto&node-id=12107-13268&t=eLiofzpEtQX66QiU-1
associated:
  - VisuallyHidden
---

## Use cases

Make sure the **Skeleton** is suitable for your use case. There may be other, more appropriate components available.

| Use case                                                                | [Progress](/components/progress) | [Skeleton](/components/skeleton) |
| ----------------------------------------------------------------------- | :------------------------------: | :------------------------------- |
| Showing a loading (or other) process where the progress is determinable |                ✅                | ❌                               |
| Showing an indeterminable loading progress                              |                ✅                | ✅                               |
| Showing a process other than loading, such as a calculation             |                ✅                | ❌                               |

## Usage

::example{src="Skeleton.default"}

The **Skeleton** represents content that has yet to load. Render it alongside [**VisuallyHidden**](/components/visuallyhidden) so this loading state is accessibly communicated.

```jsx
<Skeleton variant="text" />
<VisuallyHidden>Loading…</VisuallyHidden>
```

Accurately representing the shape and structure of a loading interface is a case of combining multiple individual **Skeletons** of differing [variants](#variants) and [sizes](#sizes). Only include one [**VisuallyHidden**](/components/visuallyhidden) with the “Loading…” label. Multiple loading messages are repetitive and unhelpful. The **Skeleton** itself is not communicated nonvisually.

```jsx
<Skeleton variant="object" size="xxlarge"  />
<Skeleton variant="object" size="small"  />
<Skeleton variant="text" size="medium"  />
<Skeleton variant="object" size="small"  />
<Skeleton variant="text" size="medium"  />
<Skeleton variant="object" size="small"  />
<Skeleton variant="text" size="medium"  />
<Skeleton variant="object" size="xlarge"  />
<VisuallyHidden>Loading…</VisuallyHidden>
```

## Configurations

### Variants

Set the variant with the [`variant`](/reference/bricks/Skeleton#Skeleton.variant) prop.

- **Text:** The standard **Skeleton** component, representing blocks of text.
- **Object:** The **Skeleton** component representing images, icons, and other non-text artifacts.

::example{src="Skeleton.variants"}

Combine variants to approximate the layout of the interface being loaded.

### Sizes

Set the size with the [`size`](/reference/bricks/Skeleton#Skeleton.size) prop. One of:

- `xsmall`
- `small`
- `medium`
- `large`
- `xlarge`
- `xxlarge`

::example{src="Skeleton.sizes"}

## ✅ Do

- Combine different [sizes](#sizes) and [variants](#variants) to best approximate the shape and size of the interface being loaded.
- Include a _single_ [**VisuallyHidden**](/components/visuallyhidden) message per loading state.

## ❌ Don’t

- Don’t use **Skeleton** where the size and shape of the content and functionality being loaded is not known.
- Don’t use **Skeleton** to indicate the progress of any process except loading. For indicating the progress of calculations and other processes within a loaded interface, use [**Progress**](/components/progress).
