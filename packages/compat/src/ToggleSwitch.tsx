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
 * **Requirement**: Must enable iTwinUI `ThemeProvider`'s `future.consistentPropsSpread` flag before using this compat component.
 * This is because `className` and `style` are passed to the `input` instead of the wrapper, similar to when the `future.consistentPropsSpread` flag is enabled.
 *
 * Example iTwinUI code before using this compat component:
 *
 * @example
 * import { ThemeProvider, ToggleSwitch } from "@itwin/itwinui-react";
 *
 * <ThemeProvider
 *   future={{
 *     consistentPropsSpread: true // 👈 Must be enabled
 *   }}
 * >
 *   <ToggleSwitch
 *     label={…}
 *     className="…" // applied on the `<input />`
 *     style={{ … }} // applied on the `<input />`
 *   />
 * </ThemeProvider>
 *
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

	const labelComponent = <span {...labelProps}>{label}</span>;

	if (label) {
		return (
			<Field.Root render={<Field.Label />}>
				{labelPosition === "left" ? labelComponent : null}
				<Field.Control ref={forwardedRef} render={<SkSwitch {...rest} />} />
				{labelPosition === "right" ? labelComponent : null}
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
