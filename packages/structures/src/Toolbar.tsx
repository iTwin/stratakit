/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as Toolbar from "@ariakit/react/toolbar";
import {
	IconButtonContext,
	TooltipContext,
} from "@stratakit/bricks/secret-internals";
import { forwardRef } from "@stratakit/foundations/secret-internals";
import { TooltipContext as MuiTooltipContext } from "@stratakit/mui/secret-internals";
import cx from "classnames";
import { useInit } from "./~utils.useInit.js";

import type { BaseProps } from "@stratakit/foundations/secret-internals";
import type * as React from "react";

// ----------------------------------------------------------------------------

function ToolbarGroupProvider(
	props: React.PropsWithChildren<{
		orientation: ToolbarGroupProps["orientation"];
	}>,
) {
	const { orientation } = props;

	const placement = orientation === "vertical" ? "right" : "top";
	return (
		<IconButtonContext.Provider value={{ iconSize: "large" }}>
			<TooltipContext.Provider value={{ placement }}>
				<MuiTooltipContext.Provider value={{ placement }}>
					{props.children}
				</MuiTooltipContext.Provider>
			</TooltipContext.Provider>
		</IconButtonContext.Provider>
	);
}

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
 * A divider can be displayed between items by rendering the `Divider` component.
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
			<ToolbarGroupProvider orientation={props.orientation}>
				<Toolbar.Toolbar
					{...props}
					className={cx("🥝Toolbar", props.className)}
					ref={forwardedRef}
				/>
			</ToolbarGroupProvider>
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
 * If rendering an `IconButton`, be sure to append `#icon-large` to the icon URL.
 *
 * Example:
 * ```jsx
 * <Toolbar.Item
 *   render={<IconButton variant="ghost" icon={`${placeholderIcon}#icon-large`} />}
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
