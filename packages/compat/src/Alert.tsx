/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { unstable_Banner as SkBanner } from "@stratakit/structures";
import * as React from "react";
import { useCompatProps } from "./~utils.tsx";

import type { Alert as IuiBanner } from "@itwin/itwinui-react";
import { Anchor, VisuallyHidden } from "@stratakit/bricks";
import type { PolymorphicForwardRefComponent } from "./~utils.tsx";

type SkBannerProps = React.ComponentProps<typeof SkBanner>;
type IuiBannerProps = React.ComponentProps<typeof IuiBanner>;

interface AlertProps
	extends Pick<
		IuiBannerProps,
		"type" | "isSticky" | "clickableText" | "clickableTextProps" | "onClose"
	> {
	/** PARTIALLY IMPLEMENTED: If `undefined`, a new "neutral" type is used (no longer defaults to "informational"). */
	type?: IuiBannerProps["type"];
	/** NOT IMPLEMENTED */
	isSticky?: IuiBannerProps["isSticky"];
}

/** @see https://itwinui.bentley.com/docs/alert */
export const Alert = React.forwardRef((props, forwardedRef) => {
	const {
		isSticky, // NOT IMPLEMENTED
		type, // PARTIALLY IMPLEMENTED
		children,
		clickableText,
		clickableTextProps,
		onClose,
		...rest
	} = useCompatProps(props);

	const tone = React.useMemo<SkBannerProps["tone"]>(() => {
		switch (type) {
			case "informational":
				return "info";
			case "positive":
				return "positive";
			case "negative":
				return "critical";
			case "warning":
				return "attention";
			default:
				return "neutral";
		}
	}, [type]);

	return (
		<SkBanner
			{...rest}
			ref={forwardedRef}
			tone={tone}
			label={<VisuallyHidden>Alert</VisuallyHidden>}
			message={children}
			actions={
				clickableText != null ? (
					<Anchor render={<button />} {...clickableTextProps}>
						{clickableText}
					</Anchor>
				) : undefined
			}
			onDismiss={onClose}
		/>
	);
}) as PolymorphicForwardRefComponent<"div", AlertProps>;
DEV: Alert.displayName = "Alert";
