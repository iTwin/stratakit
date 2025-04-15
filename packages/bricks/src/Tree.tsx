/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Composite, useCompositeStore } from "@ariakit/react/composite";
import { Role } from "@ariakit/react/role";
import cx from "classnames";
import { Action as TreeItemAction, Root as TreeItemRoot } from "./TreeItem.js";
import { forwardRef } from "./~utils.js";

import type { BaseProps } from "./~utils.js";

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
	const composite = useCompositeStore({ orientation: "vertical" });

	return (
		<Role.div
			role="tree"
			{...props}
			render={<Composite store={composite} />}
			className={cx("🥝-tree", props.className)}
			ref={forwardedRef}
		>
			{props.children}
		</Role.div>
	);
});
DEV: Tree.displayName = "Tree.Root";

// ----------------------------------------------------------------------------

export { Tree as Root, TreeItemRoot as Item, TreeItemAction as ItemAction };
