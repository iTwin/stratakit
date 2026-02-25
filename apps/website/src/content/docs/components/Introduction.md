---
title: Introduction to StrataKit components
description: How StrataKit components are organized
sidebar: 
  label: Components introduction
  order: 1
---

The **StrataKit** component catalog comes in two tiers:

1. Generic components are taken from the third-party [Material UI (**MUI**)](https://mui.com/material-ui/) library.
2. Specialized components are developed separately and called _structures_.

See [**Develop with StrataKit**](/docs/getting-started/develop/) for detailed installation instructions.

## MUI components

By making an established open-source library responsible for generic components, we are free to focus efforts on developing components that solve more complex and specific tasks.

**StrataKit**’s [**MUI** theme](https://www.npmjs.com/package/@stratakit/mui) ensures consistency across all components, incorporating **StrataKit’s** design tokens and [iconography](/docs/icons/).

The theme includes the following modifications:

1. **CSS**: The style has been aligned with **StrataKit’s** visual language.
2. **API**: Some components have been extended to support additional props.
3. **Structure and behavior**: The markup structure and interaction behavior of certain components have been modified to meet **StrataKit** UX and accessibility requirements.

## StrataKit components

Accompanying specialized components are available in a [separate package named _structures_](https://www.npmjs.com/package/@stratakit/structures).

These components are developed independently, to meet the interface requirements of construction and infrastructure design software. 

## Component guidance

All components are accompanied by implementation guidance. This adheres to the following structure:

* **Demo**: What does a typical implementation look like, using common settings?
* **Use cases**: Is this, or another, component right for my use case? (compares similar components in a table)
* **StrataKit MUI modifications**: _(where applicable)_: What has been done to bring the MUI component in line with **StrataKit** standards and conventions?
* **Examples**: What variants are there and to which contexts are they suited?
* **🚫 Do**: What’s needed for an efficient and accessible implementation? What opportunities are there to improve user experience?
* **🚫 Don’t**: What are some common pitfalls? What are the bad practices to avoid?

:::caution[MUI documentation]

The entirety of the [**MUI** component docs](https://mui.com/material-ui/all-components/) are not reproduced here. The **StrataKit** docs exemplify how to _implement_ **MUI** components according to **StrataKit’s** standards. Consider this additional guidance a necessary companion to **MUI’s** documentation.

:::











