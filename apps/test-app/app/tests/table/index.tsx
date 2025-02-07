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
		return (
			<Table.Root>
				<Table.Caption>Description of the table contents.</Table.Caption>
				<Table.Header>
					<Table.Row>
						<Table.Cell>Name</Table.Cell>
						<Table.Cell>Description</Table.Cell>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					<Table.Row>
						<Table.Cell>Name 1</Table.Cell>
						<Table.Cell>Description 1</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell>Name 2</Table.Cell>
						<Table.Cell>Description 2</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell>Name 3</Table.Cell>
						<Table.Cell>Description 3</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell>Name 4</Table.Cell>
						<Table.Cell>Description 4</Table.Cell>
					</Table.Row>
				</Table.Body>
			</Table.Root>
		);
	},
	{ visual: VisualTest, scroll: ScrollTest, select: SelectTest },
);

function VisualTest() {
	return (
		<Table.Root>
			<Table.Caption>Description of the table contents.</Table.Caption>
			<Table.Header>
				<Table.Row>
					<Table.Cell>Name</Table.Cell>
					<Table.Cell>Description</Table.Cell>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				<Table.Row>
					<Table.Cell>Name 1</Table.Cell>
					<Table.Cell>Description 1</Table.Cell>
				</Table.Row>
				<Table.Row>
					<Table.Cell>Name 2</Table.Cell>
					<Table.Cell>Description 2</Table.Cell>
				</Table.Row>
				<Table.Row>
					<Table.Cell>Name 3</Table.Cell>
					<Table.Cell>Description 3</Table.Cell>
				</Table.Row>
				<Table.Row>
					<Table.Cell>Name 4</Table.Cell>
					<Table.Cell>Description 4</Table.Cell>
				</Table.Row>
			</Table.Body>
		</Table.Root>
	);
}

function ScrollTest() {
	const capitalizeFirstLetter = (string: string) => {
		return string.charAt(0).toUpperCase() + string.slice(1);
	};

	const data = React.useMemo(
		() =>
			Array(100)
				.fill(null)
				.map((_, index) => ({
					id: index,
					name: `Name ${index}`,
					description: `Description ${index}`,
				})),
		[],
	);

	return (
		<Table.Root>
			<Table.Caption>Description of the table contents.</Table.Caption>
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

function SelectTest() {
	return (
		<Table.Root>
			<Table.Header>
				<Table.Row>
					<Table.Cell>Name</Table.Cell>
					<Table.Cell>Description</Table.Cell>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				<Table.Row selected>
					<Table.Cell>Name 1</Table.Cell>
					<Table.Cell>Description 1</Table.Cell>
				</Table.Row>
				<Table.Row selected>
					<Table.Cell>Name 2</Table.Cell>
					<Table.Cell>Description 2</Table.Cell>
				</Table.Row>
				<Table.Row>
					<Table.Cell>Name 3</Table.Cell>
					<Table.Cell>Description 3</Table.Cell>
				</Table.Row>
				<Table.Row>
					<Table.Cell>Name 4</Table.Cell>
					<Table.Cell>Description 4</Table.Cell>
				</Table.Row>
			</Table.Body>
		</Table.Root>
	);
}
