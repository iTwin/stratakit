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
		const inRoot = React.useContext(TextInputRootContext);
		return (
			<Ariakit.Role.input
				id={fieldId}
				{...props}
				className={cx("🥝-text-input", inRoot && "🥝-in-root", props.className)}
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
		<TextInputRootContext.Provider value={true}>
			<Ariakit.Role.div
				{...props}
				className={cx("🥝-text-input", "🥝-text-input-root", props.className)}
				ref={forwardedRef}
			/>
		</TextInputRootContext.Provider>
	);
});

// ----------------------------------------------------------------------------

const TextInputRootContext = React.createContext(false);

// ----------------------------------------------------------------------------

/**
 * Text input component that allows users to enter text based values.
 *
 * Example usage:
 * ```tsx
 * <TextInput defaultValue="Hello" />
 * ```
 *
 * To add additional decorations, use a compositional approach. For example, to add an end icon:
 * ```tsx
 * <TextInput.Root>
 * 	<TextInput.Input defaultValue="Hello" />
 * 	<Icon href={...} />
 * </TextInput.Root>
 * ```
 */
const TextInputCompound = TextInput as typeof TextInput & {
	Root: typeof TextInputRoot;
	Input: typeof TextInput;
};
TextInputCompound.Root = TextInputRoot;
TextInputCompound.Input = TextInput;

// ----------------------------------------------------------------------------

export { TextInputCompound as TextInput };
