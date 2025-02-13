/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from "classnames";
import {
	Checkbox as AkCheckbox,
	type CheckboxProps as AkCheckboxProps,
} from "@ariakit/react/checkbox";
import { FieldControl } from "./Field.internal.js";
import { forwardRef, type FocusableProps } from "./~utils.js";

type InputBaseProps = Omit<
	FocusableProps<"input">,
	"defaultValue" | "checked" | "defaultChecked"
>;

type CheckboxOwnProps = Pick<
	AkCheckboxProps,
	"value" | "defaultChecked" | "checked" | "onChange"
>;

interface CheckboxProps extends InputBaseProps, CheckboxOwnProps {}

/**
 * A styled checkbox element, typically used for selecting one or more options from a list.
 *
 * Works well the `Field` and `Label` components.
 *
 * ```tsx
 * <Field.Root>
 *   <Label>Check me</Label>
 *   <Checkbox />
 * </Field.Root>
 * ```
 *
 * Underneath, it's an HTML checkbox, i.e. `<input type="checkbox">`, so it supports the same props,
 * including `value`, `defaultChecked`, `checked`, and `onChange`.
 */
export const Checkbox = forwardRef<"input", CheckboxProps>(
	(props, forwardedRef) => {
		const { id, ...rest } = props;

		return (
			<FieldControl
				type="checkable"
				id={id}
				render={
					<AkCheckbox
						accessibleWhenDisabled
						{...rest}
						className={cx("🥝-checkbox", props.className)}
						ref={forwardedRef}
					/>
				}
			/>
		);
	},
);
DEV: Checkbox.displayName = "Checkbox";
