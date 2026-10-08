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

A [single-page application](https://en.wikipedia.org/wiki/Single-page_application) can have multiple screens, but since these screens all render within a single document, standard navigation behavior is disrupted. Without care, focus becomes unpredictable, back and refresh buttons do not work, and addresses no longer take you to the places you want to revisit.

Follow this guide to make sure routing behavior is predictable and no features are missing.

## Construct good URLs

It's good practice to reserve specific URL parts for specific purposes. 

- **path**: The path portion of the URL should point to a screen in your application. Examples: `/help`, `/settings/display`.
- **query string**: Query parameters pertain to versions, modes, or states of the screen. Examples: `&page=4`, `&sort=latest`.
- **hash**: The hash references a page fragment; a subsection of the page. Useful for “deep” linking. Examples: `#main`, `#contruct-good-urls`.

## Use links

With JavaScript, you can manipulate [the DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model) in all sorts of ways. By removing a lot of elements and replacing them with a lot of other elements, you can make it appear the page has been replaced. And nobody needs to click an `<a>` element for that to happen. Click handlers can be attached to any elements.

However, anchors are accessible (focusable) by keyboard. They also identify themselves to users operating screen reader software. Then there are all the other standard behaviors, listed in the introduction to this guide. 

Provide `<a>` elements with valid `href` attributes or React components that render as such. The [**Link**](/components/link) component renders a standard anchor. Don't offer `<button>`s, `<div>`s or any other elements for context changes. Use JavaScript only to _enhance_ `<a>` behavior. Be careful not to remove or change standard behavior when JavaScript is used to handle navigation.

## Update the address

With screens all rendering at the same address, state can be easily persisted. Leaving or reloading the page may mean lost data. But changing the screen without updating the address has adverse effects. The back button will cease to work. Screens will not be shareable like standard pages.

Fortunately, [`pushState`](https://developer.mozilla.org/en-US/docs/Web/API/History/pushState) enables updating of the address without triggering a page refresh. Libraries like [React Router](https://reactrouter.com/start/framework/routing) handle this automatically within React applications. Its own [**Link**](https://reactrouter.com/start/framework/navigating#link) component renders as an `<a>` element with its `to` prop mapping to `href`.

```jsx
<Link to="/sign-in">Sign in</Link>
```

The `to` value will append the URL when the **Link** is clicked.

## Update the title

As set out in [**Language & Labels**](/guides/language-and-labels#the-page-title), each page, or screen, must come with a unique `<title>` to differentiate it from others. In multi-page websites, `<title>`s are configured per page. In a single-page application, the `<title>` must be dynamically rewritten.

From [React 19](https://react.dev/blog/2024/12/05/react-19#support-for-metadata-tags), you can include a `<title>`, with a dynamic value, anywhere in your code.

```jsx
<title>{screen.title}</title>
```

Before React 19, `document.title` either has to be updated manually or via a library like [React Helmet](https://www.npmjs.com/package/react-helmet).

Each time the route—and the associated screen—changes, the `<title>` must be updated with new and descriptive wording using the [prescribed format](/guides/language-and-labels#the-page-title).

## Move focus deliberately

When a browser loads or refreshes a web document, keyboard focus moves to the `<body>` element by default. That is, unless an element with [autofocus](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/autofocus) redirects it. Avoid `autofocus`. It has multiple [accessibility concerns](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/autofocus#accessibility_concerns).

When a full page load does not occur, and content is simply replaced, browsers generally leave focus “hanging” where the focused element was removed. Where focus is not intentionally moved, screen readers have nothing to announce. It may not be clear to screen reader users that a change of screen has even taken place.

To remedy this, you must move focus deliberately, onto a suitable element. For the following reasons, [research](https://www.gatsbyjs.com/blog/2019-07-11-user-testing-accessible-client-routing/) indicates the best element is the main heading for the new screen:

1. It places keyboard focus at the start of the newly loaded content.
2. Screen readers will announce the heading's text content, giving context.

:::note[Missing main headings]

Each screen should be introduced with an `<h1>`. See [**Structure**](/guides/structure) for guidance on structuring screens using landmarks and headings.

However, if your screen does not have an `<h1>` (and this cannot presently be resolved), direct focus to another element. The [`<main>` landmark](/guides/structure#landmarks), housing the screen's main content, is an acceptable interim solution. 

```html
<main id="main" tabindex={-1}>...</main>
```

:::

**React Router's** [`useLocation`](https://reactrouter.com/api/hooks/useLocation) lets you create a hook where this focus move takes place whenever the location (screen) changes:

```jsx
const location = useLocation();

useEffect(() => {
  const h1 = document.querySelector('h1');
  if (!h1) return;
  h1.tabIndex ||= -1;
  h1.focus();
}, [location]);
```

:::note[Tabindex]

Note that `tabindex` is set to `-1`. This makes the `focus()` method work with non-interactive elements like `<h1>`. 

The `-1` value does not place the element in the user's [tab order](https://www.a11y-collective.com/glossary/tab-order/). Non-interactive elements should not be manually focusable.

:::

## Loading state

For the pending state of screens still fetching content, instate either a [**Skeleton**](/components/skeleton) or [**Progress**](/components/progress).

### Progress

[**Progress**](/components/progress) is implemented with `role="progressbar"`, which must be labelled, as in [this **Progress** example](https://github.com/iTwin/stratakit/blob/main/examples/mui/CircularProgress.default.tsx). Upon entering the pending/loading state, **Progress** must be focused, hence the application of `tabindex={-1}` (see [**Move focus deliberately**](#move-focus-deliberately)):

```jsx
const labelId = React.useId();
return (
  <>
    <CircularProgress tabindex={-1} aria-labelledby={labelId} />
    <Typography style={visuallyHidden} id={labelId}>Loading…</Typography>
  </>
);
```

:::note[`visuallyHidden`]

In this case, the text “Loading...” does not need to be visible, but it does need to be available to screen reader software, hence the `visuallyHidden` style.

:::

### Skeleton

The [**Skeleton**](/components/skeleton) does not have a `role="progressbar"` element built in. If you choose to use **Skeleton**, attribute it as a progress bar:

```jsx
<Skeleton role="progressbar" aria-label="Loading…" tabindex={-1} />
```

If you are using multiple **Skeletons** to construct a representative UI (from [the different skeleton variants showcased here](https://github.com/iTwin/stratakit/blob/main/examples/mui/Skeleton.variants.tsx)), only make one of them a progressbar.

## Steps to take

Here's what needs to happen, in order, for each change of route:

1. The user must click a link to a screen within the application. This can be a standard `<a>` element, with an `href`, or any React component that renders as such.
2. If the new route's data takes time to load:
    - Replace the previous screen's main content with a [**LinearProgress**](/components/linearprogress), [**CircularProgress**](/components/circularprogress), or [**Skeleton**](/components/skeleton).
    - Focus the (labelled) `role="progressbar"` element.
3. When the new content is available:
    - Update the address/URL using `pushState` (your [router library](https://reactrouter.com/start/framework/routing) may do this for you).
    - Change the `<title>` value to describe the new screen. Use the pattern `<title>{screen name} - {app name}</title>`. 
    - Supplement this `title` change by populating an [ARIA live region](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Guides/Live_regions) with the `title` text. This will announce the title as it would be in a standard page load.
    - Render the new screen's content.
    - Focus the main heading introducing the content using the `focus()` method. This should be an `<h1>` and will need `tabindex={-1}`.
    - Remove `aria-current="true"` from links that no longer correspond to the new screen.
    - Add `aria-current="true"` to any links that correspond to the new screen. 
