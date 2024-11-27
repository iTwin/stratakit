/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { useSearchParams } from "react-router";
import { Icon, IconButton, Tree } from "@itwin/kiwi-react/bricks";
import React from "react";

export const handle = { title: "Tree" };

const placeholderIcon = new URL(
	"@itwin/kiwi-icons/placeholder.svg",
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
	const [searchParams] = useSearchParams();
	const overflow = searchParams.has("overflow");
	const overflowPostfix = overflow
		? " with a super long label that is overflown"
		: "";
	return (
		<Tree.Root style={{ maxInlineSize: overflow ? 300 : undefined }}>
			<TreeItem label={`Item 1${overflowPostfix}`}>
				<TreeItem label="Item 1.1" />
				<TreeItem label="Item 1.2" actions />
				<TreeItem label={`Item 1.3${overflowPostfix}`} actions />
			</TreeItem>
			<TreeItem label="Item 2">
				<TreeItem label={`Item 2.1${overflowPostfix}`} />
			</TreeItem>
			<TreeItem label="Item 3" actions />
		</Tree.Root>
	);
}

function TreeItem({
	children,
	label,
	actions,
}: React.PropsWithChildren<{
	label?: React.ReactNode;
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
					<Tree.Expander />
					<Icon href={placeholderIcon} />
					<Tree.Content>{label}</Tree.Content>
					<div style={{ display: "flex", gap: 4, marginInlineStart: "auto" }}>
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
