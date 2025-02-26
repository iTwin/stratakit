/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { DropdownMenu } from "@itwin/itwinui-react/bricks";
import { type VariantProps, definePage } from "~/~utils.tsx";

export const demoVariants = {
	Default: "",
	Visual: "?visual",
	Disabled: "?disabled",
	Checkbox: "?checkbox",
	CheckboxDefaultChecked: "?checkbox&defaultChecked",
};

export const handle = { title: "DropdownMenu" };

export default definePage(
	function Page({ visual, disabled }) {
		return (
			<div style={{ minHeight: 150 }}>
				<DropdownMenu.Root open={visual ? true : undefined}>
					<DropdownMenu.Button disabled={!!disabled}>
						Actions
					</DropdownMenu.Button>

					<DropdownMenu.Content>
						<DropdownMenu.Item shortcuts="⌘+A">Add</DropdownMenu.Item>
						<DropdownMenu.Item shortcuts="⇧+E">Edit</DropdownMenu.Item>
						<DropdownMenu.Item disabled>Delete</DropdownMenu.Item>
						<DropdownMenu.Item>Disable</DropdownMenu.Item>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			</div>
		);
	},
	{
		checkbox: CheckboxTest,
	},
);

function CheckboxTest({ defaultChecked: defaultCheckedParam }: VariantProps) {
	const defaultChecked = defaultCheckedParam ? true : undefined;
	return (
		<div style={{ minHeight: 150 }}>
			<DropdownMenu.Root>
				<DropdownMenu.Button>Settings</DropdownMenu.Button>

				<DropdownMenu.Content>
					<DropdownMenu.CheckboxItem name="item1">
						Item 1
					</DropdownMenu.CheckboxItem>
					<DropdownMenu.CheckboxItem name="item2">
						Item 2
					</DropdownMenu.CheckboxItem>
					<DropdownMenu.CheckboxItem
						name="item3"
						defaultChecked={defaultChecked}
					>
						Item 3
					</DropdownMenu.CheckboxItem>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</div>
	);
}
