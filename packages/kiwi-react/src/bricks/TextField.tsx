/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import type * as Ariakit from "@ariakit/react";
import cx from "classnames";
import { Input } from "./Input.js";

interface TextFieldProps extends Ariakit.RoleProps<"div"> {}

/**
 * Text field component is a container that displays input with additional decorations.
 * Currently supported decoration components are: `Icon`.
 *
 * It must contain `Input` component as a child:
 * ```tsx
 * <TextField>
 * 	<Input />
 * </TextField>
 * ```
 *
 * To add `Icon` decoration before an input:
 * ```tsx
 * <TextField>
 * 	<Icon href={…} />
 * 	<Input />
 * </TextField>
 * ```
 */
export const TextField = React.forwardRef<
	React.ElementRef<"div">,
	TextFieldProps
>((props, forwardedRef) => {
	const { children, className, ...rest } = props;
	return (
		<Input
			focusable={false}
			id={undefined}
			render={<div />}
			{...rest}
			className={cx("🥝-text-field", className)}
			ref={forwardedRef as React.RefObject<HTMLInputElement>}
		>
			{children}
		</Input>
	);
});
