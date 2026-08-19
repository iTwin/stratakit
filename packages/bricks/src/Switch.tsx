/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Checkbox as AkCheckbox } from "@ariakit/react/checkbox";
import { forwardRef } from "@stratakit/internal-utils/react";
import cx from "classnames";
import { useInit } from "./~utils.useInit.js";
import { useFieldControlType } from "./Field.internal.js";

import type { CheckboxProps as AkCheckboxProps } from "@ariakit/react/checkbox";
import type { FocusableProps } from "@stratakit/internal-utils/props";

type InputBaseProps = Omit<
	FocusableProps<"input">,
	"defaultValue" | "value" | "onToggle"
>;

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
 *
 * @deprecated Use MUI [`Switch`](https://mui.com/material-ui/api/switch/) component instead.
 * See [migration guide](https://stratakit.bentley.com/docs/getting-started/migration-from-legacy-stratakit/#switch).
 */
const Switch = forwardRef<"input", SwitchProps>((props, forwardedRef) => {
	useInit();
	useFieldControlType("checkable");
	return (
		<AkCheckbox
			accessibleWhenDisabled
			{...props}
			className={cx("🥝Switch", props.className)}
			role="switch"
			ref={forwardedRef}
		/>
	);
});
DEV: Switch.displayName = "Switch";

// ----------------------------------------------------------------------------

export default Switch;
