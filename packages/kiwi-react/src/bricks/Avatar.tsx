/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from "classnames";
import * as Ariakit from "@ariakit/react";
import { forwardRef, type BaseProps } from "./~utils.js";

interface AvatarProps extends BaseProps<"span"> {
	/**
	 * The size of the spinner.
	 * @default "medium"
	 */
	size?: "small" | "medium" | "large" | "xlarge";

	/**
	 * Abbreviation to be displayed.
	 */
	abbreviation?: string;

	/**
	 * Text which will be read by screen reader.
	 */
	title?: string;

	/**
	 * Image to be displayed. Can be `<img>` or `<svg>` or anything else.
	 */
	image?: React.JSX.Element;
}

/**
 * An avatar to represent users or organizations.
 *
 * Examples:
 * ```tsx
 * <Avatar abbreviation="JD" title="John Doe" />
 * <Avatar abbreviation="JD" title="John Doe" size="xlarge" image={<img src="...">} />
 * <Avatar abbreviation="JD" title="John Doe" size="small" image={<Icon href="...">} />
 * ```
 */
export const Avatar = forwardRef<"span", AvatarProps>((props, forwardedRef) => {
	const {
		size = "medium",
		abbreviation,
		title,
		image,
		children,
		...rest
	} = props;

	return (
		<Ariakit.Role.span
			{...rest}
			role="img"
			aria-label={title}
			data-kiwi-size={size}
			className={cx("🥝-avatar", props.className)}
			ref={forwardedRef}
		>
			{!image ? abbreviation?.substring(0, size === "small" ? 1 : 2) : null}
			{image}
		</Ariakit.Role.span>
	);
});
DEV: Avatar.displayName = "Avatar";
