/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type * as Ariakit from "@ariakit/react";
import cx from "classnames";
import { Input } from "./Input.js";

interface TextFieldProps extends Ariakit.RoleProps<"div"> {}

export function TextField({ children, className }: TextFieldProps) {
	return (
		<Input
			className={cx("🥝-text-field", className)}
			focusable={false}
			render={<div />}
		>
			{children}
		</Input>
	);
}
