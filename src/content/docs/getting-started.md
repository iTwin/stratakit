---
title: Getting started
description: Learn how to set up StrataKit in your project.
---

This guide is aimed towards **developers**.

<!-- TODO: Add link to starter sandbox. -->

## Foundations

To use StrataKit in a React project, you will first need to ensure that the [`@stratakit/foundations`](https://www.npmjs.com/package/@stratakit/foundations?activeTab=versions) package has been installed and set up correctly. This package is the heart of the design system and is expected to be set up by the host application.

To set up this package, see the detailed instructions in [`@stratakit/foundations/README.md`](https://github.com/iTwin/design-system/tree/main/packages/foundations#readme). If you're using iTwinUI, you will also need to configure the [theme bridge](https://github.com/iTwin/iTwinUI/wiki/StrataKit-theme-bridge).

## Icons

All StrataKit icons are available as standalone `.svg` files in the [`@stratakit/icons`](https://www.npmjs.com/package/@stratakit/icons?activeTab=versions) package. This package also requires additional bundler configuration that is described in [`@stratakit/icons/README.md`](https://github.com/iTwin/design-system/tree/main/packages/icons#readme).

See [full list of available icons](/icons#list-of-icons).

## Components

StrataKit components can be used in one of two ways:

- Either use the [`@stratakit/bricks`](https://www.npmjs.com/package/@stratakit/bricks?activeTab=versions) and [`@stratakit/structures`](https://www.npmjs.com/package/@stratakit/structures?activeTab=versions) packages directly.
- Or use the [`@stratakit/react`](https://www.npmjs.com/package/@stratakit/react?activeTab=versions) package, which wraps the above packages in a familiar iTwinUI-shaped API.

All StrataKit components are expected to be used as descendants of the `Root` component from `@stratakit/foundations`.
