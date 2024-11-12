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

// ----------------------------------------------------------------------------

interface TreeItemProps extends Ariakit.RoleProps<"div"> {
	contentNode?: React.ReactNode;
}

export const TreeItem = React.forwardRef<
	React.ElementRef<"div">,
	TreeItemProps
>((props, forwardedRef) => {
	const { contentNode, children, className, style, ...rest } = props;

	const parentContext = React.useContext(TreeItemContext);
	const level = parentContext ? parentContext.level + 1 : 0;
	return (
		<TreeItemContext.Provider value={{ level }}>
			<ListItem.Root
				{...rest}
				className={cx("🥝-tree-item", className)}
				style={
					{
						...style,
						"--level": level,
					} as React.CSSProperties
				}
				role="treeitem"
				ref={forwardedRef}
			>
				{contentNode}
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
