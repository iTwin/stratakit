/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { definePage } from "~/~utils.tsx";
import * as React from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { Icon, IconButton } from "@itwin/itwinui-react/bricks";
import * as Tree from "@itwin/itwinui-react-internal/src/bricks/Tree.tsx";
import placeholderIcon from "@itwin/itwinui-icons/placeholder.svg";
import unlockIcon from "@itwin/itwinui-icons/lock-unlocked.svg";
import showIcon from "@itwin/itwinui-icons/visibility-show.svg";

export const handle = { title: "Tree" };

export default definePage(
	function Page({
		overflow = false,
		selected = false,
		visibleActions = undefined,
	}) {
		const visibleActionsParam = visibleActions as boolean | undefined;
		const overflowPostfix = overflow
			? " with a super long label that is overflown"
			: "";
		return (
			<Tree.Root style={{ maxInlineSize: overflow ? 300 : undefined }}>
				<TreeItem label={`Item 1${overflowPostfix}`} selected={!!selected}>
					<TreeItem label="Item 1.1" selected={!!selected} />
					<TreeItem
						label="Item 1.2"
						visibleActions={visibleActionsParam}
						selected={!!selected}
					/>
					<TreeItem
						label={`Item 1.3${overflowPostfix}`}
						visibleActions={visibleActionsParam}
						selected={!!selected}
					/>
				</TreeItem>
				<TreeItem label="Item 2">
					<TreeItem label={`Item 2.1${overflowPostfix}`} />
				</TreeItem>
				<TreeItem label="Item 3" visibleActions={visibleActionsParam} />
			</Tree.Root>
		);
	},
	{
		virtual: VirtualTest,
	},
);

function TreeItem(
	props: React.PropsWithChildren<{
		label?: React.ReactNode;
		visibleActions?: boolean;
		selected?: boolean;
		style?: React.CSSProperties;
	}>,
) {
	const { children, label, visibleActions, selected, style } = props;
	const isParentNode = React.Children.count(children) > 0;
	return (
		<Tree.Item
			expanded={isParentNode || undefined}
			content={
				<>
					<Tree.Expander />
					<Icon href={placeholderIcon} />
					<Tree.Content>{label}</Tree.Content>
					<Tree.Actions visible={visibleActions}>
						<IconButton
							icon={unlockIcon}
							label="Unlock"
							variant="ghost"
							style={{
								position: "relative",
							}}
						/>
						<IconButton
							icon={showIcon}
							label="Show"
							variant="ghost"
							style={{
								position: "relative",
							}}
						/>
					</Tree.Actions>
				</>
			}
			selected={selected}
			style={style}
		>
			{children}
		</Tree.Item>
	);
}

interface TreeItemData {
	id: string;
	label: string;
	items: TreeItemData[];
}

interface FlatTreeItem {
	id: string;
	parentId?: string;
	items: string[];
	label: string;
	level: number;
}

function useTreeData() {
	const items = React.useMemo(() => {
		function createItems(
			count: number,
			childItemCount: number,
			parentId?: string,
		) {
			const treeItems: TreeItemData[] = [];
			for (let i = 0; i < count; i++) {
				const id = parentId ? `${parentId}-${i}` : `${i}`;
				const items = createItems(childItemCount, childItemCount - 1, id);
				treeItems.push({
					id,
					label: `Item ${id}`,
					items,
				});
			}
			return treeItems;
		}
		return createItems(10, 5);
	}, []);
	const flatItems = React.useMemo<FlatTreeItem[]>(() => {
		// Flatten items
		function flattenItems(
			items: TreeItemData[],
			parentId?: string,
			level = 0,
		): FlatTreeItem[] {
			const flatItems: FlatTreeItem[] = [];
			for (const item of items) {
				flatItems.push({
					id: item.id,
					parentId,
					items: item.items.map((child) => child.id),
					label: item.label,
					level,
				});
				flatItems.push(...flattenItems(item.items, item.id, level + 1));
			}
			return flatItems;
		}
		return flattenItems(items);
	}, [items]);
	return { items, flatItems };
}

function VirtualTest() {
	const { flatItems } = useTreeData();
	// The scrollable element for your list
	const parentRef = React.useRef(null);

	// The virtualizer
	const rowVirtualizer = useVirtualizer({
		count: flatItems.length,
		getScrollElement: () => parentRef.current,
		estimateSize: () => 24,
	});
	return (
		<>
			<div
				ref={parentRef}
				style={{
					height: 400,
					overflow: "auto",
				}}
			>
				<Tree.Root
					style={{
						height: rowVirtualizer.getTotalSize(),
						width: "100%",
						position: "relative",
					}}
				>
					{rowVirtualizer.getVirtualItems().map((virtualItem) => {
						const treeItem = flatItems[virtualItem.index];
						return (
							<TreeItem
								key={treeItem.id}
								style={{
									position: "absolute",
									top: 0,
									left: 0,
									width: "100%",
									height: `${virtualItem.size}px`,
									transform: `translateY(${virtualItem.start}px)`,
								}}
								label={treeItem.label}
							/>
						);
					})}
				</Tree.Root>
			</div>
		</>
	);
}
