/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import * as Ariakit from "@ariakit/react";
import cx from "classnames";
import { useFieldId } from "./Field.js";

interface InputProps extends Ariakit.FocusableProps<"input"> {}

export const Input = React.forwardRef<React.ElementRef<"input">, InputProps>(
	(props, forwardedRef) => {
		const fieldId = useFieldId();

		return (
			<Ariakit.Role.input
				id={fieldId}
				{...props}
				className={cx("🥝-input", props.className)}
				render={
					<Ariakit.Focusable
						accessibleWhenDisabled
						render={props.render || <input />}
					/>
				}
				ref={forwardedRef}
			/>
		);
	},
);
