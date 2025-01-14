/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { definePage } from "~/~utils.tsx";
import * as React from "react";
import { Icon, IconButton } from "@itwin/itwinui-react/bricks";
import * as Tree from "@itwin/itwinui-react-internal/src/bricks/Tree.tsx";
import placeholderIcon from "@itwin/itwinui-icons/placeholder.svg";
import unlockIcon from "@itwin/itwinui-icons/lock-unlocked.svg";
import showIcon from "@itwin/itwinui-icons/visibility-show.svg";

export const handle = { title: "Tree" };

export default definePage(function Page({
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
});

function TreeItem({
	children,
	label,
	visibleActions,
	selected,
}: React.PropsWithChildren<{
	label?: React.ReactNode;
	visibleActions?: boolean;
	selected?: boolean;
}>) {
	const isParentNode = React.Children.count(children) > 0;
	return (
		<Tree.Item
			expanded={isParentNode || undefined}
			content={
				<>
					<Tree.ItemExpander />
					<Icon href={placeholderIcon} />
					<Tree.ItemContent label={label} />
					<Tree.ItemActions visible={visibleActions}>
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
					</Tree.ItemActions>
				</>
			}
			selected={selected}
		>
			{children}
		</Tree.Item>
	);
}
