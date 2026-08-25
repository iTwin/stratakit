---
title: ErrorRegion
description: Error regions collate errors generated from an interactive dataset.
status: unstable
links:
  apiReference: /reference/structures/ErrorRegion
---

::example{src="structures/ErrorRegion.default" min-height="250px" min-width="450px" vertical-stretch}

During the exploration and operation of a layers panel (typically rendered as a [**Tree**](/components/tree)), errors may occasionally be incurred. For example, the application may fail to fetch the data needed to render a subtree of layers.

The **ErrorRegion** records errors in one place, to be addressed at the user's convenience. As errors are accumulated, operation can continue unhindered.

## Use cases

The **ErrorRegion** is not a generic component for alerting users to application state. It collates errors accumulated from an interactive dataset, such as a layers panel rendered using a [**Tree**](/components/tree). Consult the table below to compare **ErrorRegion** with alternatives.

| Use case                                                                 | [ErrorRegion](/components/errorregion)       | [Alert](/components/alert)         | [Accordion](/components/accordion) |
| ------------------------------------------------------------------------ | -------------------------------------------- | ---------------------------------- | ---------------------------------- |
| Collating errors                                                         | ✅                                           | ❌                                  | ❌                                |
| Alerting users of application state (errors, warnings, success messages) | ❌                                           | ✅                                  | ❌                                |
| Collating arbitrary content for future disclosure                        | ❌                                           | ❌                                  | ✅                                |


## Structure

- **[`ErrorRegion.Root`](https://stratakit.bentley.com/docs/reference/structures/ErrorRegion/#ErrorRegion.Root)**: The component itself takes [`role="region"`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/region_role), making it discoverable in screen reader software. When there are errors present, the **ErrorRegion** renders a toggle `<button>`, using [`aria-expanded`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-expanded), with the region's [`label`](https://stratakit.bentley.com/docs/reference/structures/ErrorRegion/#ErrorRegion.Root.label).
    - **[`ErrorRegion.Item`](https://stratakit.bentley.com/docs/reference/structures/ErrorRegion/#ErrorRegion.Item)**: `ErrorRegion.Root`'s [`items`](https://stratakit.bentley.com/docs/reference/structures/ErrorRegion/#ErrorRegion.Root.items) prop takes a mapped array of `Error.Items`, each representing a discrete error and together rendered as a list. `ErrorItem`'s [`message`](https://stratakit.bentley.com/docs/reference/structures/ErrorRegion/#ErrorRegion.Item.message) prop can take any JSX.
        - **[`actions`](https://stratakit.bentley.com/docs/reference/structures/ErrorRegion/#ErrorRegion.Item.actions)**: The `ErrorRegion`'s `actions` prop places functionality at the foot of the `ErrorRegion.Item`. Use `actions` to include functionality that addresses the error.

:::caution[The region label]

The **ErrorRegion**'s visible label is typically used to itemize the errors, with a value like _“3 issues present”_.

In addition, the outer `role="region"` element itself must be identified to screen reader software. Alongside `label`, apply an [`aria-label`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-label) with the value _“Layer errors”_ or similar. The region itself is discoverable by screen reader software even when no errors are present and the region is not visible.

:::

## Interaction

The behavior of the **ErrorRegion** and the relationship between [`Tree.Item`s](https://stratakit.bentley.com/docs/reference/structures/Tree/#Tree.Item) and `Error.Item`s can differ somewhat according to your application needs. The following describes the out-of-the-box behavior alongside recommended provisions.

### Within the Tree

When an error occurs:

1. Apply [`error`](https://stratakit.bentley.com/docs/reference/structures/Tree/#Tree.Item.error) to the `Tree.Item` in question.
2. Update the `ErrorRegion.Root`'s `label` to reflect the change. For example, if there was already one error present in the tree, use a label like _“2 errors found”_. This updated label will be announced in screen reader software.
3. Repopulate `ErrorRegion.Root`'s `items` to include the new `ErrorItem`.
4. **Recommended**: Append an [action](https://stratakit.bentley.com/docs/reference/structures/Tree/#Tree.Item.actions) to `actions` for addressing the error within the `Tree.Item` itself. 

:::caution[Focus management]

Do not send keyboard focus to the **ErrorRegion** when an error is occurs. Users must remain at their current location in the [**Tree**](/components/tree).

:::

### Within the ErrorRegion

When the user visits the **ErrorRegion**:

1. Clicking the `ErrorRegion`'s `<button>` toggles the visibility of the `Error.Item`s.
2. **Recommended**: The [`message`](https://stratakit.bentley.com/docs/reference/structures/ErrorRegion/#ErrorRegion.Item.message) for each `Error.Item` includes a link to the corresponding `Tree.Item`, using the `Tree.Item`'s [`label`](https://stratakit.bentley.com/docs/reference/structures/Tree/#Tree.Item.label) as the link text. Point the link to the `Tree.Item`'s `id`.
3. **Recommended**: The `Tree.Item`'s `actions` includes a control that addresses—or can attempt to address—the error. For example, where data failed to be fetched, supply a “Retry” button.
4. Where an `error` is successfully addressed, the `Error.Item` is removed. If the user was focused within the `Error.Item` when this happened, focus must be redirected to one of two places:
   - To the **ErrorRegion**'s toggle button, secreting the list of `Error.Item`s
   - To the `Tree.Item` whose `error` was just corrected

## ✅ Do

- Use **ErrorRegion** to collate and describe [**Tree**](/components/tree) errors.
- Supply both a `label` and `aria-label` to `ErrorRegion.Root` for summarizing the errors and identifying the **ErrorRegion** respectively.
- Update the `label` whenever errors (`Error.Item`s) are added or removed.

## ❌ Don't

- Don't use **ErrorRegion** for form errors or generic status messages.
- Don't steal focus and direct it to the **ErrorRegion** when an error occurs.
