---
title: Page structure
description: The expected structure of pages (screens) in your interface
---

Each screen, or page, in your interface is likely to include **StrataKit** components and product-specific components not available in **StrataKit**. While the structure of pages will differ between products, they must be consistent, predictable, and include the following considerations.

## Metadata

### Page language

Place a `lang` attribute on the `<html>` element to identify the predominant language of the page. For example, the value `en` designates English as the page’s language.

```html
<html lang="en"></html>
```

This assists page translation tools and enables the selection of an appropriate synthetic voice in screen reader software.

### Page title

For each page or screen in your application, include a title, using the `<title>` element. The title text must identify both the page and the application to which it belongs. If you are using a root JSX layout, these separate parts may be stored in variables, as in the following example. Use a separator, like a dash or colon, between the page and application parts.

```html
<title>{pageInfo} - {appName}</title>
```

Think of the title as a label for the page. It must be unique (among pages in your application) and suitably descriptive.

Along with a favicon, the title is how tabs are differentiated visually. The title is also especially useful to screen reader users, who will hear it announced upon page load. It is recommended you include a favicon in the SVG format, since it is not resolution dependent.

```html
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
```

If yours is a single-page application, ensure the title is updated as the application route is changed. To ensure the new title in announced, supplement the title change with an [ARIA live region](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-live). [Some router libraries do this automatically](https://nextjs.org/docs/architecture/accessibility#route-announcements).

## Structure

The semantic structure of your page or screen, defined in HTML, is paramount. It must reflect the visual structure and hierarchy.

### Landmarks

[Landmarks](https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/) are the continents in the map of your interface. Landmarks are large and few in number. Everything (all components) must belong to one landmark or another. They have specific purposes:

- `<main>`: Include just once per screen/page. This encapsulates the main, unique content of the screen.
- `<header>`: Include just one at the start of the document. This may contain a principle `<nav>` element.
- `<nav>`: Multiple can be used for different purposes, such as site navigation, pagination, and tables of content. Give each `<nav>` a unique label, like `<nav aria-label="table of content">`. This differentiates the landmarks when aggregated in screen reader software.
- `role="search"`: Identifies the element containing the page’s principle search functionality. Apply the `role` attribution to an element containing the `<form>` element. Do not place `role="search"` on the `<form>` element itself.
- `<aside>`: For complementary content and functionality. If your model is the content of `<main>`, then an `<aside>` might contain a tree component for calibrating your model’s layers. Alternatively, the tree may be considered part of the model and the `<aside>` part of the `<main>` content, alongside the model itself.
- `<footer>`: Used once at the end of the document. Useful for including company and product identification, and related links.

### Headings

If landmarks represent continents, then sections are countries: subdivisions of landmarks. While HTML offers the `<section>` element, headings more commonly define the implicit sections and subsections of the document. The provided heading elements, from `<h1>` to `<h6>`, are numbered according to section depth. For example, an `<h3>` following an `<h2>` introduces a subsection to the `<h2>`’s section.

Not just anything should be a heading; not all large or bold text should use heading semantics. A heading must introduce a section (or subsection) of thematically distinct content.

### Skip link

A skip link is a mechanism for bypassing header/navigation functionality to interact directly with the main content of the page. It is a provision for keyboard users and is considered an accessibility requirement according to [WCAG](https://www.w3.org/WAI/WCAG22/Understanding/bypass-blocks.html).

Typically, skip links are hidden until focused by keyboard. They are not needed by or available to mouse users.

If you are implementing your own skip link, point the skip link’s `href` to the `<main>` element page fragment. To ensure keyboard focus follows the link, include `tabindex="-1"` on the target element.

```html
<a href="#main">skip to content</a>
<!-- page preamble here -->
<main id="main" tabindex="-1">...</main>
```

For reference, **iTwinUI** has the [SkipToContentLink component](https://itwinui.bentley.com/docs/skiptocontentlink).
