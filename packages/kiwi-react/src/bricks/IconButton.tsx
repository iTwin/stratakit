/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import cx from "classnames";
import { Button } from "./Button.js";
import { VisuallyHidden } from "./VisuallyHidden.js";
import { Icon } from "./Icon.js";

interface IconButtonProps
	extends Omit<React.ComponentProps<typeof Button>, "children"> {
	/**
	 * Accessible name for the button.
	 */
	label: string;
	/**
	 * Icon to be displayed inside the button.
	 *
	 * Can be a URL of an SVG from the `kiwi-icons` package,
	 * or a custom JSX icon.
	 */
	icon: string | React.JSX.Element;
}

/**
 * An icon-only button, with a required accessible name.
 *
 * The icon can be a URL from the `kiwi-icons` package:
 * ```tsx
 * <IconButton
 *   label="Reveal full content"
 *   icon={new URL("@itwin/kiwi-icons/icons/arrow.svg", import.meta.url).href}
 * />
 * ```
 *
 * Alternatively, pass a JSX node such as an `<Icon>`.
 * ```tsx
 * <IconButton
 *   label={…}
 *   icon={<Icon href={…} />}
 *   variant="ghost"
 * />
 * ```
 */
export const IconButton = React.forwardRef<
	React.ElementRef<typeof Button>,
	IconButtonProps
>((props, forwardedRef) => {
	const { label, icon, ...rest } = props;

	return (
		<Button
			{...rest}
			className={cx("🥝-icon-button", props.className)}
			ref={forwardedRef}
		>
			<VisuallyHidden>{label}</VisuallyHidden>
			{typeof icon === "string" ? <Icon href={icon} /> : icon}
		</Button>
	);
});
