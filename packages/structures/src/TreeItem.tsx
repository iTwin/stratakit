/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { CompositeItem } from "@ariakit/react/composite";
import { PopoverProvider } from "@ariakit/react/popover";
import { Role } from "@ariakit/react/role";
import { Toolbar, ToolbarItem } from "@ariakit/react/toolbar";
import { IconButton } from "@stratakit/bricks";
import {
	GhostAligner,
	IconButtonPresentation,
} from "@stratakit/bricks/secret-internals";
import { Icon } from "@stratakit/foundations";
import {
	forwardRef,
	useEventHandlers,
} from "@stratakit/foundations/secret-internals";
import cx from "classnames";
import { ChevronDown, MoreHorizontal, StatusIcon } from "./~utils.icons.js";
import * as ListItem from "./~utils.ListItem.js";
import * as DropdownMenu from "./DropdownMenu.js";

import type { BaseProps } from "@stratakit/foundations/secret-internals";

// ----------------------------------------------------------------------------

const TreeItemErrorContext =
	React.createContext<TreeItemProps["error"]>(undefined);
const TreeItemActionsContext =
	React.createContext<TreeItemProps["actions"]>(undefined);
const TreeItemDecorationsContext =
	React.createContext<TreeItemProps["unstable_decorations"]>(undefined);
const TreeItemIconContext =
	React.createContext<TreeItemProps["icon"]>(undefined);
const TreeItemDecorationIdContext = React.createContext<string | undefined>(
	undefined,
);
const TreeItemLabelContext =
	React.createContext<TreeItemProps["label"]>(undefined);
const TreeItemLabelIdContext = React.createContext<string | undefined>(
	undefined,
);
const TreeItemDescriptionContext =
	React.createContext<TreeItemProps["description"]>(undefined);
const TreeItemDescriptionIdContext = React.createContext<string | undefined>(
	undefined,
);

// ----------------------------------------------------------------------------

interface TreeItemProps extends Omit<BaseProps, "content" | "children"> {
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
	 * Can be a URL of an SVG from the `@stratakit/icons` package, or a JSX element.
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
	 * Excess actions should be collapsed into an overflow menu using `Tree.ItemOverflowAction` component.
	 * - Normally, the third action and onwards should overflow.
	 * - When the `error` prop is set, the _second_ action and onwards should overflow.
	 *
	 * ```tsx
	 * actions={[
	 *   <Tree.ItemAction key={…} icon={…} label={…} />,
	 *   <Tree.ItemAction key={…} icon={…} label={…} />,
	 *   <Tree.ItemOverflowAction key={…} actions={...} />,
	 * ]}
	 * ```
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
const TreeItem = React.memo(
	forwardRef<"div", TreeItemProps>((props, forwardedRef) => {
		const {
			selected,
			onSelectedChange,
			expanded,
			onExpandedChange,
			icon: _icon,
			unstable_decorations: _unstable_decorations,
			label: _label,
			description: _description,
			actions: _actions,
			error: _error,
			onClick: onClickProp,
			onKeyDown: onKeyDownProp,
			...rest
		} = props;

		const onExpanderClick = useEventHandlers(() => {
			if (expanded === undefined) return;
			onExpandedChange?.(!expanded);
		});

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

		return (
			<TreeItemRootProvider {...props}>
				<TreeItemRoot
					{...rest}
					expanded={expanded}
					selected={selected}
					onClick={useEventHandlers(onClickProp, handleClick)}
					onKeyDown={useEventHandlers(onKeyDownProp, handleKeyDown)}
					ref={forwardedRef}
				>
					{React.useMemo(
						() => (
							<TreeItemNode
								onExpanderClick={onExpanderClick}
								expanded={expanded}
								selected={selected}
							/>
						),
						[onExpanderClick, expanded, selected],
					)}
				</TreeItemRoot>
			</TreeItemRootProvider>
		);
	}),
);
DEV: TreeItem.displayName = "Tree.Item";

// ----------------------------------------------------------------------------

interface TreeItemRootProviderProps extends TreeItemProps {
	children?: React.ReactNode;
}

/**
 * Providers of the tree item.
 * @private
 */
function TreeItemRootProvider(props: TreeItemRootProviderProps) {
	const {
		actions,
		label,
		description,
		icon: iconProp,
		unstable_decorations: decorations,
		error,
	} = props;

	const labelId = React.useId();
	const descriptionId = React.useId();
	const decorationId = React.useId();

	const icon = error ? <StatusIcon tone="attention" /> : iconProp;
	const hasDecoration = icon || decorations;
	return (
		<TreeItemErrorContext.Provider value={error}>
			<TreeItemActionsContext.Provider value={actions}>
				<TreeItemDecorationIdContext.Provider
					value={hasDecoration ? decorationId : undefined}
				>
					<TreeItemDecorationsContext.Provider value={decorations}>
						<TreeItemIconContext.Provider value={icon}>
							<TreeItemLabelIdContext.Provider value={labelId}>
								<TreeItemLabelContext.Provider value={label}>
									<TreeItemDescriptionContext.Provider value={description}>
										<TreeItemDescriptionIdContext.Provider
											value={description ? descriptionId : undefined}
										>
											{props.children}
										</TreeItemDescriptionIdContext.Provider>
									</TreeItemDescriptionContext.Provider>
								</TreeItemLabelContext.Provider>
							</TreeItemLabelIdContext.Provider>
						</TreeItemIconContext.Provider>
					</TreeItemDecorationsContext.Provider>
				</TreeItemDecorationIdContext.Provider>
			</TreeItemActionsContext.Provider>
		</TreeItemErrorContext.Provider>
	);
}
DEV: TreeItemRootProvider.displayName = "TreeItemRootProvider";

// ----------------------------------------------------------------------------

interface TreeItemRootProps
	extends Omit<BaseProps, "aria-level">,
		Pick<TreeItemProps, "aria-level" | "selected" | "expanded"> {
	children?: React.ReactNode;
}

const TreeItemRoot = React.memo(
	forwardRef<"div", TreeItemRootProps>((props, forwardedRef) => {
		const {
			style: styleProp,
			"aria-level": level,
			selected,
			expanded,
			...rest
		} = props;

		const labelId = React.useContext(TreeItemLabelIdContext);
		const decorationId = React.useContext(TreeItemDecorationIdContext);
		const descriptionId = React.useContext(TreeItemDescriptionIdContext);
		const error = React.useContext(TreeItemErrorContext);

		const errorId = typeof error === "string" ? error : undefined;
		const describedBy = React.useMemo(() => {
			const ids = [];
			if (descriptionId) ids.push(descriptionId);
			if (decorationId) ids.push(decorationId);
			if (errorId) ids.push(errorId);
			return ids.length > 0 ? ids.join(" ") : undefined;
		}, [decorationId, descriptionId, errorId]);

		const style = React.useMemo(
			() =>
				({
					...styleProp,
					"--🥝tree-item-level": level,
				}) as React.CSSProperties,
			[styleProp, level],
		);
		return (
			<CompositeItem
				render={
					<Role
						{...rest}
						role="treeitem"
						aria-expanded={expanded}
						aria-selected={selected}
						aria-labelledby={labelId}
						aria-describedby={describedBy}
						aria-level={level}
						className={cx("🥝-tree-item", props.className)}
						style={style}
						ref={forwardedRef}
					/>
				}
			>
				{props.children}
			</CompositeItem>
		);
	}),
);
DEV: TreeItemRoot.displayName = "TreeItemRoot";

// ----------------------------------------------------------------------------

interface TreeItemNodeProps
	extends Pick<TreeItemProps, "expanded" | "selected">,
		Pick<TreeItemDecorationsProps, "onExpanderClick"> {}

/**
 * Displays the styled tree item node.
 * @private
 */
const TreeItemNode = React.memo((props: TreeItemNodeProps) => {
	const { expanded, selected, onExpanderClick } = props;
	const error = React.useContext(TreeItemErrorContext);
	return (
		<ListItem.Root
			data-kiwi-expanded={expanded}
			data-kiwi-selected={selected}
			data-kiwi-error={error ? true : undefined}
			className="🥝-tree-item-node"
			role={undefined}
		>
			<TreeItemDecorations onExpanderClick={onExpanderClick} />

			<TreeItemContent />
			<TreeItemDescription />

			<TreeItemActions />
		</ListItem.Root>
	);
});
DEV: TreeItemNode.displayName = "TreeItemNode";

// ----------------------------------------------------------------------------

interface TreeItemDecorationsProps {
	onExpanderClick: TreeItemExpanderProps["onClick"];
}

/**
 * Container for tree item expander and icon or other decorations.
 * @private
 */
const TreeItemDecorations = React.memo((props: TreeItemDecorationsProps) => {
	return (
		<ListItem.Decoration>
			<TreeItemExpander onClick={props.onExpanderClick} />
			<TreeItemDecoration />
		</ListItem.Decoration>
	);
});
DEV: TreeItemDecorations.displayName = "TreeItemDecorations";

// ----------------------------------------------------------------------------

/**
 * Displays an icon or multiple decorations of a `<Tree.Item>`.
 * @private
 */
function TreeItemDecoration() {
	const decorationId = React.useContext(TreeItemDecorationIdContext);
	const decorations = React.useContext(TreeItemDecorationsContext);
	const icon = React.useContext(TreeItemIconContext);
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
DEV: TreeItemDecoration.displayName = "TreeItemDecoration";

// ----------------------------------------------------------------------------

/**
 * Displays the label of a `<Tree.Item>`.
 * @private
 */
const TreeItemContent = React.memo(() => {
	const labelId = React.useContext(TreeItemLabelIdContext);
	const label = React.useContext(TreeItemLabelContext);
	return (
		<ListItem.Content id={labelId} className="🥝-tree-item-content">
			{label}
		</ListItem.Content>
	);
});
DEV: TreeItemContent.displayName = "TreeItemContent";

// ----------------------------------------------------------------------------

/**
 * Displays the description of a `<Tree.Item>`.
 * @private
 */
const TreeItemDescription = React.memo(() => {
	const description = React.useContext(TreeItemDescriptionContext);
	const descriptionId = React.useContext(TreeItemDescriptionIdContext);
	return description ? (
		<ListItem.Content id={descriptionId} className="🥝-tree-item-description">
			{description}
		</ListItem.Content>
	) : undefined;
});
DEV: TreeItemDescription.displayName = "TreeItemDescription";

// ----------------------------------------------------------------------------

/**
 * Container for secondary actions for a `<Tree.Item>`. Typically displayed on the right end.
 *
 * Semantically, this is a "toolbar". It enables arrow-key navigation and manage focus for its children.
 *
 * Excess actions will get collapsed in an overflow menu.
 */
const TreeItemActions = React.memo(
	forwardRef<"div", Omit<BaseProps, "children">>((props, forwardedRef) => {
		return (
			<ListItem.Decoration
				{...props}
				onClick={useEventHandlers(props.onClick, (e) => e.stopPropagation())}
				onKeyDown={useEventHandlers(props.onKeyDown, (e) =>
					e.stopPropagation(),
				)}
				className={cx("🥝-tree-item-actions-container", props.className)}
				ref={forwardedRef}
				render={<Toolbar focusLoop={false} />}
			>
				<TreeItemActionsContent />
			</ListItem.Decoration>
		);
	}),
);
DEV: TreeItemActions.displayName = "TreeItemActions";

// ----------------------------------------------------------------------------

/**
 * Displays the tree item actions.
 * @private
 */
function TreeItemActionsContent() {
	const actions = React.useContext(TreeItemActionsContext);
	return actions;
}
DEV: TreeItemActionsContent.displayName = "TreeItemActionsContent";

// ----------------------------------------------------------------------------

const arrowKeys = ["ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"];

const TreeItemActionsOverflowMenuContext = React.createContext(false);

interface TreeItemOverflowActionProps
	extends Omit<BaseProps<"button">, "children">,
		Pick<TreeItemActionProps, "visible"> {
	/**
	 * Label for the action.
	 * @default "More"
	 */
	label?: string;
	/**
	 * The secondary actions available for the tree item that are rendered in an overflow menu. Must be a list of `Tree.ItemAction` components.
	 */
	actions?: React.ReactNode[];
}

/**
 * An overflow menu that renders secondary actions for `<Tree.Item>`, to be passed into the `actions` prop.
 */
const TreeItemOverflowAction = React.memo(
	forwardRef<"button", TreeItemOverflowActionProps>((props, forwardedRef) => {
		const { actions: _actions, ...rest } = props;

		return (
			<TreeItemOverflowActionProvider {...props}>
				<TreeItemOverflowActionMenu {...rest} ref={forwardedRef} />
			</TreeItemOverflowActionProvider>
		);
	}),
);
DEV: TreeItemOverflowAction.displayName = "Tree.ItemOverflowAction";

// ----------------------------------------------------------------------------

interface TreeItemOverflowActionMenuProps
	extends Omit<TreeItemOverflowActionProps, "actions"> {}

const TreeItemOverflowActionMenu = React.memo(
	forwardRef<"button", TreeItemOverflowActionMenuProps>(
		(props, forwardedRef) => {
			const { label = "More", visible, ...rest } = props;
			const [open, _setOpen] = React.useState(false);
			const isArrowKeyPressed = React.useRef(false);

			const setOpen = React.useCallback((value: boolean) => {
				// Do not open the menu using arrow keys because it conflicts with the toolbar's arrow key navigation
				if (value && !isArrowKeyPressed.current) {
					_setOpen(true);
				} else {
					_setOpen(false);
				}
			}, []);

			return (
				<PopoverProvider placement="right-start">
					<DropdownMenu.Root open={open} setOpen={setOpen}>
						<DropdownMenu.Button
							{...rest}
							onKeyDown={(e) => {
								if (arrowKeys.includes(e.key)) {
									isArrowKeyPressed.current = true;
								}
								queueMicrotask(() => {
									isArrowKeyPressed.current = false;
								});
							}}
							render={
								<TreeItemAction
									label={label}
									visible={visible}
									icon={<MoreHorizontal />}
								/>
							}
							ref={forwardedRef}
						/>
						<TreeItemOverflowActionContent />
					</DropdownMenu.Root>
				</PopoverProvider>
			);
		},
	),
);
DEV: TreeItemOverflowActionMenu.displayName = "TreeItemOverflowActionMenu";

// ----------------------------------------------------------------------------

const TreeItemOverflowActionsContext =
	React.createContext<TreeItemOverflowActionProps["actions"]>(undefined);

function TreeItemOverflowActionProvider(
	props: React.PropsWithChildren<TreeItemOverflowActionProps>,
) {
	return (
		<TreeItemOverflowActionsContext.Provider value={props.actions}>
			{props.children}
		</TreeItemOverflowActionsContext.Provider>
	);
}
DEV: TreeItemOverflowActionProvider.displayName =
	"TreeItemOverflowActionProvider";

// ----------------------------------------------------------------------------

function TreeItemOverflowActionContent() {
	const actions = React.useContext(TreeItemOverflowActionsContext);
	return (
		<TreeItemActionsOverflowMenuContext.Provider value={true}>
			<DropdownMenu.Content>{actions}</DropdownMenu.Content>
		</TreeItemActionsOverflowMenuContext.Provider>
	);
}
DEV: TreeItemOverflowActionContent.displayName =
	"TreeItemOverflowActionContent";

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
	 * Can be a URL of an SVG from the `@stratakit/icons` package, or a JSX element.
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
 * A secondary action for `<Tree.Item>` and `<Tree.ItemOverflowAction>`, to be passed into the `actions` prop. The action is typically
 * displayed as an icon-button or a menu-item (e.g. when overflowing).
 *
 * By default, the action appears only when the treeitem has hover/focus or an error. This behavior can
 * be overridden using the `visible` prop.
 */
const TreeItemAction = React.memo(
	forwardRef<"button", TreeItemActionProps>((props, forwardedRef) => {
		const error = React.useContext(TreeItemErrorContext);
		const {
			visible = error ? true : undefined, // visible by default during error state
			label,
			icon,
			dot,
			...rest
		} = props;

		// return a MenuItem if inside a Menu
		if (React.useContext(TreeItemActionsOverflowMenuContext)) {
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
						// @ts-expect-error: Using string value as a workaround for React 18
						inert={visible === false ? "true" : undefined}
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
DEV: TreeItemAction.displayName = "Tree.ItemAction";

// ----------------------------------------------------------------------------

interface TreeItemExpanderProps extends Omit<BaseProps<"span">, "children"> {}

const TreeItemExpander = forwardRef<"button", TreeItemExpanderProps>(
	(props, forwardedRef) => {
		const descriptionId = React.useContext(TreeItemDescriptionIdContext);
		return (
			<GhostAligner align={descriptionId ? "block" : undefined}>
				<IconButtonPresentation
					aria-hidden="true"
					{...props}
					onClick={useEventHandlers(props.onClick, (e) => e.stopPropagation())}
					className={cx("🥝-tree-item-expander", props.className)}
					variant="ghost"
					ref={forwardedRef}
				>
					<ChevronDown />
				</IconButtonPresentation>
			</GhostAligner>
		);
	},
);
DEV: TreeItemExpander.displayName = "TreeItemExpander";

// ----------------------------------------------------------------------------

export {
	TreeItem as Root,
	TreeItemAction as Action,
	TreeItemOverflowAction as OverflowAction,
};
