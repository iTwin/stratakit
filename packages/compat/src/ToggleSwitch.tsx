/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Field, Switch as SkSwitch } from "@stratakit/bricks";
import * as React from "react";
import { useCompatProps } from "./~utils.tsx";

import type { ToggleSwitch as IuiSwitch } from "@itwin/itwinui-react";
import type { PolymorphicForwardRefComponent } from "./~utils.tsx";

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

/**
 * @see https://itwinui.bentley.com/docs/toggleswitch
 *
 * In `@itwinui-react`, `ToggleSwitch`'s `className` and `style` are passed to the `<input>`. But in `@stratakit/react`,
 * they are passed to the wrapper instead.
 *
 * Thus, for a smooth transition, the `future.consistentPropsSpread` flag should be enabled in an ancestral
 * `ThemeProvider` *before* moving to `@stratakit/react`. Once in `@stratakit/react`, the flag can be removed.
 */
export const ToggleSwitch = React.forwardRef((props, forwardedRef) => {
	const {
		label,
		labelPosition = "right",
		labelProps,
		size, // NOT IMPLEMENTED
		icon, // NOT IMPLEMENTED
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
