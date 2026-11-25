---
"@stratakit/structures": patch
---

Added `items` prop to `NavigationRail.List` component, as an alternative to `children`. Each item is automatically wrapped in a `NavigationRail.ListItem`.

```tsx
<NavigationRail.List
	items={[
		<NavigationRail.Anchor key="home" label="Home" icon={homeIcon} href="/" />,
		<NavigationRail.Anchor key="projects" label="Projects" icon={projectsIcon} href="/projects" />,
	]}
/>
```
