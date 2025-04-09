/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import placeholderIcon from "@itwin/itwinui-icons/placeholder.svg";
import { DropdownMenu } from "@itwin/itwinui-react/bricks";
import { definePage } from "~/~utils.tsx";

import type { VariantProps } from "~/~utils.tsx";

export const handle = { title: "DropdownMenu" };

export default definePage(
	function Page({ disabled }) {
		return (
			<DropdownMenu.Root>
				<DropdownMenu.Button disabled={!!disabled}>Actions</DropdownMenu.Button>

				<DropdownMenu.Content>
					<DropdownMenu.Item shortcuts="Command+A" label="Add" />
					<DropdownMenu.Item shortcuts="Shift+E" label="Edit" />
					<DropdownMenu.Item disabled label="Delete" />
					<DropdownMenu.Item label="Disable" />
					<DropdownMenu.Item
						label="Filter"
						unstable_dot="Some filters applied"
					/>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		);
	},
	{
		checkbox: CheckboxTest,
		visual: VisualTest,
	},
);

function CheckboxTest({ defaultChecked: defaultCheckedParam }: VariantProps) {
	const defaultChecked = defaultCheckedParam ? true : undefined;
	return (
		<div style={{ minHeight: 150 }}>
			<DropdownMenu.Root>
				<DropdownMenu.Button>Settings</DropdownMenu.Button>

				<DropdownMenu.Content>
					<DropdownMenu.CheckboxItem name="item1" label="Item 1" />
					<DropdownMenu.CheckboxItem name="item2" label="Item 2" />
					<DropdownMenu.CheckboxItem
						name="item3"
						label="Item 3"
						defaultChecked={defaultChecked}
					/>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</div>
	);
}

function VisualTest({ disabled }: VariantProps) {
	return (
		<div style={{ minHeight: 200 }}>
			<DropdownMenu.Root defaultOpen>
				<DropdownMenu.Button disabled={!!disabled}>Actions</DropdownMenu.Button>

				<DropdownMenu.Content>
					<DropdownMenu.Item
						shortcuts="Command+A"
						label="Add"
						icon={placeholderIcon}
					/>
					<DropdownMenu.Item
						shortcuts="Shift+E"
						label="Edit"
						icon={placeholderIcon}
					/>
					<DropdownMenu.Item disabled label="Delete" icon={placeholderIcon} />
					<DropdownMenu.Item label="Disable" icon={placeholderIcon} />
					<DropdownMenu.Item
						label="Filter"
						unstable_dot="Some filters applied"
					/>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</div>
	);
}
