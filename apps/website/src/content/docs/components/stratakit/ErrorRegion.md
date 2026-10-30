---
title: ErrorRegion
description: Error regions collate errors generated from an interactive dataset.
status: unstable
links:
  apiReference: "#api-reference"
---

::example{src="structures/ErrorRegion.default" min-height="250px" min-width="450px" vertical-stretch}

During the exploration and operation of a layers panel (typically rendered as a [**Tree**](/components/tree)), errors may occasionally be incurred. For example, the application may fail to fetch the data needed to render a subtree of layers.

The **ErrorRegion** records errors in one place, to be addressed at the user's convenience. As errors are accumulated, operation can continue unhindered.

## Use cases

The **ErrorRegion** is not a generic component for alerting users to application state. It collates errors accumulated from an interactive dataset, such as a layers panel rendered using a [**Tree**](/components/tree). Consult the table below to compare **ErrorRegion** with alternatives.

| Use case                                                                 | [ErrorRegion](/components/errorregion) | [Snackbar](/components/snackbar) | [Accordion](/components/accordion) |
| ------------------------------------------------------------------------ | -------------------------------------- | -------------------------------- | ---------------------------------- |
| Collating errors                                                         | ✅                                     | ❌                               | ❌                                 |
| Alerting users of application state (errors, warnings, success messages) | ❌                                     | ✅                               | ❌                                 |
| Collating arbitrary content for future disclosure                        | ❌                                     | ❌                               | ✅                                 |

## Structure

### Components

An **ErrorRegion** constitutes two key components:

- **[`ErrorRegion.Root`](/reference/structures/ErrorRegion/#ErrorRegion.Root)**: The [region landmark](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/region_role) that contains the errors.
- **[`ErrorRegion.Item`](/reference/structures/ErrorRegion/#ErrorRegion.Item)**: Represents a discrete error within the **ErrorRegion**.

### Errors

`ErrorRegion.Item`'s are supplied via the [`items`](/reference/structures/ErrorRegion/#ErrorRegion.Root.items) prop of `ErrorRegion.Root`. Each item in the array represents a discrete error and together they form a list of errors within the **ErrorRegion**. `ErrorRegion.Item`'s [`message`](/reference/structures/ErrorRegion/#ErrorRegion.Item.message) prop can take any JSX.

```jsx
items={[
  <ErrorRegion.Item
    message={<>Failed to create hierarchy</>}
  />
]}
```

The [`actions`](/reference/structures/ErrorRegion/#ErrorRegion.Item.actions) prop places functionality intended to address the error at the foot of the `ErrorRegion.Item`. Each action must be a button displayed as a [**Link**](/components/link).

```jsx
actions={
  <Link render={<button />}>Retry</Link>
}
```

## Interaction

The behavior of the **ErrorRegion** and the relationship between `ErrorRegion.Item`s and related UI elements can differ somewhat according to your application needs. The following describes the out-of-the-box behavior alongside recommended provisions.

### Identification

The **ErrorRegion**'s visible [`label`](/reference/structures/ErrorRegion/#ErrorRegion.Root.label) is typically used to itemize the errors, with a value like _“3 issues present”_.

In addition, the [region landmark](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/region_role) must be identified to screen reader software using a stable label. Apply an [`aria-label`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-label) with the value _“Layer errors”_ or similar. The region itself is discoverable by screen reader software even when no errors are present and the region is not visible.

```tsx
<ErrorRegion.Root aria-label="Layer errors" label={`${issues.length} issues found`} />
```

### Visibility

Use the [`items`](/reference/structures/ErrorRegion/#ErrorRegion.Root.items) prop to control the visibility of the **ErrorRegion**. Avoid conditionally rendering the **ErrorRegion** to ensure that the [live region](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Guides/Live_regions) announces changes to the [`label`](/reference/structures/ErrorRegion/#ErrorRegion.Root.label) prop.

```tsx
// ❌
hasErrors ? <ErrorRegion.Root items={[<ErrorRegion.Item />]} /> : null;

// ✅
<ErrorRegion.Root items={hasErrors ? [<ErrorRegion.Item />] : undefined} />;
```

### Disclosure

The **ErrorRegion** is initially collapsed, showing only a toggle `<button>` to expand and reveal the list of `ErrorRegion.Item`s.
Alternatively, use the [`open`](/reference/structures/ErrorRegion/#ErrorRegion.Root.open) and [`setOpen`](/reference/structures/ErrorRegion/#ErrorRegion.Root.setOpen) props to control the disclosure state.

```tsx
const [open, setOpen] = React.useState(false);

<ErrorRegion.Root open={open} setOpen={setOpen} />;
```

### Error association

Use the [`messageId`](/reference/structures/ErrorRegion/#ErrorRegion.Item.messageId) prop of `ErrorRegion.Item` to semantically associate the error message with the related UI element, such as `Tree.Item`. The specified `messageId` is applied as the [`id`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/id) attribute to the node that displays the error, enabling referencing via attributes like [`aria-describedby`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-describedby). When used with the `Tree.Item`, the [`error`](/reference/structures/Tree/#Tree.Item.error) prop should reference the `messageId`.

```tsx "load-error"
<ErrorRegion.Item messageId="load-error" />

<Tree.Item error="load-error" />
```

To ensure bidirectional association with the `ErrorRegion.Item`, reference the related UI element in the `message` of `ErrorRegion.Item`.

```tsx "imodels"
<ErrorRegion.Item
	message={
		<>
			<span>Failed to create hierarchy</span>
			<Anchor href="#imodels">iModels</Anchor>
		</>
	}
/>

<Tree.Item id="imodels" />
```

:::caution[Unique IDs]
Ensure that the `id` attributes are unique in the entire document. Additionally, `id` attributes should be stable between page reloads when linking them via the [URI fragment](https://developer.mozilla.org/en-US/docs/Web/URI/Reference/Fragment).
:::

### Within the Tree

When an error occurs:

1. Apply [`error`](/reference/structures/Tree/#Tree.Item.error) to the `Tree.Item` in question.
2. Update the `ErrorRegion.Root`'s `label` to reflect the change. For example, if there was already one error present in the tree, use a label like _“2 errors found”_. This updated label will be announced in screen reader software.
3. Repopulate `ErrorRegion.Root`'s `items` to include the new `ErrorItem`.
4. **Recommended**: Append an [action](/reference/structures/Tree/#Tree.Item.actions) to `actions` for addressing the error within the `Tree.Item` itself.

:::caution[Focus management]

Do not send keyboard focus to the **ErrorRegion** when an error is occurs. Users must remain at their current location in the [**Tree**](/components/tree).

:::

### Within the ErrorRegion

When the user visits the **ErrorRegion**:

1. Clicking the `ErrorRegion`'s `<button>` toggles the visibility of the `ErrorRegion.Item`s.
2. **Recommended**: The [`message`](/reference/structures/ErrorRegion/#ErrorRegion.Item.message) for each `ErrorRegion.Item` includes a link to the corresponding `Tree.Item`, using the `Tree.Item`'s [`label`](/reference/structures/Tree/#Tree.Item.label) as the link text. Point the link to the `Tree.Item`'s `id`.
3. **Recommended**: The `Tree.Item`'s `actions` includes a control that addresses—or can attempt to address—the error. For example, where data failed to be fetched, supply a “Retry” button.
4. Where an `error` is successfully addressed, the `ErrorRegion.Item` is removed. If the user was focused within the `ErrorRegion.Item` when this happened, focus must be redirected to one of two places:
   - To the **ErrorRegion**'s toggle button, secreting the list of `ErrorRegion.Item`s
   - To the `Tree.Item` whose `error` was just corrected

## Examples

### Tree errors

Collocate errors raised from a `Tree` component in an **ErrorRegion**. In the example below, the behavior described in [within the Tree](#within-the-tree) and [within the ErrorRegion](#within-the-errorregion) is demonstrated.

::example{src="structures/ErrorRegion.tree" min-height="250px" min-width="450px" vertical-stretch}

## ✅ Do

- Use **ErrorRegion** to collate and describe [**Tree**](/components/tree) errors.
- Supply both a `label` and `aria-label` to `ErrorRegion.Root` for summarizing the errors and identifying the **ErrorRegion** respectively.
- Update the `label` whenever errors (`ErrorRegion.Item`s) are added or removed.

## ❌ Don't

- Don't use **ErrorRegion** for form errors or generic status messages.
- Don't steal focus and direct it to the **ErrorRegion** when an error occurs.

## API reference

- [`ErrorRegion.Root`](/reference/structures/ErrorRegion/#ErrorRegion.Root)
- [`ErrorRegion.Item`](/reference/structures/ErrorRegion/#ErrorRegion.Item)
- [`Tree.Item`](/reference/structures/Tree/#Tree.Item)
