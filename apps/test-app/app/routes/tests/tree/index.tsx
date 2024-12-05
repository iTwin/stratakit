/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { useSearchParams } from "react-router";
import { Icon, IconButton } from "@itwin/kiwi-react/bricks";
import * as Tree from "@itwin/kiwi-react-internal/src/bricks/Tree.js";
import React from "react";

export const handle = { title: "Tree" };

const placeholderIcon = new URL(
	"@itwin/kiwi-icons/placeholder.svg",
	import.meta.url,
).href;
const expanderIcon = new URL(
	"@itwin/kiwi-icons/chevron-down.svg",
	import.meta.url,
).href;
const unlockIcon = new URL(
	"@itwin/kiwi-icons/lock-unlocked.svg",
	import.meta.url,
).href;
const showIcon = new URL(
	"@itwin/kiwi-icons/visibility-show.svg",
	import.meta.url,
).href;

export default function Page() {
	return (
		<Tree.Root>
			<TreeItem content="Item 1">
				<TreeItem content="Item 1.1" />
				<TreeItem content="Item 1.2" actions />
				<TreeItem content="Item 1.3" actions />
			</TreeItem>
			<TreeItem content="Item 2">
				<TreeItem content="Item 2.1" />
			</TreeItem>
			<TreeItem content="Item 3" actions />
		</Tree.Root>
	);
}

function TreeItem({
	children,
	content,
	actions,
}: React.PropsWithChildren<{
	content?: React.ReactNode;
	actions?: boolean;
}>) {
	const [searchParams] = useSearchParams();
	const selected = searchParams.has("selected");
	const isParentNode = React.Children.count(children) > 0;
	return (
		<Tree.Item
			expanded={isParentNode || undefined}
			content={
				<>
					{isParentNode ? (
						<TreeItemButton
							icon={expanderIcon}
							label="Collapse"
							variant="ghost"
						/>
					) : (
						<span style={{ inlineSize: "1.5rem" }} />
					)}
					<Icon href={placeholderIcon} />
					{content}
					{actions && (
						<div style={{ display: "flex", gap: 4, marginInlineStart: "auto" }}>
							<TreeItemButton
								icon={unlockIcon}
								label="Unlock"
								variant="ghost"
							/>
							<TreeItemButton icon={showIcon} label="Show" variant="ghost" />
						</div>
					)}
				</>
			}
			selected={selected}
		>
			{children}
		</Tree.Item>
	);
}

function TreeItemButton(props: React.ComponentProps<typeof IconButton>) {
	return (
		<IconButton
			{...props}
			// TODO: IconButton inside ListItem. Button block size matches the TreeItem, while ListItem adds additional padding.
			style={{ marginBlock: -6, ...props.style }}
			variant="ghost"
		/>
	);
}
