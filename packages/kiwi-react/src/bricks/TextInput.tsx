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

/**
 * Input component that allows users to enter text based values.
 *
 * Example usage:
 * ```tsx
 * <TextInput.Input defaultValue="Hello" />
 * ```
 *
 * To add additional decorations, see `TextInput.Root` component.
 */
const TextInput = React.forwardRef<React.ElementRef<"input">, TextInputProps>(
	(props, forwardedRef) => {
		const fieldId = useFieldId();
		const isInRootContext = React.useContext(TextInputRootContext);
		return (
			<Ariakit.Role.input
				id={fieldId}
				{...props}
				className={cx(!isInRootContext && "🥝-text-input", props.className)}
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

/**
 * Root component allows adding additional decorations to text based inputs.
 *
 * Example usage to add an end icon:
 * ```tsx
 * <TextInput.Root>
 * 	<TextInput.Input defaultValue="Hello" />
 * 	<Icon href={...} />
 * </TextInput.Root>
 * ```
 */
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

export { TextInput as Input, TextInputRoot as Root };
