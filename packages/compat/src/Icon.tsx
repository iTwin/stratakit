/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { Icon as SkIcon } from "@stratakit/foundations";
import { useCompatProps } from "./~utils.js";

import type { Icon as IuiIcon } from "@itwin/itwinui-react";
import type { PolymorphicForwardRefComponent } from "./~utils.js";

type IuiIconProps = React.ComponentProps<typeof IuiIcon>;
type SkIconProps = React.ComponentProps<typeof SkIcon>;

interface IconProps extends Pick<IuiIconProps, "size" | "fill" | "padded"> {
	children?: SkIconProps["render"] | SkIconProps["href"];
	/** PARTIALLY IMPLEMENTED. Only supports large as an override. */
	size?: IuiIconProps["size"];
	/** NOT IMPLEMENTED. */
	fill?: IuiIconProps["fill"];
	/** NOT IMPLEMENTED. */
	padded?: IuiIconProps["padded"];
}

export const Icon = React.forwardRef((props, forwardedRef) => {
	const {
		// biome-ignore-start lint/correctness/noUnusedVariables: NOT IMPLEMENTED
		fill,
		padded,
		// biome-ignore-end lint/correctness/noUnusedVariables: NOT IMPLEMENTED

		size,
		children,
		...rest
	} = useCompatProps(props);

	return (
		<SkIcon
			href={typeof children === "string" ? children : undefined}
			render={React.isValidElement(children) ? children : undefined}
			size={size === "large" ? "large" : undefined}
			{...rest}
			ref={forwardedRef}
		/>
	);
}) as PolymorphicForwardRefComponent<"svg", IconProps>;
DEV: Icon.displayName = "Icon";
