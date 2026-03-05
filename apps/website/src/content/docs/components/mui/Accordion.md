---
title: Accordion
description: Accordions are used to progressively disclose information.
links:
  muiDocs: https://mui.com/material-ui/react-accordion/
  apiReference: https://mui.com/material-ui/api/accordion/
---

::example{src="mui/Accordion.default"}

## Use cases

Make sure the **AccordionItem** is suitable for your use case. There may be other, more appropriate components available.

| Use case                                                                                                              | AccordionItem | [Tree](/components/tree) | [Tabs](/components/tabs) | [Dialog](/components/dialog) |
| --------------------------------------------------------------------------------------------------------------------- | :-----------: | :----------------------: | :----------------------: | :--------------------------: |
| Progressive disclosure of content (single level of data)                                                              |      ✅       |            ❌            |            ❌            |              ❌              |
| One level of indentation possible at all times                                                                        |      ✅       |            ❌            |            ❌            |              ❌              |
| Expandable content varies from simple list items to more complex form components (such as text fields, buttons, etc.) |      ✅       |            ❌            |            ❌            |              ❌              |
| Progressive disclosure of content (several levels of data ). Folder drilling.                                         |      ❌       |            ✅            |            ❌            |              ❌              |
| Hierarchy can branch and isn't necessarily linear.                                                                    |      ❌       |            ✅            |            ❌            |              ❌              |
| Organizing long forms or sections.                                                                                    |      ✅       |            ❌            |            ❌            |              ❌              |
| Displaying metadata or form content                                                                                   |      ✅       |            ❌            |            ❌            |              ❌              |
| Switching between distinct views or content areas                                                                     |      ❌       |            ❌            |            ✅            |              ❌              |
| Temporary, interruptive content (e.g. confirmation, form)                                                             |      ❌       |            ❌            |            ❌            |              ✅              |
| Reordering sections                                                                                                   |      ✅       |            ❌            |            ❌            |              ❌              |

## Examples

### AccordionActions

::example{src="mui/Accordion.actions"}

### Expanded

Disclose any **Accordion’s** content by default using the `defaultExpanded` prop. Alternatively, use `expanded` and `onChange` prop to control the expanded state.

::example{src="mui/Accordion.expanded"}

### Multiple AccordionItems

Multiple **AccordionItems** make an Accordion.

::example{src="AccordionItem.multiple"}

**AccordionItems** commonly represent major sections in a page and must be introduced with native heading elements. Render a heading element using the `AccordionItem.Heading` element:

```jsx
<AccordionItem.Header>
  <AccordionItem.Heading render={<h2 />}>
    <AccordionItem.Button>
      <AccordionItem.Label>Label</AccordionItem.Label>
    </AccordionItem.Button>
  </AccordionItem.Heading>
<AccordionItem.Header>
```

`AccordionItem.Heading` must wrap `AccordionItem.Button`. This ensures the semantics of both underlying elements (`<h2>` and `<button>` respectively) are available during interaction.

:::caution[Heading levels]

It’s important you use an [appropriate heading level](https://www.a11yproject.com/posts/how-to-accessible-heading-structure/) for each **AccordionItem**. Since **AccordionItems** can only represent one level of data (see [**Use cases**](#use-cases)), each **AcccordionItem** in a set must take the _same_ heading level.

- Title of page (`h1` heading)
  - **AccordionItem** 1 (`h2` heading)
  - **AccordionItem** 2 (`h2` heading)
  - **AccordionItem** 3 (`h2` heading)
  - **AccordionItem** 4 (`h2` heading)

:::

### Decorations

::example{src="AccordionItem.decoration"}

Decorate the `AccordionItem.Header` with an [**Icon**](/components/icon) using `AccordionItem.Decoration`.

```jsx
<AccordionItem.Decoration render={<Icon href={…} />} />
```

Add multiple icon decorations as child elements:

```jsx
<AccordionItem.Decoration>
	<Icon href={firstIcon} />
	<Icon href={secondIcon} />
</AccordionItem.Decoration>
```

<!--## Configurations

### Variants

| Use case                                                                         | Outline                      | Ghost                        |
| -------------------------------------------------------------------------------- | :--------------------------: | :--------------------------: |
| General                                                                          |              ✅              |              ❌               |
| Tight spaces, such as table cells, where the context provides an outline already |              ❌              |              ✅               |
-->

## Do

- Use **AccordionItems** to tidy away long sections of content, to be later disclosed.
- Render HTML heading elements with `AccordionItem.Heading` to mark **AccordionItems** as sections in the page structure.
- Place the `AccordionItem.Marker` at the begin or end of the `AccordionItem.Header`.
- Place [decorations](#decorations) to either side of the `AccordionItem.Button`.

## Don’t

- Don’t nest **AccordionItems** inside one another. For multi-level data, use [**Tree**](/components/tree).
- Don’t close an **AccordionItem** when another **AccordionItem** is opened. Exclusive **AccordionItems** create [accessibility and usability issues](https://yatil.net/blog/exclusive-accordions).
- Don’t place a [decoration](#decorations) _between_ the `AccordionItem.Marker` and the begin or end of `AccordionItem.Header`. `AccordionItem.Marker` must be first on the left or first on the right.
