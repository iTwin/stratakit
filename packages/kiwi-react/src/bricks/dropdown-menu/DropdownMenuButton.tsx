/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import * as Ariakit from "@ariakit/react";
import { Button } from "../Button.js";

export const DropdownMenuButton = React.forwardRef<
	React.ElementRef<typeof Button>,
	React.ComponentProps<typeof Button>
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
