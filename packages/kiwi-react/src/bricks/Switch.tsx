/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from "classnames";
import * as Ariakit from "@ariakit/react";
import { useFieldId } from "./Field.js";
import { forwardRef, type FocusableProps } from "./~utils.js";

type InputBaseProps = Omit<FocusableProps<"input">, "defaultValue" | "value">;

type CheckboxOwnProps = Pick<
	Ariakit.CheckboxProps,
	"value" | "defaultChecked" | "checked" | "onChange"
>;

interface SwitchProps extends InputBaseProps, CheckboxOwnProps {
	/** The default checked state of the toggle switch. */
	defaultChecked?: boolean;
	/** The controlled checked state of the toggle switch. */
	checked?: boolean;
}

export const Switch = forwardRef<"input", SwitchProps>(
	(props, forwardedRef) => {
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
	},
);
DEV: Switch.displayName = "Switch";
