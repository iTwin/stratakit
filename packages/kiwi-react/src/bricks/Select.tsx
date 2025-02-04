/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import cx from "classnames";
import * as Ariakit from "@ariakit/react";
import {
	FieldControl,
	forwardRef,
	isBrowser,
	type BaseProps,
	type FocusableProps,
} from "./~utils.js";
import { DisclosureArrow } from "./Icon.js";
import { useFieldDescribedBy } from "./Field.js";

const supportsHas = isBrowser && CSS?.supports?.("selector(:has(+ *))");

// ----------------------------------------------------------------------------

const HtmlSelectContext = React.createContext<
	React.Dispatch<React.SetStateAction<boolean>>
>(() => {});

/**
 * Compound component for a select element, which allows the user to select a value from a list of options.
 *
 * Works well with the `Field` and `Label` components.
 *
 * Example usage:
 * ```tsx
 * <Field>
 *   <Label>Select an option</Label>
 *   <Select.Root>
 *     <Select.HtmlSelect>
 *       <option value="1">Option 1</option>
 *       <option value="2">Option 2</option>
 *       <option value="3">Option 3</option>
 *     </Select.HtmlSelect>
 *   </Select.Root>
 * </Field>
 * ```
 */
const SelectRoot = forwardRef<"div", BaseProps>((props, forwardedRef) => {
	const [isHtmlSelect, setIsHtmlSelect] = React.useState(false);

	return (
		<HtmlSelectContext.Provider value={setIsHtmlSelect}>
			<Ariakit.Role.div
				{...props}
				className={cx("🥝-select-root", props.className)}
				data-kiwi-has-select={!supportsHas && isHtmlSelect ? "true" : undefined}
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
 *   <option value="1">Option 1</option>
 *   <option value="2">Option 2</option>
 *   <option value="3">Option 3</option>
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
		const describedBy = useFieldDescribedBy(props["aria-describedby"]);

		React.useEffect(
			function updateContext() {
				setIsHtmlSelect(true);
			},
			[setIsHtmlSelect],
		);

		return (
			<>
				<FieldControl
					type="textlike"
					id={props.id}
					render={
						<Ariakit.Role.select
							{...rest}
							className={cx("🥝-button", "🥝-select", props.className)}
							aria-describedby={describedBy}
							data-kiwi-tone="neutral"
							data-kiwi-variant={variant}
							ref={forwardedRef}
						/>
					}
				/>
				<DisclosureArrow className="🥝-select-arrow" />
			</>
		);
	},
);

export { SelectRoot as Root, HtmlSelect };
