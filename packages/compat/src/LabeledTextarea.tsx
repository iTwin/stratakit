/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Field, TextBox } from "@stratakit/bricks";
import * as React from "react";
import { useCompatProps } from "./~utils.js";
import { InputGrid } from "./InputGrid.js";
import { Label } from "./Label.js";
import { StatusMessage } from "./StatusMessage.js";

import type {
	LabeledTextarea as IuiLabeledTextarea,
	Icon as IuiIcon,
} from "@itwin/itwinui-react";
import type { PolymorphicForwardRefComponent } from "./~utils.js";

type IuiLabeledTextareaProps = React.ComponentProps<typeof IuiLabeledTextarea>;
type IuiIconProps = React.ComponentProps<typeof IuiIcon>;

interface IconProps extends Pick<IuiIconProps, "size" | "fill" | "padded"> {
	/** PARTIALLY IMPLEMENTED. Only supports large as an override. */
	size?: IuiIconProps["size"];
	/** NOT IMPLEMENTED. */
	fill?: IuiIconProps["fill"];
	/** NOT IMPLEMENTED. */
	padded?: IuiIconProps["padded"];
}

interface LabeledTextareaProps
	extends Pick<
		IuiLabeledTextareaProps,
		| "label"
		| "message"
		| "status"
		| "wrapperProps"
		| "labelProps"
		| "messageContentProps"
		| "svgIcon"
		| "displayStyle"
	> {
	/** PARTIALLY IMPLEMENTED. Missing status icon and color mismatch for message and textarea. Doesn't change svgIcon color. */
	status?: IuiLabeledTextareaProps["status"];
	/** PARTIALLY IMPLEMENTED. Only supports one large icon size and svg props.  */
	iconProps?: IconProps &
		Omit<React.ComponentProps<typeof TextBox.Icon>, "size" | "fill">;
	/** NOT IMPLEMENTED. */
	messageContentProps?: IuiLabeledTextareaProps["messageContentProps"];
}

/** @see https://itwinui.bentley.com/docs/textarea */
export const LabeledTextarea = React.forwardRef((props, forwardedRef) => {
	const {
		status, // PARTIALLY IMPLEMENTED.
		iconProps = {}, // PARTIALLY IMPLEMENTED.
		messageContentProps, // NOT IMPLEMENTED.
		label,
		message,
		wrapperProps,
		labelProps,
		svgIcon,
		displayStyle,
		id,
		...rest
	} = useCompatProps(props);

	const {
		size: iconSize, // PARTIALLY IMPLEMENTED

		// biome-ignore-start lint/correctness/noUnusedVariables: NOT IMPLEMENTED
		fill: iconFill,
		padded: iconPadded,
		// biome-ignore-end lint/correctness/noUnusedVariables: NOT IMPLEMENTED

		...restIconProps
	} = iconProps;

	return (
		<InputGrid labelPlacement={displayStyle} {...wrapperProps}>
			<Label {...labelProps}>{label}</Label>
			<Field.Control
				render={(controlProps) => {
					return (
						<TextBox.Root>
							<TextBox.Textarea {...controlProps} {...rest} />
							{svgIcon ? (
								<TextBox.Icon
									{...restIconProps}
									render={svgIcon}
									size={iconSize === "large" ? "large" : undefined}
								/>
							) : null}
						</TextBox.Root>
					);
				}}
				id={id}
				ref={forwardedRef}
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
