/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { definePage } from "~/~utils.tsx";
import * as React from "react";
import {
	Tree,
	Icon,
	Anchor,
	unstable_ErrorRegion as ErrorRegion,
} from "@itwin/itwinui-react/bricks";
import placeholderIcon from "@itwin/itwinui-icons/placeholder.svg";
import unlockIcon from "@itwin/itwinui-icons/lock-unlocked.svg";
import showIcon from "@itwin/itwinui-icons/visibility-show.svg";
import refreshIcon from "@itwin/itwinui-icons/refresh.svg";

export const handle = { title: "Tree" };

export default definePage(function Page({
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
		...(errorParam
			? Array.from({ length: 50 }).map((_, index) => ({
					label: `Item ${index + 4}`,
					selected: false,
				}))
			: []),
	]);

	const treeId = React.useId();
	const errorItemRef = React.useRef<HTMLElement>(null);
	const errors = React.useMemo(() => {
		return [`${treeId}-0-1`];
	}, [treeId]);
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				maxBlockSize: 500,
			}}
		>
			{renderError && (
				<ErrorRegion.Root
					label="1 issue found"
					items={[
						<ErrorRegion.Item
							key="1.2"
							message={
								<>
									<span>Failed to create hierarchy for </span>
									<Anchor href={`#${errors[0]}`}>Item 1.2</Anchor>
								</>
							}
							messageId={`${errors[0]}-message`}
							onDismiss={() => setRenderError(false)}
							actions={[
								<ErrorRegion.ItemAction
									key="retry"
									onClick={() => setRenderError(false)}
								>
									Retry
								</ErrorRegion.ItemAction>,
							]}
						/>,
					]}
				/>
			)}
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
									<Tree.ItemAction
										key="unlock"
										icon={unlockIcon}
										label="Unlock"
									/>,
									<Tree.ItemAction key="show" icon={showIcon} label="Show" />,
								]}
							/>
							{item.children?.map((child, childIndex, children) => {
								if (!item.expanded) return null;

								const handleSelection = () => {
									const newData = [...data];
									const childItem = newData[index].children?.[childIndex];
									if (childItem) childItem.selected = !childItem.selected;
									setData(newData);
								};

								const itemId = `${treeId}-${index}-${childIndex}`;
								const hasError = renderError && errors.includes(itemId);
								return (
									<Tree.Item
										key={child.label}
										id={hasError ? itemId : undefined}
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
										actions={
											hasError
												? [
														<Tree.ItemAction
															key="retry"
															icon={refreshIcon}
															label="Retry"
															visible
															onClick={() => setRenderError(false)}
														/>,
													]
												: [
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
										}
										error={hasError ? `${itemId}-message` : undefined}
										ref={hasError ? errorItemRef : undefined}
									/>
								);
							})}
						</React.Fragment>
					);
				})}
			</Tree.Root>
		</div>
	);
});
