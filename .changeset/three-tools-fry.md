---
"@stratakit/structures": patch
---

Added `DropdownMenu.Group` component used to group menu items within a dropdown menu.

```tsx
<DropdownMenu.Provider>
	<DropdownMenu.Button>Actions</DropdownMenu.Button>

	<DropdownMenu.Content>
		<DropdownMenu.Item label="View" />
		<DropdownMenu.Group
			label="Manage"
			items={[
				<DropdownMenu.Item key="add" label="Add" />,
				<DropdownMenu.Item key="edit" label="Edit" />,
			]}
		/>
	</DropdownMenu.Content>
</DropdownMenu.Provider>
```
