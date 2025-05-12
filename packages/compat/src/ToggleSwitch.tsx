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

/** @see https://itwinui.bentley.com/docs/toggleswitch */
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
				<Field.Control render={<SkSwitch {...rest} />} />
				{labelPosition === "right" ? labelComponent : null}
			</Field.Root>
		);
	}

	return <SkSwitch ref={forwardedRef} {...rest} />;
}) as PolymorphicForwardRefComponent<"input", ToggleSwitchProps>;
DEV: ToggleSwitch.displayName = "ToggleSwitch";
