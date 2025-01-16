/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { definePage } from "~/~utils.tsx";
import * as React from "react";
import { useVirtualizer, type VirtualItem } from "@tanstack/react-virtual";
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
		onExpanded?: () => void;
		expanded?: boolean;
	}>,
) {
	const { children, label, visibleActions, selected, style } = props;
	const isParentNode = React.Children.count(children) > 0;
	return (
		<Tree.Item
			expanded={
				props.expanded !== undefined
					? props.expanded
					: isParentNode || undefined
			}
			content={
				<>
					<Tree.Expander onClick={props.onExpanded} />
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
	data: TreeItemData;
	level: number;
}

interface VirtualTreeItemData extends TreeItemData {
	virtual: VirtualItem;
	items: VirtualTreeItemData[];
}

function useTreeData() {
	return React.useMemo(() => {
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
}

function useExpandableTree(tree: TreeItemData[]) {
	const [collapsedItems, setCollapsedItems] = React.useState(new Set<string>());
	const toggleExpanded = React.useCallback((id: string) => {
		setCollapsedItems((prev) => {
			const next = new Set(prev);
			const expanded = !prev.has(id);
			if (expanded) {
				next.add(id);
			} else {
				next.delete(id);
			}
			return next;
		});
	}, []);
	const collapsedTree = React.useMemo(() => {
		function filterItems(items: TreeItemData[]) {
			const filtered: TreeItemData[] = [];
			for (const item of items) {
				const items = collapsedItems.has(item.id)
					? []
					: filterItems(item.items);
				filtered.push({
					...item,
					items,
				});
			}
			return filtered;
		}
		return filterItems(tree);
	}, [tree, collapsedItems]);
	return { tree: collapsedTree, toggleExpanded, collapsedItems };
}

function useFlatTree(tree: TreeItemData[]) {
	return React.useMemo<FlatTreeItem[]>(() => {
		function flattenItems(items: TreeItemData[], level = 0): FlatTreeItem[] {
			const flatItems: FlatTreeItem[] = [];
			for (const item of items) {
				flatItems.push({
					id: item.id,
					data: item,
					level,
				});
				flatItems.push(...flattenItems(item.items, level + 1));
			}
			return flatItems;
		}
		return flattenItems(tree);
	}, [tree]);
}

function VirtualTest() {
	const tree = useTreeData();
	const {
		tree: collapsedTree,
		toggleExpanded,
		collapsedItems,
	} = useExpandableTree(tree);
	const flatItems = useFlatTree(collapsedTree);

	// The scrollable element for your list
	const parentRef = React.useRef(null);

	// The virtualizer
	const rowVirtualizer = useVirtualizer({
		count: flatItems.length,
		getScrollElement: () => parentRef.current,
		estimateSize: () => 24,
	});
	const virtualItems = rowVirtualizer.getVirtualItems();

	// Convert the virtual items to nested tree item structure.
	const virtualTree = React.useMemo(() => {
		const added = new Set<string>();
		const flatVirtualItems = virtualItems.map(
			(virtualItem) => flatItems[virtualItem.index].data,
		);

		function filterItems(items: TreeItemData[]) {
			const filtered: VirtualTreeItemData[] = [];
			for (const item of items) {
				const virtual = virtualItems.find((virtualItem) => {
					const flatItem = flatItems[virtualItem.index];
					return flatItem.id === item.id;
				});
				if (!virtual) continue;

				if (added.has(item.id)) continue;
				added.add(item.id);

				const items = filterItems(item.items);
				filtered.push({
					...item,
					items,
					virtual,
				});
			}
			return filtered;
		}

		return filterItems(flatVirtualItems);
	}, [virtualItems, flatItems]);
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
					<VirtualTreeItemRenderer
						items={virtualTree}
						onExpanded={(id) => {
							toggleExpanded(id);
						}}
						collapsedItems={collapsedItems}
					/>
				</Tree.Root>
			</div>
		</>
	);
}

function VirtualTreeItemRenderer(props: {
	items: VirtualTreeItemData[];
	onExpanded: (id: string) => void;
	collapsedItems: Set<string>;
}) {
	return (
		<>
			{props.items.map((item) => {
				const expanded = props.collapsedItems.has(item.id) ? false : undefined;
				return (
					<TreeItem
						key={item.id}
						style={{
							position: "absolute",
							top: 0,
							left: 0,
							width: "100%",
							height: `${item.virtual.size}px`,
							transform: `translateY(${item.virtual.start}px)`,
						}}
						label={item.label}
						expanded={expanded}
						onExpanded={() => props.onExpanded(item.id)}
					>
						{item.items.length === 0 ? undefined : (
							<VirtualTreeItemRenderer {...props} items={item.items} />
						)}
					</TreeItem>
				);
			})}
		</>
	);
}
