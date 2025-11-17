---
"@stratakit/structures": patch
---

Added a new `unstable_NavigationList` component that displays a vertical list of links for secondary navigation.

Includes the following subcomponents:

- `<NavigationList.Root>`
- `<NavigationList.Anchor>`
- `<NavigationList.Subgroup>`

```tsx
<NavigationList.Root
	items={[
		<NavigationList.Anchor key={1} href="/page1" label="Page 1" />,
		<NavigationList.Anchor key={2} href="/page2" label="Page 2" />,
		<NavigationList.Subgroup
			key={3}
			label="Group of pages"
			items={[
				<NavigationList.Anchor key={1} href="/page3-1" label="Sub-page 1" active />,
				<NavigationList.Anchor key={2} href="/page3-2" label="Sub-page 2" />,
			]}
		/>,
	]}
/>
```
