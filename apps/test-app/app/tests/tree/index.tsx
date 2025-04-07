/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { definePage } from "~/~utils.tsx";
import * as React from "react";
import { produce } from "immer";
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
		const [_, startTransition] = React.useTransition();
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
			},
			[],
		);
		const handleExpansion = React.useCallback((index: number) => {
			startTransition(() => {
				setData(
					produce((prev) => {
						const itemToUpdate = prev[index];
						if (itemToUpdate.expanded === undefined) return;

						itemToUpdate.expanded = !itemToUpdate.expanded;
					}),
				);
			});
		}, []);
		const handleRetry = React.useCallback(() => {
			setRenderError(false);
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
							error={error}
							onRetry={handleRetry}
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
	extends Omit<
		TreeItemProps,
		| "onSelectedChange"
		| "onExpandedChange"
		| "icon"
		| "unstable_decorations"
		| "actions"
	> {
	index: number;
	childIndex?: number;
	onSelectedChange: (index: number, childIndex?: number) => void;
	onExpandedChange: (index: number) => void;
	onRetry?: () => void;
}

function TestTreeItem(props: TestTreeItemProps) {
	const {
		index,
		childIndex,
		onSelectedChange,
		onExpandedChange,
		onRetry,
		...rest
	} = props;
	const handleSelectedChange = React.useCallback(() => {
		onSelectedChange(index, childIndex);
	}, [index, childIndex, onSelectedChange]);
	const handleExpandedChange = React.useCallback(() => {
		onExpandedChange(index);
	}, [index, onExpandedChange]);
	const icon = React.useMemo(() => {
		return childIndex === undefined ? (
			<Icon href={placeholderIcon} alt="decoration" />
		) : undefined;
	}, [childIndex]);
	const decorations = React.useMemo(() => {
		return childIndex === 0 ? (
			<>
				<Icon href={placeholderIcon} />
				<Icon href={placeholderIcon} />
			</>
		) : (
			<Icon href={placeholderIcon} />
		);
	}, [childIndex]);
	const actions = React.useMemo(() => {
		return [
			props.error && (
				<Tree.ItemAction
					key="retry"
					icon={refreshIcon}
					label="Retry"
					onClick={onRetry}
				/>
			),
			<Tree.ItemAction key="unlock" icon={unlockIcon} label="Unlock" />,
			<Tree.ItemAction key="show" icon={showIcon} label="Show" />,
		];
	}, [props.error, onRetry]);
	return (
		<Tree.Item
			onSelectedChange={handleSelectedChange}
			onExpandedChange={handleExpandedChange}
			icon={icon}
			unstable_decorations={decorations}
			actions={actions}
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
