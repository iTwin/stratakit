---
title: Radio tiles
description: A series of selectable tile components that behave like radio button.
links:
  apiReference: "#api-reference"
---

::example{src="composite/RadioTiles.default" min-height="450px"}

**Radio tiles** can be constructed using a combination of the [**Radio**](/components/radio/) and [**Paper**](/components/paper/) components, with some additional styling.

You may include an [**Icon**](/components/icon/) to help make each **radio tile** more identifiable. However, it is invalid to provide an icon without text.

The example uses the [pseudo-content trick](https://inclusive-components.design/cards/#thepseudocontenttrick) to make the entire **radio tile** clickable. This expands the clickable `<label>` element to cover the entire **radio tile** without requiring all content to be a child of `<label>`.

### API reference

- [`Paper`](https://mui.com/material-ui/api/paper/)
- [`RadioGroup`](https://mui.com/material-ui/api/radio-group/)
- [`Radio`](https://mui.com/material-ui/api/radio/)
- [`FormControl`](https://mui.com/material-ui/api/form-control/)
- [`FormLabel`](https://mui.com/material-ui/api/form-label/)
- [`Typography`](https://mui.com/material-ui/api/typography/)
- [`Icon`](/reference/mui/Icon)
