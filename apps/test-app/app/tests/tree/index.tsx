/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import unlockIcon from "@itwin/itwinui-icons/lock-unlocked.svg";
import placeholderIcon from "@itwin/itwinui-icons/placeholder.svg";
import refreshIcon from "@itwin/itwinui-icons/refresh.svg";
import showIcon from "@itwin/itwinui-icons/visibility-show.svg";
import { Icon, Tree } from "@itwin/itwinui-react/bricks";
import * as React from "react";
import { definePage } from "~/~utils.tsx";

export const handle = { title: "Tree" };

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
				{data.map((item, index, items) => {
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

					const error = renderError && index === 0;
					return (
						<React.Fragment key={item.label}>
							<Tree.Item
								key={item.label}
								aria-level={1}
								aria-posinset={index + 1}
								aria-setsize={items.length}
								label={item.label}
								description={index === 0 ? description : undefined}
								expanded={item.expanded}
								onExpandedChange={handleExpansion}
								selected={item.selected}
								onSelectedChange={handleSelection}
								icon={<Icon href={placeholderIcon} alt="decoration" />}
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
							{item.children?.map((child, childIndex, children) => {
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
										aria-level={2}
										aria-posinset={childIndex + 1}
										aria-setsize={children.length}
										label={child.label}
										description={childIndex === 0 ? description : undefined}
										selected={child.selected}
										onSelectedChange={handleSelection}
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
										]}
									/>
								);
							})}
						</React.Fragment>
					);
				})}
			</Tree.Root>
		);
	},
	{ _actionsOverflow: ActionsOverflowTest },
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
