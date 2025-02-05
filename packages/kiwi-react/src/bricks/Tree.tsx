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
import { VisuallyHidden } from "./VisuallyHidden.js";

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
 *   <Tree.Item label="Parent 1" value="parent-1" />
 *   <Tree.Item label="Child 1.1" value="child-1-1" parentValue="parent-1" />
 *   <Tree.Item label="Child 1.2" value="child-1-2" parentValue="parent-1" />
 *   <Tree.Item label="Parent 2" value="parent-2" />
 *   <Tree.Item label="Child 2.1" value="child-2-1" parentValue="parent-2" />
 * </Tree.Root>
 * ```
 */
const Tree = forwardRef<"div", TreeProps>((props, forwardedRef) => {
	const composite = Ariakit.useCompositeStore({ orientation: "vertical" });
	const baseId = React.useId();

	const [nodes, setNodes] = React.useState<NodesMap>(() => new Map());

	return (
		<TreeContext.Provider
			value={React.useMemo(
				() => ({ baseId, nodes, setNodes }),
				[baseId, nodes],
			)}
		>
			<Ariakit.Role.div
				role="tree"
				{...props}
				render={<Ariakit.Composite store={composite} />}
				className={cx("🥝-tree", props.className)}
				ref={forwardedRef}
			>
				{props.children}
			</Ariakit.Role.div>
		</TreeContext.Provider>
	);
});
DEV: Tree.displayName = "Tree.Root";

type NodesMap = Map<
	string,
	{ collection: Ariakit.CollectionStore; level: number }
>;

const TreeContext = React.createContext<
	| {
			baseId: string;
			nodes: NodesMap;
			setNodes: React.Dispatch<React.SetStateAction<NodesMap>>;
	  }
	| undefined
>(undefined);

// ----------------------------------------------------------------------------

interface TreeItemProps extends Omit<BaseProps, "content"> {
	/**
	 * An identifier for the tree item. Must be unique within the tree.
	 */
	value: string;
	/**
	 * The `value` of the parent tree item.
	 *
	 * This is used to create a parent-child relationship and automatically determine levels, group size, etc.
	 */
	parentValue?: string;
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
 * `Tree.Item`s can be rendered inside a `Tree.Root`. Additional properties are specified to the `Tree.Item`s to create a hierarchical tree structure.
 *
 * Example:
 * ```tsx
 * <Tree.Root>
 *   <Tree.Item label="Parent" value="parent-1" />
 *   <Tree.Item label="Child 1" value="child-1" parentValue="parent-1" />
 *   <Tree.Item label="Child 2" value="child-2" parentValue="parent-1" />
 * </Tree.Root>
 * ```
 *
 * The `label` and `icon` props can be used to specify the treeitem's own content.
 *
 * The `level` prop is used to specify the nesting level of the treeitem. Nesting levels start at 1.
 *
 * The `position` and `size` props are used to define the treeitem's position in the current level of tree items.
 *
 * The `expanded` and `onExpandedChange` props can be used to control the expansion state of a treeitem.
 *
 * The `selected` and `onSelectedChange` props can be used to control the selection state of a treeitem.
 */
const TreeItem = forwardRef<"div", TreeItemProps>((props, forwardedRef) => {
	const generatedId = React.useId();
	const { baseId = generatedId } = React.useContext(TreeContext) ?? {};

	const {
		value,
		parentValue,
		id = `${baseId}-${value.replaceAll(" ", "-")}`,
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

	const store = useTreeItemStore({ value, parentValue });
	const collectionItems = Ariakit.useStoreState(
		store.collection,
		"renderedItems",
	);
	const parentCollectionItems = Ariakit.useStoreState(
		store.parentCollection,
		"renderedItems",
	);

	const [position, size] = React.useMemo(() => {
		const index =
			parentCollectionItems?.findIndex((item) => item.id === id) ?? -1;
		if (index === -1) return [undefined, undefined];

		return [index + 1, parentCollectionItems?.length];
	}, [parentCollectionItems, id]);

	const childrenIds = React.useMemo(() => {
		return collectionItems?.map((item) => item.id).join(" ");
	}, [collectionItems]);

	const contentId = `${id}-content`;

	const treeitem = (
		<Ariakit.CompositeItem
			render={<Ariakit.Role {...rest} />}
			id={id}
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
			aria-level={store.level}
			aria-posinset={position}
			aria-setsize={size}
			className={cx("🥝-tree-item", props.className)}
			ref={forwardedRef as Ariakit.CompositeItemProps["ref"]}
		>
			<ListItem.Root
				data-kiwi-expanded={expanded}
				data-kiwi-selected={selected}
				className="🥝-tree-item-node"
				style={
					{
						"--🥝tree-item-level": store.level,
					} as React.CSSProperties
				}
				role={undefined}
			>
				<TreeItemExpander
					onClick={() => {
						if (expanded === undefined) return;
						onExpandedChange?.(!expanded);
					}}
				/>
				{typeof icon === "string" ? <Icon href={icon} /> : icon}
				<TreeItemContent label={label} id={contentId} />
				<TreeItemActions>{actions}</TreeItemActions>

				{childrenIds ? (
					<VisuallyHidden role="group" aria-owns={childrenIds} />
				) : null}
			</ListItem.Root>
		</Ariakit.CompositeItem>
	);

	return (
		<Ariakit.CollectionItem
			id={id}
			store={store.parentCollection}
			render={<Ariakit.Collection store={store.collection} render={treeitem} />}
		/>
	);
});
DEV: TreeItem.displayName = "Tree.Item";

function useTreeItemStore(props: {
	value: string;
	parentValue?: string;
}) {
	const { value, parentValue } = props;

	const treeContext = React.useContext(TreeContext);
	const parent = React.useMemo(() => {
		if (!treeContext || !parentValue) return undefined;
		return treeContext.nodes.get(parentValue);
	}, [treeContext, parentValue]);

	const collection = Ariakit.useCollectionStore();
	const parentCollection = parent?.collection; // TODO: first level collection
	const level = (parent?.level ?? 0) + 1;

	React.useEffect(
		function updateTreeContext() {
			// TODO: perf
			treeContext?.setNodes?.((nodes) => {
				nodes.set(value, { collection, level });
				return new Map(nodes);
			});

			return () => {
				treeContext?.setNodes?.((nodes) => {
					nodes.delete(value);
					return new Map(nodes);
				});
			};
		},
		[treeContext?.setNodes, collection, value, level],
	);

	return React.useMemo(
		() => ({ level, collection, parentCollection }),
		[level, collection, parentCollection],
	);
}

// ----------------------------------------------------------------------------

interface TreeItemContentProps extends Omit<BaseProps<"span">, "children"> {
	label?: React.ReactNode;
}

const TreeItemContent = forwardRef<"span", TreeItemContentProps>(
	(props, forwardedRef) => {
		const { label, ...rest } = props;

		return (
			<ListItem.Content
				{...rest}
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

export { Tree as Root, TreeItem as Item };
