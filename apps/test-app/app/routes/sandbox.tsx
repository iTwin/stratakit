/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Ariakit from "@ariakit/react";
import styles from "./sandbox.module.css";
import {
	DropdownMenu,
	Icon,
	IconButton,
	TextInput,
	Tree,
	VisuallyHidden,
} from "@itwin/kiwi-react/bricks";
import * as ListItem from "@itwin/kiwi-react-internal/src/bricks/ListItem.js";
import type { MetaFunction } from "@remix-run/react";

const title = "Kiwi sandbox";
export const meta: MetaFunction = () => {
	return [{ title }, { name: "color-scheme", content: "dark" }];
};

const placeholderIcon = new URL(
	"@itwin/kiwi-icons/placeholder.svg",
	import.meta.url,
).href;
const searchIcon = new URL("@itwin/kiwi-icons/search.svg", import.meta.url)
	.href;
const panelLeftIcon = new URL(
	"@itwin/kiwi-icons/panel-left.svg",
	import.meta.url,
).href;
const filterIcon = new URL("@itwin/kiwi-icons/filter.svg", import.meta.url)
	.href;
const dismissIcon = new URL("@itwin/kiwi-icons/dismiss.svg", import.meta.url)
	.href;

export default function Page() {
	return (
		<>
			<VisuallyHidden render={(props) => <h1 {...props} />}>
				{title}
			</VisuallyHidden>
			<div className={styles.appLayout}>
				<div className={styles.platformBar}>
					<div className={styles.logo}>
						<Icon href={placeholderIcon} size="large" />
					</div>
					<div className={styles.tools}>
						<Icon href={placeholderIcon} size="large" />
						<Icon href={placeholderIcon} size="large" />
						<Icon href={placeholderIcon} size="large" />
					</div>
				</div>
				<div className={styles.leftPanel}>
					<div className={styles.header}>
						{/* biome-ignore lint/a11y: hgroup needs an explicit role for better support */}
						<hgroup role="group">
							<h2 className={styles.panelTitle}>Epoch System iModel</h2>
							<p className={styles.panelCaption}>2024 Refresh</p>
						</hgroup>
						<div className={styles.actions}>
							<IconButton
								className={styles.shiftIconRight}
								icon={panelLeftIcon}
								label="Dock panel"
								variant="ghost"
								disabled
							/>
						</div>
					</div>
					<Subheader />
					<SandboxTree />
				</div>
				<div className={styles.canvasWrapper}>
					<div className={styles.canvas} />
				</div>
			</div>
		</>
	);
}

function SandboxTree() {
	return (
		<Tree.Root className={styles.tree}>
			<TreeItem content="Guides">
				<TreeItem content="Tree">
					<TreeItem content="Guide 4" />
					<TreeItem content="Guide 3" />
					<TreeItem content="Guide 2" />
					<TreeItem content="Guide 1" />
				</TreeItem>
			</TreeItem>
			<TreeItem content="Other">
				<TreeItem content="Object 2">
					<TreeItem content="Path 3" />
				</TreeItem>
				<TreeItem content="Object 1" />
			</TreeItem>
			<TreeItem content="Road">
				<TreeItem content="Parking lot access" />
				<TreeItem content="Site access" />
			</TreeItem>
			<TreeItem content="Parking lot">
				<TreeItem content="Parking area">
					<TreeItem content="Bay point 2" />
					<TreeItem content="Bay point 1" />
					<TreeItem content="Space point 1" />
					<TreeItem content="Path 6" />
				</TreeItem>
			</TreeItem>
			<TreeItem content="Building">
				<TreeItem content="Building area">
					<TreeItem content="Path 5" />
				</TreeItem>
			</TreeItem>
			<TreeItem content="Sewer">
				<TreeItem content="Run off pipe">
					<TreeItem content="Path 4" />
				</TreeItem>
			</TreeItem>
			<TreeItem content="Project boundary">
				<TreeItem content="Property area">
					<TreeItem content="Path 1" />
				</TreeItem>
			</TreeItem>
			<TreeItem content="Map">
				<TreeItem content="Location">
					<TreeItem content="Terrain" />
				</TreeItem>
			</TreeItem>
		</Tree.Root>
	);
}

type TreeItemProps = React.PropsWithChildren<{
	content?: React.ReactNode;
}>;

function TreeItem(props: TreeItemProps) {
	return (
		<Tree.Item
			contentNode={
				<>
					<Icon href={placeholderIcon} style={{ display: "inline" }} />
					<ListItem.Content>{props.content}</ListItem.Content>
				</>
			}
		>
			{props.children}
		</Tree.Item>
	);
}

function Subheader() {
	const [isSearching, setIsSearching] = React.useState(false);
	const searchInputRef = React.useRef<HTMLInputElement>(null);
	const subheaderRef = React.useRef<HTMLHeadingElement>(null);

	const actions = isSearching ? (
		<>
			<SortingModes />
			<IconButton
				className={styles.shiftIconRight}
				icon={dismissIcon}
				label="Close"
				variant="ghost"
				onClick={() => {
					ReactDOM.flushSync(() => setIsSearching(false));
					subheaderRef.current?.focus();
				}}
			/>
		</>
	) : (
		<IconButton
			className={styles.shiftIconRight}
			icon={searchIcon}
			label="Search"
			variant="ghost"
			onClick={() => {
				ReactDOM.flushSync(() => setIsSearching(true));
				searchInputRef.current?.focus();
			}}
		/>
	);

	return (
		<div className={styles.subheader}>
			<Ariakit.Role.h3
				className={styles.subheaderTitle}
				tabIndex={-1}
				ref={subheaderRef}
				// When searching, we don't want to show the heading content visually, but we still want it
				// in the DOM for screen readers. The heading structure of the page should remain the same.
				// biome-ignore lint/a11y/useHeadingContent: This is fine. The heading content is set by children.
				render={isSearching ? <VisuallyHidden render={<h3 />} /> : undefined}
			>
				Layers
			</Ariakit.Role.h3>

			{isSearching ? (
				<TextInput
					className={styles.searchInput}
					placeholder="Search"
					ref={searchInputRef}
				/>
			) : null}

			<div className={styles.subheaderActions}>{actions}</div>
		</div>
	);
}

function SortingModes() {
	return (
		<DropdownMenu.Root>
			<DropdownMenu.Button
				render={<IconButton icon={filterIcon} label="Filter" variant="ghost" />}
			/>
			<DropdownMenu.Content style={{ minInlineSize: 164 }}>
				<DropdownMenu.Item>Show all</DropdownMenu.Item>
				<DropdownMenu.Item>Guides</DropdownMenu.Item>
				<DropdownMenu.Item>Other</DropdownMenu.Item>
				<DropdownMenu.Item>Roadway</DropdownMenu.Item>
				<DropdownMenu.Item>Parking</DropdownMenu.Item>
				<DropdownMenu.Item>Building</DropdownMenu.Item>
				<DropdownMenu.Item>Dry utility</DropdownMenu.Item>
				<DropdownMenu.Item>Stormwater</DropdownMenu.Item>
				<DropdownMenu.Item>Sewer</DropdownMenu.Item>
				<DropdownMenu.Item>Boundary</DropdownMenu.Item>
				<DropdownMenu.Item>Map</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	);
}
