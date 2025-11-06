/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { Role } from "@ariakit/react/role";
import { Text } from "@stratakit/bricks";
import { Icon } from "@stratakit/foundations";
import { forwardRef, isBrowser } from "@stratakit/foundations/secret-internals";
import cx from "classnames";
import { CaretsUpDown } from "./~utils.icons.js";
import { useFieldControlType } from "./Field.internal.js";

import type {
	BaseProps,
	FocusableProps,
} from "@stratakit/foundations/secret-internals";

const supportsHas = isBrowser && CSS?.supports?.("selector(:has(+ *))");

// ----------------------------------------------------------------------------

const HtmlSelectContext = React.createContext<
	React.Dispatch<React.SetStateAction<boolean>>
>(() => {});

/**
 * Compound component for a select element, which allows the user to select a value from a list of options.
 *
 * Use with the `Field` components to automatically handle ID associations for
 * labels and descriptions:
 * ```tsx
 * <Field.Root>
 *   <Field.Label>Fruit</Field.Label>
 *   <Field.Control
 *     render={(controlProps) => (
 *       <Select.Root>
 *         <Select.HtmlSelect name="fruit" {...controlProps}>
 *           <Select.SelectedContent />
 *           <Select.Option value="kiwi" label="Kiwi" />
 *           <Select.Option value="mango" label="Mango" />
 *           <Select.Option value="papaya" label="Papaya" />
 *         </Select.HtmlSelect>
 *       </Select.Root>
 *     )}
 *   />
 * </Field.Root>
 * ```
 *
 * Without the `Field` components you will need to manually associate labels,
 * descriptions, etc.:
 * ```tsx
 * <Label htmlFor="fruit">Fruit</Label>
 * <Description id="fruit-description">Something to include in a fruit salad.</Description>
 * <Select.Root>
 *   <Select.HtmlSelect id="fruit" aria-describedby="fruit-description">
 *     <Select.SelectedContent />
 *     <Select.Option value="kiwi" label="Kiwi" />
 *     <Select.Option value="mango" label="Mango" />
 *     <Select.Option value="papaya" label="Papaya" />
 *   </Select.HtmlSelect>
 * </Select.Root>
 * ```
 */
const SelectRoot = forwardRef<"div", BaseProps>((props, forwardedRef) => {
	useFieldControlType("textlike");
	const [isHtmlSelect, setIsHtmlSelect] = React.useState(false);

	return (
		<HtmlSelectContext.Provider value={setIsHtmlSelect}>
			<Role.div
				{...props}
				className={cx("🥝SelectRoot", props.className)}
				data-_sk-has-select={!supportsHas && isHtmlSelect ? "true" : undefined}
				ref={forwardedRef}
			/>
		</HtmlSelectContext.Provider>
	);
});

// ----------------------------------------------------------------------------

type HtmlSelectBaseProps = Omit<FocusableProps<"select">, "multiple" | "size">;

interface HtmlSelectProps extends HtmlSelectBaseProps {
	/**
	 * The variant of the `HtmlSelect`, i.e. solid, outline, or ghost.
	 *
	 * @default "solid"
	 */
	variant?: "solid" | "outline" | "ghost";
}

/**
 * The actual select element to be used inside `Select.Root`. This is a wrapper around the
 * HTML `<select>` element and should render HTML `<option>` elements as children.
 *
 * Example usage:
 * ```tsx
 * <Select.HtmlSelect>
 *   <Select.SelectedContent />
 *   <Select.Option value="1" label="Option 1" />
 *   <Select.Option value="2" label="Option 2" />
 *   <Select.Option value="3" label="Option 3" />
 * </Select.HtmlSelect>
 * ```
 *
 * The usage of this component largely mirrors how the `<select>` element would be used in React.
 * You can use the same familiar props, including `name`, `defaultValue`, `value`, `onChange`, etc.
 *
 * @see https://react.dev/reference/react-dom/components/select
 */
const HtmlSelect = forwardRef<"select", HtmlSelectProps>(
	(props, forwardedRef) => {
		const { variant = "solid", ...rest } = props;

		const setIsHtmlSelect = React.useContext(HtmlSelectContext);

		React.useEffect(
			function updateContext() {
				setIsHtmlSelect(true);
			},
			[setIsHtmlSelect],
		);

		return (
			<>
				<Role.select
					{...rest}
					className={cx("🥝Select", props.className)}
					data-_sk-tone="neutral"
					data-_sk-variant={variant}
					ref={forwardedRef}
				/>

				<CaretsUpDown className="🥝SelectArrow" />
			</>
		);
	},
);

// ----------------------------------------------------------------------------

interface OptionProps
	extends Omit<React.OptionHTMLAttributes<HTMLOptionElement>, "label"> {
	/**
	 * The content to display for this option.
	 * If `label` is provided, this becomes optional for backward compatibility.
	 */
	children?: React.ReactNode;

	/**
	 * The primary text label for the option. If provided, `children` becomes optional.
	 */
	label?: React.ReactNode;

	/**
	 * An optional icon displayed before the option label.
	 * Can be a URL of an SVG from the `@stratakit/icons` package,
	 * or a custom JSX icon.
	 */
	icon?: string | React.JSX.Element;
}

/**
 * An option component to be used inside `Select.HtmlSelect`. This is a wrapper around the
 * HTML `<option>` element that accepts children for the option content, or `label` and `icon` props.
 *
 * Example usage:
 * ```tsx
 * <Select.HtmlSelect>
 *   <Select.SelectedContent />
 *   <Select.Option value="1" label="Option 1" />
 *   <Select.Option value="2" label="Option 2" />
 *   <Select.Option value="3" label="Option 3" icon="path/to/icon.svg" />
 * </Select.HtmlSelect>
 * ```
 *
 * The usage of this component largely mirrors how the `<option>` element would be used in React.
 * You can use the same familiar props, including `value`, `disabled`, `selected`, etc.
 *
 * @see https://react.dev/reference/react-dom/components/option
 */
const Option = forwardRef<"option", OptionProps>((props, forwardedRef) => {
	const { children, label, icon, ...rest } = props;

	// Determine the content to display
	const content = label ?? children;

	return (
		<option
			{...rest}
			className={cx("🥝ListItem 🥝SelectOption", props.className)}
			ref={forwardedRef}
		>
			{typeof icon === "string" ? (
				<Icon className="🥝ListItemDecoration" href={icon} />
			) : (
				icon
			)}
			<Text
				render={<span />}
				className="🥝ListItemContent 🥝SelectOptionLabel"
				variant="body-sm"
			>
				{content}
			</Text>
		</option>
	);
});

// ----------------------------------------------------------------------------

interface SelectedContentProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	/**
	 * The content to display in the selected content button.
	 */
	children: React.ReactNode;
}

/**
 * The location that displays the currently selected option's content.
 *
 * Example usage:
 * ```tsx
 * <Select.Root>
 *   <Select.SelectedContent />
 * </Select.Root>
 * ```
 */
const SelectedContent = forwardRef<"button", SelectedContentProps>(
	(props, forwardedRef) => {
		const { ...rest } = props;

		return (
			<button>
				<selectedcontent
					{...rest}
					className={cx("🥝ListItem 🥝SelectSelectedContent", props.className)}
					ref={forwardedRef}
				/>
			</button>
		);
	},
);

// ----------------------------------------------------------------------------

export { SelectRoot as Root, HtmlSelect, Option, SelectedContent };
