/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Checkbox as AkCheckbox } from "@ariakit/react/checkbox";
import cx from "classnames";
import { useFieldControlType } from "./Field.internal.js";
import { forwardRef } from "./~utils.js";

import type { CheckboxProps as AkCheckboxProps } from "@ariakit/react/checkbox";
import type { FocusableProps } from "./~utils.js";

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
 * Use with the `Field` components to automatically handle ID associations for
 * labels and descriptions:
 * ```tsx
 * <Field.Root>
 *   <Field.Label>Enable feature</Field.Label>
 *   <Field.Control render={<Switch />} />
 * </Field.Root>
 * ```
 *
 * Without the `Field` components you will need to manually associate labels,
 * descriptions, etc.:
 * ```tsx
 * <Switch id="dark-mode" />
 * <Label htmlFor="dark-mode">Dark mode</Label>
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
