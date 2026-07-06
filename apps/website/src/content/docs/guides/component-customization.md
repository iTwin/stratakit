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

Each component comes with a [**Use cases** section](/components/button#use-cases) to help match roles with behaviors. However, sometimes component HTML _needs_ to be updated to suit context, align with presentational convention, or signify state. That's what the `render` prop is for.

## The `render` prop

Available to all MUI and **StrataKit** components, the `render` prop lets you change the HTML element or React component used to render the component in hand. It is a powerful feature and has a lot of potential as a [footgun](https://en.wiktionary.org/wiki/footgun).

```jsx
/* ❌ don't do this */
<Button render={<a />}>View</Button>
```

If the aim is to make a link _appear_ as a button, supply an `href`. Since `<button>` does not support the `href` property, the `href` must appear on the supplied `<a>`:

```jsx
/* ✅ */
<Button render={<a href="/path/to/permalink" />}>View</Button>
```

In general, buttons should look like buttons and links like links. The appearance sets expectations about behaviors. Pressing this false button, you wouldn't expect to navigate to a new screen.

Occasionally, an element must support a certain type of behavior, but is better seen or understood with a different appearance. So long as there are sufficient contextual clues and a suitable label, it is permissible to change the underlying element.

The previous example was taken from a [**Card**](/components/card). **Card** actions conventionally appear as buttons, even where they act as links. The label _“View”_ helps prepare the user for a change of context.

::example{src="mui/Card.actions"}

### Heading levels

The [**Language and labels**](/guides/structure/#headings) guide sets out the importance of applying the correct heading levels when describing the interface structure.

Sometimes the heading level is correct for the structure but the `font-size` is too large for the available space. You must not change the level—and break the structure—just to downsize the text. 

Instead, use the [**Typography**](/components/typography/#heading) component, but be careful: [MUI's stock heading variants](https://mui.com/material-ui/react-typography/#usage)—`h1` to `h6`—automatically change the underlying heading element.

Instead, use a [**StrataKit** `variant`](https://stratakit.bentley.com/docs/components/typography/#variants) with an explicit `render` property:

```jsx
<Typography variant="headline-sg" render={<h1 />}>
	Heading text
</Typography>
```

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
