/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Button as SkButton } from "@stratakit/bricks";
import { DisclosureArrow as SkDisclosureArrow } from "@stratakit/bricks/secret-internals";
import {
	useControlledState,
	useUnreactiveCallback,
} from "@stratakit/foundations/secret-internals";
import { DropdownMenu as SkDropdownMenu } from "@stratakit/structures";
import * as React from "react";
import { useCompatProps } from "./~utils.tsx";

import type {
	DropdownButton as IuiDropdownButton,
	DropdownMenu as IuiDropdownMenu,
} from "@itwin/itwinui-react";
import type { PolymorphicForwardRefComponent } from "./~utils.tsx";

// ----------------------------------------------------------------------------

type IuiDropdownMenuProps = React.ComponentProps<typeof IuiDropdownMenu>;
type IuiDropdownButtonProps = React.ComponentProps<typeof IuiDropdownButton>;

interface DropdownMenuProps
	extends Pick<
		IuiDropdownMenuProps,
		| "menuItems"
		| "children"
		| "middleware"
		| "closeOnItemClick"
		| "visible"
		| "onVisibleChange"
		| "placement"
		| "matchWidth"
		| "positionReference"
		| "portal"
	> {
	children: React.JSX.Element; // iTwinUI type is incorrectly more loose
	menuItems: IuiDropdownButtonProps["menuItems"]; // These types don't match in iTwinUI
	/** NOT IMPLEMENTED. */
	middleware?: IuiDropdownMenuProps["middleware"];
	/** NOT IMPLEMENTED. Always true. */
	closeOnItemClick?: IuiDropdownMenuProps["closeOnItemClick"];
	/** NOT IMPLEMENTED. */
	placement?: IuiDropdownMenuProps["placement"];
	/** NOT IMPLEMENTED. */
	matchWidth?: IuiDropdownMenuProps["matchWidth"];
	/** NOT IMPLEMENTED. */
	positionReference?: IuiDropdownMenuProps["positionReference"];
	/** NOT IMPLEMENTED. */
	portal?: IuiDropdownMenuProps["portal"];
}

interface DropdownButtonProps
	extends Pick<
		IuiDropdownButtonProps,
		| "menuItems"
		| "dropdownMenuProps"
		| "styleType"
		| "size"
		| "stretched"
		| "loading"
		| "htmlDisabled"
		| "startIcon"
		| "startIconProps"
		| "labelProps"
		| "endIconProps"
	> {
	/** NOT IMPLEMENTED. */
	dropdownMenuProps?: IuiDropdownButtonProps["dropdownMenuProps"];
	/** NOT IMPLEMENTED. */
	styleType?: IuiDropdownButtonProps["styleType"];
	/** NOT IMPLEMENTED. */
	size?: IuiDropdownButtonProps["size"];
	/** NOT IMPLEMENTED. */
	stretched?: IuiDropdownButtonProps["stretched"];
	/** NOT IMPLEMENTED. */
	loading?: IuiDropdownButtonProps["loading"];
	/** NOT IMPLEMENTED. */
	htmlDisabled?: IuiDropdownButtonProps["htmlDisabled"];
	/** NOT IMPLEMENTED. */
	labelProps?: IuiDropdownButtonProps["labelProps"];
}

// ----------------------------------------------------------------------------

/** @see https://itwinui.bentley.com/docs/dropdownmenu */
export const DropdownMenu = React.forwardRef((props, forwardedRef) => {
	const {
		children,
		menuItems,
		middleware, // NOT IMPLEMENTED
		closeOnItemClick, // NOT IMPLEMENTED
		visible,
		onVisibleChange,

		// biome-ignore-start lint/correctness/noUnusedVariables: NOT IMPLEMENTED
		middleware,
		closeOnItemClick,
		placement,
		matchWidth,
		positionReference,
		portal,
		// biome-ignore-end lint/correctness/noUnusedVariables: NOT IMPLEMENTED

		...rest
	} = props;

	const [open, setOpen] = useControlledState(
		false,
		visible,
		onVisibleChange as React.Dispatch<React.SetStateAction<boolean>>,
	);

	const close = useUnreactiveCallback(() => setOpen(false));

	return (
		<SkDropdownMenu.Root open={open} setOpen={setOpen}>
			<SkDropdownMenu.Button render={children} />

			<SkDropdownMenu.Content {...rest} ref={forwardedRef}>
				{typeof menuItems === "function" ? menuItems(close) : menuItems}
			</SkDropdownMenu.Content>
		</SkDropdownMenu.Root>
	);
}) as PolymorphicForwardRefComponent<"div", DropdownMenuProps>;
DEV: DropdownMenu.displayName = "DropdownMenu";

// ----------------------------------------------------------------------------

/** @see https://itwinui.bentley.com/docs/button#dropdownbutton */
export const DropdownButton = React.forwardRef((props, forwardedRef) => {
	const {
		children,
		menuItems,
		dropdownMenuProps,

		// biome-ignore-start lint/correctness/noUnusedVariables: NOT IMPLEMENTED
		styleType,
		size,
		stretched,
		loading,
		htmlDisabled,
		startIcon,
		startIconProps,
		labelProps,
		// biome-ignore-end lint/correctness/noUnusedVariables: NOT IMPLEMENTED

		endIconProps,
		...rest
	} = useCompatProps(props);

	return (
		<DropdownMenu menuItems={menuItems} {...dropdownMenuProps}>
			<SkButton {...rest} ref={forwardedRef}>
				{children}
				<SkDisclosureArrow
					{...(endIconProps as React.ComponentProps<"svg">)}
					direction={undefined}
				/>
			</SkButton>
		</DropdownMenu>
	);
}) as PolymorphicForwardRefComponent<"button", DropdownButtonProps>;
DEV: DropdownButton.displayName = "DropdownButton";
