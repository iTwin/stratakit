/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import cx from "classnames";
import * as Ariakit from "@ariakit/react";
import { useFieldId } from "./Field.js";

interface SwitchProps
	extends Omit<Ariakit.CheckboxProps, "store" | "defaultValue"> {
	/** The default checked state of the toggle switch. */
	defaultChecked?: boolean;
	/** The controlled checked state of the toggle switch. */
	checked?: boolean;
}

export const Switch = React.forwardRef<
	React.ElementRef<typeof Ariakit.Checkbox>,
	SwitchProps
>((props, forwardedRef) => {
	const fieldId = useFieldId();

	return (
		<Ariakit.Checkbox
			accessibleWhenDisabled
			id={fieldId}
			{...props}
			className={cx("🥝-switch", props.className)}
			role="switch"
			ref={forwardedRef}
		/>
	);
});
Switch.displayName = "Switch";
