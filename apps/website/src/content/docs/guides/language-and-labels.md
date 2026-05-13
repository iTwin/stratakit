---
title: Language and labels
description: How to identify and describe elements of the interface
---

Interfaces are exchanges of information. Any interface where one party is human must share information as human readable text.

Even interfaces elements not display text need to be encoded with text. Text is parsable by crawlers, agents, and assistive software like screen readers. Tacit forms of communication (symbols and icons, shapes and colors) are not. 

## Page language

A French speaker can identify French when they hear it. Programmatic parsers are not so skilled. You need to explicitly set a language for every screen of your interface.

In web applications, this just means applying a `lang` attribute, with a suitable [ISO `lang` code](https://en.wikipedia.org/wiki/List_of_ISO_639_language_codes), to the `<html>` element:

```jsx
<html lang="fr">
```

Now parsers know to expect French content. A screen reader will choose a French voice profile and the page will be read in a suitably French accent. If your application supports multiple languages, change the `lang` value with translation.

## Multilingual pages

Occasionally, a French page might include a section of content in another language. The parser must know when to [code-switch](https://en.wikipedia.org/wiki/Code-switching). Apply another `lang` attribute, but to the element containing the embedded language:

```
<p>Je suis français!</p>
<div lang="en">
	<p>I am English.</p>
</div>
```

## The page title

HTML offers lots of ways to label elements, and not just with the `<label>` element.

The `<title>` element labels the screen itself. It’s visible in the browser tab, but also parsed by crawlers and assistive software. In a search engine result, it’s the text linking to the page. To a screen reader user, it’s announced when arriving on the page.

Give sufficient context by including both the page and application name in each `<title>`.

```jsx
<title>[name of the page] | [name of the application]</title>
```

This identifies the page among other open tabs.

## Headings

The [**Structure**](/guides/structure) guide covers using [heading levels](https://www.youtube.com/watch?v=1dHf3BO94GE) to describe document structure. 

Equally important is the wording used for each heading. Headings are labels for the content they introduce. You should not have to read the content to make sense of its heading. This is especially important given screen readers and other parsers extract headings from content to create lists of links.

Here are good and bad examples for a company’s stated use of artificial intelligence:

```
<!-- ✅ Direct; uses relevant terminology -->
<h2>Our policy on artificial intelligence</h2>
...

<!-- ❌ Vague and abstract; could be referring to anything -->
<h2>Cautiously embracing the future</h2>
...
```

## Controls

Interactive controls use their label to state _what they do_.

Buttons without visible labels, showing just icons, must be encoded with text-based labels. Apply a label to [**IconButton**](/components/IconButton) using `aria-label`:

```jsx
<IconButton aria-label="delete" disabled color="primary">
  <DeleteIcon />
</IconButton>
```

For buttons _with_ visible labels, do not give the icon a label of its own. The text label should be sufficient.


```jsx
<!-- ❌ -->
<Button endIcon={<Icon href={svgAdd} alt="plus symbol" />}>Create new</Button>

<!-- ❌ -->
<Button endIcon={<Icon href={svgAdd} alt="create new icon" />}>Create new</Button>

<!-- ✅ -->
<Button endIcon={<Icon href={svgAdd} />}>Create new</Button>
```

### Links

A link transports you to a new location. Its label should tell you where you are being taken. If the destination is a new page, consider making the link’s text part of that page’s [`<title>`](#the-page-title):

```
<!-- the link -->
<a href="https://en.wikipedia.org/wiki/Infrastructure">Infrastructure</a>

<!-- the page’s title -->
<title>Infrastructure - Wikipedia</title>
```

Since links, like [headings](#headings), are frequently aggregated into lists, avoid generic and unhelpful labels like _“read more”_ or _“click here”_.

## Forms

Individual form fields must each be associated with a label. Sets of related or interdependent form fields must be associated with a common _group label_.

In the following example, each [**Radio**](/components/radio/) is encapsulated in a `FormControlLabel`, with a `label` applied. The outer `FormControl` is a `<fieldset>` enabling a group label via the `FormLabel`’s `<legend>`.

```jsx
<FormControl render={<fieldset />} role="radiogroup">
	<FormLabel render={<legend />}>Design system:</FormLabel>
	<RadioGroup
		name="design-system"
		role={undefined}
		defaultValue="StrataKit"
	>
		<FormControlLabel
			value="StrataKit"
			control={<Radio />}
			label="StrataKit"
		/>
		<FormControlLabel value="iTwinUI" control={<Radio />} label="iTwinUI" />
	</RadioGroup>
</FormControl>
```

Programmatically, group and individual labels are combined:

* Design system: StrataKit
* Design system: iTwinUI

:::note[The undefined role]

The outer `FormControl` takes the `radiogroup` role, facilitating the group label, meaning the encapsulated `RadioGroup` must have its `radiogroup` role removed.

This **StrataKit** pattern supersedes MUI’s guidance, adding improved accessibility.

:::

### Error messages

Like labels, supplementary descriptions must be _programmatically associated_ with input fields.

```jsx
<TextField
	label="Email"
	error
	helperText={
		<>
			<span style={visuallyHidden}>Error: </span>Invalid email address
		</>
	}
/>
```

Using the [**TextField’s**](/components/textfield) `helperText` prop, this error message is associated with the input using `aria-describedby`. When the input is focused, a screen reader will announce the error description after the field’s label (“Email”), role (“input”), and state (“invalid”).

Error messages must actively [help the user to resolve the error](https://www.w3.org/WAI/WCAG21/Understanding/error-suggestion.html). If your application includes messages like _“Error 41”_, _“Incorrect format”_, or _“Please try again”_, users will not know how to proceed.

## Alternative text

Media that may not be seen must be described. Alternative text is primarily for blind and partially sighted users. But it also gives recourse to crawlers and agents, since it converts what’s seen in the image into a parsable text format.

Writing good alternative text is difficult to automate and should be part of your design and editorial process. While agents can describe detail in an image, they struggle piecing the details together to convey the image’s intent.

```jsx
<!-- ❌ Verbose and missing relevant terminology -->
<img src="/photos/worker.webp" alt="A figure, in profile, wearing a yellow hat and holding a tablet device. The sky is pale blue and there are buildings along the horizon.">

<!-- ✅ Concisely captures the scene -->
<img src="/photos/worker.webp" alt="A construction worker, on site, surveying a large project.">
```

The way the alternative text should be written depends on the role of the image in the interface. If an image is used as a [**Link**](/components/link), it must describe the link’s location. A common example is the logo-as-homepage link:

```jsx
<!-- ❌ The application is not a design case study -->
<Link href="/">
	<img src="/images/logo.svg" alt="The company logo, using green, sans-serif lettering and featuring an icon of a citrus fruit exploded into independent segments.">
</Link>

<!-- ✅ Simply names the site -->
<Link href="/">
	<img src="/images/logo.svg" alt="LimeWorld homepage">
</Link>
```

Purely decorative images and other images in some contexts can have empty alternative text (`alt=""`). [Complex images](https://www.w3.org/WAI/tutorials/images/complex/) like charts and infographics need to be accompanied by longer explanations or data tables. Consult the [alt decision tree](https://www.w3.org/WAI/tutorials/images/decision-tree/) if you are unsure.
