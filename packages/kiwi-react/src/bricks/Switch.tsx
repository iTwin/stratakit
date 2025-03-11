/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from "classnames";
import {
	Checkbox as AkCheckbox,
	type CheckboxProps as AkCheckboxProps,
} from "@ariakit/react/checkbox";
import { forwardRef, type FocusableProps } from "./~utils.js";
import { useFieldControlType } from "./Field.internal.js";

type InputBaseProps = Omit<FocusableProps<"input">, "defaultValue" | "value">;

type CheckboxOwnProps = Pick<
	AkCheckboxProps,
	"value" | "defaultChecked" | "checked" | "onChange"
>;

interface SwitchProps extends InputBaseProps, CheckboxOwnProps {
	/** The default checked state of the toggle switch. */
	defaultChecked?: boolean;
	/** The controlled checked state of the toggle switch. */
	checked?: boolean;
}

/**
 * A toggle switch element, typically used for enabling or disabling a feature.
 *
 * Works well with the `Field` and `Label` components.
 *
 * ```tsx
 * <Field.Root>
 *   <Field.Label>Enable feature</Field.Label>
 *   <Switch />
 * </Field.Root>
 * ```
 *
 * Underneath, it's an HTML checkbox, i.e. `<input type="checkbox">`, so it supports the same props,
 * including `value`, `defaultChecked`, `checked`, and `onChange`.
 */
export const Switch = forwardRef<"input", SwitchProps>(
	(props, forwardedRef) => {
		useFieldControlType("checkable");
		return (
			<AkCheckbox
				accessibleWhenDisabled
				{...props}
				className={cx("🥝-switch", props.className)}
				role="switch"
				ref={forwardedRef}
			/>
		);
	},
);
DEV: Switch.displayName = "Switch";
