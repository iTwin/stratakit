/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { Icon as SkIcon } from "@stratakit/foundations";
import { DropdownMenu as SkDropdownMenu } from "@stratakit/structures";
import { useCompatProps } from "./~utils.tsx";

import type { MenuItem as IuiMenuItem } from "@itwin/itwinui-react";
import type { PolymorphicForwardRefComponent } from "./~utils.tsx";

// ----------------------------------------------------------------------------

type IuiMenuItemProps = React.ComponentProps<typeof IuiMenuItem>;

interface MenuItemProps
	extends Pick<
		IuiMenuItemProps,
		| "isSelected"
		| "disabled"
		| "value"
		| "size"
		| "sublabel"
		| "startIcon"
		| "icon"
		| "endIcon"
		| "badge"
		| "subMenuItems"
		| "focused"
	> {
	/** NOT IMPLEMENTED. */
	endIcon?: IuiMenuItemProps["endIcon"];
	/** NOT IMPLEMENTED. */
	value?: IuiMenuItemProps["value"];
	/** NOT IMPLEMENTED. */
	sublabel?: IuiMenuItemProps["sublabel"];
	/** NOT IMPLEMENTED. */
	isSelected?: IuiMenuItemProps["isSelected"];
	/** NOT IMPLEMENTED. */
	focused?: IuiMenuItemProps["focused"];
	/** NOT IMPLEMENTED. */
	subMenuItems?: IuiMenuItemProps["subMenuItems"];
	/** NOT IMPLEMENTED. */
	size?: IuiMenuItemProps["size"];
	/** @deprecated NOT IMPLEMENTED. */
	badge?: IuiMenuItemProps["badge"];
}

// ----------------------------------------------------------------------------

/** @see https://itwinui.bentley.com/docs/dropdownmenu */
export const MenuItem = React.forwardRef((props, forwardedRef) => {
	const {
		children,
		icon,
		startIcon = icon,
		disabled,

		// biome-ignore-start lint/correctness/noUnusedVariables: NOT IMPLEMENTED
		endIcon,
		value,
		sublabel,
		isSelected,
		focused,
		subMenuItems,
		size,
		badge,
		// biome-ignore-end lint/correctness/noUnusedVariables: NOT IMPLEMENTED

		...rest
	} = useCompatProps(props);

	return (
		<SkDropdownMenu.Item
			{...rest}
			label={children}
			icon={startIcon ? <SkIcon render={startIcon} /> : undefined}
			disabled={disabled}
			ref={forwardedRef}
		/>
	);
}) as PolymorphicForwardRefComponent<"button", MenuItemProps>;
DEV: MenuItem.displayName = "MenuItem";
