import { DropdownMenu } from "@stratakit/structures";

export default () => {
	return (
		<DropdownMenu.Provider>
			<DropdownMenu.Button>Actions</DropdownMenu.Button>
			<DropdownMenu.Content>
				<DropdownMenu.Item shortcuts="Command+N" label="New" />
				<DropdownMenu.Item shortcuts="Command+O" label="Open" />
				<DropdownMenu.Item shortcuts="Command+S" label="Save" />
			</DropdownMenu.Content>
		</DropdownMenu.Provider>
	);
};
