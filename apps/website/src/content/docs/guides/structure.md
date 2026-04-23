---
title: Structure
description: How to successfully organize your content and functionality
---

Information without structure is just data. No high quality interface lacks organization. But structure is perceived and traversed in different ways. The interface one user sees on screen is also parsed by screen reader software, and analyzed by AI agents.

It’s important everyone—and everything—experiences the same interface. Fortunately, standard HTML enshrines certain structural rules and cues that benefit all parties. This guide will help you communicate structural relationships in an equitable way.

## Order

An early design for an interface typically exists in a flat, graphical form. Any structural relationships we perceive are spatial only.

The perceived order of two objects is set by visually placing one after the other. This visual order may contradict the order of the objects in the accompanying layers panel. Since the output from the design software is a flattened graphic, this hardly matters.

HTML is different. The code doesn’t _output_ the interface; it _is_ the interface. This means the structure of the code is paramount. If the visual placement of objects contradicts their order in the source, a sighted user experiences something different from a blind screen reader user, indexing crawler, or AI agent.

In the visual interface, the order of any two objects can appear in three dimensions:

1. Left and right 
2. Above and below
3. Back and front (depth)

Whereas any two components in the source can only be _first and last_:

```jsx
<div>
  <Typography>First object</Typography>
  <Typography>Another object</Typography>
</div>
<Typography>Last object</Typography>
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

Avoid _prioritizing_ the focus of certain elements by applying a positive `tabindex` value or the `autofocus` attribute.

```jsx
<!-- ❌ -->
<Link href="/some/page">Focused last</Link>
<TextField label="Focused first" autofocus />

<!-- ❌ -->
<ButtonGroup aria-label="Button group">
  <Button>Focused second</Button>
  <Button tabindex="1">Focused first</Button>
  <Button>Focused last</Button>
</ButtonGroup>
```

More complex interactive components like [**Menu**](/docs/components/menu) and [**Dialog**](/docs/components/dialog) manage focus automatically. Implement these components to avoid focus order issues that could trip up a user or agent trying to navigate and make sense of the interface.

## Belonging

The Gestalt principle of [common region](https://www.nngroup.com/articles/common-region/) states that _“items within a boundary are perceived as a group”_. From forms to dialogs, all sorts of elements take a border, background color, or both, to communicate their contents _belong together_. 

As with order, a relationship of belonging needs to be programmatically determinable in the code, not just illustrated visually. 

Nesting HTML elements (placing them inside one another) is an everyday practice. But not all HTML elements contribute to communicating a nested structure. Consider the following example:

```jsx
<div class="ButtonGroup">
  <Button>Bold</Button>
  <Button>Italic</Button>
  <Button>Underline</Button>
</div>
```

The intent to communicate belonging is clear from the nested structure and the “ButtonGroup” classname. It’s also expressed visually, via CSS, by making the buttons share a common border. However, neither a screen reader nor a crawler will acknowledge the `<div>`—and for good reason! We use `<div>`s to organize our HTML, not the information within it.

To communicate the presence of a group, we can encode with [`role="group"`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/group_role). Whatever you call this group should be the wording of its accompanying label.

```jsx
<div role="group" aria-label="Text formatting">
  <Button>Bold</Button>
  <Button>Italic</Button>
  <Button>Underline</Button>
</div>
```

In the [**ButtonGroup**](/docs/components/buttongroup) component, **StrataKit** applies `role="group"` automatically. Since the label will be product-specific, you must apply this as the implementer.

The generic `group` role is not the only way to encode a relationship of belonging. If you are not using the following extensively, you are unlikely to be sufficiently communicating structure.

<table>
  <tr>
    <th>Name</th>
    <th>Use case</th>
    <th>HTML</th>
    <th>Available components</th>
  </tr>
  <tr>
    <td>Unordered list</td>
    <td>Any quantity of items where the order isn’t important, such as checklist items and <a href="/docs/components/Card"><strong>Cards</strong></a></td>
    <td>The <code>&lt;ul></code> and <code>&lt;li></code> elements or the <code>role="list"</code> and <code>role="listitem"</code> attribution</td>
    <td><a href="/docs/components/list"><strong>List</strong></a></td>
  </tr>
  <tr>
    <td>Ordered list</td>
    <td>Any quantity of items where the order is important, such as steps in a process or a breadcrumb trail</td>
    <td>The <code>&lt;ol></code> and <code>&lt;li></code> elements</td>
    <td><a href="/docs/components/breadcrumbs"><strong>Breadcrumbs</strong></a>, <a href="/docs/components/stepper"><strong>Stepper</strong></a></td>
  </tr>
  <tr>
    <td>Landmark</td>
    <td>Any large region of the page, such as the header, footer, or main content area</td>
    <td><code>&lt;header></code>, <code>&lt;footer></code>, <code>&lt;main></code>, <code>&lt;nav></code>, <code>&lt;aside></code>, <code>role="search"</code></td>
    <td>You must implement landmarks as part of your overall page/screen structure. See the <a href="#landmarks">landmarks section</a></td>
  </tr>
  <tr>
    <td>Heading</td>
    <td>Labeling sections and subsections of the page. Heading elements are a special case because they both indicate a section in the document and act as that section’s label. See the <a href="#headings">headings</a> section for more.</td>
    <td><code>&lt;h1></code> to <code>&lt;h6></code></td>
    <td>The <a href="/docs/components/typography"><strong>Typography</strong></a> component supports the <code>render</code> prop, which lets you render the component as a heading element, such as <code>&lt;h3></code>.</td>
  </tr>
  <tr>
    <td>Fieldset</td>
    <td>Similar to <code>role="group"</code> but for grouping form elements, using a <code>&lt;legend></code> for the group’s label</td>
    <td><code>&lt;fieldset></code> and <code>&lt;legend></code></td>
    <td></td>
  </tr>
  <tr>
    <td>Figure</td>
    <td>Providing captions for images and other media.</td>
    <td><code>&lt;figure></code> and <code>&lt;figcaption></code>. The the <code>&lt;figcaption></code> must appear alongside the media, each inside the <code>&lt;figure></code></td>
    <td>None currently provided</td>
  </tr>
</table>

### Landmarks

[Landmarks](https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/) are the continents in the map of your interface. Landmarks are large and few in number. Everything (all components) must belong to one landmark or another. They have specific purposes:

- `<main>`: Include just once per screen/page. This encapsulates the main, unique content of the screen.
- `<header>`: Include just one at the start of the document. This may contain a principle `<nav>` element.
- `<nav>`: Multiple can be used for different purposes, such as site navigation, pagination, and tables of content. Give each `<nav>` a unique label, like `<nav aria-label="table of content">`. This differentiates the landmarks when aggregated in screen reader software.
- `role="search"`: Identifies the element containing the page’s principle search functionality. Apply the `role` attribution to an element containing the `<form>` element. Do not place `role="search"` on the `<form>` element itself.
- `<aside>`: For complementary content and functionality. If your model is the content of `<main>`, then an `<aside>` might contain a tree component for calibrating your model’s layers. Alternatively, the tree may be considered part of the model and the `<aside>` part of the `<main>` content, alongside the model itself.
- `<footer>`: Used once at the end of the document. Useful for including company and product identification, and related links.

### Headings

If landmarks represent continents, then sections are countries: subdivisions of landmarks. Headings _implicitly_ define a section by introducing—rather than wrapping—that section content.

```jsx
<Typography variant="h2">
  Introduction of subsection 1
</Typography>
<p>The content belonging to subsection 1.</p>
```

The provided heading elements, from `<h1>` to `<h6>`, are numbered according to section depth. For example, an `<h3>` following an `<h2>` introduces a subsection to the `<h2>`’s section.

- `<h1>` (`variant="h1"`): introduces the page
  - `<h2>` (`variant="h2"`): introduces a subsection in the page
  - `<h2>`: there may be multiple subsections of the same level
    - `<h3>` (`variant="h3"`): introduces a subsection under the `<h2>` subsection

Headings, and a logical application of heading levels, are indispensable for describing the relationships of belonging that make up the document’s structure. Landmarks and headings together expose the information topology to different users, their assistive software, and agents.

Just because some text appears large or **bold** does not make it a heading. A heading must introduce a section (or subsection) of thematically distinct content. For large (or otherwise attention grabbing) text, not intended as a heading, use a heading `variant` but change the underlying element using the `render` prop:

```jsx
<Typography variant="h4" render={<span />}>
  This change cannot be undone.
</Typography>
```

