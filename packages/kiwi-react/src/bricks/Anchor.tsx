/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import cx from "classnames";
import * as Ariakit from "@ariakit/react";

interface AnchorProps extends Ariakit.FocusableProps<"a"> {
	/** @default "neutral" */
	variant?: "neutral" | "accent" | "critical";
}

export const Anchor = React.forwardRef<React.ElementRef<"a">, AnchorProps>(
	(props, forwardedRef) => {
		const { variant = "neutral", ...rest } = props;
		return (
			<Ariakit.Role.a
				data-kiwi-variant={variant}
				{...rest}
				className={cx("🥝-anchor", props.className)}
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
