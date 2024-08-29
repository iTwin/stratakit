/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import * as Ariakit from "@ariakit/react";
import cx from "classnames";

interface TextareaProps extends Ariakit.FocusableProps<"textarea"> {}

export const Textarea = React.forwardRef<
	React.ElementRef<"textarea">,
	TextareaProps
>((props, forwardedRef) => {
	return (
		<Ariakit.Role.textarea
			{...props}
			className={cx("🥝-input", props.className)}
			render={
				<Ariakit.Focusable
					accessibleWhenDisabled
					render={props.render || <textarea />}
				/>
			}
			ref={forwardedRef}
		/>
	);
});
