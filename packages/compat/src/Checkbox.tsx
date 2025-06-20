/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { Field, Checkbox as SkCheckbox } from "@stratakit/bricks";

import { useCompatProps } from "./~utils.tsx";

import type { Checkbox as IuiCheckbox } from "@itwin/itwinui-react";
import type { PolymorphicForwardRefComponent } from "./~utils.tsx";

type IuiCheckboxProps = React.ComponentProps<typeof IuiCheckbox>;

interface CheckboxProps
	extends Pick<
		IuiCheckboxProps,
		| "label"
		| "indeterminate"
		| "status"
		| "variant"
		| "isLoading"
		| "wrapperProps"
		| "labelProps"
	> {
	/** NOT IMPLEMENTED. */
	indeterminate?: IuiCheckboxProps["indeterminate"];
	/** NOT IMPLEMENTED. */
	status?: IuiCheckboxProps["status"];
	/** NOT IMPLEMENTED. */
	variant?: IuiCheckboxProps["variant"];
	/** NOT IMPLEMENTED. */
	isLoading?: IuiCheckboxProps["isLoading"];
}

/** @see https://itwinui.bentley.com/docs/checkbox */
export const Checkbox = React.forwardRef((props, forwardedRef) => {
	const {
		label,
		wrapperProps,
		labelProps,
		indeterminate, // NOT IMPLEMENTED
		status, // NOT IMPLEMENTED
		variant, // NOT IMPLEMENTED
		isLoading, // NOT IMPLEMENTED
		...rest
	} = useCompatProps(props);

	if (label) {
		return (
			<Field.Root render={<Field.Label {...wrapperProps} />}>
				<Field.Control ref={forwardedRef} render={<SkCheckbox {...rest} />} />
				<span {...labelProps}>{label}</span>
			</Field.Root>
		);
	}

	return <SkCheckbox {...rest} ref={forwardedRef} />;
}) as PolymorphicForwardRefComponent<"input", CheckboxProps>;
DEV: Checkbox.displayName = "Checkbox";
