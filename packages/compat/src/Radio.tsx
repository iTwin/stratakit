/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Field, Radio as SkRadio } from "@stratakit/bricks";
import * as React from "react";
import { useCompatProps } from "./~utils.js";

import type { Radio as IuiRadio } from "@itwin/itwinui-react";
import type { PolymorphicForwardRefComponent } from "./~utils.js";

type SkRadioProps = React.ComponentProps<typeof SkRadio>;
type IuiRadioProps = React.ComponentProps<typeof IuiRadio>;

interface RadioProps
	extends Pick<
		IuiRadioProps,
		"label" | "status" | "labelProps" | "wrapperProps"
	> {
	/**
	 * The value of the radio input.
	 *
	 * Only supports `string`, `number`, and `undefined`.
	 * `readonly string[]` is no longer supported.
	 *
	 * @default "on"
	 */
	value?: SkRadioProps["value"];
	/** NOT IMPLEMENTED. */
	status?: IuiRadioProps["status"];
}

/** @see https://itwinui.bentley.com/docs/radio */
export const Radio = React.forwardRef((props, forwardedRef) => {
	const {
		label,
		labelProps,
		wrapperProps,
		value = "on",

		// biome-ignore-start lint/correctness/noUnusedVariables: NOT IMPLEMENTED
		status,
		// biome-ignore-end lint/correctness/noUnusedVariables: NOT IMPLEMENTED

		...rest
	} = useCompatProps(props);

	if (label) {
		return (
			<Field.Root render={<Field.Label {...wrapperProps} />}>
				<Field.Control
					ref={forwardedRef}
					render={<SkRadio {...rest} value={value} />}
				/>
				<span {...labelProps}>{label}</span>
			</Field.Root>
		);
	}

	return <SkRadio {...rest} value={value} ref={forwardedRef} />;
}) as PolymorphicForwardRefComponent<"input", RadioProps>;
DEV: Radio.displayName = "Radio";
