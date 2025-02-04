/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import * as Ariakit from "@ariakit/react";
import cx from "classnames";
import { useFieldDescribedBy } from "./Field.js";
import { Icon } from "./Icon.js";
import { useMergedRefs } from "./~hooks.js";
import {
	type FocusableProps,
	type BaseProps,
	forwardRef,
	FieldControl,
} from "./~utils.js";

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
 * An input component that allows users to enter text based values.
 *
 * Example usage:
 * ```tsx
 * <TextBox.Input defaultValue="Hello" />
 * ```
 *
 * To add additional decorations, see `TextBox.Root` component.
 *
 * Works well with the `Field` and `Label` components.
 * ```tsx
 * <Field>
 *   <Label>Enter your name</Label>
 *   <TextBox.Input />
 * </Field>
 * ```
 *
 * Underneath, it's an HTML input, i.e. `<input>`, so it supports the same props, including
 * `value`, `defaultValue`, `onChange`, and `disabled`.
 *
 * For a multiline text input, use the `TextBox.Textarea` component.
 */
const TextBoxInput = forwardRef<"input", TextBoxInputProps>(
	(props, forwardedRef) => {
		const describedBy = useFieldDescribedBy(props["aria-describedby"]);
		const rootContext = React.useContext(TextBoxRootContext);
		const setDisabled = rootContext?.setDisabled;
		React.useEffect(() => {
			setDisabled?.(props.disabled);
		}, [setDisabled, props.disabled]);
		return (
			<FieldControl
				type="textlike"
				id={props.id}
				render={
					<Ariakit.Role.input
						readOnly={props.disabled}
						{...props}
						aria-describedby={describedBy}
						className={cx({ "🥝-text-box": !rootContext }, props.className)}
						/**
						 * Use an empty string as a placeholder to fix baseline alignment in Safari.
						 * @see https://bugs.webkit.org/show_bug.cgi?id=142968
						 */
						placeholder={props.placeholder ?? " "}
						render={
							<Ariakit.Focusable
								accessibleWhenDisabled
								render={props.render || <input />}
							/>
						}
						ref={useMergedRefs(rootContext?.inputRef, forwardedRef)}
					/>
				}
			/>
		);
	},
);
DEV: TextBoxInput.displayName = "TextBox.Input";

// ----------------------------------------------------------------------------

interface TextareaProps extends FocusableProps<"textarea"> {}

/**
 * A styled textarea element that allows users to enter multiline text values.
 *
 * Example usage:
 * ```tsx
 * <TextBox.Textarea defaultValue="Hello" />
 * ```
 *
 * Works well with the `Field` and `Label` components.
 * ```tsx
 * <Field>
 *   <Label>Leave a comment, be kind</Label>
 *   <TextBox.Textarea />
 * </Field>
 * ```
 *
 * Underneath, it's an HTML textarea, i.e. `<textarea>`, so it supports the same props, including
 * `value`, `defaultValue`, `onChange`, and `disabled`.
 */
const TextBoxTextarea = forwardRef<"textarea", TextareaProps>(
	(props, forwardedRef) => {
		const describedBy = useFieldDescribedBy(props["aria-describedby"]);

		return (
			<FieldControl
				type="textlike"
				id={props.id}
				render={
					<Ariakit.Role.textarea
						readOnly={props.disabled}
						{...props}
						className={cx("🥝-text-box", props.className)}
						aria-describedby={describedBy}
						/**
						 * Use an empty string as a placeholder to fix baseline alignment in Safari.
						 * @see https://bugs.webkit.org/show_bug.cgi?id=142968
						 */
						placeholder={props.placeholder ?? " "}
						render={
							<Ariakit.Focusable
								accessibleWhenDisabled
								render={props.render || <textarea />}
							/>
						}
						ref={forwardedRef}
					/>
				}
			/>
		);
	},
);
DEV: TextBoxTextarea.displayName = "TextBox.Textarea";

// ----------------------------------------------------------------------------

interface TextBoxRootProps extends BaseProps {}

/**
 * Compound component for a text input. Allows adding additional decorations.
 *
 * Example usage to add an end icon:
 * ```tsx
 * <TextBox.Root>
 *   <TextBox.Input defaultValue="Hello" />
 *   <TextBox.Icon href={...} />
 * </TextBox.Root>
 * ```
 *
 * Works well with the `Field` and `Label` components.
 * ```tsx
 * <Field>
 *   <Label>Enter your name</Label>
 *   <TextBox.Root>
 *     <TextBox.Input />
 *     <TextBox.Icon href={…} />
 *   </TextBox.Root>
 * </Field>
 * ```
 */
const TextBoxRoot = forwardRef<"div", TextBoxRootProps>(
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

/**
 * A static icon decoration for the `TextBox.Root` component. Can be added before or after the `TextBox.Input`.
 */
const TextBoxIcon = forwardRef<"svg", TextBoxIconProps>(
	(props, forwardedRef) => {
		return (
			<Icon
				{...props}
				className={cx("🥝-text-box-decoration", props.className)}
				ref={forwardedRef}
			/>
		);
	},
);
DEV: TextBoxIcon.displayName = "TextBox.Icon";

// ----------------------------------------------------------------------------

interface TextBoxTextProps extends BaseProps<"span"> {}

/**
 * A static text decoration for the `TextBox.Root` component. Can be added before or after the `TextBox.Input`.
 */
const TextBoxText = forwardRef<"span", TextBoxTextProps>(
	(props, forwardedRef) => {
		return (
			<Ariakit.Role.span
				{...props}
				className={cx("🥝-text-box-decoration", props.className)}
				ref={forwardedRef}
			/>
		);
	},
);
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
	TextBoxTextarea as Textarea,
	TextBoxIcon as Icon,
	TextBoxText as Text,
};
