/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import * as Toolbar from "@ariakit/react/toolbar";
import {
	IconButtonContext,
	TooltipContext,
} from "@stratakit/bricks/secret-internals";
import { forwardRef } from "@stratakit/foundations/secret-internals";
import cx from "classnames";
import { useInit } from "./~utils.useInit.js";

import type { BaseProps } from "@stratakit/foundations/secret-internals";

// ----------------------------------------------------------------------------

interface ToolbarGroupProps extends BaseProps {
	/** Must be set to `"solid"` for now. */
	variant: "solid";
	/**
	 * The orientation of the toolbar.
	 * @default "horizontal"
	 */
	orientation?: "horizontal" | "vertical";
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
 *
 * A divider can be displayed between items by rendering the [`Divider`](https://stratakit.bentley.com/docs/components/divider/) component.
 *
 * ```jsx
 * <Toolbar.Group variant="solid">
 *   <Toolbar.Item render={…} />
 *   <Divider orientation="vertical" />
 *   <Toolbar.Item render={…} />
 *   <Toolbar.Item render={…} />
 * </Toolbar.Group>
 * ```
 */
const ToolbarGroup = forwardRef<"div", ToolbarGroupProps>(
	(props, forwardedRef) => {
		useInit();

		return (
			<IconButtonContext.Provider
				value={React.useMemo(() => ({ iconSize: "large" }), [])}
			>
				<TooltipContext.Provider
					value={React.useMemo(
						() => ({
							placement: props.orientation === "vertical" ? "right" : "top",
						}),
						[props.orientation],
					)}
				>
					<Toolbar.Toolbar
						{...props}
						className={cx("🥝Toolbar", props.className)}
						ref={forwardedRef}
					/>
				</TooltipContext.Provider>
			</IconButtonContext.Provider>
		);
	},
);
DEV: ToolbarGroup.displayName = "Toolbar.Group";

// ----------------------------------------------------------------------------

interface ToolbarItemProps
	extends Omit<BaseProps<"button">, "render">,
		Required<Pick<BaseProps, "render">> {}

/**
 * An item within the toolbar.
 * Should be used with the `render` prop.
 *
 * Use the [`IconButton`](https://stratakit.bentley.com/docs/components/iconbutton/) component for actions.
 * Use the [`ToggleButton`](https://stratakit.bentley.com/docs/components/togglebutton/) component to toggle between two state.
 *
 * If rendering an icon, be sure to append `#icon-large` to the icon URL.
 *
 * Example:
 * ```jsx
 * <Toolbar.Item
 *   render={
 *     <IconButton label="…">
 *       <Icon href={`${placeholderIcon}#icon-large`} size="large" />
 *     </IconButton>
 *    }
 * />
 * ```
 */
const ToolbarItem = forwardRef<"button", ToolbarItemProps>(
	(props, forwardedRef) => {
		return (
			<Toolbar.ToolbarItem
				{...props}
				className={cx("🥝ToolbarItem", props.className)}
				ref={forwardedRef}
			/>
		);
	},
);
DEV: ToolbarItem.displayName = "Toolbar.Item";

// ----------------------------------------------------------------------------

export { ToolbarGroup as Group, ToolbarItem as Item };
