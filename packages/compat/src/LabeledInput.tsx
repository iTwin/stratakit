/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Field, TextBox } from "@stratakit/bricks";
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

	/** NOT IMPLEMENTED. */
	status?: IuiLabeledInputProps["status"];
}

/** @see https://itwinui.bentley.com/docs/input */
export const LabeledInput = React.forwardRef((props, forwardedRef) => {
	const {
		// biome-ignore lint/correctness/noUnusedVariables: <NOT IMPLEMENTED>
		children, // NOT IMPLEMENTED
		label,
		message,
		// biome-ignore lint/correctness/noUnusedVariables: <NOT IMPLEMENTED>
		status, // NOT IMPLEMENTED
		wrapperProps = {},
		labelProps,
		messageContentProps,
		inputWrapperProps,
		displayStyle,
		htmlSize,
		// biome-ignore lint/correctness/noUnusedVariables: <NOT IMPLEMENTED>
		size, // NOT IMPLEMENTED
		svgIcon,
		iconProps = {},
		type: inputType,
		...rest
	} = useCompatProps(props);

	const {
		// biome-ignore lint/correctness/noUnusedVariables: <NOT IMPLEMENTED>
		labelPlacement, // NOT IMPLEMENTED
		...restWrapperProps
	} = useCompatProps(wrapperProps);

	const {
		size: iconSize, // PARTIALLY IMPLEMENTED: only supports large as an override
		// biome-ignore lint/correctness/noUnusedVariables: <NOT IMPLEMENTED>
		fill: iconFill, // NOT IMPLEMENTED
		// biome-ignore lint/correctness/noUnusedVariables: <NOT IMPLEMENTED>
		padded: iconPadded, // NOT IMPLEMENTED
		...restIconProps
	} = useCompatProps(iconProps);

	return (
		<Field.Root
			{...restWrapperProps}
			layout={displayStyle === "inline" ? "inline" : undefined}
		>
			{label ? <Field.Label {...labelProps}>{label}</Field.Label> : null}
			<Field.Control
				render={
					<TextBox.Root {...inputWrapperProps}>
						<TextBox.Input
							{...rest}
							type={inputType as SkTextBoxInputProps["type"]}
							size={htmlSize}
							ref={forwardedRef}
						/>
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
			{message ? (
				<Field.Description {...messageContentProps}>
					{message}
				</Field.Description>
			) : null}
		</Field.Root>
	);
}) as PolymorphicForwardRefComponent<"input", LabeledInputProps>;
DEV: LabeledInput.displayName = "LabeledInput";
