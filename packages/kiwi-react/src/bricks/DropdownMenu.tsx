/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import cx from "classnames";
import * as Ariakit from "@ariakit/react";
import { ListItem } from "./ListItem.js";

interface DropdownMenuProps extends Ariakit.MenuProps {
	/** Element that opens a dropdown menu. */
	children: React.ReactElement;
	/** Menu items rendered in this dropdown menu. */
	items: React.ReactElement;
}

const DropdownMenuComponent = React.forwardRef<
	React.ElementRef<typeof Ariakit.Menu>,
	DropdownMenuProps
>((props, forwardedRef) => {
	const { children, items, ...rest } = props;
	return (
		<Ariakit.MenuProvider>
			<Ariakit.MenuButton render={children} />
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

const DropdownMenuItem = React.forwardRef<
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
	Item: DropdownMenuItem,
});
