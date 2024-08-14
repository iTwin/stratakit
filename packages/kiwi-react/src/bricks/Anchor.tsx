/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import * as Ariakit from "@ariakit/react";

interface AnchorProps extends Ariakit.FocusableProps<"a"> {}

export const Anchor = React.forwardRef<React.ElementRef<"a">, AnchorProps>(
	(props, forwardedRef) => {
		return (
			<Ariakit.Role.a
				{...props}
				render={
					<Ariakit.Focusable
						accessibleWhenDisabled
						render={props.render || <a />}
					/>
				}
				ref={forwardedRef}
			/>
		);
	},
);
