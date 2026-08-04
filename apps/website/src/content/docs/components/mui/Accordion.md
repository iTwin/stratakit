---
title: Accordion
description: Accordions are used to progressively disclose information.
links:
  muiDocs: https://mui.com/material-ui/react-accordion/
  apiReference: https://mui.com/material-ui/api/accordion/
---

::example{src="mui/Accordion.default"}

## Use cases

Make sure the **Accordion** is suitable for your use case. There may be other, more appropriate components available.

| Use case                                                                                                              | [Accordion](/components/accordion) | [Tree](/components/tree) | [Tabs](/components/tabs) | [Dialog](/components/dialog) |
| --------------------------------------------------------------------------------------------------------------------- | ---------------------------------- | ------------------------ | ------------------------ | ---------------------------- |
| Progressive disclosure of content (single level of data)                                                              | ✅                                 | ❌                       | ❌                       | ❌                           |
| One level of indentation possible at all times                                                                        | ✅                                 | ❌                       | ❌                       | ❌                           |
| Expandable content varies from simple list items to more complex form components (such as text fields, buttons, etc.) | ✅                                 | ❌                       | ❌                       | ❌                           |
| Progressive disclosure of content (several levels of data ). Folder drilling.                                         | ❌                                 | ✅                       | ❌                       | ❌                           |
| Hierarchy can branch and isn't necessarily linear.                                                                    | ❌                                 | ✅                       | ❌                       | ❌                           |
| Organizing long forms or sections.                                                                                    | ✅                                 | ❌                       | ❌                       | ❌                           |
| Displaying metadata or form content                                                                                   | ✅                                 | ❌                       | ❌                       | ❌                           |
| Switching between distinct views or content areas                                                                     | ❌                                 | ❌                       | ✅                       | ❌                           |
| Temporary, interruptive content (e.g. confirmation, form)                                                             | ❌                                 | ❌                       | ❌                       | ✅                           |
| Reordering sections                                                                                                   | ✅                                 | ❌                       | ❌                       | ❌                           |

## StrataKit MUI modifications

- Restyled using StrataKit's visual language.
- The overall size has been decreased.
- Added [responsive design](#responsive-design) that reorients the marker placement based on container width.
- Added [`markerPlacement`](#marker-placement) prop to `AccordionSummary` to override responsive design.
- Added details indentation when the `markerPlacement` is set to `"start"`.
- `disableGutters` is deprecated and always defaults to `true`.
- The default value of the `root` slot's [`square`](https://mui.com/material-ui/api/paper/#paper-prop-square) prop defaults to true except when `variant="outlined"`.
- You are not required to attribute `<AccordionSummary>` with `aria-controls`.
- Removed [`role="region"`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/region_role) semantics. The **Accordion** no longer creates a region landmark.
- Includes full `forced-colors` support.
- The `expandIcon` prop of `AccordionSummary` is deprecated.

## Examples

### Expanded

Disclose any **Accordion's** content by default using the `defaultExpanded` prop. Alternatively, use `expanded` and `onChange` props to control the expanded state.

::example{src="mui/Accordion.expanded"}

### Variants

- **Elevation:** Default accordion styling. Use in tight spaces, such as side panels or widgets, where the context provides an outline already.
- **Outlined:** Adds a border around the accordion. Use in open layouts where you want to define the accordion's boundaries.

::example{src="mui/Accordion.variants"}

| Use case      | Elevation | Outlined |
| ------------- | --------- | -------- |
| Settings page | ❌        | ✅       |
| Widget        | ✅        | ❌       |

### Responsive design

The marker placement automatically adapts based on the container's width using a [container query](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Containment/Container_queries). To benefit from this automatic responsive behavior, make sure to create a containment context by setting `container-type: inline-size;` on an ancestor element.

::example{src="mui/Accordion.responsive"}

### Marker placement

Use the `markerPlacement` prop to control the **AccordionSummary** marker placement. By default, the marker is left aligned, but moves to the right side when the accordion is narrow. Set `markerPlacement="start"` or `markerPlacement="end"` to force a fixed placement.

::example{src="mui/Accordion.marker-placement"}

### Multiple Accordions

Multiple adjacent **Accordions** make a set. To make this set programmatically determinable and enumerable, use ARIA list semantics. Each individual `<Accordion>` must take `role="listitem"` and the set must belong to an element with `role="list"`.

**Accordions** commonly represent major sections of a page and are rendered with an [`<h3>` heading element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/Heading_Elements) by default. Use the `render` prop on [`slotProps.heading`](https://mui.com/material-ui/api/accordion/#accordion-prop-slotProps) to change the heading level.

::example{src="mui/Accordion.multiple"}

:::caution[Heading levels]

It's important you use an [appropriate heading level](https://www.a11yproject.com/posts/how-to-accessible-heading-structure/) for each **Accordion**. Since **Accordions** can only represent one level of data (see [**Use cases**](#use-cases)), each **Accordion** in a set must take the _same_ heading level.

- Title of page (`h1` heading)
  - **Accordion** 1 (`h2` heading)
  - **Accordion** 2 (`h2` heading)
  - **Accordion** 3 (`h2` heading)
  - **Accordion** 4 (`h2` heading)

:::

### Decorations

Decorate the `AccordionSummary` with an [**Icon**](/components/icon).

::example{src="mui/Accordion.decoration"}

### AccordionActions

Use the `AccordionActions` component to display actions related to the content of the **Accordion**.

::example{src="mui/Accordion.actions"}

## ✅ Do

- Use **Accordion** to tidy away long sections of content, to be later disclosed.
- Adopt the correct heading level for the **Accordion's** position in the document structure. The heading component can be [changed in the `slotProps`](https://mui.com/material-ui/react-accordion/#changing-heading-level).

## 🚫 Don't

- Don't nest **Accordions** inside one another.
- Don't use different heading levels for **Accordion** items in the same set. Since **Accordions** cannot be nested, they are at the same level in the document hierarchy.
- Don't close an **Accordion** when another **Accordion** is opened. Exclusive **Accordions** create [accessibility and usability issues](https://yatil.net/blog/exclusive-accordions).
- Don't place interactive elements inside an `AccordionSummary`.
