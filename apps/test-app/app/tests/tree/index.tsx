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
}) {
	const overflowPostfix = overflow
		? " with a super long label that is overflown"
		: "";
	return (
		<Tree.Root style={{ maxInlineSize: overflow ? 300 : undefined }}>
			<TreeItem label={`Item 1${overflowPostfix}`} selected={!!selected}>
				<TreeItem label="Item 1.1" selected={!!selected} />
				<TreeItem label="Item 1.2" actions selected={!!selected} />
				<TreeItem
					label={`Item 1.3${overflowPostfix}`}
					actions
					selected={!!selected}
				/>
			</TreeItem>
			<TreeItem label="Item 2">
				<TreeItem label={`Item 2.1${overflowPostfix}`} />
			</TreeItem>
			<TreeItem label="Item 3" actions />
		</Tree.Root>
	);
});

function TreeItem({
	children,
	label,
	actions,
	selected,
}: React.PropsWithChildren<{
	label?: React.ReactNode;
	actions?: boolean;
	selected?: boolean;
}>) {
	const isParentNode = React.Children.count(children) > 0;
	return (
		<Tree.Item
			expanded={isParentNode || undefined}
			content={
				<>
					<Icon href={placeholderIcon} />
					<Tree.Content>{label}</Tree.Content>
					<div style={{ display: "flex", gap: 4 }}>
						<IconButton
							icon={unlockIcon}
							label="Unlock"
							variant="ghost"
							aria-hidden={!actions}
							style={{ visibility: actions ? undefined : "hidden" }}
						/>
						<IconButton
							icon={showIcon}
							label="Show"
							variant="ghost"
							aria-hidden={!actions}
							style={{ visibility: actions ? undefined : "hidden" }}
						/>
					</div>
				</>
			}
			selected={selected}
		>
			{children}
		</Tree.Item>
	);
}
