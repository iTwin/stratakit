/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { Field, Select as SkSelect } from "@stratakit/bricks";

import type { Select as IuiSelect } from "@itwin/itwinui-react";
import type { PolymorphicForwardRefComponent } from "./~utils.tsx";

type IuiSelectProps = React.ComponentProps<typeof IuiSelect>;
type IuiNativeSelectProps = IuiSelectProps & {
	native: true;
};

interface IuiNativeSelectTransformedProps
	extends Pick<
		IuiNativeSelectProps,
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
		| "required"
		| "multiple"

		// NativeSelectStyleTypeProps
		| "styleType"
		| "placeholder"
	> {
	/** NOT IMPLEMENTED */
	size?: IuiNativeSelectProps["size"];
	/** NOT IMPLEMENTED */
	status?: IuiNativeSelectProps["status"];
	/** NOT IMPLEMENTED */
	required?: IuiNativeSelectProps["required"];
	/** NOT IMPLEMENTED */
	styleType?: IuiNativeSelectProps["styleType"];
	/** NOT IMPLEMENTED */
	placeholder?: IuiNativeSelectProps["placeholder"];
}

type SelectProps = Omit<IuiNativeSelectTransformedProps, "native"> & {
	/** NO-OP: Will always be in native mode. */
	native?: boolean;
} & Omit<
		React.ComponentPropsWithoutRef<"div">,
		"onChange" | "placeholder" | "value" | "defaultValue"
	>;

/**
 * @see https://itwinui.bentley.com/docs/Select
 *
 * **IMPORTANT**: Regardless of the `native` prop, the `Select` will always be in native mode.
 * Thus, all other props have to be updated, added, or removed to match native `Select`'s props.
 * E.g. `value` must be a string, no `multiple` support, etc.
 */
export const Select = React.forwardRef((props, forwardedRef) => {
	const {
		id,

		disabled,
		value,
		onChange: onChangeProp,
		options,
		defaultValue,
		triggerProps,

		// biome-ignore lint/correctness/noUnusedVariables: NO-OP
		native,

		// biome-ignore-start lint/correctness/noUnusedVariables: NOT IMPLEMENTED
		size,
		status,
		required,
		multiple,
		styleType,
		placeholder,
		// biome-ignore-end lint/correctness/noUnusedVariables: NOT IMPLEMENTED

		...rest
	} = props;

	const onChange: React.ChangeEventHandler<HTMLSelectElement> =
		React.useCallback(
			(event) => {
				onChangeProp?.(event.target.value, event);
			},
			[onChangeProp],
		);

	const renderedOptions = React.useMemo(() => {
		return options.map((option) => {
			return (
				<option key={option.value} {...option}>
					{option.label}
				</option>
			);
		});
	}, [options]);

	return (
		<Field.Control
			id={id}
			render={
				<SkSelect.Root {...rest}>
					<SkSelect.HtmlSelect
						{...triggerProps}
						disabled={disabled}
						value={value ?? undefined}
						defaultValue={defaultValue}
						onChange={onChange}
					>
						{renderedOptions}
					</SkSelect.HtmlSelect>
				</SkSelect.Root>
			}
			ref={forwardedRef}
		/>
	);
}) as PolymorphicForwardRefComponent<"div", SelectProps>;
DEV: (Select as React.ForwardRefExoticComponent<unknown>).displayName =
	"Select";

export type {
	SelectOption,
	SelectValueChangeEvent,
} from "@itwin/itwinui-react";
