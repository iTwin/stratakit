/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { Tree } from "@stratakit/structures";

import styles from "./Tree.select-one.module.css";

export default () => {
	const [expandedItems, setExpandedItems] = React.useState<string[]>([
		data[0].id,
	]);
	const [selectedItem, setSelectedItem] = React.useState<string | undefined>(
		data[0].children[0].id,
	);

	return (
		<Tree.Root className={styles.tree}>
			{flatData.map((item) => {
				const ancestorCollapsed = item.parentIds.some(
					(parentId) => !expandedItems.includes(parentId),
				);
				if (ancestorCollapsed) return null;
				return (
					<Tree.Item
						key={item.id}
						label={item.label}
						aria-level={item.level}
						aria-posinset={item.posInset}
						aria-setsize={item.setSize}
						expanded={
							item.children ? expandedItems.includes(item.id) : undefined
						}
						onExpandedChange={(expanded) => {
							setExpandedItems((prev) => {
								if (expanded) {
									return [...prev, item.id];
								} else {
									return prev.filter((id) => id !== item.id);
								}
							});
						}}
						selected={selectedItem === item.id}
						onSelectedChange={(selected) => {
							setSelectedItem(selected ? item.id : undefined);
						}}
					/>
				);
			})}
		</Tree.Root>
	);
};

interface TreeItem {
	id: string;
	label: string;
	expanded?: boolean;
	children?: TreeItem[];
}

const data = [
	{
		id: "item1",
		label: "Item 1",
		children: [
			{
				id: "item1.1",
				label: "Item 1.1",
			},
			{
				id: "item1.2",
				label: "Item 1.2",
			},
		],
	},
	{
		id: "item2",
		label: "Item 2",
		children: [
			{
				id: "item2.1",
				label: "Item 2.1",
			},
			{
				id: "item2.2",
				label: "Item 2.2",
			},
			{
				id: "item2.3",
				label: "Item 2.3",
			},
		],
	},
	{
		id: "item3",
		label: "Item 3",
	},
] as const satisfies TreeItem[];

const flatData = flattenTree(data);

interface FlatTreeItem extends TreeItem {
	level: number;
	posInset: number;
	setSize: number;
	parentIds: string[];
}

function flattenTree(
	items: TreeItem[],
	level = 1,
	parentIds: string[] = [],
): FlatTreeItem[] {
	return items.flatMap<FlatTreeItem>((item, index) => {
		const children = "children" in item ? (item.children ?? []) : [];
		return [
			{
				...item,
				level,
				posInset: index + 1,
				setSize: items.length,
				parentIds,
			},
			...flattenTree(children, level + 1, [...parentIds, item.id]),
		];
	});
}
