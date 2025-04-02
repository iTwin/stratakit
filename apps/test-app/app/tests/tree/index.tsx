/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { definePage } from "~/~utils.tsx";
import * as React from "react";
import { Tree, Icon } from "@itwin/itwinui-react/bricks";
import placeholderIcon from "@itwin/itwinui-icons/placeholder.svg";
import unlockIcon from "@itwin/itwinui-icons/lock-unlocked.svg";
import showIcon from "@itwin/itwinui-icons/visibility-show.svg";
import refreshIcon from "@itwin/itwinui-icons/refresh.svg";

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
	}) {
		const overflowPostfix = overflow
			? " with a super long label that is overflown"
			: "";
		const description = descriptionParam ? "Additional description" : undefined;
		const [renderError, setRenderError] = React.useState(!!errorParam);
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
			...Array.from({ length: 100 }).map((_, index) => ({
				label: `Item ${index + 4}`,
				selected: false,
			})),
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
		const handleSelection = React.useCallback(
			(index: number, childIndex?: number) => {
				setData((prev) => {
					const itemToUpdate =
						childIndex === undefined
							? prev[index]
							: prev[index].children?.[childIndex];
					if (!itemToUpdate) return prev;

					const newItem = {
						...itemToUpdate,
						selected: !itemToUpdate.selected,
					};

					if (childIndex === undefined)
						return [...prev.slice(0, index), newItem, ...prev.slice(index + 1)];

					const children = prev[index].children ?? [];
					return [
						...prev.slice(0, index),
						{
							...prev[index],
							children: [
								...children.slice(0, childIndex),
								newItem,
								...children.slice(childIndex + 1),
							],
						},
						...prev.slice(index + 1),
					];
				});
			},
			[],
		);
		const handleExpansion = React.useCallback((index: number) => {
			setData((prev) => {
				const itemToUpdate = prev[index];
				if (itemToUpdate.expanded === undefined) return prev;

				const newItem = { ...itemToUpdate, expanded: !itemToUpdate.expanded };
				return [...prev.slice(0, index), newItem, ...prev.slice(index + 1)];
			});
		}, []);
		return (
			<Tree.Root style={{ maxInlineSize: overflow ? 300 : undefined }}>
				{flatData.map((item) => {
					const { index, childIndex } = item;

					const error = renderError && index === 0;
					return (
						<TestTreeItem
							key={item.label}
							index={index}
							childIndex={childIndex}
							aria-level={item.level}
							aria-posinset={index + 1}
							aria-setsize={item.setSize}
							label={item.label}
							description={index === 0 ? description : undefined}
							expanded={item.expanded}
							onExpandedChange={handleExpansion}
							selected={item.selected}
							onSelectedChange={handleSelection}
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
							actions={[
								error && (
									<Tree.ItemAction
										key="retry"
										icon={refreshIcon}
										label="Retry"
										onClick={() => setRenderError(false)}
									/>
								),
								<Tree.ItemAction
									key="unlock"
									icon={unlockIcon}
									label="Unlock"
								/>,
								<Tree.ItemAction key="show" icon={showIcon} label="Show" />,
							]}
							error={error}
						/>
					);
				})}
			</Tree.Root>
		);
	},
	{ _actionsOverflow: ActionsOverflowTest },
);

type TreeItemProps = React.ComponentProps<typeof Tree.Item>;

interface TestTreeItemProps
	extends Omit<TreeItemProps, "onSelectedChange" | "onExpandedChange"> {
	index: number;
	childIndex?: number;
	onSelectedChange: (index: number, childIndex?: number) => void;
	onExpandedChange: (index: number) => void;
}

function TestTreeItem(props: TestTreeItemProps) {
	const { index, childIndex, onSelectedChange, onExpandedChange, ...rest } =
		props;
	const handleSelectedChange = React.useCallback(() => {
		onSelectedChange(index, childIndex);
	}, [index, childIndex, onSelectedChange]);
	const handleExpandedChange = React.useCallback(() => {
		onExpandedChange(index);
	}, [index, onExpandedChange]);
	return (
		<Tree.Item
			onSelectedChange={handleSelectedChange}
			onExpandedChange={handleExpandedChange}
			{...rest}
		/>
	);
}

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
