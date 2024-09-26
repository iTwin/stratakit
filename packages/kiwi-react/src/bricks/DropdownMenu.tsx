/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import cx from "classnames";
import * as Ariakit from "@ariakit/react";

interface DropdownMenuProps extends Ariakit.MenuProps {}

export const DropdownMenu = React.forwardRef<
	React.ElementRef<typeof Ariakit.Menu>,
	DropdownMenuProps
>((props, forwardedRef) => {
	return (
		<Ariakit.MenuProvider>
			<Ariakit.Menu
				{...props}
				className={cx("🥝-dropdown-menu", props.className)}
				ref={forwardedRef}
			/>
		</Ariakit.MenuProvider>
	);
});
