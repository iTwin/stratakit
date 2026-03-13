---
title: Components
description: How components are organized in StrataKit
---

The **StrataKit** component catalog comes in two tiers:

1. Generic components are taken from the third-party [Material UI (**MUI**)](https://mui.com/material-ui/) library.
2. Specialized components are developed separately and called _structures_.

See [**Develop with StrataKit**](/docs/getting-started/develop/) for detailed installation instructions.

## MUI components

By making an established open-source library responsible for generic components, we are free to focus efforts on developing components that solve more complex and specific tasks.

**StrataKit**’s [**MUI** theme](https://www.npmjs.com/package/@stratakit/mui) ensures consistency across all components, incorporating **StrataKit’s** design tokens and [iconography](/docs/icons/).

The theme includes the following modifications:

1. **Styling**: The style has been aligned with **StrataKit’s** visual language.
2. **Typography**: **StrataKit’s** principle font is [Inter](https://rsms.me/inter/), which needs to be [self-hosted](/getting-started/develop/#self-hosting-the-fonts).
3. **Icons**: Component icons are taken exclusively from **StrataKit’s** own icon collection.
4. **API**: Some props have been adjusted or removed, and some new props have been added.
5. **Structure and behavior**: The markup structure and interaction behavior of certain components have been modified to meet **StrataKit** UX and accessibility requirements.

## StrataKit components

Accompanying specialized components are available in separate packages, such as [@stratakit/structures](https://www.npmjs.com/package/@stratakit/structures).

These components are developed independently, to meet the interface requirements of construction and infrastructure design software.

## Component guidance

All components are accompanied by implementation guidance. This adheres to the following structure:

- **Demo**: What does a typical implementation look like, using common settings?
- **Use cases**: Is this, or another, component right for my use case? (compares similar components in a table)
- **StrataKit MUI modifications**: _(where applicable)_: What has been done to bring the **MUI** component in line with **StrataKit**?
- **Examples**: What variants are there, and to which contexts are they suited?
- **✅ Do**: What’s needed for an efficient and accessible implementation? What opportunities are there to improve user experience?
- **🚫 Don’t**: What are some common pitfalls? What are the bad practices to avoid?

:::caution[MUI documentation]

The entirety of the [**MUI** component docs](https://mui.com/material-ui/all-components/) are not reproduced here. The **StrataKit** docs exemplify how to _implement_ **MUI** components according to **StrataKit’s** standards. Consider this additional guidance a necessary companion to **MUI’s** documentation.

:::

## Component status

Check the status before choosing to use a component in your product. You may be unwilling to undertake certain risks and uncertainties. You can find the status in the metadata at the top of each component’s guidance page. It will have one of the following values:

- **Unstable**: The component is available for consumption but is not comprehensively tested and may undergo breaking changes. As an early adopter, please provide feedback.
- **Stable**: The component is established and meets our compatibility and accessibility standards.
- **Deprecated**: The component is no longer recommended or supported. You should remove or replace it at your earliest convenience.
