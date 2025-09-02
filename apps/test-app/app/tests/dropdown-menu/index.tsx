/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { DropdownMenu } from "@stratakit/structures";
import { definePage } from "~/~utils.tsx";

import type { VariantProps } from "~/~utils.tsx";

import placeholderIcon from "@stratakit/icons/placeholder.svg";

export const handle = { title: "DropdownMenu" };

export default definePage(
	function Page({ disabled }) {
		return (
			<DropdownMenu.Provider>
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
					<DropdownMenu.SubmenuItem
						label="More"
						menu={
							<DropdownMenu.Content>
								<DropdownMenu.Item shortcuts="Command+C" label="Clone" />
								<DropdownMenu.Item disabled label="Archive" />
								<DropdownMenu.Item label="Export" />
								<DropdownMenu.Item
									label="Import"
									unstable_dot="Some filters applied"
								/>
							</DropdownMenu.Content>
						}
					/>
				</DropdownMenu.Content>
			</DropdownMenu.Provider>
		);
	},
	{
		visual: VisualTest,
		checkbox: CheckboxTest,
		submenu: SubmenuTest,
	},
);

function VisualTest({ disabled }: VariantProps) {
	return (
		<div style={{ minHeight: 200 }}>
			<DropdownMenu.Provider defaultOpen>
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
			</DropdownMenu.Provider>
		</div>
	);
}

function CheckboxTest({ defaultChecked: defaultCheckedParam }: VariantProps) {
	const defaultChecked = defaultCheckedParam ? true : undefined;
	return (
		<div style={{ minHeight: 150 }}>
			<DropdownMenu.Provider>
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
			</DropdownMenu.Provider>
		</div>
	);
}

function SubmenuTest({ defaultOpen }: VariantProps) {
	return (
		<DropdownMenu.Provider defaultOpen={!!defaultOpen}>
			<DropdownMenu.Button>Actions</DropdownMenu.Button>

			<DropdownMenu.Content>
				<DropdownMenu.Item label="Item 1" />
				<DropdownMenu.Item label="Item 2" />
				<DropdownMenu.SubmenuItem
					label="Item 3"
					menu={
						<DropdownMenu.Provider defaultOpen={!!defaultOpen}>
							<DropdownMenu.Content>
								<DropdownMenu.Item label="Item 3_1" />
								<DropdownMenu.SubmenuItem
									label="Item 3_2"
									menu={
										<DropdownMenu.Content>
											<DropdownMenu.Item label="Item 3_2_1" />
											<DropdownMenu.Item label="Item 3_2_2" />
											<DropdownMenu.Item label="Item 3_2_3" />
										</DropdownMenu.Content>
									}
								/>
								<DropdownMenu.Item label="Item 3_3" />
							</DropdownMenu.Content>
						</DropdownMenu.Provider>
					}
				/>
			</DropdownMenu.Content>
		</DropdownMenu.Provider>
	);
}
