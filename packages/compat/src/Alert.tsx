/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Anchor, VisuallyHidden } from "@stratakit/bricks";
import { unstable_Banner as SkBanner } from "@stratakit/structures";
import * as React from "react";
import { useCompatProps } from "./~utils.tsx";

import type { Alert as IuiAlert } from "@itwin/itwinui-react";
import type { PolymorphicForwardRefComponent } from "./~utils.tsx";

type SkBannerProps = React.ComponentProps<typeof SkBanner>;
type IuiAlertProps = React.ComponentProps<typeof IuiAlert>;

interface AlertProps
	extends Pick<
		IuiAlertProps,
		"type" | "isSticky" | "clickableText" | "clickableTextProps" | "onClose"
	> {
	/** NOT IMPLEMENTED */
	isSticky?: IuiAlertProps["isSticky"];
}

/** @see https://itwinui.bentley.com/docs/alert */
export const Alert = React.forwardRef((props, forwardedRef) => {
	const {
		isSticky, // NOT IMPLEMENTED
		type,
		children,
		clickableText,
		clickableTextProps,
		onClose,
		...rest
	} = useCompatProps(props);

	const tone = React.useMemo<NonNullable<SkBannerProps["tone"]>>(() => {
		switch (type) {
			case "informational":
				return "info";
			case "positive":
				return "positive";
			case "negative":
				return "critical";
			case "warning":
				return "attention";
		}

		return "info";
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
