---
title: Avatar
status: stable
description: Avatars are used to show a representation of an individual.
links:
  demo: tests/avatar
  github: packages/bricks/src/Avatar.tsx
  figma: https://www.figma.com/design/VcGw3L2IIlboxNlOdsKdai/%F0%9F%A5%9D-Kiwi-Component-Library?m=auto&node-id=19185-15991&t=jxug01bSS90vircl-1
associated:
  - NavigationRail
---

## Usage

### Initials

::example{src="Avatar.default"}

If an image isn’t available, show an individual’s initials using the `initials` prop. Supply their full name as the `alt` value. This will override the initials to form the programmatic label.

```jsx
<Avatar initials="WW" alt="Willow Winters" />
```

### Image

You can supply an image via the `image` prop. The image itself does not need alternative text, so give it an empty value.

::example{src="Avatar.image"}

```jsx
<Avatar initials="WW" alt="Willow Winters" image={<img src={imgSrc} alt="" />} />
```

### Icon

::example{src="Avatar.icon"}

```jsx
<Avatar initials="WW" alt="Willow Winters" image={<Icon href={userIcon} />} />
```

:::note[Omitting the `alt`]

In some cases, the **Avatar** may be considered presentational, since text identifying the individual or organization is available separately. In these cases, just omit the `alt` and the **Avatar** will not be identified programmatically.

```jsx
<Anchor href="/profile">
	<Avatar image={<Icon href={userIcon} />} />
	Willow Winters
</Anchor>
```

:::

## Configurations

### Sizes

The accepted values for the `sizes` prop are:

- `small`: Ideal for compact interfaces where space is limited or within other components such a form elements for example.
- `medium` (default): Serves as the default for user representation.
- `large`: For less dense interfaces where avatars can afford more prominence without overwhelming the interface.
- `xlarge`: Reserved for scenarios where user representation is essential and needs to be very prominent.

::example{src="Avatar.sizes"}

## ✅ Do

- Supply an image for the **Avatar** if available.
- Use a correctly sized image in a high performance format like `avif` or `webp`.
- Supply a name as the `alt` if a label is not available by other means.

## 🚫 Don’t

- Don‘t resort to displaying initials if an image is available.
- Don’t omit an `alt` if there is no other label in place.
