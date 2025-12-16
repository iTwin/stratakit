/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { Icon } from "@stratakit/foundations";
import { Root } from "@stratakit/mui";
import { Tree } from "@stratakit/structures";
import { produce } from "immer";
import { definePage, useColorScheme } from "~/~utils.tsx";

import type { VariantProps } from "~/~utils.tsx";

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
		visible: visibleParam,
	}) {
		const [_, startTransition] = React.useTransition();
		const overflowPostfix = overflow
			? " with a super long label that is overflown"
			: "";
		const visible = visibleParam ? Boolean(visibleParam) : undefined;
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
		const colorScheme = useColorScheme();
		return (
			<Root colorScheme={colorScheme}>
				<Tree.Root style={{ maxInlineSize: overflow ? 300 : undefined }}>
					{flatData.map((item) => {
						const { index, childIndex } = item;

						const error =
							renderError && index === 0 && childIndex === undefined;
						const hasDescription =
							(index === 0 && childIndex === undefined) || childIndex === 0;
						return (
							<Tree.Item
								key={item.label}
								aria-level={item.level}
								aria-posinset={
									childIndex !== undefined ? childIndex + 1 : index + 1
								}
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
								inlineActions={
									error
										? [
												<Tree.ItemAction
													key="retry"
													icon={refreshIcon}
													label="Retry"
													onClick={handleRetry}
												/>,
											]
										: [
												<Tree.ItemAction
													key="unlock"
													icon={unlockIcon}
													label="Unlock"
													visible={visible}
												/>,
												<Tree.ItemAction
													key="show"
													icon={showIcon}
													label="Show"
													visible={visible}
												/>,
											]
								}
								actions={
									error
										? [
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
										: undefined
								}
							/>
						);
					})}
				</Tree.Root>
			</Root>
		);
	},
	{
		actions: ActionsTest,
		_expansion: ExpansionTest,
	},
);
interface ItemActionProps extends React.ComponentProps<typeof Tree.ItemAction> {
	hidden?: boolean;
}

function ItemAction(props: ItemActionProps) {
	const { hidden, ...rest } = props;
	if (hidden) return null;
	return <Tree.ItemAction icon={placeholderIcon} {...rest} />;
}

function ActionsTest({
	inline: inlineParam,
	menu: menuParam,
	dot,
	error: errorParam,
	hiddenIds: hiddenIdsParam,
}: VariantProps) {
	const inline = inlineParam ? Number(inlineParam) : 2;
	const menu = menuParam ? Number(menuParam) : 3;
	const error = errorParam ? Boolean(errorParam) : undefined;
	const hiddenIds = hiddenIdsParam
		? hiddenIdsParam.split(";").map((id) => Number(id))
		: [];

	const allActions = Array.from({ length: inline + menu }, (_, index) => {
		const id = index + 1;
		return (
			<ItemAction
				key={id}
				label={`Action ${id}`}
				dot={dot ? "Something's going on" : undefined}
				hidden={hiddenIds.includes(id)}
			/>
		);
	});
	const inlineActions = allActions.slice(0, inline);
	const actions = allActions.slice(inline);

	const colorScheme = useColorScheme();
	return (
		<Root colorScheme={colorScheme}>
			<Tree.Root>
				<Tree.Item
					label="Item 1"
					aria-level={1}
					aria-posinset={1}
					aria-setsize={1}
					inlineActions={inlineActions}
					actions={actions}
					error={error}
				/>
			</Tree.Root>
		</Root>
	);
}

// ----------------------------------------------------------------------------

function ExpansionTest({ selectable }: VariantProps) {
	const [expanded, setExpanded] = React.useState(false);
	const colorScheme = useColorScheme();
	return (
		<Root colorScheme={colorScheme}>
			<Tree.Root>
				<Tree.Item
					label="Parent Item"
					aria-level={1}
					aria-posinset={1}
					aria-setsize={1}
					expanded={expanded}
					onExpandedChange={setExpanded}
					selected={selectable ? false : undefined}
				/>
				{expanded && (
					<>
						<Tree.Item
							label="Child Item 1"
							aria-level={2}
							aria-posinset={1}
							aria-setsize={2}
						/>
						<Tree.Item
							label="Child Item 2"
							aria-level={2}
							aria-posinset={2}
							aria-setsize={2}
						/>
					</>
				)}
			</Tree.Root>
		</Root>
	);
}
