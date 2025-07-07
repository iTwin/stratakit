/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { Icon } from "@stratakit/foundations";
import { Tree } from "@stratakit/structures";
import { produce } from "immer";
import { definePage } from "~/~utils.tsx";

import unlockIcon from "@stratakit/icons/lock-unlocked.svg";
import placeholderIcon from "@stratakit/icons/placeholder.svg";
import refreshIcon from "@stratakit/icons/refresh.svg";
import showIcon from "@stratakit/icons/visibility-show.svg";

export const handle = { title: "Tree" };

interface TreeItem {
	label: string;
	selected: boolean;
	expanded?: boolean;
	children?: TreeItem[];
}

interface FlatTreeItem extends TreeItem {
	level: number;
	index: number;
	childIndex?: number;
	setSize: number;
}

export default definePage(
	function Page({
		overflow = false,
		selected = false,
		description: descriptionParam,
		error: errorParam,
		items: itemsParam,
	}) {
		const [_, startTransition] = React.useTransition();
		const overflowPostfix = overflow
			? " with a super long label that is overflown"
			: "";
		const description = descriptionParam ? "Additional description" : undefined;
		const [renderError, setRenderError] = React.useState(!!errorParam);
		const items = itemsParam ? Number(itemsParam) : 0;
		const [data, setData] = React.useState<TreeItem[]>(() => [
			{
				label: `Item 1${overflowPostfix}`,
				selected: !!selected,
				expanded: true,
				children: [
					{ label: "Item 1.1", selected: !!selected },
					{ label: "Item 1.2", selected: !!selected },
					{ label: `Item 1.3${overflowPostfix}`, selected: !!selected },
				],
			},
			{
				label: "Item 2",
				selected: false,
				expanded: true,
				children: [{ label: `Item 2.1${overflowPostfix}`, selected: false }],
			},
			{ label: "Item 3", selected: false },
			...Array.from({ length: items }).map((_, index) => {
				return {
					label: `Item ${index + 4}`,
					selected: false,
				};
			}),
		]);
		const flatData = React.useMemo<FlatTreeItem[]>(
			() =>
				data.flatMap((item, index, items) => {
					const flatItem = {
						...item,
						level: 1,
						index,
						setSize: items.length,
						childIndex: undefined,
					};
					if (!item.expanded) return flatItem;

					const flatChildren = item.children
						? item.children.map((child, childIndex, children) => ({
								...child,
								level: 2,
								index,
								childIndex,
								setSize: children.length,
								expanded: undefined,
							}))
						: [];
					return [flatItem, ...flatChildren];
				}),
			[data],
		);
		const handleRetry = React.useCallback(() => {
			setRenderError(false);
		}, []);
		return (
			<Tree.Root style={{ maxInlineSize: overflow ? 300 : undefined }}>
				{flatData.map((item) => {
					const { index, childIndex } = item;

					const error = renderError && index === 0 && childIndex === undefined;
					const hasDescription =
						(index === 0 && childIndex === undefined) || childIndex === 0;
					return (
						<Tree.Item
							key={item.label}
							aria-level={item.level}
							aria-posinset={index + 1}
							aria-setsize={item.setSize}
							label={item.label}
							description={hasDescription ? description : undefined}
							expanded={item.expanded}
							selected={item.selected}
							error={error}
							onSelectedChange={() => {
								setData(
									produce((prev) => {
										const itemToUpdate =
											childIndex === undefined
												? prev[index]
												: prev[index].children?.[childIndex];
										if (!itemToUpdate) return;
										itemToUpdate.selected = !itemToUpdate.selected;
									}),
								);
							}}
							onExpandedChange={() => {
								startTransition(() => {
									setData(
										produce((prev) => {
											const itemToUpdate = prev[index];
											if (itemToUpdate.expanded === undefined) return;

											itemToUpdate.expanded = !itemToUpdate.expanded;
										}),
									);
								});
							}}
							icon={
								childIndex === undefined ? (
									<Icon href={placeholderIcon} alt="decoration" />
								) : undefined
							}
							unstable_decorations={
								childIndex === 0 ? (
									<>
										<Icon href={placeholderIcon} />
										<Icon href={placeholderIcon} />
									</>
								) : (
									<Icon href={placeholderIcon} />
								)
							}
							actions={
								error
									? [
											<Tree.ItemAction
												key="retry"
												icon={refreshIcon}
												label="Retry"
												onClick={handleRetry}
												inline
											/>,
											<Tree.ItemAction
												key="unlock"
												icon={unlockIcon}
												label="Unlock"
											/>,
											<Tree.ItemAction
												key="show"
												icon={showIcon}
												label="Show"
											/>,
										]
									: [
											<Tree.ItemAction
												key="unlock"
												icon={unlockIcon}
												label="Unlock"
												inline
											/>,
											<Tree.ItemAction
												key="show"
												icon={showIcon}
												label="Show"
												inline
											/>,
										]
							}
						/>
					);
				})}
			</Tree.Root>
		);
	},
	{
		wrapperItemAction: WrapperItemAction,
		_actionsOverflow: ActionsOverflowTest,
	},
);

function ActionsOverflowTest({ count = 5, dot = false }) {
	const actions = Array.from({ length: Number(count) }).map((_, index) => (
		<Tree.ItemAction
			key={`${index + 1}`}
			label={`Action ${index + 1}`}
			icon={placeholderIcon}
			dot={dot ? "Something's going on" : undefined}
		/>
	));
	return (
		<Tree.Root>
			<Tree.Item
				label="Foo"
				aria-level={1}
				aria-posinset={1}
				aria-setsize={1}
				actions={actions}
			/>
		</Tree.Root>
	);
}

interface ItemActionProps extends React.ComponentProps<typeof Tree.ItemAction> {
	hidden?: boolean;
}

function ItemAction(props: ItemActionProps) {
	const { hidden, ...rest } = props;
	if (hidden) return null;
	return <Tree.ItemAction icon={placeholderIcon} {...rest} />;
}

function WrapperItemAction() {
	const setSize = 6;
	let posInset = 1;
	return (
		<Tree.Root>
			<Tree.Item
				label="4 inline actions"
				aria-level={1}
				aria-posinset={posInset++}
				aria-setsize={setSize}
				actions={[
					<ItemAction key="1" label="Action 1" inline />,
					<ItemAction key="2" label="Action 2" inline />,
					<ItemAction key="3" label="Action 3" inline />,
					<ItemAction key="4" label="Action 4" inline />,
				]}
			/>
			<Tree.Item
				label="Actions menu"
				aria-level={1}
				aria-posinset={posInset++}
				aria-setsize={setSize}
				actions={[
					<ItemAction key="1" label="Action 1" />,
					<ItemAction key="2" label="Action 2" />,
					<ItemAction key="3" label="Action 3" />,
					<ItemAction key="4" label="Action 4" />,
				]}
			/>
			<Tree.Item
				label="Hidden menu actions"
				aria-level={1}
				aria-posinset={posInset++}
				aria-setsize={setSize}
				actions={[
					<ItemAction key="1" label="Action 1" hidden />,
					<ItemAction key="2" label="Action 2" hidden />,
					<ItemAction key="2" label="Action 3" inline />,
				]}
			/>
			<Tree.Item
				label="Aligned actions #1"
				aria-level={1}
				aria-posinset={posInset++}
				aria-setsize={setSize}
				actions={[
					<ItemAction key="1" label="Action 1" inline />,
					<ItemAction key="2" label="Action 2" inline />,
					<ItemAction key="2" label="Action 3" />,
				]}
			/>
			<Tree.Item
				label="Aligned actions #2"
				aria-level={1}
				aria-posinset={posInset++}
				aria-setsize={setSize}
				actions={[
					<ItemAction key="1" label="Action 1" inline />,
					<ItemAction key="2" label="Action 2" inline visible={false} />,
					<ItemAction key="2" label="Action 3" />,
				]}
			/>
			<Tree.Item
				label="Single menu action"
				aria-level={1}
				aria-posinset={posInset++}
				aria-setsize={setSize}
				actions={[<ItemAction key="1" label="Action 1" />]}
			/>
		</Tree.Root>
	);
}
