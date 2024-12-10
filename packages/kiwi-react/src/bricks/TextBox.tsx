/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import * as Ariakit from "@ariakit/react";
import cx from "classnames";
import { useFieldId } from "./Field.js";
import { Icon } from "./Icon.js";
import { Textarea } from "./Textarea.js";
import { useMergedRefs } from "./~hooks.js";
import type { FocusableProps, BaseProps } from "./~utils.js";

// ----------------------------------------------------------------------------

interface BaseInputProps extends FocusableProps<"input"> {}

interface TextBoxInputProps extends Omit<BaseInputProps, "children" | "type"> {
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
 * <TextBox.Input defaultValue="Hello" />
 * ```
 *
 * To add additional decorations, see `TextBox.Root` component.
 */
const TextBoxInput = React.forwardRef<
	React.ElementRef<"input">,
	TextBoxInputProps
>((props, forwardedRef) => {
	const fieldId = useFieldId();
	const rootContext = React.useContext(TextBoxRootContext);
	const setDisabled = rootContext?.setDisabled;
	React.useEffect(() => {
		setDisabled?.(props.disabled);
	}, [setDisabled, props.disabled]);
	return (
		<Ariakit.Role.input
			id={fieldId}
			{...props}
			className={cx({ "🥝-text-box": !rootContext }, props.className)}
			render={
				<Ariakit.Focusable
					accessibleWhenDisabled
					render={props.render || <input />}
				/>
			}
			ref={useMergedRefs(rootContext?.inputRef, forwardedRef)}
		/>
	);
});
DEV: TextBoxInput.displayName = "TextBox.Input";

// ----------------------------------------------------------------------------

interface TextBoxRootProps extends BaseProps {}

/**
 * Root component allows adding additional decorations to text based inputs.
 *
 * Example usage to add an end icon:
 * ```tsx
 * <TextBox.Root>
 * 	<TextBox.Input defaultValue="Hello" />
 * 	<TextBox.Icon href={...} />
 * </TextBox.Root>
 * ```
 */
const TextBoxRoot = React.forwardRef<React.ElementRef<"div">, TextBoxRootProps>(
	(props, forwardedRef) => {
		const inputRef = React.useRef<HTMLInputElement>(null);
		const [disabled, setDisabled] = React.useState<boolean | undefined>();
		return (
			<TextBoxRootContext.Provider
				value={React.useMemo(() => ({ setDisabled, inputRef }), [])}
			>
				<Ariakit.Role.div
					{...props}
					data-kiwi-disabled={disabled}
					className={cx("🥝-text-box", props.className)}
					onPointerDown={(e) => {
						props.onPointerDown?.(e);

						if (e.defaultPrevented) return;
						if (disabled) return;

						if (e.target !== e.currentTarget) return;

						e.preventDefault(); // Prevent default focus behavior
						inputRef.current?.focus();
					}}
					ref={forwardedRef}
				/>
			</TextBoxRootContext.Provider>
		);
	},
);
DEV: TextBoxRoot.displayName = "TextBox.Root";

// ----------------------------------------------------------------------------

interface TextBoxIconProps extends React.ComponentProps<typeof Icon> {}

const TextBoxIcon = React.forwardRef<
	React.ElementRef<typeof Icon>,
	TextBoxIconProps
>((props, forwardedRef) => {
	return (
		<Icon
			{...props}
			className={cx("🥝-text-box-decoration", props.className)}
			ref={forwardedRef}
		/>
	);
});
DEV: TextBoxIcon.displayName = "TextBox.Icon";

// ----------------------------------------------------------------------------

interface TextBoxTextProps extends BaseProps<"span"> {}

const TextBoxText = React.forwardRef<
	React.ElementRef<"span">,
	TextBoxTextProps
>((props, forwardedRef) => {
	return (
		<Ariakit.Role.span
			{...props}
			className={cx("🥝-text-box-decoration", props.className)}
			ref={forwardedRef}
		/>
	);
});
DEV: TextBoxText.displayName = "TextBox.Text";

// ----------------------------------------------------------------------------

const TextBoxRootContext = React.createContext<
	| {
			setDisabled: (disabled: boolean | undefined) => void;
			inputRef: React.RefObject<HTMLInputElement | null>;
	  }
	| undefined
>(undefined);

// ----------------------------------------------------------------------------

export {
	TextBoxRoot as Root,
	TextBoxInput as Input,
	Textarea,
	TextBoxIcon as Icon,
	TextBoxText as Text,
};
