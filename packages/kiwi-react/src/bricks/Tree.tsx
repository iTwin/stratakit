/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import cx from "classnames";
import * as Ariakit from "@ariakit/react";
import * as ListItem from "./ListItem.js";
import { IconButton } from "./IconButton.js";
import { Icon } from "./Icon.js";
import type { OptionProps, Props } from "./~utils.js";

// ----------------------------------------------------------------------------

type TreeProps = Props<"div", OptionProps>;

const Tree = React.forwardRef<React.ElementRef<"div">, TreeProps>(
	(props, forwardedRef) => {
		return (
			<Ariakit.Role.div {...props} role="list" ref={forwardedRef}>
				{props.children}
			</Ariakit.Role.div>
		);
	},
);
DEV: Tree.displayName = "Tree.Root";

// ----------------------------------------------------------------------------

type TreeItemProps = Props<"div", OptionProps, "content"> & {
	content?: React.ReactNode;
	selected?: boolean;
	/** Specifies if the tree item is expanded. Used to determine if a tree item is a parent node. Defaults to `undefined`. */
	expanded?: boolean;
};

const TreeItem = React.forwardRef<React.ElementRef<"div">, TreeItemProps>(
	(props, forwardedRef) => {
		const { selected, content, children, className, expanded, style, ...rest } =
			props;

		const parentContext = React.useContext(TreeItemContext);
		const level = parentContext ? parentContext.level + 1 : 1;
		return (
			<TreeItemContext.Provider
				value={React.useMemo(
					() => ({
						level,
						expanded,
					}),
					[level, expanded],
				)}
			>
				<div role="listitem">
					<ListItem.Root
						{...rest}
						data-kiwi-expanded={expanded}
						data-kiwi-selected={selected}
						className={cx("🥝-tree-item", className)}
						style={
							{
								...style,
								"--🥝tree-item-level": level,
							} as React.CSSProperties
						}
						ref={forwardedRef}
						role={undefined}
					>
						{content}
					</ListItem.Root>
					{children && <div role="list">{children}</div>}
				</div>
			</TreeItemContext.Provider>
		);
	},
);
DEV: TreeItem.displayName = "Tree.Item";

// ----------------------------------------------------------------------------

type TreeItemContentProps = Props<
	"span",
	OptionProps<Ariakit.RoleProps<"span">>
>;

const TreeItemContent = React.forwardRef<
	React.ElementRef<typeof ListItem.Content>,
	TreeItemContentProps
>((props, forwardedRef) => {
	return (
		<ListItem.Content
			{...props}
			className={cx("🥝-tree-item-content", props.className)}
			ref={forwardedRef}
		/>
	);
});
DEV: TreeItemContent.displayName = "Tree.Content";

// ----------------------------------------------------------------------------

type IconButtonProps = React.ComponentProps<typeof IconButton>;

interface TreeItemExpanderProps
	extends Omit<IconButtonProps, "variant" | "label" | "icon"> {
	label?: IconButtonProps["label"];
	icon?: IconButtonProps["icon"];
}

const TreeItemExpander = React.forwardRef<
	React.ElementRef<typeof IconButton>,
	TreeItemExpanderProps
>((props, forwardedRef) => {
	const context = React.useContext(TreeItemContext);
	const expanded = context?.expanded;
	return (
		<IconButton
			icon={<TreeChevron />}
			label="Toggle"
			aria-expanded={expanded === undefined ? undefined : expanded}
			{...props}
			className={cx("🥝-tree-item-expander", props.className)}
			variant="ghost"
			labelVariant="visually-hidden"
			ref={forwardedRef}
		/>
	);
});
DEV: TreeItemExpander.displayName = "Tree.Expander";

// ----------------------------------------------------------------------------

type TreeChevronProps = Props<
	"svg",
	OptionProps<Ariakit.RoleProps<"svg">>,
	"children"
>;

const TreeChevron = React.forwardRef<React.ElementRef<"svg">, TreeChevronProps>(
	(props, forwardedRef) => {
		return (
			<Icon
				{...props}
				render={
					<Ariakit.Role.svg
						width="16"
						height="16"
						fill="currentColor"
						viewBox="0 0 16 16"
						render={props.render}
					>
						<path d="M4.146 6.146a.5.5 0 0 1 .708 0L8 9.293l3.146-3.147a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 0 1 0-.708Z" />
					</Ariakit.Role.svg>
				}
				className={cx("🥝-tree-chevron", props.className)}
				ref={forwardedRef}
			/>
		);
	},
);
DEV: TreeChevron.displayName = "TreeChevron";

// ----------------------------------------------------------------------------

const TreeItemContext = React.createContext<
	| {
			level: number;
			expanded?: boolean;
	  }
	| undefined
>(undefined);

// ----------------------------------------------------------------------------

export {
	Tree as Root,
	TreeItem as Item,
	TreeItemExpander as Expander,
	TreeItemContent as Content,
};
