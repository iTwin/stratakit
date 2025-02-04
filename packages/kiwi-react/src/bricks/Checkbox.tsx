/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from "classnames";
import * as Ariakit from "@ariakit/react";
import { useFieldDescribedBy } from "./Field.js";
import { FieldControl, forwardRef, type FocusableProps } from "./~utils.js";

type InputBaseProps = Omit<
	FocusableProps<"input">,
	"defaultValue" | "checked" | "defaultChecked"
>;

type CheckboxOwnProps = Pick<
	Ariakit.CheckboxProps,
	"value" | "defaultChecked" | "checked" | "onChange"
>;

interface CheckboxProps extends InputBaseProps, CheckboxOwnProps {}

/**
 * A styled checkbox element, typically used for selecting one or more options from a list.
 *
 * Works well the `Field` and `Label` components.
 *
 * ```tsx
 * <Field>
 *   <Label>Check me</Label>
 *   <Checkbox />
 * </Field>
 * ```
 *
 * Underneath, it's an HTML checkbox, i.e. `<input type="checkbox">`, so it supports the same props,
 * including `value`, `defaultChecked`, `checked`, and `onChange`.
 */
export const Checkbox = forwardRef<"input", CheckboxProps>(
	(props, forwardedRef) => {
		const describedBy = useFieldDescribedBy(props["aria-describedby"]);

		return (
			<FieldControl
				type="checkable"
				id={props.id}
				render={
					<Ariakit.Checkbox
						accessibleWhenDisabled
						{...props}
						className={cx("🥝-checkbox", props.className)}
						aria-describedby={describedBy}
						ref={forwardedRef}
					/>
				}
			/>
		);
	},
);
DEV: Checkbox.displayName = "Checkbox";
