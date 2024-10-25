/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import * as Ariakit from "@ariakit/react";
import cx from "classnames";
import { useFieldId } from "./Field.js";

// ----------------------------------------------------------------------------

interface TextInputProps extends Ariakit.FocusableProps<"input"> {}

const TextInput = React.forwardRef<React.ElementRef<"input">, TextInputProps>(
	(props, forwardedRef) => {
		const fieldId = useFieldId();

		return (
			<Ariakit.Role.input
				id={fieldId}
				{...props}
				className={cx("🥝-text-input", props.className)}
				render={
					<Ariakit.Focusable
						accessibleWhenDisabled
						render={props.render || <input />}
					/>
				}
				ref={forwardedRef}
			/>
		);
	},
);

// ----------------------------------------------------------------------------

interface TextInputRootProps extends Ariakit.RoleProps<"div"> {}

const TextInputRoot = React.forwardRef<
	React.ElementRef<"div">,
	TextInputRootProps
>((props, forwardedRef) => {
	return (
		<Ariakit.Role.div
			{...props}
			className={cx("🥝-text-input", "🥝-text-input-root", props.className)}
			ref={forwardedRef}
		/>
	);
});

// ----------------------------------------------------------------------------

const TextInputCompound = TextInput as typeof TextInput & {
	Root: typeof TextInputRoot;
	Input: typeof TextInput;
};
TextInputCompound.Root = TextInputRoot;
TextInputCompound.Input = TextInput;

// ----------------------------------------------------------------------------

export { TextInputCompound as TextInput };
