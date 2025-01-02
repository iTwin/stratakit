/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { DropdownMenu } from "@itwin/itwinui-react/bricks";
import { definePage } from "~/~utils.tsx";

export const handle = { title: "DropdownMenu" };

export default definePage(function Page({ visual, disabled, checkbox }) {
	return (
		<div style={{ minHeight: 150 }}>
			<DropdownMenu.Root open={visual ? true : undefined}>
				<DropdownMenu.Button disabled={!!disabled}>
					{checkbox ? "Settings" : "Actions"}
				</DropdownMenu.Button>

				{checkbox ? (
					<DropdownMenu.Content>
						<DropdownMenu.ItemCheckbox>Item 1</DropdownMenu.ItemCheckbox>
						<DropdownMenu.ItemCheckbox>Item 2</DropdownMenu.ItemCheckbox>
						<DropdownMenu.ItemCheckbox>Item 3</DropdownMenu.ItemCheckbox>
					</DropdownMenu.Content>
				) : (
					<DropdownMenu.Content>
						<DropdownMenu.Item shortcuts="⌘+A">Add</DropdownMenu.Item>
						<DropdownMenu.Item shortcuts="⇧+E">Edit</DropdownMenu.Item>
						<DropdownMenu.Item disabled>Delete</DropdownMenu.Item>
						<DropdownMenu.Item>Disable</DropdownMenu.Item>
					</DropdownMenu.Content>
				)}
			</DropdownMenu.Root>
		</div>
	);
});
