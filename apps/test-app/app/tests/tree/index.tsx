/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { definePage } from "~/~utils.tsx";
import * as React from "react";
import { IconButton } from "@itwin/itwinui-react/bricks";
import * as Tree from "@itwin/itwinui-react-internal/src/bricks/Tree.tsx";
import placeholderIcon from "@itwin/itwinui-icons/placeholder.svg";
import unlockIcon from "@itwin/itwinui-icons/lock-unlocked.svg";
import showIcon from "@itwin/itwinui-icons/visibility-show.svg";

export const handle = { title: "Tree" };

export default definePage(
	function Page({ overflow = false, selected = false }) {
		const overflowPostfix = overflow
			? " with a super long label that is overflown"
			: "";

		const [data, setData] = React.useState(() => [
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

		return (
			<Tree.Root style={{ maxInlineSize: overflow ? 300 : undefined }}>
				{data.map((item, index) => {
					const handleSelection = () => {
						const oldSelected = data[index].selected;

						const newData = [...data];
						newData[index].selected = !oldSelected;
						setData(newData);
					};

					const handleExpansion = () => {
						const oldExpanded = data[index].expanded;
						if (oldExpanded === undefined) return;

						const newData = [...data];
						newData[index].expanded = !oldExpanded;
						setData(newData);
					};

					return (
						<Tree.Item
							key={item.label}
							label={item.label}
							expanded={item.expanded}
							onExpandedChange={handleExpansion}
							selected={item.selected}
							onSelectedChange={handleSelection}
							icon={placeholderIcon}
							actions={
								<>
									<IconButton
										icon={unlockIcon}
										label="Unlock"
										variant="ghost"
									/>
									<IconButton icon={showIcon} label="Show" variant="ghost" />
								</>
							}
						>
							{item.children?.map((child, childIndex) => {
								if (!item.expanded) return null;

								const handleSelection = () => {
									const newData = [...data];
									const childItem = newData[index].children?.[childIndex];
									if (childItem) childItem.selected = !childItem.selected;
									setData(newData);
								};

								return (
									<Tree.Item
										key={child.label}
										label={child.label}
										selected={child.selected}
										onSelectedChange={handleSelection}
										icon={placeholderIcon}
										actions={
											<>
												<IconButton
													icon={unlockIcon}
													label="Unlock"
													variant="ghost"
												/>
												<IconButton
													icon={showIcon}
													label="Show"
													variant="ghost"
												/>
											</>
										}
									/>
								);
							})}
						</Tree.Item>
					);
				})}
			</Tree.Root>
		);
	},
	{
		multiSelect: MultiSelectTest,
	},
);

function TreeItem({
	children,
	label,
	selected,
}: React.PropsWithChildren<{
	label?: React.ReactNode;
	selected?: boolean;
}>) {
	const isParentNode = React.Children.count(children) > 0;
	return (
		<Tree.Item
			expanded={isParentNode || undefined}
			selected={selected}
			icon={placeholderIcon}
			label={label}
			actions={
				<>
					<IconButton icon={unlockIcon} label="Unlock" variant="ghost" />
					<IconButton icon={showIcon} label="Show" variant="ghost" />
				</>
			}
		>
			{children}
		</Tree.Item>
	);
}

function MultiSelectTest() {
	return (
		<Tree.Root>
			<TreeItem label="Item 1" selected>
				<TreeItem label="Item 1.1" selected />
				<TreeItem label="Item 1.2">
					<TreeItem label="Item 1.2.1" />
					<TreeItem label="Item 1.2.2" selected />
					<TreeItem label="Item 1.2.3" />
				</TreeItem>
				<TreeItem label="Item 1.3" selected />
			</TreeItem>
			<TreeItem label="Item 2">
				<TreeItem label="Item 2.1" selected />
			</TreeItem>
			<TreeItem label="Item 3" selected />
		</Tree.Root>
	);
}
