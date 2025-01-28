/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { definePage } from "~/~utils.tsx";
import * as Table from "@itwin/itwinui-react-internal/src/bricks/Table.tsx";
import * as React from "react";

export const handle = { title: "Table" };

export default definePage(
	function Page() {
		const capitalizeFirstLetter = (string: string) => {
			return string.charAt(0).toUpperCase() + string.slice(1);
		};

		const generateData = React.useCallback((numberOfData: number) => {
			return Array(numberOfData)
				.fill(null)
				.map((_, index) => ({
					id: index,
					name: `Name ${index}`,
					description: `Description ${index}`,
				}));
		}, []);

		const data = React.useMemo(() => generateData(10), [generateData]);

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
	const capitalizeFirstLetter = (string: string) => {
		return string.charAt(0).toUpperCase() + string.slice(1);
	};
	const data = React.useMemo(
		() => [
			{
				id: 1,
				name: "Name 1",
				description: "Description 1",
				date: "01-01-2025",
			},
			{
				id: 2,
				name: "Name 2",
				description: "Description 2",
				date: "01-02-2025",
			},
			{
				id: 3,
				name: "Name 3",
				description: "Description 3",
				date: "01-02-2025",
			},
			{
				id: 4,
				name: "Name 4",
				description: "Description 4",
				date: "01-04-2025",
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
}
