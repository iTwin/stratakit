/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import cx from "classnames";
import * as Ariakit from "@ariakit/react";
import * as ListItem from "./ListItem.js";

// ----------------------------------------------------------------------------

interface TreeProps extends Ariakit.RoleProps<"div"> {}

export const Tree = React.forwardRef<React.ElementRef<"div">, TreeProps>(
	(props, forwardedRef) => {
		return (
			<Ariakit.Role.div {...props} role="tree" ref={forwardedRef}>
				{props.children}
			</Ariakit.Role.div>
		);
	},
);
Tree.displayName = "Tree.Root";

// ----------------------------------------------------------------------------

interface TreeItemProps extends Omit<Ariakit.RoleProps<"div">, "content"> {
	content?: React.ReactNode;
	selected?: boolean;
	/** Specifies if the tree item is expanded. Used to determine if a tree item is a parent node. Defaults to `undefined`. */
	expanded?: boolean;
}

export const TreeItem = React.forwardRef<
	React.ElementRef<"div">,
	TreeItemProps
>((props, forwardedRef) => {
	const { selected, content, children, className, expanded, style, ...rest } =
		props;

	const parentContext = React.useContext(TreeItemContext);
	const level = parentContext ? parentContext.level + 1 : 1;
	return (
		<TreeItemContext.Provider
			value={React.useMemo(
				() => ({
					level,
				}),
				[level],
			)}
		>
			<ListItem.Root
				{...rest}
				aria-expanded={expanded}
				aria-selected={selected}
				aria-level={level}
				className={cx("🥝-tree-item", className)}
				style={
					{
						...style,
						"--🥝tree-item-level": level,
					} as React.CSSProperties
				}
				role="treeitem"
				ref={forwardedRef}
			>
				{content}
			</ListItem.Root>
			{children}
		</TreeItemContext.Provider>
	);
});

// ----------------------------------------------------------------------------

const TreeItemContext = React.createContext<
	| {
			level: number;
	  }
	| undefined
>(undefined);

// ----------------------------------------------------------------------------

export { Tree as Root, TreeItem as Item };
