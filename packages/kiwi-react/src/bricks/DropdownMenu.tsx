/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import cx from "classnames";
import * as Ariakit from "@ariakit/react";

interface DropdownMenuProps extends Ariakit.MenuProps {
	/** Element that opens a dropdown menu. */
	children: React.ReactElement;
}

export const DropdownMenu = React.forwardRef<
	React.ElementRef<typeof Ariakit.Menu>,
	DropdownMenuProps
>((props, forwardedRef) => {
	const { children, ...rest } = props;
	return (
		<Ariakit.MenuProvider>
			<Ariakit.MenuButton>{children}</Ariakit.MenuButton>
			<Ariakit.Menu
				{...rest}
				className={cx("🥝-dropdown-menu", props.className)}
				ref={forwardedRef}
			/>
		</Ariakit.MenuProvider>
	);
});
