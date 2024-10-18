/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import type * as Ariakit from "@ariakit/react";
import cx from "classnames";
import { Input } from "./Input.js";

interface TextFieldProps extends Ariakit.RoleProps<"div"> {}

export const TextField = React.forwardRef<
	React.ElementRef<"div">,
	TextFieldProps
>(({ children, className, ref: _, ...rest }, ref) => {
	return (
		<Input
			focusable={false}
			render={<div ref={ref} />}
			{...rest}
			className={cx("🥝-text-field", className)}
		>
			{children}
		</Input>
	);
});
