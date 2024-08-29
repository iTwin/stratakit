/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import * as Ariakit from "@ariakit/react";
import cx from "classnames";

interface InputProps extends Ariakit.FocusableProps<"input"> {}

export const Input = React.forwardRef<React.ElementRef<"input">, InputProps>(
	(props, forwardedRef) => {
		return (
			<Ariakit.Role.input
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
