/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as Toolbar from "@ariakit/react/toolbar";
import cx from "classnames";
import * as React from "react";
import { IconButtonContext } from "./IconButton.internal.js";
import { forwardRef } from "./~utils.js";

import type { BaseProps } from "./~utils.js";

// ----------------------------------------------------------------------------

interface ToolbarProps extends BaseProps {
	/** Must be set to `"solid"` for now. */
	variant: "solid";
}

/**
 * A toolbar for grouping related interactive elements.
 *
 * Follows the [ARIA Toolbar pattern](https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/) for reducing the number of tab stops.
 *
 * Example:
 * ```jsx
 * <Toolbar.Group variant="solid">
 *   <Toolbar.Item render={…} />
 *   <Toolbar.Item render={…} />
 *   <Toolbar.Item render={…} />
 * </Toolbar.Group>
 * ```
 */
const ToolbarGroup = forwardRef<"div", ToolbarProps>((props, forwardedRef) => {
	return (
		<IconButtonContext value={React.useMemo(() => ({ iconSize: "large" }), [])}>
			<Toolbar.Toolbar
				{...props}
				className={cx("🥝-toolbar", props.className)}
				ref={forwardedRef}
			/>
		</IconButtonContext>
	);
});
DEV: ToolbarGroup.displayName = "Toolbar.Group";

// ----------------------------------------------------------------------------

interface ToolbarItemProps
	extends Omit<BaseProps<"button">, "render">,
		Required<Pick<BaseProps, "render">> {}

/**
 * An item within the toolbar.
 * Should be used with the `render` prop.
 *
 * Example:
 * ```jsx
 * <Toolbar.Item
 *   render={<IconButton variant="ghost" … />}
 * />
 * ```
 */
const ToolbarItem = forwardRef<"button", ToolbarItemProps>(
	(props, forwardedRef) => {
		return <Toolbar.ToolbarItem {...props} ref={forwardedRef} />;
	},
);
DEV: ToolbarItem.displayName = "Toolbar.Item";

// ----------------------------------------------------------------------------

export { ToolbarGroup as Group, ToolbarItem as Item };
