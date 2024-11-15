/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import * as Ariakit from "@ariakit/react";
import cx from "classnames";
import { useFieldId } from "./Field.js";
import { Icon } from "./Icon.js";

// ----------------------------------------------------------------------------

type BaseInputProps = Ariakit.FocusableProps<"input">;

interface TextInputProps extends Omit<BaseInputProps, "children" | "type"> {
	/** Input is a [void element](https://developer.mozilla.org/en-US/docs/Glossary/Void_element) and no content is permitted. */
	children?: never;
	/**
	 * Describes a text based [input type](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#input_types)
	 * based on the value type the user will enter.
	 *
	 * @default "text"
	 */
	type?: Extract<
		BaseInputProps["type"],
		"text" | "email" | "password" | "search" | "tel" | "url" | "number" | "date"
	>;
}

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
		const rootContext = React.useContext(TextInputRootContext);
		rootContext?.setDisabled(props.disabled);
		return (
			<Ariakit.Role.input
				id={fieldId}
				{...props}
				className={cx(!rootContext && "🥝-text-input", props.className)}
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
 * 	<TextInput.Icon href={...} />
 * </TextInput.Root>
 * ```
 */
const TextInputRoot = React.forwardRef<
	React.ElementRef<"div">,
	TextInputRootProps
>((props, forwardedRef) => {
	const ref = React.useRef<HTMLDivElement | null>(null);
	const [disabled, setDisabled] = React.useState<boolean | undefined>();
	return (
		<TextInputRootContext.Provider value={{ setDisabled }}>
			<Ariakit.Role.div
				{...props}
				data-kiwi-disabled={disabled}
				className={cx("🥝-text-input", props.className)}
				onPointerDown={(e) => {
					props.onPointerDown?.(e);

					if (disabled) return;

					const input = ref.current?.querySelector("input");
					if (!input) return;
					if (e.target === input) return;

					e.preventDefault();
					input.focus();
				}}
				// TODO: merge refs
				ref={ref}
			/>
		</TextInputRootContext.Provider>
	);
});

// ----------------------------------------------------------------------------

interface TextInputIconProps extends React.ComponentProps<typeof Icon> {}

const TextInputIcon = React.forwardRef<
	React.ElementRef<typeof Icon>,
	TextInputIconProps
>((props, forwardedRef) => {
	return (
		<Icon
			{...props}
			className={cx("🥝-text-input-decoration", props.className)}
			ref={forwardedRef}
		/>
	);
});

// ----------------------------------------------------------------------------

interface TextInputTextProps extends Ariakit.RoleProps<"span"> {}

const TextInputText = React.forwardRef<
	React.ElementRef<"span">,
	TextInputTextProps
>((props, forwardedRef) => {
	return (
		<Ariakit.Role.span
			{...props}
			className={cx("🥝-text-input-decoration", props.className)}
			ref={forwardedRef}
		/>
	);
});

// ----------------------------------------------------------------------------

const TextInputRootContext = React.createContext<
	| {
			setDisabled: (disabled: boolean | undefined) => void;
	  }
	| undefined
>(undefined);

// ----------------------------------------------------------------------------

export {
	TextInput as Input,
	TextInputIcon as Icon,
	TextInputText as Text,
	TextInputRoot as Root,
};
