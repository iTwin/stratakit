---
title: Contributing
description: Help us improve these docs
---

This documentation site is a living entity, growing and improving alongside **StrataKit** itself. You may find some information missing, unclear, superfluous, or in the wrong place. That's where you can help.

Please follow the contribution instructions below. If you try to contribute via other channels or using different software, we will not be able to properly track, review, and publish your work.

## "Edit page"

At the foot of every page, you'll find a link labeled **✎ Edit page**. Press this link to an editable version of the page's content on Github. Follow these steps to make your contribution:

1. Make your changes to the markdown source. See [**Markdown help**](#markdown-help), if you are unfamiliar with the syntax.
2. Click the **Commit changes** button in the top right corner of the Github interface.
3. Fill out the **Propose changes** dialog that appears:
   1. **Commit message**: Please use a short, descriptive message. What did you change?
   2. **Extended description**: Describe your intent. Where did the need for the edit come from?
   3. **Commit email**: Use your bentley.com email if it is an option.
   4. **New branch name** Please use the format `[your username]/edit/[page title]`. Example: `heydon/edit/getting-started/` (since the page title uses multiple words, these are joined by a hyphen).
4. Click **Propose changes** at the foot of the dialog.
5. On the **Open a pull request** page that appears, double check the information you've supplied and click **Create pull request** when you're happy.
6. Your pull request will need to be approved by a member of the **StrataKit** team. You may be asked questions in the comment stream of the pull request. Remember to check your Github notifications.
7. Thank you!

## Guidance structure

Consistency supports both comprehension and navigation. Each component guide follows a common schema, described in [**Component guidance**](/components/overview/#component-guidance).

:::note[Headings]
The major sections **Use cases** through to **🚫 Don't** must each use a level 2 heading (`<h2>`). See [**Headings**](#headings) for the markdown syntax. Use `<h3>` headings to organize individual examples under the **Examples** section.
:::

## Markdown help

This site's content is written in _markdown_: a minimal formatting syntax using special characters. In fact, in this case it's a special flavour of markdown with some additional options. Here is a brief guide:

### Inline text styling

- **bold** → \*\*bold\*\*
- _italic_ → \_italic\_
- **_bold and italic_** → \*\*\_bold and italic\_\*\*
- `code` → \`code\`
- [link](https://bentley.com) → \[link\]\(https://bentley.com)

### Structural elements

#### Lists

- First list item
- Another list item
- List item number three
- The final item in the list

```md
- First list item
- Another list item
- List item number three
- The final item in the list
```

#### Headings

<h1 role="img" aria-label="An h1 heading">Heading (level 1)</h1>
<h2 role="img" aria-label="An h2 heading">Heading (level 2)</h2>
<h3 role="img" aria-label="An h3 heading">Heading (level 3)</h3>
<h4 role="img" aria-label="An h4 heading">Heading (level 4)</h4>

```md
# Heading (level 1)

## Heading (level 2)

### Heading (level 3)

#### Heading (level 4)
```

#### Tables

| Use case                                                                         | [Link](/components/link) | [Button](/components/button) |
| -------------------------------------------------------------------------------- | ------------------------ | ---------------------------- |
| Navigating between interface screens or sections                                 | ✅                       | ❌                           |
| Submitting forms, confirming or cancelling dialogs, creating or deleting content | ❌                       | ✅                           |

```md
| Use case                                                                         | [Link](/components/link) | [Button](/components/button) |
| -------------------------------------------------------------------------------- | ------------------------ | ---------------------------- |
| Navigating between interface screens or sections                                 | ✅                       | ❌                           |
| Submitting forms, confirming or cancelling dialogs, creating or deleting content | ❌                       | ✅                           |
```

### Frontmatter

At the top of each markdown file is a section starting and ending with `---` markers. This is the [frontmatter](https://starlight.astro.build/reference/frontmatter/) data for the page. This data is organized into key/value pairs. For this page, the title is set using `title: Contributing`.

For reference, here is what the [**Button**](/components/button) frontmatter looks like:

```md
---
title: Button
description: Buttons are used to initiate actions.
links:
  muiDocs: https://mui.com/material-ui/react-button/
  apiReference: https://mui.com/material-ui/api/button/
---
```

- **title:** The main heading for the page ("Button" here)
- **description:** The short description/strapline following the **title**
- **status:** The current status of the component. See [component status](/components/overview/#component-status) for the accepted values and their meanings.
- **links:** A list of key/value pairs. Use **muiDocs** to link the MUI component docs and **apiReference** to link the MUI or StrataKit API reference.

### Asides

Occasionally, something needs to be noted but it doesn't fit within the main flow of the document. You can interject notes (or "asides") using a special syntax. The **Starlight** framework, on which these docs are based, has a [guide on asides and their syntax](https://starlight.astro.build/guides/authoring-content/#asides).

Here is an example from the [**Switch**](/components/switch) page:

```md
:::note[Composition]
You must use the **Switch** in conjunction with a label. See [Usage](#usage).
:::
```

### Exercise caution

You may encounter some syntax that isn't documented above. The rule is: **if it's not documented here, don't try to use or edit it**. If some unfamiliar syntax needs to be moved inside the document, make sure you move it _in its current form, and in its entirety_. Otherwise, you are liable to cause errors.
