/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import cx from "classnames";
import * as Ariakit from "@ariakit/react";
import { ListItem } from "./ListItem.js";
import { Button } from "./Button.js";

// ----------------------------------------------------------------------------

interface DropdownMenuProps
	extends Pick<
		Ariakit.MenuProviderProps,
		"children" | "placement" | "open" | "setOpen" | "defaultOpen"
	> {}

/**
 * Dropdown menu component displays a list of actions or commands.
 *
 * ```tsx
 * <DropdownMenu.Root>
 *		<DropdownMenu.Button>Actions</DropdownMenu.Button>
 *
 *		<DropdownMenu.Content>
 *			<DropdownMenu.Item>Add</DropdownMenu.Item>
 *			<DropdownMenu.Item>Edit</DropdownMenu.Item>
 *			<DropdownMenu.Item>Delete</DropdownMenu.Item>
 *		</DropdownMenu.Content>
 * </DropdownMenu.Root>
 * ```
 */
function DropdownMenu(props: DropdownMenuProps) {
	const { children, placement, open, setOpen, defaultOpen } = props;
	return (
		<Ariakit.MenuProvider
			placement={placement}
			open={open}
			setOpen={setOpen}
			defaultOpen={defaultOpen}
		>
			{children}
		</Ariakit.MenuProvider>
	);
}

// ----------------------------------------------------------------------------

const DropdownMenuContent = React.forwardRef<
	React.ElementRef<typeof Ariakit.Menu>,
	Ariakit.MenuProps
>((props, forwardedRef) => {
	return (
		<Ariakit.Menu
			portal
			{...props}
			className={cx("🥝-dropdown-menu", props.className)}
			ref={forwardedRef}
		/>
	);
});

// ----------------------------------------------------------------------------

const DropdownMenuButton = React.forwardRef<
	React.ElementRef<typeof Ariakit.MenuButton>,
	Ariakit.MenuButtonProps
>((props, forwardedRef) => {
	const { accessibleWhenDisabled = true, ...rest } = props;
	return (
		<Ariakit.MenuButton
			accessibleWhenDisabled={accessibleWhenDisabled}
			render={<Button accessibleWhenDisabled={accessibleWhenDisabled} />}
			{...rest}
			ref={forwardedRef as Ariakit.MenuButtonProps["ref"]}
		/>
	);
});

// ----------------------------------------------------------------------------

const DropdownMenuItem = React.forwardRef<
	React.ElementRef<typeof Ariakit.MenuItem>,
	Ariakit.MenuItemProps
>((props, forwardedRef) => {
	return (
		<Ariakit.MenuItem
			accessibleWhenDisabled
			{...props}
			render={<ListItem render={props.render} />}
			ref={forwardedRef}
		/>
	);
});

// ----------------------------------------------------------------------------

export {
	DropdownMenu as Root,
	DropdownMenuButton as Button,
	DropdownMenuContent as Content,
	DropdownMenuItem as Item,
};
