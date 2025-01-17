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

export default definePage(function Page({
	overflow = false,
	selected = false,
	actionsVisible: actionsVisibleParam = undefined,
	level: levelParam = undefined,
}) {
	const actionsVisible = actionsVisibleParam as boolean | undefined;
	const level = levelParam ? Number(levelParam) : undefined;
	const overflowPostfix = overflow
		? " with a super long label that is overflown"
		: "";
	return (
		<Tree.Root style={{ maxInlineSize: overflow ? 300 : undefined }}>
			<TreeItem label={`Item 1${overflowPostfix}`} selected={!!selected}>
				<TreeItem label="Item 1.1" selected={!!selected} />
				<TreeItem
					label="Item 1.2"
					actionsVisible={actionsVisible}
					selected={!!selected}
				/>
				<TreeItem
					label={`Item 1.3${overflowPostfix}`}
					actionsVisible={actionsVisible}
					selected={!!selected}
				/>
			</TreeItem>
			<TreeItem label="Item 2" level={level}>
				<TreeItem label={`Item 2.1${overflowPostfix}`} />
			</TreeItem>
			<TreeItem label="Item 3" actionsVisible={actionsVisible} />
		</Tree.Root>
	);
});

function TreeItem({
	children,
	label,
	actionsVisible,
	selected,
	level,
}: React.PropsWithChildren<{
	label?: React.ReactNode;
	actionsVisible?: boolean;
	selected?: boolean;
	level?: number;
}>) {
	const isParentNode = React.Children.count(children) > 0;
	return (
		<Tree.Item
			expanded={isParentNode || undefined}
			selected={selected}
			icon={placeholderIcon}
			label={label}
			level={level}
			actions={
				<>
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
				</>
			}
			actionsVisible={actionsVisible}
		>
			{children}
		</Tree.Item>
	);
}
