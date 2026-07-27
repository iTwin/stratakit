---
title: Tree
description: Trees are interactive hierarchies.
status: stable
links:
  apiReference: /reference/structures/Tree
---

::example{src="structures/Tree.default" min-width="300px" min-height="150px" vertical-stretch}

The **Tree** component exposes application data as a hierarchy of nested, expandable levels. **Trees** can be explored and organized in different ways. They may offer searching, filtering, and sorting functionality. 

Like the [**Accordion**](/components/accordion), the **Tree** is useful for progressively disclosing content. Unlike the **Accordion**, this content can be nested to multiple levels of depth.

| Use case                                                     | [Tree](/components/tree)                     | [Accordion](/components/accordion) | 
| ------------------------------------------------------------ | -------------------------------------------- | ---------------------------------- | 
| Progressive disclosure of content (several levels of data)   | ✅                                           | ❌                                 | 
| Progressive disclosure of content (single level of data)     | ❌                                           | ✅                                 | 
| Items include arbitrary content and functionality            | ❌                                           | ✅                                 | 
| Items include associated actions only                        | ✅                                           | ❌                                 | 

## Structure

### Components

A **Tree** constitutes three key components:

- [`Tree.Root`](/reference/structures/Tree/#Tree.Root): The container, defining a single **Tree**.
- [`Tree.Item`](/reference/structures/Tree/#Tree.Item): Items belonging directly to `Tree.Root`.
- [`Tree.ItemAction`](/reference/structures/Tree/#Tree.ItemAction): `Tree.Item` can be actionable when selected. `TreeItem.Action` defines a _supplementary_ action.

### Hierarchy

[`Tree.Item`s](/reference/structures/Tree/#Tree.Item) are supplied as children of [`Tree.Root`](/reference/structures/Tree/#Tree.Root). The components themselves are not nestable. Instead, the [`aria-level`](/reference/structures/Tree/#Tree.Item.aria-level) prop (required) describes the level of the item in the hierarchy. The [`aria-posinset`](/reference/structures/Tree/#Tree.Item.aria-posinset) and [`aria-setsize`](/reference/structures/Tree/#Tree.Item.aria-setsize) props are also required.

```jsx
<Tree.Root>
  <Tree.Item label="Parent" aria-level={1} aria-posinset={1} aria-setsize={1} />
  <Tree.Item label="Child 1" aria-level={2} aria-posinset={1} aria-setsize={2} />
  <Tree.Item label="Child 2" aria-level={2} aria-posinset={2} aria-setsize={2}  />
</Tree.Root>
```

### Supplementary actions

Unlike the [**Accordion**](/components/accordion), items cannot take arbitrary content or functionality. The `Tree.Item` component itself is self-closed. However, the `actions` and `inlineActions` props lets you insert an array of supplementary actions. 

| Prop              | Action placement                                            |
| ----------------- | ----------------------------------------------------------- |
| `actions`         | Available in a dropdown menu                                |
| `inlineActions`   | Available _inline_, outside and preceding the dropdown menu |

Each action must use a [`Tree.ItemAction`](/reference/structures/Tree/#Tree.ItemAction) component. Other components are not permitted.

```jsx
actions={[
  <Tree.ItemAction key="bring-to-front" label="Bring to front" />,
  <Tree.ItemAction key="send-to-back" label="Send to back" />
]}
```

## Interaction

[`Tree.Item`s](/reference/structures/Tree/#Tree.Item) support two _primary_ interactions:

1. Expansion
2. Selection

### Expansion

Any [`Tree.Item`](/reference/structures/Tree/#Tree.Item) can be expanded to reveal other `Tree.Item`s. If the `expanded` prop is omitted, the `Tree.Item` is considered a _leaf_. “Child 1” and “Child 2” are both _leaves_ in the following example.

```jsx
<Tree.Root>
  <Tree.Item 
    label="Parent" 
    aria-level={1} 
    aria-posinset={1} 
    aria-setsize={1} 
    expanded={isExpanded} 
    onExpandedChange={() => isExpanded = !isExpanded}
  />
  {isExpanded && (
    <Tree.Item label="Child 1" aria-level={2} aria-posinset={1} aria-setsize={2} />
    <Tree.Item label="Child 2" aria-level={2} aria-posinset={2} aria-setsize={2}  />
  )}
</Tree.Root>
```

A button to the left of each item is reserved for expanding and collapsing it. Clicking elsewhere on the item will perform [selection](#selection).

:::note[Keyboard behavior]

To support full keyboard interaction, the left and right arrow keys are reserved for collapsing and expanding items respectively. The up and down arrow keys enable moving _between_ items.

:::

### Selection 

Item selection is facilitated with [`selected`](/reference/structures/Tree/#Tree.Item.selected) and the [`onSelectedChange`](/reference/structures/Tree/#Tree.Item.onSelectedChange) callback. No specific selection behavior is supported out of the box, since product needs diverge.

#### Single selection

One approach is to make items behave like radio buttons, wherein only one can be selected at a time.

::example{src="structures/Tree.select-one" min-width="300px" min-height="150px" vertical-stretch}

#### Cumulative selection

If desired, each [`Tree.Item`](/reference/structures/Tree/#Tree.Item) can act independently, as a simple toggle button. This means they can be selected cumulatively.

In the following example, “Item 1” and “Item 1.2” are selected from the outset. The “Select all” and “Deselect all” buttons cover bulk actions. These are disabled when not applicable.

::example{src="structures/Tree.select-many" min-width="300px" min-height="150px" vertical-stretch}

:::note[The `aria-multiselectable` attribute]

Selecting an item applies `aria-selected="true"`. Where it's possible to select multiple items, you must apply `aria-multiselectable="true"` to `Tree.Root`.

```jsx
<Tree.Root className={styles.tree} aria-multiselectable="true">
  ...
</Tree.Root>
```

:::

## ✅ Do

- Do use **Tree** to let users explore multi-tiered data.
- Do create expandable items that reveal nested items.
- Do supply supplementary actions via the `actions` and `inlineActions` props.
- Do prioritize actions by adding them via `inlineActions`. 
- Do implement a selection behavior suited to your users.
- Do use an `aria-level` value that reflects the level of the item in the hierarchy. 

## ❌ Don't

- Don't make expandable items reveal items of the same `aria-level`. They must be the parent's level plus `1`.
- Don't try to place `Tree.Item`s inside `Tree.Item`s. Each `Tree.Item` is a sibling under a `Tree.Root` parent.
- Don't put any components besides [`Tree.ItemAction`](/reference/structures/Tree/#Tree.ItemAction) in [`Tree.Item`'s](/reference/structures/Tree/#Tree.Item) `action`.
- Don't override the keyboard behaviors supplied.
