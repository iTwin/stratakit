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
 * Use with the `Field` components to automatically handle ID associations for
 * labels and descriptions:
 * ```tsx
 * <Field.Root>
 *   <Field.Label>Check me</Field.Label>
 *   <Field.Control render={<Checkbox />} />
 * </Field.Root>
 * ```
 *
 * Without the `Field` components you will need to manually associate labels,
 * descriptions, etc.:
 * ```tsx
 * <Checkbox id="newsletter" name="newsletter" aria-describedby="newsletter-description" />
 * <Label htmlFor="newsletter">Sign me up for the newsletter.</Label>
 * <Description id="newsletter-description">No spam, we promise.</Description>
 * ```
 *
 * Underneath, it's an HTML checkbox, i.e. `<input type="checkbox">`, so it supports the same props,
 * including `value`, `defaultChecked`, `checked`, and `onChange`.
 */
export const Checkbox = forwardRef<"input", CheckboxProps>(
	(props, forwardedRef) => {
		useFieldControlType("checkable");
		return (
			<AkCheckbox
				accessibleWhenDisabled
				{...props}
				className={cx("🥝-checkbox", props.className)}
				ref={forwardedRef}
			/>
		);
	},
);
DEV: Checkbox.displayName = "Checkbox";
