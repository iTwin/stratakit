/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { Field, Switch as SkSwitch } from "@stratakit/bricks";
import {
	type PolymorphicForwardRefComponent,
	useCompatProps,
} from "./~utils.js";

import type { ToggleSwitch as IuiSwitch } from "@itwin/itwinui-react";

type IuiSwitchProps = React.ComponentProps<typeof IuiSwitch>;

interface ToggleSwitchProps
	extends Pick<
		IuiSwitchProps,
		"label" | "labelPosition" | "labelProps" | "size" | "icon"
	> {
	/** NOT IMPLEMENTED. */
	size?: IuiSwitchProps["size"];
	/** NOT IMPLEMENTED. */
	icon?: IuiSwitchProps["icon"];
}

/** @see https://itwinui.bentley.com/docs/toggleswitch */
export const ToggleSwitch = React.forwardRef((props, forwardedRef) => {
	const {
		label,
		labelPosition = "right",
		labelProps,

		// biome-ignore-start lint/correctness/noUnusedVariables: NOT IMPLEMENTED
		size,
		icon,
		// biome-ignore-end lint/correctness/noUnusedVariables: NOT IMPLEMENTED

		...rest
	} = useCompatProps(props);

	if (label) {
		const labelElement = <span {...labelProps}>{label}</span>;
		return (
			<Field.Root render={<Field.Label />}>
				{labelPosition === "left" ? labelElement : null}
				<Field.Control ref={forwardedRef} render={<SkSwitch {...rest} />} />
				{labelPosition === "right" ? labelElement : null}
			</Field.Root>
		);
	}

	return (
		<div>
			<SkSwitch ref={forwardedRef} {...rest} />
		</div>
	);
}) as PolymorphicForwardRefComponent<"input", ToggleSwitchProps>;
DEV: ToggleSwitch.displayName = "ToggleSwitch";
