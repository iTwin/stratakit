---
title: Routing
description: Supporting robust and predictable routing across your application
---

When it comes to navigation, browsers agree to certain standard behaviors. Here are just a few:

- Hovering a link will show you the link address in the corner of the screen.
- Clicking a link will load a new page.
- The new page's address will now appear in the address bar.
- Clicking the browser's back button from the new page will reload the previous page.
- When the new page is loaded, keyboard focus is reset to the `<body>`.
- Right-clicking a link will reveal a link-specific context menu with options like _“Copy link address”_.
- Pasting that copied address into an empty tab will _load the page at the specified address_. 

None of these behaviors will occur automatically unless you use links ([anchor elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/a)) to connect separate documents together.

A [single-page application](https://en.wikipedia.org/wiki/Single-page_application) can have multiple screens, but since these screens all render within a single document, standard navigation behavior is disrupted. Without care, focus becomes unpredictable, back buttons do not work, and addresses no longer take you to the places you want to revisit.

Instate correct navigation behavior by following this guide.

## Use links

With JavaScript, you can manipulate [the DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model) in all sorts of ways. By removing a lot of elements and replacing them with a lot of other elements, you can make it appear the page has been replaced. And nobody needs to click an `<a>` element for that to happen. Click handlers can be attached to any elements.

However, anchors are accessible (focusable) by keyboard. They also identify themselves to users operating screen reader software. And there are all the other standard behaviors, listed above. Where you are _emulating_ navigation, make it convincing. Provide `<a>` elements with valid `href` attributes or React components that render as such. The [**Link**](/components/link) component renders a standard link. Don't offer `<button>`s, `<div>`s or any other elements for context changes. 

## Update the address

With screens all rendering in the same page, state can be easily persisted. Leaving or reloading the page may mean lost data. But changing the screen without updating the address has adverse effects. The back button will cease to work. Screens will not be shareable like standard pages.

Fortunately, [`pushState`](https://developer.mozilla.org/en-US/docs/Web/API/History/pushState) enables updating of the address without triggering a page refresh. Libraries like [React Router](https://reactrouter.com/start/framework/routing) handle this automatically within React applications. Its own [**Link**](https://reactrouter.com/start/framework/navigating#link) component renders as an `<a>` element with its `to` prop mapping to `href`.

```jsx
<Link to="/sign-in">Sign in</Link>
```

## Update the title

As set out in [**Language & Labels**](/guides/language-and-labels), each page—or screen—must come with a unique `<title>` to differentiate it. In multi-page websites, `<title>`s are configured per page. In a single-page application, the `<title>` must be dynamically rewritten.

From [React 19](https://react.dev/blog/2024/12/05/react-19#support-for-metadata-tags), you can include a `<title>`—with a dynamic value—anywhere in your code.

```jsx
<title>{screen.title}</title>
```

















## Navigation behavior

When a user activates a navigation item belonging to the **Platform Bar**, certain behaviors are expected. Some of these behaviors must be implemented in-product, since [**Navigation Rail**](/components/navigationrail) cannot anticipate differing routing architectures.

### Navigating screens

In most cases, activating a **Platform Bar** link ([`NavigationRail.Anchor`](/reference/structures/NavigationRail#NavigationRail.Anchor)) will load a new screen. When using a SPA (single-page application) architecture, follow these steps to make the rerouting behavior accessible:

1. Remove the `active` prop from the [`NavigationRail.Anchor`](/reference/structures/NavigationRail#NavigationRail.Anchor) that currently has it.
2. Apply the `active` prop to the newly clicked [`NavigationRail.Anchor`](/reference/structures/NavigationRail#NavigationRail.Anchor).
3. Change the `<title>` text to represent the new screen. See the [advice on `title`](/guides/language-and-labels/#the-page-title) from the **Language & Labels** guide.
4. If the new content cannot be rendered immediately, display a [**Progress**](/components/progress) component. 
5. Send focus to the **Progress** element,  identifying it to screen readers.
6. Remove the **Progress** element and reveal the content.
7. Send focus to the main/introductory heading inside the content. This should be an `<h1>`. See the [headings advice](/guides/structure/#headings) from the **Structure** guide.

:::note[Focus targets]

When sending focus to a non-interactive element, such as a `<div>`, ensure it has:

1. A semantic role (`<h1>` has a heading role; the **Progress** component has `role="progressbar"`).
2. The element has `tabindex="-1"`. This ensures the target element receives focus as intended.

:::

### Opening dialogs

Occasionally, a navigation action does not load another screen. Instead, it opens a [**Dialog**](/components/dialog/); a kind of screen-within-a-screen. This behavior is acceptable for things like account and app settings. However, you must ensure the following is in place:

1. The navigation item opening the dialog must be a [`NavigationRail.Button`](/reference/structures/NavigationRail#NavigationRail.Button). [`NavigationRail.Anchor`](/reference/structures/NavigationRail#NavigationRail.Anchor) (and the `active` prop) are not applicable.
2. The [**Dialog**](/components/dialog/) must behave as [a modal](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/). This is the default behavior of the [**Dialog**](/components/dialog/) component.
3. The [**Dialog**](/components/dialog/) must have a descriptive `<DialogTitle>`.
4. The [**Dialog**](/components/dialog/), or an interactive element inside the dialog, must receive keyboard focus when the dialog is opened. By default, the outer [**Dialog**](/components/dialog/) is focused.
5. When the [**Dialog**](/components/dialog/) is closed, keyboard focus must be returned to the [`NavigationRail.Button`](/reference/structures/NavigationRail#NavigationRail.Button) that invoked it.
