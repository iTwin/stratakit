/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import cx from "classnames";
import * as Ariakit from "@ariakit/react";

interface ButtonProps extends Ariakit.ButtonProps {}

export const Button = React.forwardRef<
	React.ElementRef<typeof Ariakit.Button>,
	ButtonProps
>((props, forwardedRef) => {
	return (
		<Ariakit.Button
			accessibleWhenDisabled
			{...props}
			className={cx("🥝-button", props.className)}
			ref={forwardedRef}
			style={{ margin: "10px" }}
		>
			<span className={cx("🥝-button-label", props.className)}>Medium</span>
		</Ariakit.Button>
	);
});
