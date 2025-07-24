/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { IconButton as SkIconButton } from "@stratakit/bricks";
import { Icon } from "@stratakit/foundations";
import { useCompatProps } from "./~utils.js";

import type { IconButton as IuiIconButton } from "@itwin/itwinui-react";
import type { PolymorphicForwardRefComponent } from "./~utils.js";

// ----------------------------------------------------------------------------

type IuiIconButtonProps = React.ComponentProps<typeof IuiIconButton>;

interface IconButtonProps
	extends Pick<
		IuiIconButtonProps,
		| "isActive"
		| "label"
		| "labelProps"
		| "iconProps"
		| "title"
		| "size"
		| "styleType"
		| "htmlDisabled"
	> {
	label: Required<IuiIconButtonProps["label"]>;
	children: React.JSX.Element;
	/** NOT IMPLEMENTED. */
	labelProps?: IuiIconButtonProps["labelProps"];
	/** NOT IMPLEMENTED. */
	size?: IuiIconButtonProps["size"];
	/** PARTIALLY IMPLEMENTED. Only supports `"default"` and `"borderless"`. */
	styleType?: IuiIconButtonProps["styleType"];
}

// ----------------------------------------------------------------------------

/** @see https://itwinui.bentley.com/docs/button#iconbutton */
export const IconButton = React.forwardRef((props, forwardedRef) => {
	const {
		children,
		isActive,
		title,
		label = title,
		iconProps,
		styleType = "default", // PARTIALLY IMPLEMENTED
		htmlDisabled,

		// biome-ignore-start lint/correctness/noUnusedVariables: NOT IMPLEMENTED
		labelProps,
		size,
		// biome-ignore-end lint/correctness/noUnusedVariables: NOT IMPLEMENTED

		...rest
	} = useCompatProps(props);

	const variant = React.useMemo(() => {
		if (styleType === "borderless") {
			return "ghost";
		}
		return "solid";
	}, [styleType]);

	// When `htmlDisabled` is set, we don't want to use `aria-disabled`.
	const accessibleWhenDisabled = !htmlDisabled;

	return (
		<SkIconButton
			{...rest}
			icon={
				<Icon
					{...(iconProps as React.ComponentProps<"svg">)}
					render={children}
				/>
			}
			label={label as string}
			variant={variant}
			isActive={isActive}
			accessibleWhenDisabled={accessibleWhenDisabled}
			disabled={props.disabled || htmlDisabled}
			ref={forwardedRef}
		/>
	);
}) as PolymorphicForwardRefComponent<"button", IconButtonProps>;
DEV: IconButton.displayName = "IconButton";
