/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Select as SkSelect } from "@stratakit/bricks";
import * as React from "react";

import type { Select as IuiSelect } from "@itwin/itwinui-react";

type IuiSelectProps<T> = React.ComponentProps<typeof IuiSelect<T>>;

// type IuiSelectProps = Omit<_IuiSelectProps, "native"> & {
// 	native: true;
// };

// type SelectProps<T> = Omit<
// 	IuiSelectProps<T>,
// 	keyof React.ComponentPropsWithoutRef<"div">
// > &
// 	React.ComponentPropsWithoutRef<"select">;

type SelectProps<T> = IuiSelectProps<T>;

// interface SelectProps<T>
// 	extends Pick<
// 		IuiSelectProps<T>,
// 		// SelectCommonProps
// 		| "disabled"
// 		| "size"
// 		| "status"

// 		// NativeSelectProps
// 		| "value"
// 		| "onChange"
// 		| "options"
// 		| "defaultValue"
// 		| "triggerProps"
// 		| "native"
// 		// | "required"
// 		| "multiple"

// 		// NativeSelectStyleTypeProps
// 		| "styleType"
// 		| "placeholder"
// 	> {
// 	/** NOT IMPLEMENTED: Always in native mode. */
// 	// native?: IuiSelectProps<T>["native"];
// }

const q: React.Key | undefined = undefined;

/** @see https://itwinui.bentley.com/docs/Select */
export const Select = React.forwardRef((props, forwardedRef) => {
	const {
		disabled,
		size,
		status,
		value,
		onChange,
		options,
		defaultValue,
		triggerProps,
		native,
		// required,
		multiple,
		styleType,
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
