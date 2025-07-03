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

interface IconProps extends Pick<IuiIconProps, "size" | "fill" | "padded"> {
	/** BREAKING CHANGE. Overridden with `React.JSX.Element`. */
	children?: React.JSX.Element;
	/** PARTIALLY IMPLEMENTED. Only supports `large` and `medium` size. Other values are mapped to `medium`. */
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
			render={children}
			size={size === "large" ? "large" : undefined}
			{...(rest as React.ComponentProps<"svg">)}
			ref={forwardedRef}
		/>
	);
}) as PolymorphicForwardRefComponent<"span", IconProps>;
DEV: Icon.displayName = "Icon";
