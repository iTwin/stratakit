# CSS conventions

## Layers

StrataKit includes two ordered top-level layers:

<dl>
  <dt><code>reset</code></dt>
  <dd>This is where all of the global resets live.</dd>

  <dt><code>stratakit</code></dt>
  <dd>This layer includes two sub-layers: <code>foundations</code> and <code>components</code>.</dd>
</dl>

## Custom properties

StrataKit uses naming conventions for its custom properties to indicate how the properties are meant to be used.

| Prefix         | Purpose                                                                                                      | When to use                                                                                                                                                                        |
| -------------- | ------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--stratakit-` | Public. Requires documentation for consumers and must respect semantic versioning.                           | Use these when it is beneficial to expose a custom property for consumers to use.                                                                                                  |
| `--🥝`         | Internal for a component and its extensions. These can be modified in all `stratakit.components` sub-layers. | Use these for internal properties that need to be dynamic at runtime (e.g. a modifier or state might change them).                                                                 |
| `--✨`         | Static variables that are subject to being compiled away. These should never change.                         | Use these when you have values you want to name, make visible, or use in multiple places (e.g. defining at the start of a ruleset), but do not need to remain dynamic at run time. |
| `--🌀`         | Cyclic toggles.                                                                                              | These are useful for switching between different values based on state changes.                                                                                                    |

### Avoid using custom properties in shorthand properties

Since we use constructed stylesheets, we cannot use custom properties in shorthand properties due to a limitation of how CSS serializes in the browser.

## Order of declaration

In a file, organize static properties at the beginning of the top-most selector.

Include component-level resets ahead of all other styles and wrap the element being reset with `:where()` to avoid increased specificity.

When there are many properties, try to group related ones. List significant properties first (e.g. `font-size` and `display` have a significant effect on other properties and values). Consider if a property affects the element itself or if it has more to do with how an element relates to its siblings or parent (e.g. several flex and grid properties concern how an element participates in the parent’s layout).

## Components

The naming pattern for a component selector is `.🥝-{component}`.

Component rulesets should be declared in the `stratakit.components` layer. These should be divided into three further layers: `base`, `modifiers`, and `states`.

### The `base` layer

This layer should include the base styles for the component itself, and any nested elements or pseudo-elements.

`base.🌀`

Use this layer to set up cyclic toggles. We do this so that we can both cascade this set up earlier and so that we can declare it later in a stylesheet to avoid overloading the reader.

### The `modifiers` layer

This layer is for component variants. These typically use `data-kiwi-` attributes.

### The `states` layer

Use this layer to set the current state of a cyclic toggle. It can also include one-off properties for where there isn’t a property for every state.

### Component extensions

If a component is extending another component, it should use a compound selector: `.🥝-{extension}:is(.🥝-{component})`. This allows us to:

1. Avoid duplicating styles.
2. Continue using the base component’s layers with increased specificity to override their declarations.

## Color mix

To reduce the number of distinct tokens needed to represent all the component states, StrataKit often relies on the CSS [`color-mix()`](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/color-mix) function for producing the colors for "hover" and "pressed" states.

First, let's look at how a _hover state background_ might be represented in Figma. It shows two colors: the first one is just our base color, while the second one is what gets mixed with the base color. The second color needs to be translated into two different CSS variables (as described later).

![IMAGE]()

Here's how this same color would be represented in CSS:

```css
background-color: color-mix(
	in oklch,
	var(--stratakit-color-bg-neutral-base) 100%,
	var(--stratakit-color-glow-hue) var(--stratakit-color-bg-glow-base-hover-\%)
);
```

More commonly, you might define these as static variables at the top of the file (to be later used with cyclic toggles).

```css
--✨bg--solid-default: var(--stratakit-color-bg-neutral-base);
--✨bg--solid-hover: color-mix(
	in oklch,
	var(--✨bg--solid-default) 100%,
	var(--stratakit-color-glow-hue) var(--stratakit-color-bg-glow-base-hover-\%)
);
--✨bg--solid-pressed: color-mix(
	in oklch,
	var(--✨bg--solid-default) 100%,
	var(--stratakit-color-glow-hue) var(--stratakit-color-bg-glow-base-pressed-\%)
);
```

Here, we are defining three static variables, where the latter two are derived from the first one using `color-mix`.

Some key points to remember:

- Always mix in the `oklch` color space.
- Always mix the base color at `100%`.
- Always use `--stratakit-color-glow-hue` for the second color. This will resolve to "white" or "black", depending on the color scheme.
- Pay attention to the `%` token used at the end (e.g. `--stratakit-color-bg-glow-base-hover-\%`). This maps closely to the corresponding tokens in Figma.

## Cyclic toggles

[Cyclic toggles](https://kizu.dev/cyclic-toggles/) are a technique that allow us to use a pattern matching-like syntax for setting properties which helps collocate properties with similar concerns. Instead of needing to look between multiple places in a stylesheet to understand the combination of properties, we just use our selectors to set the state of a toggle and then write all of the rules for our regular properties together.

### How to create a cyclic toggle

Cyclic toggles require an initial set up where we declare the main property with the default state. Then we list out the possible states assigned to that main property with an empty (but present) fallback. We do this in a sublayer within `base` so that we can move this code to the bottom of the component’s stylesheet.

```css
@layer base.🌀 {
	--🌀component-state: var(--🌀component-state--default);

	--🌀component-state--default: var(--🌀component-state,);
	--🌀component-state--hover: var(--🌀component-state,);
	--🌀component-state--disabled: var(--🌀component-state,);
}
```

Now in the `states` layer, we can set the state based on selector.

```css
@layer states {
	@media (any-hover: hover) {
		&:hover {
			--🌀component-state: var(--🌀component-state--hover);
		}
	}
}
```

Now in the `base` or the `modifiers` layer we need to assign a property that might change based on state:

```css
@layer base {
	background: var(--🌀component-state--default, Transparent)
		var(--🌀component-state--hover, DeepPink)
		var(--🌀component-state--disabled, LightGoldenrodYellow);
}
```
