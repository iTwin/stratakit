/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from "classnames";
import * as Ariakit from "@ariakit/react";
import { useFieldDescribedBy, useFieldId } from "./Field.js";
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

/**
 * A toggle switch element, typically used for enabling or disabling a feature.
 *
 * Works well with the `Field` and `Label` components.
 *
 * ```tsx
 * <Field>
 *   <Label>Enable feature</Label>
 *   <Switch />
 * </Field>
 * ```
 *
 * Underneath, it's an HTML checkbox, i.e. `<input type="checkbox">`, so it supports the same props,
 * including `value`, `defaultChecked`, `checked`, and `onChange`.
 */
export const Switch = forwardRef<"input", SwitchProps>(
	(props, forwardedRef) => {
		const fieldId = useFieldId();
		const describedBy = useFieldDescribedBy(props["aria-describedby"]);

		return (
			<Ariakit.Checkbox
				accessibleWhenDisabled
				id={fieldId}
				{...props}
				className={cx("🥝-switch", props.className)}
				aria-describedby={describedBy}
				role="switch"
				ref={forwardedRef}
			/>
		);
	},
);
DEV: Switch.displayName = "Switch";
