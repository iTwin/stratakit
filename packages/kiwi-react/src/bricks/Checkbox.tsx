/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import * as Ariakit from "@ariakit/react";

interface CheckboxProps extends Ariakit.CheckboxProps {}

export const Checkbox = React.forwardRef<
	React.ElementRef<typeof Ariakit.Checkbox>,
	CheckboxProps
>((props, forwardedRef) => {
	return (
		<Ariakit.Checkbox accessibleWhenDisabled {...props} ref={forwardedRef} />
	);
});
