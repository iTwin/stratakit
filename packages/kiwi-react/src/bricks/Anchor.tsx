/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import cx from "classnames";
import * as Ariakit from "@ariakit/react";
import type { Props, FocusableProps } from "./~utils.js";

type AnchorProps = Props<"a", FocusableProps> & {
	/** @default "neutral" */
	tone?: "neutral" | "accent" | "critical";
};

export const Anchor = React.forwardRef<React.ElementRef<"a">, AnchorProps>(
	(props, forwardedRef) => {
		const { tone = "neutral", ...rest } = props;
		return (
			<Ariakit.Role.a
				data-kiwi-tone={tone}
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
DEV: Anchor.displayName = "Anchor";
