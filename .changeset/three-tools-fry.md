---
"@stratakit/structures": patch
---

Added `DropdownMenu.Group` component used to group menu items within a dropdown menu.

```tsx
<DropdownMenu.Provider>
	<DropdownMenu.Button>Actions</DropdownMenu.Button>

	<DropdownMenu.Content>
		<DropdownMenu.Item label="View" />
		<DropdownMenu.Group label="Manage">
			<DropdownMenu.Item label="Add" />
			<DropdownMenu.Item label="Edit" />
		</DropdownMenu.Group>
	</DropdownMenu.Content>
</DropdownMenu.Provider>
```
