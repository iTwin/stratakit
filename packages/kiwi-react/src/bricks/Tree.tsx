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
import { forwardRef, type BaseProps } from "./~utils.js";

// ----------------------------------------------------------------------------

interface TreeProps extends BaseProps {}

const Tree = forwardRef<"div", TreeProps>((props, forwardedRef) => {
	const [scrollLeft, setScrollLeft] = React.useState(0);
	return (
		<TreeContext.Provider
			value={React.useMemo(() => ({ scrollLeft }), [scrollLeft])}
		>
			<Ariakit.Role.div
				{...props}
				className={cx("🥝-tree", props.className)}
				role="list"
				ref={forwardedRef}
				onScroll={(e) => {
					const el = e.currentTarget;
					setScrollLeft(el.scrollLeft);
					props.onScroll?.(e);
				}}
			>
				{props.children}
			</Ariakit.Role.div>
		</TreeContext.Provider>
	);
});
DEV: Tree.displayName = "Tree.Root";

// ----------------------------------------------------------------------------

interface TreeItemProps extends Omit<BaseProps, "content"> {
	content?: React.ReactNode;
	actions?: React.ReactNode;
	selected?: boolean;
	/** Specifies if the tree item is expanded. Used to determine if a tree item is a parent node. Defaults to `undefined`. */
	expanded?: boolean;
}

const TreeItem = forwardRef<"div", TreeItemProps>((props, forwardedRef) => {
	const {
		selected,
		content,
		children,
		className,
		expanded,
		style,
		actions,
		...rest
	} = props;

	const treeContext = React.useContext(TreeContext);
	const parentContext = React.useContext(TreeItemContext);
	const level = parentContext ? parentContext.level + 1 : 1;
	const firstSelected = !!selected && !parentContext?.selected; // TODO: temporary, only works with single selection
	const scrollLeft = treeContext?.scrollLeft ?? 0;
	return (
		<TreeItemContext.Provider
			value={React.useMemo(
				() => ({
					level,
					expanded,
					selected,
				}),
				[level, expanded, selected],
			)}
		>
			<div role="listitem" aria-current={firstSelected ? true : undefined}>
				<ListItem.Root
					{...rest}
					data-kiwi-expanded={expanded}
					data-kiwi-selected={selected}
					data-kiwi-parent-selected={parentContext?.selected}
					className={cx("🥝-tree-item", className)}
					style={
						{
							minInlineSize: actions
								? `calc(100% + ${scrollLeft}px)`
								: undefined,
							...style,
							"--🥝tree-item-level": level,
						} as React.CSSProperties
					}
					ref={forwardedRef}
					role={undefined}
				>
					{content}
					{actions}
				</ListItem.Root>
				{children && <div role="list">{children}</div>}
			</div>
		</TreeItemContext.Provider>
	);
});
DEV: TreeItem.displayName = "Tree.Item";

// ----------------------------------------------------------------------------

interface TreeItemActionsProps extends BaseProps {}

const TreeItemActions = forwardRef<"div", TreeItemActionsProps>(
	(props, forwardedRef) => {
		return (
			<Ariakit.Role.div
				{...props}
				className={cx("🥝-tree-item-actions", props.className)}
				ref={forwardedRef}
			>
				{props.children}
			</Ariakit.Role.div>
		);
	},
);
DEV: TreeItemActions.displayName = "Tree.Actions";

// ----------------------------------------------------------------------------

interface TreeItemContentProps extends BaseProps<"span"> {}

const TreeItemContent = forwardRef<"span", TreeItemContentProps>(
	(props, forwardedRef) => {
		const { children, ...rest } = props;
		return (
			<ListItem.Content
				{...rest}
				className={cx("🥝-tree-item-content", props.className)}
				ref={forwardedRef}
			>
				<button type="button">{children}</button>
			</ListItem.Content>
		);
	},
);
DEV: TreeItemContent.displayName = "Tree.Content";

// ----------------------------------------------------------------------------

type IconButtonProps = React.ComponentProps<typeof IconButton>;

interface TreeItemExpanderProps
	extends Omit<IconButtonProps, "variant" | "label" | "icon"> {
	label?: IconButtonProps["label"];
	icon?: IconButtonProps["icon"];
}

const TreeItemExpander = forwardRef<"button", TreeItemExpanderProps>(
	(props, forwardedRef) => {
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
	},
);
DEV: TreeItemExpander.displayName = "Tree.Expander";

// ----------------------------------------------------------------------------

interface TreeChevronProps extends Omit<BaseProps<"svg">, "children"> {}

const TreeChevron = forwardRef<"svg", TreeChevronProps>(
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

const TreeContext = React.createContext<
	| {
			scrollLeft: number;
	  }
	| undefined
>(undefined);

// ----------------------------------------------------------------------------

const TreeItemContext = React.createContext<
	| {
			level: number;
			expanded?: boolean;
			selected?: boolean;
	  }
	| undefined
>(undefined);

// ----------------------------------------------------------------------------

export {
	Tree as Root,
	TreeItem as Item,
	TreeItemExpander as Expander,
	TreeItemContent as Content,
	TreeItemActions as Actions,
};
