/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import * as Ariakit from "@ariakit/react";

interface SwitchProps extends Ariakit.CheckboxProps {
	/** The default checked state of the toggle switch. */
	defaultChecked?: boolean;
	/** The checked state of the toggle switch. */
	checked?: boolean;
}

export const Switch = React.forwardRef<
	React.ElementRef<typeof Ariakit.Checkbox>,
	SwitchProps
>((props, forwardedRef) => {
	return (
		<Ariakit.Checkbox
			accessibleWhenDisabled
			{...props}
			role="switch"
			ref={forwardedRef}
		/>
	);
});
