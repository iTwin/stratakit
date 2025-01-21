/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { definePage } from "~/~utils.tsx";
import * as Table from "@itwin/itwinui-react-internal/src/bricks/Table.tsx";
import { Checkbox, Label, VisuallyHidden } from "@itwin/itwinui-react/bricks";
import * as React from "react";

export const handle = { title: "Table" };

export default definePage(
	function Page() {
		const capitalizeFirstLetter = (string: string) => {
			return string.charAt(0).toUpperCase() + string.slice(1);
		};
		const generateItem = React.useCallback((index: number, parentRow = "") => {
			const keyValue = parentRow ? `${parentRow}.${index + 1}` : `${index + 1}`;
			return {
				id: keyValue,
				name: `Name ${keyValue}`,
				description: `Description ${keyValue}`,
				date: `${index + 1 < 10 ? `0${index + 1}` : index + 1}-01-2025`,
			};
		}, []);
		const data = React.useMemo(
			() =>
				Array(5)
					.fill(null)
					.map((_, index) => generateItem(index)),
			[generateItem],
		);

		return (
			<Table.Root>
				<Table.Header>
					<Table.Row>
						<Table.Cell data-kiwi-slot>
							<Checkbox aria-checked="mixed" id="table-header-checkbox" />
							<VisuallyHidden
								render={<Label htmlFor="table-header-checkbox" />}
							>
								Select all rows
							</VisuallyHidden>
						</Table.Cell>
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
							<Table.Cell key={`item-${row.id}`} data-kiwi-slot>
								<Checkbox id={`table-body-row-checkbox-${row.id}`} />
								<VisuallyHidden
									render={
										<Label htmlFor={`table-body-row-checkbox-${row.id}`} />
									}
								>
									Select row {row.id}
								</VisuallyHidden>
							</Table.Cell>
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
