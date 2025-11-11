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
					<DropdownMenu.Item
						label="More"
						submenu={
							<DropdownMenu.Submenu>
								<DropdownMenu.Item shortcuts="Command+C" label="Clone" />
								<DropdownMenu.Item disabled label="Archive" />
								<DropdownMenu.Item label="Export" />
								<DropdownMenu.Item
									label="Import"
									unstable_dot="Some filters applied"
								/>
							</DropdownMenu.Submenu>
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
		group: GroupTest,
	},
);

function VisualTest() {
	return (
		<div
			style={{
				display: "grid",
				gridTemplateColumns: "repeat(2, 50%)",
				gap: "1rem",
			}}
		>
			<div style={{ minBlockSize: 200 }}>
				<DropdownMenu.Provider open>
					<DropdownMenu.Button>Actions</DropdownMenu.Button>

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
			<CheckboxTest open="true" defaultChecked="true" />
			<SubmenuTest open="true" />
			<GroupTest open="true" />
		</div>
	);
}

function CheckboxTest({
	defaultChecked: defaultCheckedProp,
	open: openProp,
}: VariantProps) {
	const defaultChecked = defaultCheckedProp ? true : undefined;
	const open = openProp === undefined ? undefined : !!openProp;
	return (
		<div style={{ minBlockSize: 150 }}>
			<DropdownMenu.Provider open={open}>
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

function SubmenuTest({ open: openProp }: VariantProps) {
	const open = openProp === undefined ? undefined : !!openProp;
	return (
		<div style={{ minBlockSize: 200 }}>
			<DropdownMenu.Provider open={open}>
				<DropdownMenu.Button>Actions</DropdownMenu.Button>

				<DropdownMenu.Content>
					<DropdownMenu.Item label="Item 1" />
					<DropdownMenu.Item label="Item 2" />
					<DropdownMenu.Item
						label="Item 3"
						submenu={
							<DropdownMenu.Submenu>
								<DropdownMenu.Item label="Item 3_1" />
								<DropdownMenu.Item
									label="Item 3_2"
									submenu={
										<DropdownMenu.Submenu>
											<DropdownMenu.Item label="Item 3_2_1" />
											<DropdownMenu.Item label="Item 3_2_2" />
											<DropdownMenu.Item label="Item 3_2_3" />
										</DropdownMenu.Submenu>
									}
								/>
								<DropdownMenu.Item label="Item 3_3" />
							</DropdownMenu.Submenu>
						}
					/>
				</DropdownMenu.Content>
			</DropdownMenu.Provider>
		</div>
	);
}

function GroupTest({ open: openProp }: VariantProps) {
	const open = openProp === undefined ? undefined : !!openProp;
	return (
		<div style={{ minBlockSize: 210 }}>
			<DropdownMenu.Provider open={open}>
				<DropdownMenu.Button>Actions</DropdownMenu.Button>
				<DropdownMenu.Content>
					<DropdownMenu.Group label="Group 1">
						<DropdownMenu.Item label="Item 1" />
						<DropdownMenu.Item label="Item 2" />
					</DropdownMenu.Group>
					<DropdownMenu.Group label="Group 2">
						<DropdownMenu.Item label="Item 3" />
						<DropdownMenu.Item label="Item 4" />
					</DropdownMenu.Group>
				</DropdownMenu.Content>
			</DropdownMenu.Provider>
		</div>
	);
}
