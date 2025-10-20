/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { Role } from "@ariakit/react/role";
import { Icon } from "@stratakit/foundations";
import { forwardRef, isBrowser } from "@stratakit/foundations/secret-internals";
import cx from "classnames";
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
 *           <option value="kiwi">Kiwi</option>
 *           <option value="mango">Mango</option>
 *           <option value="papaya">Papaya</option>
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
 *     <option value="kiwi">Kiwi</option>
 *     <option value="mango">Mango</option>
 *     <option value="papaya">Papaya</option>
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

				<Icon
					className="🥝SelectArrow"
					render={
						<svg viewBox="0 0 16 16">
							<path
								fill="currentColor"
								d="M9.646 9.646a.5.5 0 0 1 .707.707l-2 2a.5.5 0 0 1-.707 0l-2-2a.5.5 0 1 1 .707-.707L8 11.292l1.646-1.646ZM7.725 3.582a.501.501 0 0 1 .628.064l2 2a.5.5 0 0 1-.707.707L8 4.707 6.353 6.353a.5.5 0 1 1-.707-.707l2-2 .079-.064Z"
							/>
						</svg>
					}
				/>
			</>
		);
	},
);

// ----------------------------------------------------------------------------

export { SelectRoot as Root, HtmlSelect };
