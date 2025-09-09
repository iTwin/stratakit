---
"@stratakit/structures": patch
---

Added `submenu` prop to `DropdownMenu.Item` component and a `DropdownMenu.Submenu` component to support nested dropdown menus.

```tsx
<DropdownMenu.Provider>
	<DropdownMenu.Button>Actions</DropdownMenu.Button>

	<DropdownMenu.Content>
		<DropdownMenu.Item label="Add" />
		<DropdownMenu.Item label="Edit" />
		<DropdownMenu.Item
			label="More"
			submenu={
				<DropdownMenu.Submenu>
					<DropdownMenu.Item label="Delete" />
					<DropdownMenu.Item label="Disable" />
				</DropdownMenu.Submenu>
			}
		/>
	</DropdownMenu.Content>
</DropdownMenu.Provider>
```
