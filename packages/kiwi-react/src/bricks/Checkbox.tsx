/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from "classnames";
import * as Ariakit from "@ariakit/react";
import { useFieldId } from "./Field.js";
import { forwardRef, type FocusableProps } from "./~utils.js";

type InputBaseProps = Omit<
	FocusableProps<"input">,
	"defaultValue" | "checked" | "defaultChecked"
>;

type CheckboxOwnProps = Pick<
	Ariakit.CheckboxProps,
	"value" | "defaultChecked" | "checked" | "onChange"
>;

interface CheckboxProps extends InputBaseProps, CheckboxOwnProps {}

export const Checkbox = forwardRef<"input", CheckboxProps>(
	(props, forwardedRef) => {
		const fieldId = useFieldId();

		return (
			<Ariakit.Checkbox
				accessibleWhenDisabled
				id={fieldId}
				{...props}
				className={cx("🥝-checkbox", props.className)}
				ref={forwardedRef}
			/>
		);
	},
);
DEV: Checkbox.displayName = "Checkbox";
