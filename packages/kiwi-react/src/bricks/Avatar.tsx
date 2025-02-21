/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from "classnames";
import * as Ariakit from "@ariakit/react";
import { forwardRef, type BaseProps } from "./~utils.js";

interface AvatarProps extends BaseProps<"span"> {
	/**
	 * The size of the avatar.
	 * @default "medium"
	 */
	size?: "small" | "medium" | "large" | "xlarge";

	/**
	 * Initials that gets displayed in the absence of an image.
	 */
	initials?: string;

	/**
	 * Alternative text describing the avatar, typically the user's or organization's full name.
	 *
	 * When this prop is passed, the avatar gets rendered as `role="img"` and labelled
	 * using the provided text.
	 *
	 * This prop is not required if the avatar is purely decorative. By default, the avatar
	 * will be hidden from the accessibility tree.
	 */
	alt?: string;

	/**
	 * Image to be displayed. Can be `<img>` or `<svg>` or anything else.
	 */
	image?: React.JSX.Element;
}

/**
 * An avatar to represent a user or organization.
 *
 * By default, this component assumes that the avatar is decorative, so it adds `aria-hidden` by default.
 * ```tsx
 * <Avatar initials="JD" />
 * ```
 *
 * If the avatar is semantically meaningful, the `alt` prop can be used to provide alternative text.
 * ```tsx
 * <Avatar initials="JD" alt="John Doe" />
 * ```
 *
 * Image & size examples:
 * ```tsx
 * <Avatar initials="JD" alt="John Doe" size="xlarge" image={<img src="…" alt="">} />
 * <Avatar initials="JD" alt="John Doe" size="small" image={<Icon href="…">} />
 * ```
 */
export const Avatar = forwardRef<"span", AvatarProps>((props, forwardedRef) => {
	const { size = "medium", initials, alt, image, children, ...rest } = props;

	const isDecorative = !alt;

	return (
		<Ariakit.Role.span
			role={isDecorative ? undefined : "img"}
			aria-label={isDecorative ? undefined : alt}
			{...rest}
			data-kiwi-size={size}
			className={cx("🥝-avatar", props.className)}
			ref={forwardedRef}
		>
			{image ?? (
				<abbr className="🥝-avatar-initials" aria-hidden="true">
					{initials?.substring(0, 1)}
				</abbr>
			)}
		</Ariakit.Role.span>
	);
});
DEV: Avatar.displayName = "Avatar";
