/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Badge as SkBadge } from "@stratakit/bricks";
import * as React from "react";
import { useCompatProps } from "./~utils.tsx";

import type { Badge as IuiBadge } from "@itwin/itwinui-react";
import type { PolymorphicForwardRefComponent } from "./~utils.tsx";

type IuiBadgeProps = React.ComponentProps<typeof IuiBadge>;
type SkBadgeProps = React.ComponentProps<typeof SkBadge>;

interface BadgeProps
	extends Pick<IuiBadgeProps, "backgroundColor" | "children"> {
	/**
	 * PARTIALLY IMPLEMENTED: Only supports
	 * `undefined`, `"primary"`, `"informational"`, `"positive"`, `"negative"`, `"warning"`.
	 */
	backgroundColor?: IuiBadgeProps["backgroundColor"];
	/** PARTIALLY IMPLEMENTED: No longer gets converted to uppercase and no longer gets truncated if too long. */
	children: IuiBadgeProps["children"];
}

/** @see https://itwinui.bentley.com/docs/badge */
export const Badge = React.forwardRef((props, forwardedRef) => {
	const {
		backgroundColor, // PARTIALLY IMPLEMENTED
		children, // PARTIALLY IMPLEMENTED
		...rest
	} = useCompatProps(props);

	const tone = React.useMemo<SkBadgeProps["tone"] | undefined>(() => {
		switch (backgroundColor) {
			case "primary":
			case "informational":
				return "info";
			case "positive":
				return "positive";
			case "negative":
				return "critical";
			case "warning":
				return "attention";
		}
	}, [backgroundColor]);

	return (
		<SkBadge
			{...rest}
			ref={forwardedRef}
			label={children}
			tone={tone}
			variant={tone != null ? "outline" : undefined}
		/>
	);
}) as PolymorphicForwardRefComponent<"span", BadgeProps>;
DEV: Badge.displayName = "Badge";
