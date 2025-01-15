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
		return (
			<Table.Root>
				<Table.Header>
					<Table.Row data-kiwi-variant="header">
						<Table.Cell data-kiwi-slot>
							<Checkbox aria-checked="mixed" id="table-header-checkbox" />
							<VisuallyHidden
								render={<Label htmlFor="table-header-checkbox" />}
							>
								Select all rows
							</VisuallyHidden>
						</Table.Cell>
						<Table.Cell data-kiwi-variant="sortable">Column 1</Table.Cell>
						<Table.Cell data-kiwi-variant="sortable" data-kiwi-align="right">
							Column 2
						</Table.Cell>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					<Table.Row>
						<Table.Cell data-kiwi-slot>
							<Checkbox id="table-body-row-checkbox-1" />
							<VisuallyHidden
								render={<Label htmlFor="table-body-row-checkbox-1" />}
							>
								Select row 1
							</VisuallyHidden>
						</Table.Cell>
						<Table.Cell>Cell 1.1</Table.Cell>
						<Table.Cell data-kiwi-align="right">Cell 1.2</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell data-kiwi-slot>
							<Checkbox id="table-body-row-checkbox-2" />
							<VisuallyHidden
								render={<Label htmlFor="table-body-row-checkbox-2" />}
							>
								Select row 2
							</VisuallyHidden>
						</Table.Cell>
						<Table.Cell>Cell 2.1</Table.Cell>
						<Table.Cell data-kiwi-align="right">Cell 2.2</Table.Cell>
					</Table.Row>

					<Table.Row aria-selected="true">
						<Table.Cell data-kiwi-slot>
							<Checkbox aria-checked="true" id="table-body-row-checkbox-3" />
							<VisuallyHidden
								render={<Label htmlFor="table-body-row-checkbox-3" />}
							>
								Select row 3
							</VisuallyHidden>
						</Table.Cell>
						<Table.Cell>Cell 3.1</Table.Cell>
						<Table.Cell data-kiwi-align="right">Cell 3.2</Table.Cell>
					</Table.Row>
					<Table.Row aria-selected="true">
						<Table.Cell data-kiwi-slot>
							<Checkbox aria-checked="true" id="table-body-row-checkbox-4" />
							<VisuallyHidden
								render={<Label htmlFor="table-body-row-checkbox-4" />}
							>
								Select row 4
							</VisuallyHidden>
						</Table.Cell>
						<Table.Cell>Cell 4.1</Table.Cell>
						<Table.Cell data-kiwi-align="right">Cell 4.2</Table.Cell>
					</Table.Row>

					<Table.Row>
						<Table.Cell data-kiwi-slot>
							<Checkbox id="table-body-row-checkbox-5" />
							<VisuallyHidden
								render={<Label htmlFor="table-body-row-checkbox-5" />}
							>
								Select row 5
							</VisuallyHidden>
						</Table.Cell>
						<Table.Cell>Cell 5.1</Table.Cell>
						<Table.Cell data-kiwi-align="right">Cell 5.2</Table.Cell>
					</Table.Row>
					<Table.Row aria-disabled="true">
						<Table.Cell data-kiwi-slot>
							<Checkbox disabled id="table-body-row-checkbox-6" />
							<VisuallyHidden
								render={<Label htmlFor="table-body-row-checkbox-6" />}
							>
								Select row 6
							</VisuallyHidden>
						</Table.Cell>
						<Table.Cell>Cell 6.1</Table.Cell>
						<Table.Cell data-kiwi-align="right">Cell 6.2</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell data-kiwi-slot>
							<Checkbox id="table-body-row-checkbox-7" />
							<VisuallyHidden
								render={<Label htmlFor="table-body-row-checkbox-7" />}
							>
								Select row 7
							</VisuallyHidden>
						</Table.Cell>
						<Table.Cell>Cell 7.1</Table.Cell>
						<Table.Cell data-kiwi-align="right">Cell 7.2</Table.Cell>
					</Table.Row>
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
