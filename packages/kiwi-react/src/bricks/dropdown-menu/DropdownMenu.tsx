/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import cx from "classnames";
import * as Ariakit from "@ariakit/react";
import { DropdownMenuButton } from "./DropdownMenuButton.js";
import { DropdownMenuItem } from "./DropdownMenuItem.js";

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

export const DropdownMenu = Object.assign(DropdownMenuComponent, {
	Button: DropdownMenuButton,
	Item: DropdownMenuItem,
});
