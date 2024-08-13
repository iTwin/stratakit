/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import * as Ariakit from "@ariakit/react";

interface InputProps extends Ariakit.FocusableProps<"input"> {}

export const Input = React.forwardRef<
	React.ElementRef<typeof Ariakit.Focusable>,
	InputProps
>((props, forwardedRef) => {
	return (
		<Ariakit.Focusable
			render={<input />}
			accessibleWhenDisabled
			{...props}
			ref={forwardedRef}
		/>
	);
});
