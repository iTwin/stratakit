/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Select as SkSelect } from "@stratakit/bricks";
import * as React from "react";

import type { Select as IuiSelect } from "@itwin/itwinui-react";

type IuiSelectProps<T> = React.ComponentProps<typeof IuiSelect<T>>;
type IuiSelectPropsWithNativeSetToTrueToTriggerTheDiscriminatedUnion<T> =
	React.ComponentProps<typeof IuiSelect<T>> & {
		/** Set to true to trigger the discriminated union. */
		native: true;
	};

type IuiSelectPropsWithNativeSetToFalseToTriggerTheDiscriminatedUnion<T> =
	React.ComponentProps<typeof IuiSelect<T>> & {
		/** Set to false to trigger the discriminated union. */
		native?: false;
	};

type IuiSelectPropsWithoutNative<T> = Omit<
	React.ComponentProps<typeof IuiSelect<T>>,
	"native"
>;

// type IuiSelectProps = Omit<_IuiSelectProps, "native"> & {
// 	native: true;
// };

// type SelectProps<T> = Omit<
// 	IuiSelectProps<T>,
// 	keyof React.ComponentPropsWithoutRef<"div">
// > &
// 	React.ComponentPropsWithoutRef<"select">;

// type SelectProps<T> = IuiSelectProps<T>;

interface TypeA<T>
	extends Pick<
		IuiSelectPropsWithNativeSetToFalseToTriggerTheDiscriminatedUnion<T>,
		| "native"

		// SelectCommonProps
		| "disabled"
		| "size"
		| "status"

		// // NativeSelectProps
		// | "value"
		// | "onChange"
		// | "options"
		// | "defaultValue"
		// | "triggerProps"
		// | "native"
		// // | "required"
		// | "multiple"

		// NativeSelectStyleTypeProps
		// | "styleType"
		// | "placeholder"

		// CustomSelectProps
		| "placeholder"
		| "options"
		| "itemRenderer"
		| "menuClassName"
		| "menuStyle"
		| "popoverProps"
		| "triggerProps"
		| "multiple"
		| "selectedItemRenderer"
		| "value"
		| "onChange"
		// TODO: Maybe need to handle div props for this and for the other type (TypeB).
	> {
	/** NOT IMPLEMENTED: Always in native mode. */
	disabled?: IuiSelectPropsWithNativeSetToFalseToTriggerTheDiscriminatedUnion<T>["disabled"];
	/** NOT IMPLEMENTED: Always in native mode. */
	size?: IuiSelectPropsWithNativeSetToFalseToTriggerTheDiscriminatedUnion<T>["size"];
	/** NOT IMPLEMENTED: Always in native mode. */
	status?: IuiSelectPropsWithNativeSetToFalseToTriggerTheDiscriminatedUnion<T>["status"];
	/** NOT IMPLEMENTED: Always in native mode. */
	placeholder?: IuiSelectPropsWithNativeSetToFalseToTriggerTheDiscriminatedUnion<T>["placeholder"];
	/** NOT IMPLEMENTED: Always in native mode. */
	options: IuiSelectPropsWithNativeSetToFalseToTriggerTheDiscriminatedUnion<T>["options"];
	/** NOT IMPLEMENTED: Always in native mode. */
	itemRenderer?: IuiSelectPropsWithNativeSetToFalseToTriggerTheDiscriminatedUnion<T>["itemRenderer"];
	/** NOT IMPLEMENTED: Always in native mode. */
	menuClassName?: IuiSelectPropsWithNativeSetToFalseToTriggerTheDiscriminatedUnion<T>["menuClassName"];
	/** NOT IMPLEMENTED: Always in native mode. */
	menuStyle?: IuiSelectPropsWithNativeSetToFalseToTriggerTheDiscriminatedUnion<T>["menuStyle"];
	/** NOT IMPLEMENTED: Always in native mode. */
	popoverProps?: IuiSelectPropsWithNativeSetToFalseToTriggerTheDiscriminatedUnion<T>["popoverProps"];
	/** NOT IMPLEMENTED: Always in native mode. */
	triggerProps?: IuiSelectPropsWithNativeSetToFalseToTriggerTheDiscriminatedUnion<T>["triggerProps"];
	/** NOT IMPLEMENTED: Always in native mode. */
	multiple?: IuiSelectPropsWithNativeSetToFalseToTriggerTheDiscriminatedUnion<T>["multiple"];
	/** NOT IMPLEMENTED: Always in native mode. */
	selectedItemRenderer?: IuiSelectPropsWithNativeSetToFalseToTriggerTheDiscriminatedUnion<T>["selectedItemRenderer"];
	/** NOT IMPLEMENTED: Always in native mode. */
	value?: IuiSelectPropsWithNativeSetToFalseToTriggerTheDiscriminatedUnion<T>["value"];
	/** NOT IMPLEMENTED: Always in native mode. */
	onChange?: IuiSelectPropsWithNativeSetToFalseToTriggerTheDiscriminatedUnion<T>["onChange"];
}

interface TypeB<T>
	extends Pick<
		IuiSelectPropsWithNativeSetToTrueToTriggerTheDiscriminatedUnion<T>,
		| "native"

		// SelectCommonProps
		| "disabled"
		| "size"
		| "status"

		// NativeSelectProps
		| "value"
		| "onChange"
		| "options"
		| "defaultValue"
		| "triggerProps"
		// | "native" // TODO: May not exist. May need to delete.
		// | "required" // TODO: Why this is giving error even though it should exist?
		| "multiple"

		// NativeSelectStyleTypeProps
		| "styleType"
		| "placeholder"

		// CustomSelectProps
		// | "itemRenderer"
		// | "menuClassName"
		// | "menuStyle"
		// | "popoverProps"
		// | "triggerProps"
		// | "multiple"
		// | "selectedItemRenderer"
		// | "value"
		// | "onChange"
	> {}

// type TypeAorTypeB<T> =
// 	| IuiSelectPropsWithNativeSetToFalseToTriggerTheDiscriminatedUnion<T>
// | IuiSelectPropsWithNativeSetToTrueToTriggerTheDiscriminatedUnion<T>;

type TypeAorTypeB<T> = TypeA<T> | TypeB<T>;

// interface SelectProps<T>
// 	extends TypeAorTypeB<T>, "about">

type SelectProps<T> = TypeAorTypeB<T>;

// {
// 	/** NOT IMPLEMENTED: Always in native mode. */
// 	// native?: boolean;
// }

// const q: React.Key | undefined = undefined;

// const qq: SelectProps<string> = {
// 	placeholder,
// };

/** @see https://itwinui.bentley.com/docs/Select */
export const Select = React.forwardRef((props, forwardedRef) => {
	const {
		disabled,
		size,
		status,
		value,
		onChange,
		options,
		// defaultValue,
		triggerProps,
		// native,
		// required,
		multiple,
		// styleType,
		placeholder,
		...rest
	} = props;

	return (
		<SkSelect.Root>
			<SkSelect.HtmlSelect
				{...(rest as React.ComponentPropsWithoutRef<"select">)} // TODO: Try to avoid
				ref={forwardedRef}
			>
				{(
					options as {
						label: string;
						value: string;
						disabled?: boolean;
					}[]
				).map((option) => {
					// TODO: Try to avoid
					// if (
					// 	typeof option.value !== "string" ||
					// 	typeof option.value !== "number" ||
					// 	typeof option.value !== "bigint"
					// ) {
					// 	return;
					// }

					return (
						<option key={option.value} {...option}>
							{option.label}
						</option>
					);
				})}
			</SkSelect.HtmlSelect>
		</SkSelect.Root>
	);
}) as <T>(
	props: SelectProps<T> & { ref?: React.ForwardedRef<HTMLSelectElement> },
) => React.JSX.Element;
// biome-ignore lint/suspicious/noExplicitAny: TODO Try to avoid
DEV: (Select as any).displayName = "Select";

export type {
	SelectOption,
	SelectValueChangeEvent,
} from "@itwin/itwinui-react";
