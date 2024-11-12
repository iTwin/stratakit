/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import * as Ariakit from "@ariakit/react";

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

interface TreeItemProps extends Ariakit.RoleProps<"div"> {}

export const TreeItem = React.forwardRef<
	React.ElementRef<"div">,
	TreeItemProps
>((props, forwardedRef) => {
	return (
		<Ariakit.Role.div {...props} role="treeitem" ref={forwardedRef}>
			{props.children}
		</Ariakit.Role.div>
	);
});

// ----------------------------------------------------------------------------

export { Tree as Root, TreeItem as Item };
