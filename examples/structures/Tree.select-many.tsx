/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { Tree } from "@stratakit/structures";

import styles from "./Tree.select-many.module.css";

export default () => {
	const [expandedItems, setExpandedItems] = React.useState<string[]>([
		data[0].id,
	]);
	const [selectedItems, setSelectedItems] = React.useState<string[]>([
		data[0].children[0].id,
		data[2].id,
	]);

	return (
		<Tree.Root className={styles.tree} aria-multiselectable="true">
			{flatData.map((item) => {
				const parentCollapsed =
					item.parentId && !expandedItems.includes(item.parentId);
				if (parentCollapsed) return null;
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
						selected={selectedItems.includes(item.id)}
						onSelectedChange={(selected) => {
							setSelectedItems((prev) => {
								if (selected) {
									return [...prev, item.id];
								} else {
									return prev.filter((id) => id !== item.id);
								}
							});
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

interface FlatTreeItem extends TreeItem {
	level: number;
	posInset: number;
	setSize: number;
	parentId?: string;
}

// Flattens the tree data up to two levels.
const flatData = data.flatMap<FlatTreeItem>((item, index) => {
	const children = "children" in item ? item.children : [];
	const flatChildren = children.map<FlatTreeItem>((child, childIndex) => ({
		...child,
		level: 2,
		posInset: childIndex + 1,
		setSize: children.length,
		parentId: item.id,
	}));
	return [
		{
			...item,
			level: 1,
			posInset: index + 1,
			setSize: data.length,
		},
		...flatChildren,
	];
});
