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

### `slots` and `slotProps`

Some more complex components, constituting subcomponents, support an object syntax for changing HTML elements by _slot_. Where needed, change your [**Accordion**](/components/accordion) item’s heading via the `slot` prop and its `heading` key:

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

## ARIA attribution

The [WAI-ARIA](https://www.w3.org/WAI/standards-guidelines/aria/) standard lets you override and extend the information carried by HTML. As established, overriding roles is a notorious [footgun](https://en.wiktionary.org/wiki/footgun). However, some roles supported in ARIA are not yet supported in base HTML. These can occasionally improve the fidelity with which components are identified.

For example, a checkbox used as a switch benefits from `role="switch"`:

```html
<label for="dark-mode">
	Dark mode
	<input type="checkbox" role="switch" id="dark-mode" />
</label>
```

The [**Switch**](/components/switch) implements this for you automatically. You just need to supply a label. MUI's [**FormControlLabel**](https://mui.com/material-ui/api/form-control-label/) offers a `label` prop. The `control` prop behaves like `render` (and each support React components, not just base HTML elements):

```jsx
<FormControlLabel control={<Switch />} label="Dark mode" />
```

In other cases, you must apply ARIA attribution directly, during implementation. For example, a [**Badge**](/components/badge) can be used to display a notification count:

::example{src="mui/Badge.default"}

This number must be associated with the [**IconButton**](/components/iconbutton) that displays it. In [the **Badge** example](https://github.com/iTwin/stratakit/blob/main/examples/mui/Badge.default.tsx), this association is made with matching `aria-describedby` and `id` values:

```jsx
<IconButton label="Notifications" aria-describedby={descriptionId}>
	<Badge badgeContent={4} color="primary">
		<Icon href={`${svgNotifications}#icon-large`} size="large" />
		<span id={descriptionId} hidden>
			You have 4 unread notifications
		</span>
	</Badge>
</IconButton>
```

It’s not always possible to ship all of the necessary semantic information as part of a component. Some attribution must be applied during the assembly of your product interface. Study the component guides and examples carefully. These exemplify how to apply `render` and ARIA attribution to improve component accessibility and robustness.

Verify the correct semantic information is present by examining the rendered HTML code. To see what's available in screen reader output specifically, examine the [accessibility tree](https://developer.mozilla.org/en-US/docs/Glossary/Accessibility_tree). In Chrome, you can view the accessibility tree by opening the inspector and choosing the accessibility tab (**Elements > Accessibility**).
