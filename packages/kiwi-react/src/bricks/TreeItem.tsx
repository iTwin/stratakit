/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import cx from "classnames";
import { Role } from "@ariakit/react/role";
import {
	CompositeItem,
	type CompositeItemProps,
} from "@ariakit/react/composite";
import { Toolbar } from "@ariakit/react/toolbar";
import * as ListItem from "./~utils.ListItem.js";
import { IconButton } from "./IconButton.js";
import { Icon } from "./Icon.js";
import { forwardRef, type BaseProps } from "./~utils.js";
import { useEventHandlers } from "./~hooks.js";
import { GhostAligner } from "./~utils.GhostAligner.js";

// ----------------------------------------------------------------------------

const TreeItemContext = React.createContext<
	| {
			expanded?: boolean;
			selected?: boolean;
	  }
	| undefined
>(undefined);

// ----------------------------------------------------------------------------

interface TreeItemRootProps extends Omit<BaseProps, "content" | "children"> {
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
	 * Decoration(s) to be displayed inside the tree item.
	 */
	decorations?: React.ReactNode;
	/**
	 * The primary label that identifies the tree item and is displayed inside it.
	 */
	label?: React.ReactNode;
	/** Secondary line of text to display additional information about the tree item. */
	description?: React.ReactNode;
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
const TreeItemRoot = forwardRef<"div", TreeItemRootProps>(
	(props, forwardedRef) => {
		const {
			"aria-level": level,
			selected,
			expanded,
			decorations,
			label,
			description,
			actions,
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

		const labelId = React.useId();
		const descriptionId = React.useId();
		const decorationId = React.useId();

		const describedBy = React.useMemo(() => {
			const idRefs = [];
			if (description) idRefs.push(descriptionId);
			if (decorations) idRefs.push(decorationId);
			return idRefs.length > 0 ? idRefs.join(" ") : undefined;
		}, [decorations, decorationId, description, descriptionId]);

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
				<CompositeItem
					render={<Role {...rest} />}
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
					aria-labelledby={labelId}
					aria-describedby={describedBy}
					aria-level={level}
					className={cx("🥝-tree-item", props.className)}
					ref={forwardedRef as CompositeItemProps["ref"]}
				>
					<ListItem.Root
						data-kiwi-expanded={expanded}
						data-kiwi-selected={selected}
						className="🥝-tree-item-node"
						style={{ "--🥝tree-item-level": level } as React.CSSProperties}
						role={undefined}
					>
						<ListItem.Decoration>
							<GhostAligner align={description ? "block" : undefined}>
								<TreeItemExpander
									onClick={() => {
										if (expanded === undefined) return;
										onExpandedChange?.(!expanded);
									}}
								/>
							</GhostAligner>
							<div id={decorationId} className="🥝-tree-item-decoration">
								{decorations}
							</div>
						</ListItem.Decoration>
						<ListItem.Content id={labelId} className="🥝-tree-item-content">
							{label}
						</ListItem.Content>
						{description ? (
							<ListItem.Content
								id={descriptionId}
								className="🥝-tree-item-description"
							>
								{description}
							</ListItem.Content>
						) : undefined}
						<ListItem.Decoration
							render={<TreeItemActions>{actions}</TreeItemActions>}
						/>
					</ListItem.Root>
				</CompositeItem>
			</TreeItemContext.Provider>
		);
	},
);
DEV: TreeItemRoot.displayName = "TreeItem.Root";

// ----------------------------------------------------------------------------

const TreeItemActions = forwardRef<"div", BaseProps>((props, forwardedRef) => {
	return (
		<Toolbar
			{...props}
			onClick={useEventHandlers(props.onClick, (e) => e.stopPropagation())}
			className={cx("🥝-tree-item-actions", props.className)}
			ref={forwardedRef}
		>
			{props.children}
		</Toolbar>
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
DEV: TreeItemAction.displayName = "TreeItem.Action";

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
					<Role.svg
						width="16"
						height="16"
						fill="currentColor"
						viewBox="0 0 16 16"
						render={props.render}
					>
						<path d="M4.146 6.146a.5.5 0 0 1 .708 0L8 9.293l3.146-3.147a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 0 1 0-.708Z" />
					</Role.svg>
				}
				className={cx("🥝-tree-chevron", props.className)}
				ref={forwardedRef}
			/>
		);
	},
);
DEV: TreeChevron.displayName = "TreeChevron";

// ----------------------------------------------------------------------------

export { TreeItemRoot as Root, TreeItemAction as Action };
