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

| Use case                                                                                                              | [Accordion](/components/accordion) | [Tree](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/tree_role) | [Tabs](/components/tabs) | [Dialog](/components/dialog) |
| --------------------------------------------------------------------------------------------------------------------- | ---------------------------------- | ------------------------------------------------------------------------------------------------- | ------------------------ | ---------------------------- |
| Progressive disclosure of content (single level of data)                                                              | ✅                                 | ❌                                                                                                | ❌                       | ❌                           |
| One level of indentation possible at all times                                                                        | ✅                                 | ❌                                                                                                | ❌                       | ❌                           |
| Expandable content varies from simple list items to more complex form components (such as text fields, buttons, etc.) | ✅                                 | ❌                                                                                                | ❌                       | ❌                           |
| Progressive disclosure of content (several levels of data ). Folder drilling.                                         | ❌                                 | ✅                                                                                                | ❌                       | ❌                           |
| Hierarchy can branch and isn't necessarily linear.                                                                    | ❌                                 | ✅                                                                                                | ❌                       | ❌                           |
| Organizing long forms or sections.                                                                                    | ✅                                 | ❌                                                                                                | ❌                       | ❌                           |
| Displaying metadata or form content                                                                                   | ✅                                 | ❌                                                                                                | ❌                       | ❌                           |
| Switching between distinct views or content areas                                                                     | ❌                                 | ❌                                                                                                | ✅                       | ❌                           |
| Temporary, interruptive content (e.g. confirmation, form)                                                             | ❌                                 | ❌                                                                                                | ❌                       | ✅                           |
| Reordering sections                                                                                                   | ✅                                 | ❌                                                                                                | ❌                       | ❌                           |

## Examples

### AccordionActions

Use `AccordionActions` component to display actions related to the content of the **Accordion**.

::example{src="mui/Accordion.actions"}

### Expanded

Disclose any **Accordion’s** content by default using the `defaultExpanded` prop. Alternatively, use `expanded` and `onChange` props to control the expanded state.

::example{src="mui/Accordion.expanded"}

## Do

- Use **Accordion** to tidy away long sections of content, to be later disclosed.

## Don’t

- Don’t nest **Accordions** inside one another. For multi-level data, use [tree](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/tree_role).
- Don’t close an **Accordion** when another **Accordion** is opened. Exclusive **Accordions** create [accessibility and usability issues](https://yatil.net/blog/exclusive-accordions).
