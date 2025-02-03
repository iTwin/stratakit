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
import { useEventHandlers } from "./~hooks.js";

// ----------------------------------------------------------------------------

interface TreeProps extends BaseProps {}

/**
 * A tree is a hierarchical list of items that can be expanded or collapsed, or optionally selected.
 *
 * `Tree.Root` is the root component for a tree. `Tree.Item`s can be nested inside a `Tree.Root` to create a hierarchical tree structure.
 *
 * Example:
 * ```tsx
 * <Tree.Root>
 *   <Tree.Item label="Parent 1">
 *     <Tree.Item label="Child 1.1" />
 *     <Tree.Item label="Child 1.2" />
 *   </Tree.Item>
 *   <Tree.Item label="Parent 2">
 *     <Tree.Item label="Child 2.1" />
 *   </Tree.Item>
 * </Tree.Root>
 * ```
 */
const Tree = forwardRef<"div", TreeProps>((props, forwardedRef) => {
	const composite = Ariakit.useCompositeStore({ orientation: "vertical" });

	return (
		<Ariakit.Role.div
			role="tree"
			{...props}
			render={<Ariakit.Composite store={composite} />}
			className={cx("🥝-tree", props.className)}
			ref={forwardedRef}
		>
			{props.children}
		</Ariakit.Role.div>
	);
});
DEV: Tree.displayName = "Tree.Root";

// ----------------------------------------------------------------------------

interface TreeItemProps extends Omit<BaseProps, "content"> {
	/**
	 * Specifies if the tree item is selected.
	 *
	 * If `undefined`, the tree item is not selectable.
	 *
	 * @default undefined
	 */
	selected?: boolean;
	/**
	 * Callback fired when the tree item is selected.
	 *
	 * Should be used with the `selected` prop.
	 */
	onSelectedChange?: (selected: boolean) => void;
	/**
	 * Specifies if the tree item is expanded.
	 *
	 * Used to determine if a tree item is a parent node. If `undefined`, it is a leaf node (i.e. not expandable).
	 *
	 * @default undefined
	 * */
	expanded?: boolean;
	/**
	 * Callback fired when the tree item is expanded.
	 *
	 * Should be used with the `expanded` prop.
	 */
	onExpandedChange?: (expanded: boolean) => void;
	/**
	 * Icon to be displayed inside the tree item.
	 *
	 * Can be a URL of an SVG from the `kiwi-icons` package, or a JSX element.
	 */
	icon?: string | React.JSX.Element;
	/** The label to display for the tree item. */
	label?: React.ReactNode;
	/** The actions available for the tree item. */
	actions?: React.ReactNode;
}

/**
 * A treeitem is a node in a tree structure that may be expanded or collapsed to reveal or hide its descendants.
 *
 * `Tree.Item`s can be nested as JSX elements inside a `Tree.Root` to create a hierarchical tree structure.
 *
 * Example:
 * ```tsx
 * <Tree.Root>
 *   <Tree.Item label="Parent">
 *     <Tree.Item label="Child 1" />
 *     <Tree.Item label="Child 2" />
 *   </Tree.Item>
 * </Tree.Root>
 * ```
 *
 * The `label` and `icon` props can be used to specify the treeitem's own content. `children` is only used for nested items.
 *
 * The `expanded` and `onExpandedChange` props can be used to control the expansion state of a treeitem.
 *
 * The `selected` and `onSelectedChange` props can be used to control the selection state of a treeitem.
 */
const TreeItem = forwardRef<"div", TreeItemProps>((props, forwardedRef) => {
	const {
		selected,
		children,
		expanded,
		icon,
		label,
		actions,
		style,
		onSelectedChange,
		onExpandedChange,
		onClick: onClickProp,
		onKeyDown: onKeyDownProp,
		...rest
	} = props;

	const parentContext = React.useContext(TreeItemContext);
	const level = parentContext ? parentContext.level + 1 : 1;

	const handleClick = (event: React.MouseEvent) => {
		if (selected === undefined) return;

		event.stopPropagation(); // Avoid selecting parent treeitem
		onSelectedChange?.(!selected);
	};

	const handleKeyDown = (event: React.KeyboardEvent) => {
		if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
			return;
		}

		if (expanded === undefined) return;

		if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
			event.preventDefault(); // Prevent scrolling

			onExpandedChange?.(event.key === "ArrowRight");
		}
	};

	const contentId = React.useId();

	return (
		<TreeItemContext.Provider
			value={React.useMemo(
				() => ({
					level,
					expanded,
					selected,
					contentId,
				}),
				[level, expanded, selected, contentId],
			)}
		>
			<Ariakit.CompositeItem
				render={<Ariakit.Role {...rest} />}
				onClick={
					useEventHandlers(
						onClickProp,
						handleClick,
					) as unknown as React.MouseEventHandler<HTMLButtonElement>
				}
				onKeyDown={
					useEventHandlers(
						onKeyDownProp,
						handleKeyDown,
					) as unknown as React.KeyboardEventHandler<HTMLButtonElement>
				}
				role="treeitem"
				aria-expanded={expanded}
				aria-selected={selected}
				aria-labelledby={contentId}
				className={cx("🥝-tree-item", props.className)}
				ref={forwardedRef as Ariakit.CompositeItemProps["ref"]}
			>
				<ListItem.Root
					data-kiwi-expanded={expanded}
					data-kiwi-selected={selected}
					className="🥝-tree-item-node"
					style={{ "--🥝tree-item-level": level } as React.CSSProperties}
					role={undefined}
				>
					<TreeItemExpander
						onClick={() => {
							if (expanded === undefined) return;
							onExpandedChange?.(!expanded);
						}}
					/>
					{typeof icon === "string" ? <Icon href={icon} /> : icon}
					<TreeItemContent label={label} />
					<TreeItemActions>{actions}</TreeItemActions>
				</ListItem.Root>
				{children && <div role="group">{children}</div>}
			</Ariakit.CompositeItem>
		</TreeItemContext.Provider>
	);
});
DEV: TreeItem.displayName = "Tree.Item";

// ----------------------------------------------------------------------------

interface TreeItemContentProps extends Omit<BaseProps<"span">, "children"> {
	label?: React.ReactNode;
}

const TreeItemContent = forwardRef<"span", TreeItemContentProps>(
	(props, forwardedRef) => {
		const { label, ...rest } = props;

		const { contentId } = React.useContext(TreeItemContext) ?? {};

		return (
			<ListItem.Content
				{...rest}
				id={contentId}
				className={cx("🥝-tree-item-content", props.className)}
				ref={forwardedRef}
			>
				{label}
			</ListItem.Content>
		);
	},
);
DEV: TreeItemContent.displayName = "TreeItemContent";

// ----------------------------------------------------------------------------

interface TreeItemActionsProps extends BaseProps {
	visible?: boolean;
}

const TreeItemActions = forwardRef<"div", TreeItemActionsProps>(
	(props, forwardedRef) => {
		const { visible, ...rest } = props;

		return (
			<Ariakit.Toolbar
				{...rest}
				onClick={useEventHandlers(props.onClick, (e) => e.stopPropagation())}
				className={cx("🥝-tree-item-actions", props.className)}
				data-kiwi-visible={visible}
				ref={forwardedRef}
			>
				{props.children}
			</Ariakit.Toolbar>
		);
	},
);
DEV: TreeItemActions.displayName = "TreeItemActions";

// ----------------------------------------------------------------------------

type IconButtonProps = React.ComponentProps<typeof IconButton>;

interface TreeItemExpanderProps
	extends Omit<IconButtonProps, "variant" | "label" | "icon"> {}

const TreeItemExpander = forwardRef<"button", TreeItemExpanderProps>(
	(props, forwardedRef) => {
		return (
			<IconButton
				tabIndex={-1}
				aria-hidden="true"
				icon={<TreeChevron />}
				label="Toggle"
				{...props}
				onClick={useEventHandlers(props.onClick, (e) => e.stopPropagation())}
				className={cx("🥝-tree-item-expander", props.className)}
				variant="ghost"
				labelVariant="visually-hidden"
				ref={forwardedRef}
			/>
		);
	},
);
DEV: TreeItemExpander.displayName = "TreeItemExpander";

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

const TreeItemContext = React.createContext<
	| {
			level: number;
			expanded?: boolean;
			selected?: boolean;
			contentId: string;
	  }
	| undefined
>(undefined);

// ----------------------------------------------------------------------------

export { Tree as Root, TreeItem as Item };
