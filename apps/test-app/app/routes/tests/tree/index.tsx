/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { useSearchParams } from "@remix-run/react";
import { Icon, IconButton, Tree } from "@itwin/kiwi-react/bricks";
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
	const active = searchParams.has("active");
	const isParentNode = React.Children.count(children) > 0;
	return (
		<Tree.Item
			content={
				<>
					{isParentNode ? (
						<IconButton icon={expanderIcon} label="Collapse" variant="ghost" />
					) : (
						<span style={{ inlineSize: "1.5rem" }} />
					)}
					<Icon href={placeholderIcon} />
					{content}
					{actions && (
						<div style={{ display: "flex", gap: 4, marginInlineStart: "auto" }}>
							<IconButton icon={unlockIcon} label="Unlock" variant="ghost" />
							<IconButton icon={showIcon} label="Show" variant="ghost" />
						</div>
					)}
				</>
			}
			active={active}
		>
			{children}
		</Tree.Item>
	);
}
