---
"@stratakit/structures": patch
---

Added new `DropdownMenu.SubmenuItem` component that can be used to display a menu item that contains a nested submenu.

```tsx
<DropdownMenu.Provider>
	<DropdownMenu.Button>Actions</DropdownMenu.Button>

	<DropdownMenu.Content>
		<DropdownMenu.Item label="Add" />
		<DropdownMenu.Item label="Edit" />
		<DropdownMenu.SubmenuItem
			label="More"
			menu={
				<DropdownMenu.Content>
					<DropdownMenu.Item label="Delete" />
					<DropdownMenu.Item label="Disable" />
				</DropdownMenu.Content>
			}
		/>
	</DropdownMenu.Content>
</DropdownMenu.Provider>
```
