/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { Checkbox, VisuallyHidden } from "@stratakit/bricks";
import { Table } from "@stratakit/structures";
import { definePage } from "~/~utils.tsx";

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
		selection: SelectionTest,
	},
);

const fruitsData = [
	{
		name: "Apple",
		color: "Red",
	},
	{
		name: "Orange",
		color: "Orange",
	},
	{
		name: "Kiwi",
		color: "Golden brown",
	},
	{
		name: "Watermelon",
		color: "Green",
	},
];

// Workaround for the first column of the table that contains checkboxes.
const checkboxCellStyle = {
	flex: "0 0 auto",
	minInlineSize: "auto",
	inlineSize: "2.75rem",
} satisfies React.CSSProperties;

function CustomTableTest() {
	const tableId = React.useId();
	return (
		<Table.CustomTable>
			<Table.Caption>Fruits and their colors (Table.CustomTable)</Table.Caption>
			<Table.Header>
				<Table.Row>
					<Table.Cell style={checkboxCellStyle}>
						<VisuallyHidden>Select</VisuallyHidden>
					</Table.Cell>
					<Table.Cell>Fruit</Table.Cell>
					<Table.Cell>Color</Table.Cell>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{fruitsData.map((fruit) => {
					const nameId = `${tableId}-${fruit.name}-name`;
					return (
						<Table.Row key={fruit.name}>
							<Table.Cell style={checkboxCellStyle}>
								<Checkbox
									defaultChecked={fruit.name === "Kiwi" ? true : undefined}
									aria-labelledby={nameId}
								/>
							</Table.Cell>
							<Table.Cell id={nameId}>{fruit.name}</Table.Cell>
							<Table.Cell>{fruit.color}</Table.Cell>
						</Table.Row>
					);
				})}
			</Table.Body>
		</Table.CustomTable>
	);
}

function HtmlTableTest() {
	const tableId = React.useId();
	return (
		<Table.HtmlTable>
			<Table.Caption>Fruits and their colors (Table.HtmlTable)</Table.Caption>
			<Table.Header>
				<Table.Row>
					<Table.Cell style={checkboxCellStyle}>
						<VisuallyHidden>Select</VisuallyHidden>
					</Table.Cell>
					<Table.Cell>Fruit</Table.Cell>
					<Table.Cell>Color</Table.Cell>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{fruitsData.map((fruit) => {
					const nameId = `${tableId}-${fruit.name}-name`;
					return (
						<Table.Row key={fruit.name}>
							<Table.Cell style={checkboxCellStyle}>
								<Checkbox
									defaultChecked={fruit.name === "Kiwi" ? true : undefined}
									aria-labelledby={nameId}
								/>
							</Table.Cell>
							<Table.Cell id={nameId}>{fruit.name}</Table.Cell>
							<Table.Cell>{fruit.color}</Table.Cell>
						</Table.Row>
					);
				})}
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
					{Object.keys(data[0]).map((columnName) => (
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

const selectionData = Array(5)
	.fill(null)
	.map((_, index) => ({
		id: index,
		name: `Name ${index}`,
		description: `Description ${index}`,
	}));

function SelectionTest() {
	return (
		<div style={{ display: "grid", gap: 20 }}>
			<SingleSelection />
			<MultiSelection />
		</div>
	);
}

function SingleSelection() {
	const [selected, setSelected] = React.useState<number | undefined>(undefined);
	const tableId = React.useId();
	return (
		<Table.CustomTable>
			<Table.Caption>Single Selection</Table.Caption>
			<Table.Header>
				<Table.Row>
					<Table.Cell>
						<VisuallyHidden>Select</VisuallyHidden>
					</Table.Cell>
					<Table.Cell>Name</Table.Cell>
					<Table.Cell>Description</Table.Cell>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{selectionData.map((row) => {
					const rowSelected = row.id === selected;
					const nameId = `${tableId}-${row.id}-name`;
					return (
						<Table.Row key={row.id}>
							<Table.Cell>
								<Checkbox
									checked={rowSelected}
									onChange={(e) =>
										setSelected(e.currentTarget.checked ? row.id : undefined)
									}
									aria-labelledby={nameId}
								/>
							</Table.Cell>
							<Table.Cell id={nameId}>{row.name}</Table.Cell>
							<Table.Cell>{row.description}</Table.Cell>
						</Table.Row>
					);
				})}
			</Table.Body>
		</Table.CustomTable>
	);
}

function MultiSelection() {
	const [selected, setSelected] = React.useState<number[]>([]);
	const tableId = React.useId();
	return (
		<Table.CustomTable>
			<Table.Caption>Multi Selection</Table.Caption>
			<Table.Header>
				<Table.Row>
					<Table.Cell>
						<Checkbox
							aria-label="Select"
							checked={
								selected.length === 0
									? false
									: selected.length === selectionData.length
										? true
										: "mixed"
							}
							onChange={(e) => {
								setSelected(
									e.currentTarget.checked
										? selectionData.map((row) => row.id)
										: [],
								);
							}}
						/>
					</Table.Cell>
					<Table.Cell>Name</Table.Cell>
					<Table.Cell>Description</Table.Cell>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{selectionData.map((row) => {
					const rowSelected = selected.includes(row.id);
					const nameId = `${tableId}-${row.id}-name`;
					return (
						<Table.Row key={row.id}>
							<Table.Cell>
								<Checkbox
									checked={rowSelected}
									onChange={(e) => {
										const newChecked = e.currentTarget.checked;
										setSelected((prev) => {
											if (newChecked) {
												return [...prev, row.id];
											}
											return prev.filter((id) => id !== row.id);
										});
									}}
									aria-labelledby={nameId}
								/>
							</Table.Cell>
							<Table.Cell id={nameId}>{row.name}</Table.Cell>
							<Table.Cell>{row.description}</Table.Cell>
						</Table.Row>
					);
				})}
			</Table.Body>
		</Table.CustomTable>
	);
}
