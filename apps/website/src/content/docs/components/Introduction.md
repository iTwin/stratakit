---
title: Introduction to StrataKit components
description: How StrataKit components are organized
sidebar: 
  label: Introduction
  order: 1
---

The **StrataKit** component catalog comes in two tiers:

1. Simple, generic components are taken from the third-party [Material UI (**MUI**)](https://mui.com/material-ui/) library.
2. Complex and bespoke components are developed in-house, at Bentley, and called _structures_.

By making an established open-source library responsible for generic components, we are free to focus efforts on developing components that solve more complex tasks.

Bentley’s **MUI** theme ensures consistency across all components, incorporating Bentley’s design tokens and iconography. Install the `stratakit/mui` package alongside the necessary third-party dependencies:

```
npm add @stratakit/mui @mui/material @emotion/styled @emotion/react
```

Accompanying specialized components are available in a separate package, named _structures_ to reflect the relative component complexity:

```
npm add @stratakit/structures
```

See [**Develop with StrataKit**](http://localhost:4321/docs/getting-started/develop/) for more detailed installation instructions.










