/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { definePage } from "~/~utils.tsx";
import { Table } from "@itwin/itwinui-react/bricks";
import * as React from "react";

export const handle = { title: "Table" };

export default definePage(
	function Page() {
		return (
			<Table.CustomTable>
				<Table.Caption>Fruits and their colors</Table.Caption>
				<Table.Header>
					<Table.Row>
						<Table.Cell>Fruit</Table.Cell>
						<Table.Cell>Color</Table.Cell>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					<Table.Row>
						<Table.Cell>Apple</Table.Cell>
						<Table.Cell>Red</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell>Orange</Table.Cell>
						<Table.Cell>Orange</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell>Kiwi</Table.Cell>
						<Table.Cell>Golden brown</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell>Watermelon</Table.Cell>
						<Table.Cell>Green</Table.Cell>
					</Table.Row>
				</Table.Body>
			</Table.CustomTable>
		);
	},
	{
		visual: VisualTest,
		scroll: ScrollTest,
		customTable: CustomTableTest,
		htmlTable: HtmlTableTest,
	},
);

function CustomTableTest() {
	return (
		<Table.CustomTable>
			<Table.Caption>Fruits and their colors (Table.CustomTable)</Table.Caption>
			<Table.Header>
				<Table.Row>
					<Table.Cell>Fruit</Table.Cell>
					<Table.Cell>Color</Table.Cell>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				<Table.Row>
					<Table.Cell>Apple</Table.Cell>
					<Table.Cell>Red</Table.Cell>
				</Table.Row>
				<Table.Row>
					<Table.Cell>Orange</Table.Cell>
					<Table.Cell>Orange</Table.Cell>
				</Table.Row>
				<Table.Row>
					<Table.Cell>Kiwi</Table.Cell>
					<Table.Cell>Golden brown</Table.Cell>
				</Table.Row>
				<Table.Row>
					<Table.Cell>Watermelon</Table.Cell>
					<Table.Cell>Green</Table.Cell>
				</Table.Row>
			</Table.Body>
		</Table.CustomTable>
	);
}

function HtmlTableTest() {
	return (
		<Table.HtmlTable>
			<Table.Caption>Fruits and their colors (Table.HtmlTable)</Table.Caption>
			<Table.Header>
				<Table.Row>
					<Table.Cell>Fruit</Table.Cell>
					<Table.Cell>Color</Table.Cell>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				<Table.Row>
					<Table.Cell>Apple</Table.Cell>
					<Table.Cell>Red</Table.Cell>
				</Table.Row>
				<Table.Row>
					<Table.Cell>Orange</Table.Cell>
					<Table.Cell>Orange</Table.Cell>
				</Table.Row>
				<Table.Row>
					<Table.Cell>Kiwi</Table.Cell>
					<Table.Cell>Golden brown</Table.Cell>
				</Table.Row>
				<Table.Row>
					<Table.Cell>Watermelon</Table.Cell>
					<Table.Cell>Green</Table.Cell>
				</Table.Row>
			</Table.Body>
		</Table.HtmlTable>
	);
}

function VisualTest() {
	return (
		<div style={{ display: "grid", gap: 20 }}>
			<CustomTableTest />
			<HtmlTableTest />
		</div>
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
		<Table.CustomTable>
			<Table.Caption>Table caption</Table.Caption>
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
		</Table.CustomTable>
	);
}
