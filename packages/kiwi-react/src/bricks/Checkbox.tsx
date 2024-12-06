/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import cx from "classnames";
import * as Ariakit from "@ariakit/react";
import { useFieldId } from "./Field.js";
import type { FocusableProps } from "./~utils.js";

type CheckboxProps = Omit<
	FocusableProps<
		"input",
		Ariakit.CheckboxProps,
		"value" | "defaultChecked" | "checked" | "onChange"
	>,
	"defaultValue"
>;

export const Checkbox = React.forwardRef<
	React.ElementRef<typeof Ariakit.Checkbox>,
	CheckboxProps
>((props, forwardedRef) => {
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
});
DEV: Checkbox.displayName = "Checkbox";
