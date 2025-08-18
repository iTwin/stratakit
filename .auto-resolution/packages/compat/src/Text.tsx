/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { Text as SkText } from "@stratakit/bricks";
import { useCompatProps } from "./~utils.js";

import type { Text as IuiText } from "@itwin/itwinui-react";
import type { PolymorphicForwardRefComponent } from "./~utils.js";

type SkTextProps = React.ComponentProps<typeof SkText>;
type IuiTextProps = React.ComponentProps<typeof IuiText>;

interface TextProps
	extends Pick<IuiTextProps, "variant" | "isMuted" | "isSkeleton"> {
	/** NOT IMPLEMENTED. */
	isMuted?: IuiTextProps["isMuted"];
	/** NOT IMPLEMENTED. */
	isSkeleton?: IuiTextProps["isSkeleton"];
}

/** @see https://itwinui.bentley.com/docs/text  */
export const Text = React.forwardRef((props, forwardedRef) => {
	const {
		variant: variantProp,

		// biome-ignore-start lint/correctness/noUnusedVariables: NOT IMPLEMENTED
		isMuted,
		isSkeleton,
		// biome-ignore-end lint/correctness/noUnusedVariables: NOT IMPLEMENTED

		...rest
	} = useCompatProps(props);

	const variant: SkTextProps["variant"] = React.useMemo(() => {
		switch (variantProp) {
			case "headline":
				return "display-md";
			case "title":
				return "headline-lg";
			case "subheading":
				return "headline-md";
			case "leading":
				return "headline-sm";
			case "body":
				return "body-sm";
			case "small":
				return "caption-lg";
			default:
				return "body-md";
		}
	}, [variantProp]);

	return <SkText {...rest} variant={variant} ref={forwardedRef} />;
}) as PolymorphicForwardRefComponent<"div", TextProps>;
DEV: Text.displayName = "Text";
