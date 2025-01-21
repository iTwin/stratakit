/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { definePage } from "~/~utils.tsx";
import * as Table from "@itwin/itwinui-react-internal/src/bricks/Table.tsx";
import { DropdownMenu } from "@itwin/itwinui-react/bricks";
import * as React from "react";

export const handle = { title: "Table" };

export default definePage(
	function Page() {
		const capitalizeFirstLetter = (string: string) => {
			return string.charAt(0).toUpperCase() + string.slice(1);
		};

		const statusMenu = (
			<DropdownMenu.Root>
				<DropdownMenu.Button>Status</DropdownMenu.Button>
				<DropdownMenu.Content>
					<DropdownMenu.Item>New</DropdownMenu.Item>
					<DropdownMenu.Item>Done</DropdownMenu.Item>
					<DropdownMenu.Item>In Progress</DropdownMenu.Item>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		);

		const data = React.useMemo(
			() => [
				{
					id: 1,
					name: "Name 1",
					description: "Description 1",
					date: "01-01-2025",
					status: statusMenu,
				},
				{
					id: 2,
					name: "Name 2",
					description: "Description 2",
					date: "01-02-2025",
					status: statusMenu,
				},
				{
					id: 3,
					name: "Name 3",
					description: "Description 3",
					date: "01-02-2025",
					status: statusMenu,
				},
				{
					id: 4,
					name: "Name 4",
					description: "Description 4",
					date: "01-04-2025",
					status: statusMenu,
				},
			],
			[],
		);

		return (
			<Table.Root>
				<Table.Header>
					<Table.Row>
						{Object.keys(data[0]).map((columnName: string) => (
							<Table.Cell key={columnName}>
								{capitalizeFirstLetter(columnName)}
							</Table.Cell>
						))}
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{data.map((row) => (
						<Table.Row key={row.id}>
							{Object.values(row).map((value) => (
								<Table.Cell key={row.id}>{value}</Table.Cell>
							))}
						</Table.Row>
					))}
				</Table.Body>
			</Table.Root>
		);
	},
	{ visual: VisualTest },
);

function VisualTest() {
	const id = React.useId();

	return <></>;
}
