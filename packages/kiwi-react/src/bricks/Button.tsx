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
		>
			<span
				style={{
					width: "16px",
					height: "16px",
					padding: "2px",
					backgroundColor: "#00ff00",
				}}
			/>
			<span className={cx("🥝-button-label", props.className)}>Medium</span>
			<span
				style={{
					width: "16px",
					height: "16px",
					padding: "2px",
					backgroundColor: "#00ff00",
				}}
			/>
		</Ariakit.Button>
	);
});
