/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Text as SkText } from "@stratakit/bricks";
import * as React from "react";
import { useCompatProps } from "./~utils.tsx";

import type { Text as IuiText } from "@itwin/itwinui-react";
import type { PolymorphicForwardRefComponent } from "./~utils.tsx";

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
		// biome-ignore lint/correctness/noUnusedVariables: <NOT IMPLEMENTED>
		isMuted, // NOT IMPLEMENTED
		// biome-ignore lint/correctness/noUnusedVariables: <NOT IMPLEMENTED>
		isSkeleton, // NOT IMPLEMENTED
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
