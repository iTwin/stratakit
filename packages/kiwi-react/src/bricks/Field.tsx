/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import * as Ariakit from "@ariakit/react";
import cx from "classnames";
import { forwardRef, type BaseProps } from "./~utils.js";

// ----------------------------------------------------------------------------

interface FieldProps extends BaseProps {
	/**
	 * Allows overriding the default block layout for text controls.
	 */
	layout?: "inline";
}

/**
 * A container for form controls. It manages ID associations provides a consistent layout and spacing.
 *
 * Example:
 * ```tsx
 * <Field>
 *   <Label>Label</Label>
 *   <TextBox.Input />
 * </Field>
 * ```
 *
 * Supports a `layout` prop, which can be set to `inline` to align the label and control horizontally.
 *
 * Should contain a `Label` component paired with a form control. Supported form controls include:
 * - `TextBox.Input`
 * - `TextBox.Textarea`
 * - `Checkbox`
 * - `Radio`
 * - `Switch`
 */
export const Field = forwardRef<"div", FieldProps>((props, forwardedRef) => {
	const fieldId = React.useId();
	const { className, layout, ...rest } = props;

	return (
		<FieldIdContext.Provider value={fieldId}>
			<FieldDescribedByProvider>
				<Ariakit.Role
					{...rest}
					className={cx("🥝-field", className)}
					data-kiwi-layout={layout}
					ref={forwardedRef}
				/>
			</FieldDescribedByProvider>
		</FieldIdContext.Provider>
	);
});
DEV: Field.displayName = "Field";

// ----------------------------------------------------------------------------

interface FieldDescribedBy {
	describedBy: string;
	register: (id: string) => void;
	unregister: (id: string) => void;
}

const FieldDescribedByContext = React.createContext<FieldDescribedBy>({
	describedBy: "",
	register: () => void 0,
	unregister: () => void 0,
});

function FieldDescribedByProvider(props: { children?: React.ReactNode }) {
	const [describedBy, setDescribedBy] =
		React.useState<FieldDescribedBy["describedBy"]>("");

	const register = (id: string) =>
		void setDescribedBy((describedBy) => {
			const describedByAsSet = new Set(describedBy.split(" "));
			describedByAsSet.add(id);
			return Array.from(describedByAsSet).join(" ").trim();
		});

	const unregister = (id: string) =>
		void setDescribedBy((describedBy) => {
			const describedByAsSet = new Set(describedBy.split(" "));
			describedByAsSet.delete(id);
			return Array.from(describedByAsSet).join(" ").trim();
		});

	return (
		<FieldDescribedByContext.Provider
			value={{ describedBy, register, unregister }}
		>
			{props.children}
		</FieldDescribedByContext.Provider>
	);
}

/**
 * Use the description IDs for a field.
 */
export function useFieldDescribedBy() {
	return React.useContext(FieldDescribedByContext).describedBy;
}

/**
 * Registers a description for an associated control.
 */
export function useFieldRegisterDescribedBy(id: string) {
	const { register, unregister } = React.useContext(FieldDescribedByContext);

	React.useEffect(() => {
		register(id);
		return () => void unregister(id);
	}, [id, register, unregister]);
}

// ----------------------------------------------------------------------------

const FieldIdContext = React.createContext<string | undefined>(undefined);

export function useFieldId() {
	return React.useContext(FieldIdContext);
}
