/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Field as SkField } from "@stratakit/bricks";
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
	/** NOT IMPLEMENTED. */
	status?: IuiStatusMessageProps["status"];
	/** NOT IMPLEMENTED. */
	iconProps?: IuiStatusMessageProps["iconProps"];
}

/** @see https://itwinui.bentley.com/docs/statusmessage */
export const StatusMessage = React.forwardRef((props, forwardedRef) => {
	const {
		startIcon, // NOT IMPLEMENTED
		children,
		status, // NOT IMPLEMENTED
		iconProps, // NOT IMPLEMENTED
		contentProps,
		...rest
	} = useCompatProps(props);

	return (
		<SkField.Description {...contentProps} {...rest} ref={forwardedRef}>
			{children}
		</SkField.Description>
	);
}) as PolymorphicForwardRefComponent<"div", StatusMessageProps>;
DEV: StatusMessage.displayName = "StatusMessage";
