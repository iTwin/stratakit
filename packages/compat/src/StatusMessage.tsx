/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Field } from "@stratakit/bricks";
import * as React from "react";
import { useCompatProps } from "./~utils.js";

import type { StatusMessage as IuiStatusMessage } from "@itwin/itwinui-react";
import type { PolymorphicForwardRefComponent } from "./~utils.js";

type IuiStatusMessageProps = React.ComponentProps<typeof IuiStatusMessage>;

interface StatusMessageProps
	extends Pick<
		IuiStatusMessageProps,
		"startIcon" | "children" | "status" | "iconProps" | "contentProps"
	> {
	/** NOT IMPLEMENTED. */
	startIcon?: IuiStatusMessageProps["startIcon"];
	/** PARTIALLY IMPLEMENTED. Color mismatch and missing status icon. */
	status?: IuiStatusMessageProps["status"];
	/** NOT IMPLEMENTED. */
	iconProps?: IuiStatusMessageProps["iconProps"];
	/** NOT IMPLEMENTED. */
	contentProps?: IuiStatusMessageProps["contentProps"];
}

/** @see https://itwinui.bentley.com/docs/statusmessage */
export const StatusMessage = React.forwardRef((props, forwardedRef) => {
	const {
		// biome-ignore-start lint/correctness/noUnusedVariables: NOT IMPLEMENTED.
		startIcon,
		iconProps,
		contentProps,
		// biome-ignore-end lint/correctness/noUnusedVariables: NOT IMPLEMENTED.

		status, // PARTIALLY IMPLEMENTED. Color mismatch and missing status icon.
		children,
		...rest
	} = useCompatProps(props);

	if (status === "negative" || status === "warning") {
		return (
			<Field.ErrorMessage {...rest} ref={forwardedRef}>
				{children}
			</Field.ErrorMessage>
		);
	}

	return (
		<Field.Description {...rest} ref={forwardedRef}>
			{children}
		</Field.Description>
	);
}) as PolymorphicForwardRefComponent<"div", StatusMessageProps>;
DEV: StatusMessage.displayName = "StatusMessage";
