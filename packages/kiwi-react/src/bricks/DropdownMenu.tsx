/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import cx from "classnames";
import * as Ariakit from "@ariakit/react";
import { ListItem } from "./ListItem.js";
import { Button } from "./Button.js";

interface DropdownMenuProps extends Ariakit.MenuProps {
	/** Element that opens a dropdown menu. Prefer using {@link DropdownMenu.Button} component. */
	children: React.ReactElement;
	/** Menu items rendered in this dropdown. Prefer using {@link DropdownMenu.Item} component. */
	items: React.ReactElement;
}

const DropdownMenuComponent = React.forwardRef<
	React.ElementRef<typeof Ariakit.Menu>,
	DropdownMenuProps
>((props, forwardedRef) => {
	const { children, items, ...rest } = props;
	return (
		<Ariakit.MenuProvider>
			{children}
			<Ariakit.Menu
				{...rest}
				className={cx("🥝-dropdown-menu", props.className)}
				ref={forwardedRef}
			>
				{items}
			</Ariakit.Menu>
		</Ariakit.MenuProvider>
	);
});

const MenuButton = React.forwardRef<
	React.ElementRef<typeof Button>,
	React.ComponentProps<typeof Button>
>((props, forwardedRef) => {
	const { accessibleWhenDisabled = true, ...rest } = props;
	return (
		<Ariakit.MenuButton
			accessibleWhenDisabled={accessibleWhenDisabled}
			render={<Button />}
			{...rest}
			ref={forwardedRef as Ariakit.MenuButtonProps["ref"]}
		/>
	);
});

const MenuItem = React.forwardRef<
	React.ElementRef<typeof Ariakit.MenuItem>,
	Ariakit.MenuItemProps
>((props, forwardedRef) => {
	return (
		<Ariakit.MenuItem
			{...props}
			render={<ListItem render={props.render} />}
			ref={forwardedRef}
		/>
	);
});

export const DropdownMenu = Object.assign(DropdownMenuComponent, {
	Button: MenuButton,
	Item: MenuItem,
});
