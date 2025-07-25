/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { Anchor } from "@stratakit/bricks";
import * as SkBanner from "@stratakit/structures/unstable_Banner";
import {
	type PolymorphicForwardRefComponent,
	useCompatProps,
} from "./~utils.js";

import type { Alert as IuiAlert } from "@itwin/itwinui-react";

type SkBannerRootProps = React.ComponentProps<typeof SkBanner.Root>;
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
		type,
		children,
		clickableText,
		clickableTextProps,
		onClose,

		// biome-ignore-start lint/correctness/noUnusedVariables: NOT IMPLEMENTED
		isSticky,
		// biome-ignore-end lint/correctness/noUnusedVariables: NOT IMPLEMENTED

		...rest
	} = useCompatProps(props);

	const tone = React.useMemo<NonNullable<SkBannerRootProps["tone"]>>(() => {
		switch (type) {
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
		<SkBanner.Root {...rest} ref={forwardedRef} tone={tone}>
			<SkBanner.Icon />

			<SkBanner.Message>{children}</SkBanner.Message>

			{clickableText != null ? (
				<SkBanner.Actions>
					<Anchor
						render={clickableTextProps?.href ? undefined : <button />}
						{...clickableTextProps}
					>
						{clickableText}
					</Anchor>
				</SkBanner.Actions>
			) : null}

			{onClose != null ? <SkBanner.DismissButton onClick={onClose} /> : null}
		</SkBanner.Root>
	);
}) as PolymorphicForwardRefComponent<"div", AlertProps>;
DEV: Alert.displayName = "Alert";
