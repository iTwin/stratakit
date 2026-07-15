---
title: Component customization
description: Taking care when changing component HTML
---

Consider a simple `<button>` element with the [label](/guides/language-and-labels) _“Save”_. The label tells us what the element _does_, but it's also useful to know _how it does it_. If the element looks like a button, we can expect it to behave like one. That is, we'd expect it to _make something happen_, but not _take us somewhere_ like a link should.

What about people who cannot see the button? Fortunately, the `<button>` element comes with a button _role_: it is identified as a button programmatically. Parsers like screen readers will announce the role (what the `<button>` is) and the label (what it does) together: _“save, button”_.

Using the `<button>` element automatically provides the button role without additional code. It is, therefore, said to be an _implicit_ role. However, you can change the role by either replacing the `<button>` with a different element, or by applying an _explicit_ [ARIA role attribute](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles).

```html
<!-- ❌ don't do this -->
<button role="link">Save</button>
```

This link is a lie. While it identifies its role as “link”, it still behaves as a button. In general, you should avoid overriding element roles in this way.

If you really wanted a link, you could use a link ([anchor](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/a)) element:

```html
<!-- ❌ don't do this -->
<a>Save</a>
```

But that's no good either. We've mismatched roles and behaviors again. Hitting “Save” does not take anyone anywhere, so there’s nothing to put in the `href`. And without an `href`, a link is not focusable or functional.

Each component comes with a [**Use cases** section](/components/button#use-cases) to help match roles with behaviors. However, sometimes component HTML _needs_ to be updated to suit context, align with presentational convention, or signify state.

## Changing component output

There are two props that let you change the HTML element used to render a component:

1. The `component` prop: This comes from MUI and you must use `render` (2) in place of it.
2. The `render` prop: This is **StrataKit’s** optimized alternative to `component`. Use this sparingly.

### Changing a heading level

The [**Language and labels**](/guides/structure/#headings) guide sets out the importance of applying the correct heading levels when describing the interface structure. Heading levels are set using the elements `<h1>` to `<h6>`. 

The [**Typography**](/components/typography/#heading) component supports `render` for setting the element and `variant` for setting an accompanying style token. This decoupling of semantics and style lets you set the correct structure while calibrating visual hierarchy.

In the following example, `<h1>` is the correct element, since it is the main heading for the page. But, since the context requires a diminished font-size, a `headline`-prefixed token is preferred over a larger `display` variant. 

```jsx
<Typography variant="headline-sg" render={<h1 />}>
	Heading text
</Typography>
```

### Changing a React component

The `render` prop is capable of replacing not just HTML elements but React components.

Your application may use the popular [**React Router**](https://reactrouter.com/home) library and its [**Link**](https://reactrouter.com/api/components/Link) component. However, you may wish to render **React Router’s** **Link** using the styling associated with the generic [**Link**](/components/link/) coming from MUI.

Import **React Router’s** **Link** as **RouterLink** and apply it using the `render` prop.

```jsx
import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router";

export default () => {
	return <Link to="/" render={<RouterLink />}>Home</Link>;
};
```

:::note[Prop compatibility]

In the previous example, the outer **Link** is able to use **RouterLink’s** [`to` prop](https://reactrouter.com/api/components/Link#to). For some rerendered components, it may be necessary to place the prop on the inner (`render`-encapsulated) component.

:::

### `slots` and `slotProps`

Some more complex components, constituting subcomponents, support an object syntax for changing HTML elements by _slot_. Where needed, change your [**Accordion**](/components/accordion) item’s heading via the `heading` slot:

```jsx
<Accordion
	variant="outlined"
	role="listitem"
	slots={{
		heading: "h2",
	}}
>...
</Accordion>
```

The `slotProps` alternative gives you finer grained control. For each element, you can set multiple props, including a `render` prop where applicable. For example, the [**NativeSelect**](/components/nativeselect)’s input needs both `name` and `id` set:


```jsx
<FormControl>
	<InputLabel variant="standard" htmlFor={inputId}>
		Design system:
	</InputLabel>
	<NativeSelect
		defaultValue={2}
		slotProps={{
			input: {
				name: "design-system",
				id: inputId,
			},
		}}
	>
		<option value={1}>iTwinUI</option>
		<option value={2}>StrataKit</option>
		<option value={3}>Other</option>
	</NativeSelect>
</FormControl>
```

The `id` is necessary for creating the association between the select element and its corresponding label. The `id` and `htmlFor` values must match.

## Some assembly required

It’s not always possible to ship all of the necessary semantic information as part of a component. As in the last example, some attribution must be applied during the assembly of your product interface. Study the component guides and examples carefully. These exemplify how to apply `render` and [ARIA attribution](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA) to improve component accessibility and robustness.

Verify the correct semantic information is present by examining the rendered HTML code. To see what's available in screen reader output specifically, examine the [accessibility tree](https://developer.mozilla.org/en-US/docs/Glossary/Accessibility_tree). In Chrome, you can view the accessibility tree by opening the inspector and choosing the accessibility tab (**Elements > Accessibility**).
