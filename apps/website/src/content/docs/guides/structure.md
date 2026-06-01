---
title: Structure
description: How to successfully organize your content and functionality
---

Information without structure is just data. High quality interfaces require logical organization. But structure is perceived and traversed in different ways. The interface one user sees on screen is also parsed by assistive technologies, and analyzed by AI agents.

It’s important everyone—and everything—experiences the same interface. Fortunately, standard HTML enshrines certain structural rules and cues that benefit all parties. This guide will help you communicate structural relationships in an equitable way.

## Order

An early design for an interface typically exists in a flat, graphical form. Any structural relationships we perceive are spatial only.

The perceived order of two objects is set by visually placing one after the other. This visual order may contradict the order of the objects in the accompanying layers panel. Since the output from the design software is a flattened graphic, this hardly matters.

HTML is different. The code doesn’t _output_ the interface; it _is_ the interface. This means the structure of the code is paramount. If the visual placement of objects contradicts their order in the source, a sighted user experiences something different from a blind screen reader user.

In the visual interface, the order of any two objects can appear in three dimensions:

1. Left and right 
2. Above and below
3. Back and front (depth)

Whereas any two components in the source can only be _first and last_:

```jsx
<div>
  <span>First object</span>
  <span>Another object</span>
</div>
<span>Last object</span>
```

Avoid using **CSS** such that it creates a mismatch between visual placement and source order. Use this table to check:

| Where objects are  | Components must be |
| ------------------ | ------------------ |
| left and right     | first and last     |
| above and below    | first and last     |
| back and front     | first and last     |

### Focus order

Interactive elements must be focusable so that the interface can be operated by keyboard. The order in which these elements are encountered and focused must be logical:

| Where buttons are  | Focus must occur  |
| ------------------ | ----------------- |
| left and right     | first then last   |
| above and below    | first then last   |
| back and front     | first then last   |

Avoid prioritizing the focus of certain elements by applying a positive `tabindex` value. This disrupts an otherwise logical order of focus.

```jsx
/* ❌ */
<div role="group" aria-label="Button group">
  <button>Focused second</button>
  <button tabIndex={1}>Focused first</button>
  <button>Focused last</button>
</div>
```

:::caution[The `autofocus` attribute]

The `autofocus` attribute focuses an element when an interface first renders. Automatically focusing a button inside a newly opened dialog or popover may be helpful. However, applying `autofocus` to an element on _page load_ should generally be avoided.

:::

More complex interactive components like [**Menu**](/components/menu) and [**Dialog**](/components/dialog) manage focus automatically. Use these components to avoid focus order issues that could trip up a user or agent.

### Skip link

In the order of major page [landmarks](#landmarks), the `<header>`—typically including a `<nav>`—is expected to come first. 

A [skip link](https://www.w3.org/WAI/test-evaluate/easy-checks/skip-link/) is a mechanism for bypassing this header/navigation functionality to interact directly with the main content of the page. It is a provision for keyboard users and is considered an accessibility requirement according to [WCAG](https://www.w3.org/WAI/WCAG22/Understanding/bypass-blocks.html).

Typically, skip links are hidden until focused by keyboard. They are not needed by or available to mouse users.

If you are implementing your own skip link, point the skip link's `href` to the `<main>` element page fragment. To ensure keyboard focus follows the link, include `tabindex="-1"` on the target element.

```html
<a href="#main">skip to content</a>
<!-- page preamble here -->
<main id="main" tabindex="-1">...</main>
```

## Belonging

The Gestalt principle of [common region](https://www.nngroup.com/articles/common-region/) states that _“items within a boundary are perceived as a group”_. From forms to dialogs, all sorts of elements take a border, background color, or both, to communicate their contents _belong together_. 

As with order, a relationship of belonging needs to be programmatically determinable in the code, not just illustrated visually. 

Nesting HTML elements (placing them inside one another) is an everyday practice. But not all HTML elements contribute to communicating a nested structure. Consider the following example:

```jsx
<div class="ButtonGroup">
  <button>Bold</button>
  <button>Italic</button>
  <button>Underline</button>
</div>
```

The intent to communicate belonging is clear from the nested structure and the `ButtonGroup` classname. It’s also expressed visually, via CSS, by making the buttons share a common border. However, neither a screen reader nor a crawler will acknowledge the `<div>`—and for good reason! We use `<div>`s to organize our HTML, not the information within it.

To communicate the presence of a group, we can encode it with [`role="group"`](https://developer.mozilla.org/en-US/Web/Accessibility/ARIA/Reference/Roles/group_role). Whatever you call this group should be the wording of its accompanying label.

```jsx
<div role="group" aria-label="Text formatting">
  <button>Bold</button>
  <button>Italic</button>
  <button>Underline</button>
</div>
```

In the [**ButtonGroup**](/components/buttongroup) component, **StrataKit** applies `role="group"` automatically. Since the label will be product-specific, you must apply this as the consumer.

The generic `group` role is not the only way to encode a relationship of belonging. If you are not using the following extensively, you are unlikely to be sufficiently communicating structure.

| Name           | Use case                                                                                                                                                                                                                 | HTML                                                                                                          | Available components                                                                                                                                     |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Unordered list | Any quantity of items where the order isn’t important, such as checklist items and [Cards](/components/Card)                                                                                                             | The `<ul>` and `<li>` elements or the `role="list"` and `role="listitem"` attribution                         | [List](/components/list)                                                                                                                                 |
| Ordered list   | Any quantity of items where the order is important, such as steps in a process or a breadcrumb trail                                                                                                                     | The `<ol>` and `<li>` elements                                                                                | [Breadcrumbs](/components/breadcrumbs), [Stepper](/components/stepper)                                                                                   |
| Landmark       | Any large region of the page, such as the header, footer, or main content area                                                                                                                                           | `<header>`, `<footer>`, `<main>`, `<nav>`, `<aside>`, `role="search"`                                         | You must implement landmarks as part of your overall page/screen structure. See the [landmarks section](#landmarks).                                     |
| Heading        | Labeling sections and subsections of the page. Heading elements are a special case because they both indicate a section in the document and act as that section’s label. See the [headings](#headings) section for more. | `<h1>` to `<h6>`                                                                                              | The [Typography](/components/typography) component supports the `render` prop, which lets you render the component as a heading element, such as `<h3>`. |
| Fieldset       | Similar to `role="group"` but for grouping form elements, using a `<legend>` for the group’s label                                                                                                                       | `<fieldset>` and `<legend>`                                                                                   |                                                                                                                                                          |
| Figure         | Providing captions for images and other media.                                                                                                                                                                           | `<figure>` and `<figcaption>`. The `<figcaption>` must appear alongside the media, each inside the `<figure>` | None currently provided                                                                                                                                  |

### Landmarks

[Landmarks](https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/) are the continents in the map of your interface. Landmarks are large and few in number. Everything (all components) must belong to one landmark or another. They have specific purposes:

- [`<main>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/main): Include just once per screen/page. This encapsulates the main, unique content of the screen.
- [`<header>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/header): Include just one at the start of the document. This may contain a principle `<nav>` element.
- [`<nav>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/nav): Multiple can be used for different purposes, such as site navigation, pagination, and tables of content. Give each `<nav>` a unique label, like `<nav aria-label="table of contents">`. This differentiates the landmarks when aggregated in screen reader software.
- [`<search>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/search): Identifies the element containing the page’s principle search functionality.
- [`<aside>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/aside): For complementary content and functionality. If your model is the content of `<main>`, then an `<aside>` might contain a tree component for calibrating your model’s layers. Alternatively, the tree may be considered part of the model and the `<aside>` part of the `<main>` content, alongside the model itself.
- [`<footer>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/footer): Used once at the end of the document. Useful for including company and product identification, and related links.

### Headings

If landmarks represent continents, then sections are countries: subdivisions of landmarks. Headings _implicitly_ define a section by introducing—rather than wrapping—that section content.

```jsx
<h2>Introduction of a subsection</h2>
<p>The content belonging to the subsection.</p>
```

The heading elements (`<h1>` to `<h6>`) are numbered according to section depth. 

- `<h1>`: introduces the page
  - `<h2>`: introduces a subsection in the page
  - `<h2>`: there may be multiple subsections of the same level
    - `<h3>`: introduces a subsection under the `<h2>` subsection

Headings, and a logical application of heading levels, are indispensable for describing the relationships of belonging that make up the document’s structure. Landmarks and headings together expose the information topology to different users, their assistive software, and agents.

If you are applying a suitable heading level but need control over the element’s styling, use the [**Typography**](/components/typography) component and set the level using the `render` prop:

```jsx
<Typography variant="h4" render={<h2 />}>
  This must render as an `h2`, but looks smaller, like an `h4`.
</Typography>
```

:::caution[False headings]

Just because some text appears large or **bold** does not make it a heading. A heading must introduce a section (or subsection) of thematically distinct content. For large (or otherwise attention grabbing) text, not intended as a heading, use a [**Typography**](/components/typography) heading `variant` but change the underlying element using the `render` prop:

```jsx
<Typography variant="h4" render={<span />}>
  This change cannot be undone.
</Typography>
```

:::
