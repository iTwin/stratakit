/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import cx from "classnames";
import * as Ariakit from "@ariakit/react";

interface SwitchProps extends Omit<Ariakit.CheckboxProps, "store"> {
	/** The default checked state of the toggle switch. */
	defaultChecked?: boolean;
	/** The controlled checked state of the toggle switch. */
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
			className={cx("🥝-switch", props.className)}
			role="switch"
			ref={forwardedRef}
		/>
	);
});
