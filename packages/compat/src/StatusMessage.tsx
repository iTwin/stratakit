/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Field } from "@stratakit/bricks";
import * as React from "react";
import { useCompatProps } from "./~utils.tsx";

import type { StatusMessage as IuiStatusMessage } from "@itwin/itwinui-react";
import type { PolymorphicForwardRefComponent } from "./~utils.tsx";

type IuiStatusMessageProps = React.ComponentProps<typeof IuiStatusMessage>;

interface StatusMessageProps
	extends Pick<
		IuiStatusMessageProps,
		"startIcon" | "children" | "status" | "iconProps" | "contentProps"
	> {
	/** NOT IMPLEMENTED. */
	startIcon?: IuiStatusMessageProps["startIcon"];
	/** PARTIALLY IMPLEMENTED. MISSING STATUS ICON */
	status?: IuiStatusMessageProps["status"];
	/** NOT IMPLEMENTED. */
	iconProps?: IuiStatusMessageProps["iconProps"];
	/** NOT IMPLEMENTED. */
	contentProps?: IuiStatusMessageProps["contentProps"];
}

/** @see https://itwinui.bentley.com/docs/statusmessage */
export const StatusMessage = React.forwardRef((props, forwardedRef) => {
	const {
		// biome-ignore-start lint/correctness/noUnusedVariables: NOT IMPLEMENTED
		startIcon,
		iconProps,
		contentProps,
		// biome-ignore-end lint/correctness/noUnusedVariables: NOT IMPLEMENTED

		status, // PARTIALLY IMPLEMENTED. COLOR MISMATCH AND MISSING STATUS ICON
		children,
		...rest
	} = useCompatProps(props);

	return status === "negative" || status === "warning" ? (
		<Field.ErrorMessage {...rest} ref={forwardedRef}>
			{children}
		</Field.ErrorMessage>
	) : (
		<Field.Description {...rest} ref={forwardedRef}>
			{children}
		</Field.Description>
	);
}) as PolymorphicForwardRefComponent<"div", StatusMessageProps>;
DEV: StatusMessage.displayName = "StatusMessage";
