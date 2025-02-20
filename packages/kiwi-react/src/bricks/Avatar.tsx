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
	 * Text which will be read by screen reader.
	 */
	alt?: string;

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
 * <Avatar initials="JD" alt="John Doe" />
 * <Avatar initials="JD" alt="John Doe" size="xlarge" image={<img src="…">} />
 * <Avatar initials="JD" alt="John Doe" size="small" image={<Icon href="…">} />
 * ```
 */
export const Avatar = forwardRef<"span", AvatarProps>((props, forwardedRef) => {
	const { size = "medium", initials, alt, image, children, ...rest } = props;

	const isDecorative = !alt;

	return (
		<Ariakit.Role.span
			role={isDecorative ? undefined : "img"}
			{...rest}
			aria-label={alt}
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
