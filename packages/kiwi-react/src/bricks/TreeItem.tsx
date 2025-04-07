/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import cx from "classnames";
import { Role } from "@ariakit/react/role";
import { PopoverProvider } from "@ariakit/react/popover";
import {
	CompositeItem,
	type CompositeItemProps,
} from "@ariakit/react/composite";
import { Toolbar, ToolbarItem } from "@ariakit/react/toolbar";
import * as ListItem from "./~utils.ListItem.js";
import { IconButton } from "./IconButton.js";
import * as DropdownMenu from "./DropdownMenu.js";
import { ChevronDown, Icon, StatusWarning, MoreHorizontal } from "./Icon.js";
import { forwardRef, type BaseProps } from "./~utils.js";
import { useEventHandlers, useSafeContext } from "./~hooks.js";
import { GhostAligner, useGhostAlignment } from "./~utils.GhostAligner.js";

// ----------------------------------------------------------------------------

const TreeItemErrorContext = React.createContext(false);
const TreeItemActionsContext = React.createContext<
	| {
			visible: React.ReactNode;
			overflow: React.ReactNode;
	  }
	| undefined
>(undefined);
const TreeItemOverflowActionsContext = React.createContext(false);
const TreeItemDecorationContext = React.createContext<
	| {
			decorationId: string;
			decorations: TreeItemRootProps["unstable_decorations"];
			icon: TreeItemRootProps["icon"];
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
	 */
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
	 * Can be a URL of an SVG from the `@itwin/itwinui-icons` package, or a JSX element.
	 *
	 * For multiple icons/decorations, use the `unstable_decorations` prop.
	 */
	icon?: string | React.JSX.Element;
	/**
	 * Decoration(s) to be displayed inside the tree item.
	 *
	 * This is an alternative to the `icon` prop, and can be used to
	 * display multiple icons or other decorations before the label.
	 *
	 * Note: This should _not_ be used together with the `icon` prop.
	 *
	 * @experimental
	 */
	unstable_decorations?: React.ReactNode;
	/**
	 * The primary label that identifies the tree item and is displayed inside it.
	 */
	label?: React.ReactNode;
	/** Secondary line of text to display additional information about the tree item. */
	description?: React.ReactNode;
	/**
	 * The secondary actions available for the tree item. Must be a list of `Tree.ItemAction` components.
	 *
	 * Example:
	 * ```tsx
	 * actions={[
	 *   error && <Tree.ItemAction key={…} icon={…} label={…} />,
	 *   <Tree.ItemAction key={…} icon={…} label={…} />,
	 *   <Tree.ItemAction key={…} icon={…} label={…} />,
	 * ]}
	 * ```
	 *
	 * Excess actions will automatically get collapsed into an overflow menu.
	 * - Normally, the third action and onwards will overflow.
	 * - When the `error` prop is set, the _second_ action and onwards will overflow.
	 *
	 * The actions are normally hidden until the treeitem is hovered or focused.
	 * When the `error` prop is set, the actions will be made visible by default. The first
	 * action slot can be used to display an error-related action.
	 *
	 * ```tsx
	 * actions={[
	 *   error && <Tree.ItemAction key={…} icon={…} label={…} />,
	 *   <Tree.ItemAction key={…} icon={…} label={…} />,
	 *   <Tree.ItemAction key={…} icon={…} label={…} />,
	 * ]}
	 * ```
	 *
	 * @experimental
	 */
	actions?: React.ReactNode[];
	/**
	 * Specifies if the tree item is in an error state.
	 * The id for an associated error message (e.g. `<ErrorRegion.Item>`) can be passed as a string.
	 *
	 * Can be combined with the `actions` prop to display an error-related action (e.g. "Retry").
	 * The first action will be made visible by default.
	 *
	 * @default false
	 */
	error?: boolean | string;
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
const TreeItemRoot = React.memo(
	forwardRef<"div", TreeItemRootProps>((props, forwardedRef) => {
		const {
			style,
			"aria-level": level,
			selected,
			expanded,
			icon: iconProp,
			unstable_decorations,
			label,
			description,
			actions: actionsProp,
			error,
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
		const errorId = typeof error === "string" ? error : undefined;

		const icon = error ? <StatusWarning /> : iconProp;
		const describedBy = React.useMemo(() => {
			const idRefs = [];
			if (description) idRefs.push(descriptionId);
			if (unstable_decorations || icon) idRefs.push(decorationId);
			if (errorId) idRefs.push(errorId);
			return idRefs.length > 0 ? idRefs.join(" ") : undefined;
		}, [
			unstable_decorations,
			icon,
			decorationId,
			description,
			descriptionId,
			errorId,
		]);

		const handleExpanderClick = useEventHandlers(() => {
			if (expanded === undefined) return;
			onExpandedChange?.(!expanded);
		});

		const actionsLimit = error ? 2 : 3;
		const actions = React.useMemo(() => {
			const actions = React.Children.toArray(actionsProp).filter(Boolean);
			const visible = (
				<>
					{actions.slice(0, actionsLimit - 1)}
					{actions.length === actionsLimit ? actions[actionsLimit - 1] : null}
				</>
			);
			const overflow =
				actions.length > actionsLimit
					? actions.slice(actionsLimit - 1)
					: undefined;
			return { visible, overflow };
		}, [actionsProp, actionsLimit]);

		return (
			<TreeItemErrorContext.Provider value={!!error}>
				<TreeItemActionsContext.Provider value={actions}>
					<TreeItemOverflowActionsContext.Provider value={!!actions.overflow}>
						<TreeItemDecorationContext.Provider
							value={React.useMemo(
								() => ({
									decorationId,
									decorations: unstable_decorations,
									icon,
								}),
								[decorationId, unstable_decorations, icon],
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
								style={
									{
										...style,
										"--🥝tree-item-level": level,
									} as React.CSSProperties
								}
								ref={forwardedRef as CompositeItemProps["ref"]}
							>
								<TreeItemNode
									selected={selected}
									description={description}
									label={label}
									onExpanderClick={handleExpanderClick}
									descriptionId={descriptionId}
									labelId={labelId}
								/>
							</CompositeItem>
						</TreeItemDecorationContext.Provider>
					</TreeItemOverflowActionsContext.Provider>
				</TreeItemActionsContext.Provider>
			</TreeItemErrorContext.Provider>
		);
	}),
);
DEV: TreeItemRoot.displayName = "TreeItem.Root";

// ----------------------------------------------------------------------------

interface TreeItemNodeProps
	extends Pick<TreeItemRootProps, "selected" | "description" | "label"> {
	onExpanderClick: TreeItemExpanderProps["onClick"];
	descriptionId: string;
	labelId: string;
}

const TreeItemNode = React.memo((props: TreeItemNodeProps) => {
	const {
		selected,
		description,
		onExpanderClick,
		descriptionId,
		labelId,
		label,
	} = props;
	const error = React.useContext(TreeItemErrorContext);
	return (
		<ListItem.Root
			data-kiwi-selected={selected}
			data-kiwi-error={error ? true : undefined}
			className="🥝-tree-item-node"
			role={undefined}
		>
			<ListItem.Decoration>
				<GhostAligner align={description ? "block" : undefined}>
					<TreeItemExpander onClick={onExpanderClick} />
				</GhostAligner>
				<TreeItemDecoration />
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

			<TreeItemActions />
		</ListItem.Root>
	);
});
DEV: TreeItemNode.displayName = "TreeItemNode";

// ----------------------------------------------------------------------------

function TreeItemDecoration() {
	const { decorationId, decorations, icon } =
		React.useContext(TreeItemDecorationContext) ?? {};
	return icon || decorations ? (
		<Role
			className="🥝-tree-item-decoration"
			id={decorationId}
			render={
				React.isValidElement(icon) ? (
					icon
				) : typeof icon === "string" ? (
					<Icon href={icon} />
				) : undefined
			}
		>
			{!icon ? decorations : null}
		</Role>
	) : null;
}

/**
 * Container for secondary actions for a `<Tree.Item>`. Typically displayed on the right end.
 *
 * Semantically, this is a "toolbar". It enables arrow-key navigation and manage focus for its children.
 *
 * Excess actions will get collapsed in an overflow menu.
 */
const TreeItemActions = React.memo(
	forwardRef<"div", Omit<BaseProps, "children">>((props, forwardedRef) => {
		const overflowActions = React.useContext(TreeItemOverflowActionsContext);

		return (
			<ListItem.Decoration
				{...props}
				onClick={useEventHandlers(props.onClick, (e) => e.stopPropagation())}
				onKeyDown={useEventHandlers(props.onKeyDown, (e) =>
					e.stopPropagation(),
				)}
				className={cx("🥝-tree-item-actions-container", props.className)}
				ref={forwardedRef}
				render={
					<Toolbar focusLoop={false}>
						<TreeItemVisibleActions />
						{overflowActions ? <TreeItemActionsOverflowMenu /> : null}
					</Toolbar>
				}
			/>
		);
	}),
);
DEV: TreeItemActions.displayName = "TreeItemActions";

// ----------------------------------------------------------------------------

function TreeItemVisibleActions() {
	const { visible } = React.useContext(TreeItemActionsContext) ?? {};
	return visible;
}
DEV: TreeItemVisibleActions.displayName = "TreeItemVisibleActions";

// ----------------------------------------------------------------------------

const arrowKeys = ["ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"];

const TreeItemActionsOverflowMenuContext = React.createContext(false);

/**
 * Displays overflowing actions inside a dropdown menu.
 * @private
 */
function TreeItemActionsOverflowMenu() {
	const [open, setOpen] = React.useState(false);
	const isArrowKeyPressed = React.useRef(false);

	return (
		<PopoverProvider placement="right-start">
			<DropdownMenu.Root
				open={open}
				setOpen={React.useCallback((value: boolean) => {
					// Do not open the menu using arrow keys because it conflicts with the toolbar's arrow key navigation
					if (value && !isArrowKeyPressed.current) {
						setOpen(true);
					} else {
						setOpen(false);
					}
				}, [])}
			>
				<DropdownMenu.Button
					onKeyDown={(e) => {
						if (arrowKeys.includes(e.key)) {
							isArrowKeyPressed.current = true;
						}
						queueMicrotask(() => {
							isArrowKeyPressed.current = false;
						});
					}}
					render={<TreeItemAction label="More" icon={<MoreHorizontal />} />}
				/>
				<TreeItemActionsOverflowMenuContext.Provider value={true}>
					<TreeItemActionsOverflowMenuContent />
				</TreeItemActionsOverflowMenuContext.Provider>
			</DropdownMenu.Root>
		</PopoverProvider>
	);
}
DEV: TreeItemActionsOverflowMenu.displayName = "TreeItemActionsOverflowMenu";

// ----------------------------------------------------------------------------

function TreeItemActionsOverflowMenuContent() {
	const { overflow } = React.useContext(TreeItemActionsContext) ?? {};
	return <DropdownMenu.Content>{overflow}</DropdownMenu.Content>;
}
DEV: TreeItemActionsOverflowMenu.displayName = "TreeItemActionsOverflowMenu";

// ----------------------------------------------------------------------------

interface TreeItemActionProps extends Omit<BaseProps<"button">, "children"> {
	/**
	 * Label for the action.
	 *
	 * Will be displayed as a tooltip when the action is an icon-button,
	 * otherwise will be displayed as a label inside the menu-item.
	 */
	label: string;

	/**
	 * Icon for the action.
	 *
	 * Can be a URL of an SVG from the `@itwin/itwinui-icons` package, or a JSX element.
	 *
	 * Required when the action is displayed as an icon-button (i.e. not overflowing).
	 */
	icon?: string | React.JSX.Element;

	/**
	 * Controls the visibility of the action (only when the action is displayed as icon-button).
	 *
	 * If `true`, the action is always visible.
	 * If `false`, the action is hidden and becomes inaccessible, but still occupies space.
	 *
	 * By default, the action is shown only when the treeitem receives hover/focus. When the
	 * treeitem has an `error`, the action will become always visible (i.e. it will default
	 * to `true` when `error` is set).
	 */
	visible?: boolean;

	/**
	 * A small dot displayed in the corner of the action.
	 *
	 * The value of this prop gets used as the button's "accessible description".
	 *
	 * Example:
	 * ```tsx
	 * <Tree.ItemAction
	 *   label="Filter"
	 *   dot="Some filters applied"
	 *   icon={…}
	 * />
	 * ```
	 */
	dot?: string;
}

/**
 * A secondary action for `<Tree.Item>`, to be passed into the `actions` prop. The action is typically
 * displayed as an icon-button or a menu-item (e.g. when overflowing).
 *
 * By default, the action appears only when the treeitem has hover/focus or an error. This behavior can
 * be overridden using the `visible` prop.
 */
const TreeItemAction = React.memo(
	forwardRef<"button", TreeItemActionProps>((props, forwardedRef) => {
		const error = useSafeContext(TreeItemErrorContext);
		const {
			visible = error ? true : undefined, // visible by default during error state
			label,
			icon,
			dot,
			...rest
		} = props;

		// return a MenuItem if inside a Menu
		if (React.useContext(TreeItemActionsOverflowMenuContext)) {
			DEV: {
				if (visible !== undefined)
					console.warn("overflowing actions should not use `visible` prop");
			}

			return (
				<DropdownMenu.Item
					{...rest}
					label={label}
					icon={icon}
					unstable_dot={dot}
					ref={forwardedRef}
				/>
			);
		}

		DEV: {
			if (!icon)
				throw new Error(
					"`icon` prop is required when the action is displayed as a button",
				);
		}

		return (
			<ToolbarItem
				render={
					<IconButton
						label={label}
						icon={icon}
						inert={visible === false ? true : undefined}
						{...rest}
						dot={dot}
						variant="ghost"
						className={cx("🥝-tree-item-action", props.className)}
						data-kiwi-visible={visible}
						ref={forwardedRef}
					/>
				}
			/>
		);
	}),
);
DEV: TreeItemAction.displayName = "TreeItem.Action";

// ----------------------------------------------------------------------------

interface TreeItemExpanderProps extends Omit<BaseProps<"span">, "children"> {}

const TreeItemExpander = forwardRef<"button", TreeItemExpanderProps>(
	(props, forwardedRef) => {
		return (
			<Role.span
				aria-hidden="true"
				{...props}
				onClick={useEventHandlers(props.onClick, (e) => e.stopPropagation())}
				className={cx(
					"🥝-button",
					"🥝-icon-button",
					"🥝-ghost-aligner",
					"🥝-tree-item-expander",
					props.className,
				)}
				data-kiwi-variant="ghost"
				data-kiwi-ghost-align={useGhostAlignment()}
				ref={forwardedRef}
			>
				<ChevronDown />
			</Role.span>
		);
	},
);
DEV: TreeItemExpander.displayName = "TreeItemExpander";

// ----------------------------------------------------------------------------

export { TreeItemRoot as Root, TreeItemAction as Action };
