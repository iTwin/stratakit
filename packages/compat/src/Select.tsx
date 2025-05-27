/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Select as SkSelect } from "@stratakit/bricks";
import * as React from "react";

import type { Select as IuiSelect } from "@itwin/itwinui-react";

type IuiSelectProps<T> = React.ComponentProps<typeof IuiSelect<T>>;
type IuiNativeSelectProps<T> = IuiSelectProps<T> & {
	native: true;
};
type IuiCustomSelectProps<T> = IuiSelectProps<T> & {
	native?: false;
};

interface IuiCustomSelectTransformedProps<T>
	extends Pick<
		IuiCustomSelectProps<T>,
		| "native"

		// SelectCommonProps
		| "disabled"
		| "size"
		| "status"

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
	> {
	/**
	 * NOT IMPLEMENTED:
	 * Only native mode `Select` is implemented. If in custom mode (`native`=false/undefined), this prop may not work.
	 */
	disabled?: IuiCustomSelectProps<T>["disabled"];
	/**
	 * NOT IMPLEMENTED:
	 * Only native mode `Select` is implemented. If in custom mode (`native`=false/undefined), this prop may not work.
	 */
	size?: IuiCustomSelectProps<T>["size"];
	/**
	 * NOT IMPLEMENTED:
	 * Only native mode `Select` is implemented. If in custom mode (`native`=false/undefined), this prop may not work.
	 */
	status?: IuiCustomSelectProps<T>["status"];
	/**
	 * NOT IMPLEMENTED:
	 * Only native mode `Select` is implemented. If in custom mode (`native`=false/undefined), this prop may not work.
	 */
	placeholder?: IuiCustomSelectProps<T>["placeholder"];
	/**
	 * NOT IMPLEMENTED:
	 * Only native mode `Select` is implemented. If in custom mode (`native`=false/undefined), this prop may not work.
	 */
	options: IuiCustomSelectProps<T>["options"];
	/**
	 * NOT IMPLEMENTED:
	 * Only native mode `Select` is implemented. If in custom mode (`native`=false/undefined), this prop may not work.
	 */
	itemRenderer?: IuiCustomSelectProps<T>["itemRenderer"];
	/**
	 * NOT IMPLEMENTED:
	 * Only native mode `Select` is implemented. If in custom mode (`native`=false/undefined), this prop may not work.
	 */
	menuClassName?: IuiCustomSelectProps<T>["menuClassName"];
	/**
	 * NOT IMPLEMENTED:
	 * Only native mode `Select` is implemented. If in custom mode (`native`=false/undefined), this prop may not work.
	 */
	menuStyle?: IuiCustomSelectProps<T>["menuStyle"];
	/**
	 * NOT IMPLEMENTED:
	 * Only native mode `Select` is implemented. If in custom mode (`native`=false/undefined), this prop may not work.
	 */
	popoverProps?: IuiCustomSelectProps<T>["popoverProps"];
	/**
	 * NOT IMPLEMENTED:
	 * Only native mode `Select` is implemented. If in custom mode (`native`=false/undefined), this prop may not work.
	 */
	triggerProps?: IuiCustomSelectProps<T>["triggerProps"];
	/**
	 * NOT IMPLEMENTED:
	 * Only native mode `Select` is implemented. If in custom mode (`native`=false/undefined), this prop may not work.
	 */
	multiple?: IuiCustomSelectProps<T>["multiple"];
	/**
	 * NOT IMPLEMENTED:
	 * Only native mode `Select` is implemented. If in custom mode (`native`=false/undefined), this prop may not work.
	 */
	selectedItemRenderer?: IuiCustomSelectProps<T>["selectedItemRenderer"];
	/**
	 * NOT IMPLEMENTED:
	 * Only native mode `Select` is implemented. If in custom mode (`native`=false/undefined), this prop may not work.
	 */
	value?: IuiCustomSelectProps<T>["value"];
	/**
	 * NOT IMPLEMENTED:
	 * Only native mode `Select` is implemented. If in custom mode (`native`=false/undefined), this prop may not work.
	 */
	onChange?: IuiCustomSelectProps<T>["onChange"];
}

interface IuiNativeSelectTransformedProps<T>
	extends Pick<
		IuiNativeSelectProps<T>,
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
	size?: IuiNativeSelectProps<T>["size"];
	/** NOT IMPLEMENTED */
	status?: IuiNativeSelectProps<T>["status"];
	/** NOT IMPLEMENTED */
	required?: IuiNativeSelectProps<T>["required"];
	/** NOT IMPLEMENTED */
	styleType?: IuiNativeSelectProps<T>["styleType"];
	/** NOT IMPLEMENTED */
	placeholder?: IuiNativeSelectProps<T>["placeholder"];
}

type SelectProps<T> = (
	| IuiNativeSelectTransformedProps<T>
	| IuiCustomSelectTransformedProps<T>
) &
	Omit<
		React.ComponentPropsWithoutRef<"div">,
		"onChange" | "placeholder" | "value" | "defaultValue"
	>;

/**
 * @see https://itwinui.bentley.com/docs/Select
 *
 * **IMPORTANT**: Only native mode `Select` is implemented.
 * If in custom mode (`native`=false/undefined), some of the passed props may not work.
 */
export const Select = React.forwardRef(
	<T,>(
		props: SelectProps<T>,
		forwardedRef: React.ForwardedRef<HTMLSelectElement>,
	) => {
		const {
			native,

			// NativeSelect related props
			disabled,
			size, // NOT IMPLEMENTED
			status, // NOT IMPLEMENTED
			value,
			onChange: onChangeProp,
			options,
			// @ts-ignore: Exists only in NativeSelect
			defaultValue,
			triggerProps,
			// @ts-ignore: NOT IMPLEMENTED
			required,
			multiple,
			// @ts-ignore: NOT IMPLEMENTED
			styleType,
			placeholder,

			// CustomSelect related props
			// @ts-ignore: NOT IMPLEMENTED
			itemRenderer,
			// @ts-ignore: NOT IMPLEMENTED
			menuClassName,
			// @ts-ignore: NOT IMPLEMENTED
			menuStyle,
			// @ts-ignore: NOT IMPLEMENTED
			popoverProps,
			// @ts-ignore: NOT IMPLEMENTED
			selectedItemRenderer,

			...rest
		} = props;

		const onChange: React.ChangeEventHandler<HTMLSelectElement> =
			React.useCallback(
				(event) => {
					if (!native) {
						return;
					}

					onChangeProp?.(event.target.value, event);
				},
				[onChangeProp, native],
			);

		const RenderedOptions = React.useCallback(() => {
			if (!options || !native) {
				return null;
			}

			return options.map((option) => {
				return (
					<option key={option.value} {...option}>
						{option.label}
					</option>
				);
			});
		}, [native, options]);

		return (
			<SkSelect.Root {...rest}>
				<SkSelect.HtmlSelect
					{...(native ? triggerProps : {})}
					disabled={disabled}
					ref={forwardedRef}
					value={native ? (value ?? undefined) : undefined}
					defaultValue={native ? defaultValue : undefined}
					onChange={onChange}
				>
					<RenderedOptions />
				</SkSelect.HtmlSelect>
			</SkSelect.Root>
		);
	},
) as <T>(
	props: SelectProps<T> & { ref?: React.ForwardedRef<HTMLSelectElement> },
) => React.JSX.Element;
DEV: (Select as React.ForwardRefExoticComponent<unknown>).displayName =
	"Select";

export type {
	SelectOption,
	SelectValueChangeEvent,
} from "@itwin/itwinui-react";
