/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import * as Ariakit from "@ariakit/react";

interface TextareaProps extends Ariakit.FocusableProps<"textarea"> {}

export const Textarea = React.forwardRef<
	React.ElementRef<typeof Ariakit.Focusable>,
	TextareaProps
>((props, forwardedRef) => {
	return (
		// @ts-expect-error -- Ariakit.Focusable has some TS issues with textarea
		<Ariakit.Focusable
			render={<textarea />}
			accessibleWhenDisabled
			{...props}
			ref={forwardedRef}
		/>
	);
});
