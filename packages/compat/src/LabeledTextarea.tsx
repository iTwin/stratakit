/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Field, TextBox } from "@stratakit/bricks";
import * as React from "react";
import { useCompatProps } from "./~utils.tsx";

import type { LabeledTextarea as IuiLabeledTextarea } from "@itwin/itwinui-react";
import type { PolymorphicForwardRefComponent } from "./~utils.tsx";
import { InputGrid } from "./InputGrid.tsx";
import { Label } from "./Label.tsx";
import { StatusMessage } from "./StatusMessage.tsx";

type IuiLabeledTextareaProps = React.ComponentProps<typeof IuiLabeledTextarea>;

interface LabeledTextareaProps
	extends Pick<
		IuiLabeledTextareaProps,
		| "label"
		| "message"
		| "status"
		| "wrapperProps"
		| "labelProps"
		| "messageContentProps"
		| "iconProps"
		| "svgIcon"
		| "displayStyle"
	> {
	/** PARTIALLY IMPLEMENTED. Missing status icon and color mismatch for message and textarea. Doesn't change svgIcon color. */
	status?: IuiLabeledTextareaProps["status"];
	/** PARTIALLY IMPLEMENTED. Only supports one large icon size and svg props.  */
	iconProps?: IuiLabeledTextareaProps["iconProps"];
	/** NOT IMPLEMENTED. */
	messageContentProps?: IuiLabeledTextareaProps["messageContentProps"];
}

/** @see https://itwinui.bentley.com/docs/textarea */
export const LabeledTextarea = React.forwardRef((props, forwardedRef) => {
	const {
		status, // PARTIALLY IMPLEMENTED. Missing status icon and color mismatch for message and textarea. Doesn't change svgIcon color.
		iconProps = {}, // PARTIALLY IMPLEMENTED. Only supports one large icon size and svg props.
		messageContentProps, // NOT IMPLEMENTED.
		label,
		message,
		wrapperProps,
		labelProps,
		svgIcon,
		displayStyle,
		...rest
	} = useCompatProps(props);

	const {
		size: iconSize, // PARTIALLY IMPLEMENTED: only supports large as an override

		// biome-ignore-start lint/correctness/noUnusedVariables: NOT IMPLEMENTED
		fill: iconFill,
		padded: iconPadded,
		// biome-ignore-end lint/correctness/noUnusedVariables: NOT IMPLEMENTED

		...restIconProps
	} = useCompatProps(iconProps);

	return (
		<InputGrid labelPlacement={displayStyle} {...wrapperProps}>
			<Label {...labelProps}>{label}</Label>
			<Field.Control
				render={
					<TextBox.Root>
						<TextBox.Textarea {...rest} ref={forwardedRef} />
						{svgIcon ? (
							<TextBox.Icon
								{...(restIconProps as React.ComponentProps<"svg">)}
								render={svgIcon}
								size={iconSize === "large" ? "large" : undefined}
							/>
						) : null}
					</TextBox.Root>
				}
			/>
			{message && (
				<StatusMessage status={status} contentProps={messageContentProps}>
					{message}
				</StatusMessage>
			)}
		</InputGrid>
	);
}) as PolymorphicForwardRefComponent<"textarea", LabeledTextareaProps>;
DEV: LabeledTextarea.displayName = "LabeledTextarea";
