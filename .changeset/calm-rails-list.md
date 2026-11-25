---
"@stratakit/structures": patch
---

Added `items` prop to `NavigationRail.List` component, as the recommended alternative to `children`. Each item is automatically wrapped in a `NavigationRail.ListItem`.

```tsx
<NavigationRail.List
	items={[
		<NavigationRail.Link key="home" label="Home" icon={svgHomeLarge} href="/" />,
		<NavigationRail.Link key="projects" label="Projects" icon={svgProjectLarge} href="/projects" />,
	]}
/>
```
