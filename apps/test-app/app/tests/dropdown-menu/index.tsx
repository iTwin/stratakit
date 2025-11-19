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
		<div style={{ minBlockSize: 300 }}>
			<DropdownMenu.Provider defaultOpen>
				<DropdownMenu.Button>Actions</DropdownMenu.Button>

				<DropdownMenu.Content>
					<DropdownMenu.Item label="Add" />
					<DropdownMenu.Item label="Edit" icon={placeholderIcon} />
					<DropdownMenu.Item disabled label="Delete" icon={placeholderIcon} />
					<DropdownMenu.Group
						label="Decorations"
						items={[
							<DropdownMenu.Item
								label="Filter"
								unstable_dot="Some filters applied"
							/>,
							<DropdownMenu.Item shortcuts="Command+X" label="Clear" />,
							<DropdownMenu.Item
								label="Settings"
								submenu={
									<DropdownMenu.Submenu>
										<DropdownMenu.CheckboxItem
											name="setting1"
											label="Setting 1"
										/>
										<DropdownMenu.CheckboxItem
											name="setting2"
											label="Setting 2"
										/>
										<DropdownMenu.CheckboxItem
											name="setting3"
											label="Setting 3"
											defaultChecked
										/>
									</DropdownMenu.Submenu>
								}
							/>,
						]}
					/>
				</DropdownMenu.Content>
			</DropdownMenu.Provider>
		</div>
	);
}

function CheckboxTest({ defaultChecked: defaultCheckedProp }: VariantProps) {
	const defaultChecked = defaultCheckedProp ? true : undefined;
	return (
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
	);
}

function SubmenuTest() {
	return (
		<DropdownMenu.Provider>
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
	);
}

function GroupTest({ defaultOpen, before, after, between }: VariantProps) {
	return (
		<DropdownMenu.Provider defaultOpen={defaultOpen ? true : undefined}>
			<DropdownMenu.Button>Actions</DropdownMenu.Button>
			<DropdownMenu.Content>
				{before && <DropdownMenu.Item label="Item A" />}
				<DropdownMenu.Group
					label="Group 1"
					items={[
						<DropdownMenu.Item key="1" label="Item 1" />,
						<DropdownMenu.Item key="2" label="Item 2" />,
					]}
				/>
				{between && <DropdownMenu.Item label="Item B" />}
				<DropdownMenu.Group
					label="Group 2"
					items={[
						<DropdownMenu.Item key="3" label="Item 3" />,
						<DropdownMenu.Item
							key="4"
							label="Item 4"
							submenu={
								<DropdownMenu.Submenu>
									<DropdownMenu.Group
										label="Group 3"
										items={[
											<DropdownMenu.Item key="5" label="Item 5" />,
											<DropdownMenu.Item key="6" label="Item 6" />,
										]}
									/>
									<DropdownMenu.Item key="7" label="Item 7" />
								</DropdownMenu.Submenu>
							}
						/>,
					]}
				/>
				{after && <DropdownMenu.Item label="Item C" />}
			</DropdownMenu.Content>
		</DropdownMenu.Provider>
	);
}
