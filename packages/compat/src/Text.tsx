/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Skeleton as SkSkeleton, Text as SkText } from "@stratakit/bricks";
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
}

export const Text = React.forwardRef((props, forwardedRef) => {
	const {
		variant: variantProp,
		isMuted, // NOT IMPLEMENTED
		isSkeleton,
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

	if (isSkeleton) {
		return <SkeletonText {...rest} variant={variantProp} ref={forwardedRef} />;
	}

	return <SkText {...rest} variant={variant} ref={forwardedRef} />;
}) as PolymorphicForwardRefComponent<"div", TextProps>;
DEV: Text.displayName = "Text";

// ----------------------------------------------------------------------------

const SkeletonText = React.forwardRef((props, forwardedRef) => {
	const { variant, ...rest } = props;

	const size = React.useMemo(() => {
		switch (variant) {
			case "headline":
				return "xlarge";
			case "title":
				return "large";
			case "subheading":
				return "medium";
			case "leading":
				return "medium";
			case "body":
				return "medium";
			case "small":
				return "small";
			default:
				return "medium";
		}
	}, [variant]);

	return (
		<SkSkeleton
			aria-hidden="true"
			inert
			{...rest}
			size={size}
			style={{ width: "fit-content", color: "transparent", ...props.style }}
			ref={forwardedRef}
		/>
	);
}) as PolymorphicForwardRefComponent<"div", Pick<IuiTextProps, "variant">>;
DEV: SkeletonText.displayName = "SkeletonText";
