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
| Hierarchy can branch and isn't necessarily linear            | ✅                                           | ❌                                 | 
| Expandable content includes arbitrary functionality          | ❌                                           | ✅                                 | 
| Expandable content includes supplementary actions            | ✅                                           | ❌                                 | 

## Structure

### Components

A **Tree** constitutes three key components:

- [`Tree.Root`](/reference/structures/Tree/#Tree.Root): The container, defining a single **Tree**.
- [`Tree.Item`](/reference/structures/Tree/#Tree.Item): Items belonging directly to `Tree.Root`.
- [`Tree.ItemAction`](/reference/structures/Tree/#Tree.ItemAction): `Tree.Item` can be actionable when selected. `TreeItem.Action` defines a _supplementary_ action.

### Hierarchy

[`Tree.Item`s](/reference/structures/Tree/#Tree.Item) are supplied as children of [`Tree.Root`](/reference/structures/Tree/#Tree.Root). The components themselves are not nestable. Instead, the `aria-level` prop (required) describes the level of the item in the hierarchy. The [`aria-posinset`](/reference/structures/Tree/#Tree.Item.aria-posinset) and [`aria-setsize`](/reference/structures/Tree/#Tree.Item.aria-setsize) props are also required.

```jsx
<Tree.Root>
  <Tree.Item label="Parent" aria-level={1} aria-posinset={1} aria-setsize={1} />
  <Tree.Item label="Child 1" aria-level={2} aria-posinset={1} aria-setsize={2} />
  <Tree.Item label="Child 2" aria-level={2} aria-posinset={2} aria-setsize={2}  />
</Tree.Root>
```

### Supplementary actions

Unlike the [**Accordion**](/components/accordion), items cannot take arbitrary content or functionality. The `Tree.Item` component itself is self-closed. However, the `actions` prop lets you insert an array of supplementary actions. Each must be a [`Tree.ItemAction`](/reference/structures/Tree/#Tree.ItemAction) component.

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

Any [`Tree.Item`](/reference/structures/Tree/#Tree.Item) can be expanded to reveal other `Tree.Item`s. If the `expandable` prop is omitted, the `Tree.Item` is considered a _leaf_. “Child 1” and “Child 2” are both leaves in the following example.

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

A button to the left of each item is reserved for expanding and collapsing it. Clicking elsewhere on the item will perform selection.

:::note[Keyboard behavior]

To support full keyboard interaction, the left and right arrow keys are reserved collapsing and expanding items respectively. The up and down arrows keys enable moving _between_ items.

:::

### Selection 

Item selection is facilitated with [`selected`](/reference/structures/Tree/#Tree.Item.selected) and the [`onSelectedChange`](/reference/structures/Tree/#Tree.Item.onSelectedChange) callback. No specific selection behavior is supported out of the box, since product needs diverge.

If desired, each [`Tree.Item`](/reference/structures/Tree/#Tree.Item) can act independently, as a simple toggle button:

::example{src="structures/Tree.selectable" min-width="300px" min-height="150px" vertical-stretch}

```jsx
<Tree.Item 
  label="Parent" 
  id={id}
  selected={isSelected} 
  onSelectedChange={() => isSelected = !isSelected}
/>
```

Alternatively, you can use some state to make items behave more like radio buttons, wherein only one item can be selected at a time:

```jsx
<Tree.Item 
  label="Parent" 
  id={id}
  selected={isSelected} 
  onSelectedChange={() => {
    if (selected === item.id) {
      setSelected(undefined);
      return;
    }
    setSelected(item.id);
  }}
/>
```

## ✅ Do

- Do use **Tree** to let users explore multi-tiered data.
- Do create expandable items that reveal nested items.
- Do supply supplementary actions via the `actions` prop.
- Do implement a selection behavior suited to your users.
- Do use an `aria-level` value that reflects the level of the item in the hierarchy. 

## ❌ Don't

- Don't make expandable items reveal items of the same `aria-level`. They must be the parent's level plus `1`.
- Don't try to place ite `Tree.ItemAction`s inside `Tree.ItemAction`s.
- Don't put any components besides [`Tree.ItemAction`](/reference/structures/Tree/#Tree.ItemAction) in [`Tree.Item`'s](/reference/structures/Tree/#Tree.Item) `action`.
- Don't override the keyboard behaviors supplied.
