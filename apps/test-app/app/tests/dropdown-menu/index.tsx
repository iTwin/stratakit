/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { DropdownMenu } from "@itwin/kiwi-react/bricks";
import { definePage } from "~/~utils.tsx";

export const handle = { title: "DropdownMenu" };

export default definePage(function Page({ visual, disabled }) {
	return (
		<div style={{ minHeight: 150 }}>
			<DropdownMenu.Root open={visual ? true : undefined}>
				<DropdownMenu.Button disabled={!!disabled}>Actions</DropdownMenu.Button>

				<DropdownMenu.Content>
					<DropdownMenu.Item shortcuts={"⌘A"}>Add</DropdownMenu.Item>
					<DropdownMenu.Item shortcuts={"⇧E+⌘A"}>Edit</DropdownMenu.Item>
					<DropdownMenu.Item disabled>Delete</DropdownMenu.Item>
					<DropdownMenu.Item>Disable</DropdownMenu.Item>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</div>
	);
});
