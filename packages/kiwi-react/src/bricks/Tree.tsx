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
 * `Tree.Root` is the root component for a tree. `Tree.Item`s are rendered as a flat list in the `Tree.Root` component to create a hierarchical tree structure.
 *
 * Example:
 * ```tsx
 * <Tree.Root>
 *   <Tree.Item label="Parent 1" aria-level={1} aria-posinset={1} aria-setsize={2} />
 *   <Tree.Item label="Child 1.1" aria-level={2} aria-posinset={1} aria-setsize={2} />
 *   <Tree.Item label="Child 1.2" aria-level={2} aria-posinset={2} aria-setsize={2} />
 *   <Tree.Item label="Parent 2" aria-level={1} aria-posinset={2} aria-setsize={2} />
 *   <Tree.Item label="Child 2.1" aria-level={2} aria-posinset={1} aria-setsize={1} />
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
	/** Specifies the nesting level of the tree item. Nesting levels start at 1. */
	"aria-level": number;
	/** Defines tree item position in the current level of tree items. Integer greater than or equal to 1. */
	"aria-posinset": number;
	/** Defines tree item set size of the current level. */
	"aria-setsize": number;
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
	/**
	 * The primary label that identifies the tree item and is displayed inside it.
	 */
	label?: React.ReactNode;
	/**
	 * The actions available for the tree item. Must be a list of `Tree.ItemAction` components.
	 *
	 * Example:
	 * ```tsx
	 * actions={[
	 *   <Tree.ItemAction key={…} icon={…} label={…} />,
	 *   <Tree.ItemAction key={…} icon={…} label={…} />,
	 * ]}
	 * ```
	 */
	actions?: React.ReactNode[];
}

/**
 * A treeitem is a node in a tree structure that may be expanded or collapsed to reveal or hide its descendants.
 *
 * `Tree.Item`s can be rendered inside a `Tree.Root`. Additional properties are specified to the `Tree.Item`s to create a hierarchical tree structure.
 *
 * Example:
 * ```tsx
 * <Tree.Root>
 *   <Tree.Item label="Parent" aria-level={1} aria-posinset={1} aria-setsize={1} />
 *   <Tree.Item label="Child 1" aria-level={2} aria-posinset={1} aria-setsize={2} />
 *   <Tree.Item label="Child 2" aria-level={2} aria-posinset={2} aria-setsize={2}  />
 * </Tree.Root>
 * ```
 *
 * The `label` and `icon` props can be used to specify the treeitem's own content.
 *
 * The `aria-level` prop is used to specify the nesting level of the treeitem. Nesting levels start at 1.
 *
 * The `aria-posinset` and `aria-setsize` props are used to define the treeitem's position in the current level of tree items.
 *
 * The `expanded` and `onExpandedChange` props can be used to control the expansion state of a treeitem.
 *
 * The `selected` and `onSelectedChange` props can be used to control the selection state of a treeitem.
 *
 * Secondary actions can be passed into the `actions` prop.
 */
const TreeItem = forwardRef<"div", TreeItemProps>((props, forwardedRef) => {
	const {
		"aria-level": level,
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
				aria-level={level}
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
					<ListItem.Decoration>
						<TreeItemExpander
							onClick={() => {
								if (expanded === undefined) return;
								onExpandedChange?.(!expanded);
							}}
						/>
						{typeof icon === "string" ? <Icon href={icon} /> : icon}
					</ListItem.Decoration>
					<TreeItemContent label={label} />
					<ListItem.Decoration
						render={<TreeItemActions>{actions}</TreeItemActions>}
					/>
				</ListItem.Root>
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

const TreeItemActions = forwardRef<"div", BaseProps>((props, forwardedRef) => {
	return (
		<Ariakit.Toolbar
			{...props}
			onClick={useEventHandlers(props.onClick, (e) => e.stopPropagation())}
			className={cx("🥝-tree-item-actions", props.className)}
			ref={forwardedRef}
		>
			{props.children}
		</Ariakit.Toolbar>
	);
});
DEV: TreeItemActions.displayName = "TreeItemActions";

// ----------------------------------------------------------------------------

type IconButtonProps = React.ComponentProps<typeof IconButton>;

interface TreeItemActionProps
	extends BaseProps<"button">,
		Pick<IconButtonProps, "label" | "icon"> {
	/**
	 * Controls the visibility of the action.
	 *
	 * If `true`, the action is always visible.
	 * If `false`, the action is hidden and becomes inaccessible, but still occupies space.
	 *
	 * By default, the action is shown only when the treeitem receives hover/focus.
	 */
	visible?: boolean;
}

/**
 * A secondary action for `<Tree.Item>`, to be passed into the `actions` prop. The action is typically
 * displayed as an icon-button on the right end of the treeitem.
 *
 * By default, the action appears only on hover/focus. This can be controlled by the `visible` prop.
 */
const TreeItemAction = forwardRef<"button", TreeItemActionProps>(
	(props, forwardedRef) => {
		const { visible, ...rest } = props;

		return (
			<IconButton
				inert={visible === false ? true : undefined}
				{...rest}
				variant="ghost"
				className={cx("🥝-tree-item-action", props.className)}
				data-kiwi-visible={visible}
				ref={forwardedRef}
			/>
		);
	},
);
DEV: TreeItemAction.displayName = "Tree.ItemAction";

// ----------------------------------------------------------------------------

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
			expanded?: boolean;
			selected?: boolean;
			contentId: string;
	  }
	| undefined
>(undefined);

// ----------------------------------------------------------------------------

export { Tree as Root, TreeItem as Item, TreeItemAction as ItemAction };
