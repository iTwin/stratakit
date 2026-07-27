/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { Tree } from "@stratakit/structures";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Stack from "@mui/material/Stack";

import styles from "./Tree.default.module.css";

export default () => {
	const [expandedItems, setExpandedItems] = React.useState<
		Record<string, boolean>
	>({
		item1: true,
		item2: false,
		item3: false,
	});

	const toggleExpanded = (itemKey: string) => {
		setExpandedItems((prev) => ({
			...prev,
			[itemKey]: !prev[itemKey],
		}));
	};

	const [allSelected, setAllSelected] = React.useState(false);
	const [noneSelected, setNoneSelected] = React.useState(false);

	const [selectedItems, setSelectedItems] = React.useState<
		Record<string, boolean>
	>({
		"item1": true,
		"item1.1": false,
		"item1.2": true,
		"item2": false,
		"item2.1": false,
		"item2.2": false,
		"item3": false,
		"item3.1": false,
		"item3.2": false,
	});

	const toggleSelected = (itemKey: string, itemValue?: boolean) => {
		setSelectedItems((prev) => ({
			...prev,
			[itemKey]: itemValue !== undefined ? itemValue : !prev[itemKey],
		}));
	};

	const selectAll = () => {
		Object.keys(selectedItems).forEach(key => {
			toggleSelected(key, true);			
		});
	};

	const selectNone = () => {
		Object.keys(selectedItems).forEach(key => {
			toggleSelected(key, false);			
		});
	};

	React.useEffect(() => {
		let allSet = Object.keys(selectedItems).every(key => selectedItems[key]);
		setAllSelected(allSet);
		let noneSet = Object.keys(selectedItems).every(key => !selectedItems[key]);
		setNoneSelected(noneSet);
	}, [selectedItems]);

	return (
		<Stack spacing={1}>
			<ButtonGroup fullWidth aria-label="Bulk actions">
				<Button onClick={() => selectAll()} disabled={allSelected}>Select all</Button>
				<Button onClick={() => selectNone()} disabled={noneSelected}>Deselect all</Button>
			</ButtonGroup>
			<Tree.Root className={styles.tree} aria-multiselectable="true">
				<Tree.Item
					label="Item 1"
					aria-level={1}
					aria-posinset={1}
					aria-setsize={3}
					expanded={expandedItems.item1}
					onExpandedChange={() => toggleExpanded("item1")}
					selected={selectedItems.item1}
					onSelectedChange={() => toggleSelected("item1")}
				/>
				{expandedItems.item1 && (
					<>
						<Tree.Item
							label="Item 1.1"
							aria-level={2}
							aria-posinset={1}
							aria-setsize={2}
							selected={selectedItems["item1.1"]}
							onSelectedChange={() => toggleSelected("item1.1")}
						/>
						<Tree.Item
							label="Item 1.2"
							aria-level={2}
							aria-posinset={2}
							aria-setsize={2}
							selected={selectedItems["item1.2"]}
							onSelectedChange={() => toggleSelected("item1.2")}
						/>
					</>
				)}
				<Tree.Item
					label="Item 2"
					aria-level={1}
					aria-posinset={2}
					aria-setsize={3}
					expanded={expandedItems.item2}
					onExpandedChange={() => toggleExpanded("item2")}
					selected={selectedItems.item2}
					onSelectedChange={() => toggleSelected("item2")}
				/>
				{expandedItems.item2 && (
					<>
						<Tree.Item
							label="Item 2.1"
							aria-level={2}
							aria-posinset={1}
							aria-setsize={2}
							selected={selectedItems["item2.1"]}
							onSelectedChange={() => toggleSelected("item2.1")}
						/>
						<Tree.Item
							label="Item 2.2"
							aria-level={2}
							aria-posinset={2}
							aria-setsize={2}
							selected={selectedItems["item2.2"]}
							onSelectedChange={() => toggleSelected("item2.2")}
						/>
					</>
				)}
				<Tree.Item
					label="Item 3"
					aria-level={1}
					aria-posinset={3}
					aria-setsize={3}
					expanded={expandedItems.item3}
					onExpandedChange={() => toggleExpanded("item3")}
					selected={selectedItems.item3}
					onSelectedChange={() => toggleSelected("item3")}
				/>
				{expandedItems.item3 && (
					<>
						<Tree.Item
							label="Item 3.1"
							aria-level={2}
							aria-posinset={1}
							aria-setsize={2}
							selected={selectedItems["item3.1"]}
							onSelectedChange={() => toggleSelected("item3.1")}
						/>
						<Tree.Item
							label="Item 3.2"
							aria-level={2}
							aria-posinset={2}
							aria-setsize={2}
							selected={selectedItems["item3.2"]}
							onSelectedChange={() => toggleSelected("item3.2")}
						/>
					</>
				)}
			</Tree.Root>
		</Stack>
	);
};
