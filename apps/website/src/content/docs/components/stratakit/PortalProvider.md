---
title: PortalProvider
description: Portal provider directs portaled elements into a specified container.
status: stable
links:
  apiReference: "#api-reference"
---

The **PortalProvider** component sets up the portal context and MUI theme provider, so that all descendant portaled elements render into a specified container instead of the default [root portal container](/components/root/#portal-container).

For example, if you use a _custom_ or _third party_ dialog, you can ensure that portaled elements appear above the dialog and are included in its accessibility tree.

## Container

Use the [`container`](/reference/mui/PortalProvider#PortalProvider.container) prop to specify the element that descendant elements are portaled into. Additionally, the [`unstable_getContainer`](/reference/mui/PortalProvider#PortalProvider.unstable_getContainer) prop can be used to avoid the one-commit fallback to `<body>` element in MUI components when the container element is not immediately available.

## API reference

- [`PortalProvider`](/reference/mui/PortalProvider)
