/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Field, TextBox } from "@stratakit/bricks";
import { StatusMessage } from "./StatusMessage.tsx";
import * as React from "react";
import { useCompatProps } from "./~utils.tsx";

import type { LabeledInput as IuiLabeledInput } from "@itwin/itwinui-react";
import type { PolymorphicForwardRefComponent } from "./~utils.tsx";

type IuiLabeledInputProps = React.ComponentProps<typeof IuiLabeledInput>;
type SkTextBoxInputProps = React.ComponentProps<typeof TextBox.Input>;

interface LabeledInputProps
	extends Pick<
		IuiLabeledInputProps,
		| "label"
		| "message"
		| "status"
		| "svgIcon"
		| "wrapperProps"
		| "displayStyle"
		| "messageContentProps"
		| "iconProps"
		| "labelProps"
		| "inputWrapperProps"
		| "htmlSize"
		| "size"
	> {
	/** NOT IMPLEMENTED. */
	children?: IuiLabeledInputProps["children"];

	/** NOT IMPLEMENTED. */
	size?: IuiLabeledInputProps["size"];

	/** NOT IMPLEMENTED */
	messageContentProps?: IuiLabeledInputProps["messageContentProps"];

	/** NOT IMPLEMENTED. */
	status?: IuiLabeledInputProps["status"];
}

/** @see https://itwinui.bentley.com/docs/input */
export const LabeledInput = React.forwardRef((props, forwardedRef) => {
	const {
		label,
		message,
		wrapperProps = {},
		labelProps,
		messageContentProps, // NOT IMPLEMENTED
		inputWrapperProps,
		displayStyle,
		htmlSize,

		// biome-ignore-start lint/correctness/noUnusedVariables: NOT IMPLEMENTED
		children,
		status,
		size,
		// biome-ignore-end lint/correctness/noUnusedVariables: NOT IMPLEMENTED

		svgIcon,
		iconProps = {},
		type: inputType,
		id,
		...rest
	} = useCompatProps(props);

	const {
		// biome-ignore-start lint/correctness/noUnusedVariables: NOT IMPLEMENTED
		labelPlacement,
		// biome-ignore-end lint/correctness/noUnusedVariables: NOT IMPLEMENTED

		...restWrapperProps
	} = useCompatProps(wrapperProps);

	const {
		size: iconSize, // PARTIALLY IMPLEMENTED: only supports large as an override

		// biome-ignore-start lint/correctness/noUnusedVariables: NOT IMPLEMENTED
		fill: iconFill,
		padded: iconPadded,
		// biome-ignore-end lint/correctness/noUnusedVariables: NOT IMPLEMENTED

		...restIconProps
	} = useCompatProps(iconProps);

	return (
		<Field.Root
			{...restWrapperProps}
			layout={displayStyle === "inline" ? "inline" : undefined}
		>
			{label ? <Field.Label {...labelProps}>{label}</Field.Label> : null}
			<Field.Control
				render={(controlProps) => {
					return (
						<TextBox.Root {...inputWrapperProps}>
							<TextBox.Input
								{...(controlProps as SkTextBoxInputProps)}
								{...rest}
								type={inputType as SkTextBoxInputProps["type"]}
								size={htmlSize}
							/>
							{svgIcon ? (
								<TextBox.Icon
									{...(restIconProps as React.ComponentProps<"svg">)}
									render={svgIcon}
									size={iconSize === "large" ? "large" : undefined}
								/>
							) : null}
						</TextBox.Root>
					);
				}}
				ref={forwardedRef}
				id={id}
			/>
			{message ? (
				<StatusMessage contentProps={messageContentProps}>
					{message}
				</StatusMessage>
			) : null}
		</Field.Root>
	);
}) as PolymorphicForwardRefComponent<"input", LabeledInputProps>;
DEV: LabeledInput.displayName = "LabeledInput";
