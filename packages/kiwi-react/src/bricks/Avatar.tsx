/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from "classnames";
import * as React from "react";
import * as Ariakit from "@ariakit/react";
import { VisuallyHidden } from "./VisuallyHidden.js";
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
	label?: string;

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
 * <Avatar initials="JD" label="John Doe" />
 * <Avatar initials="JD" label="John Doe" size="xlarge" image={<img src="…">} />
 * <Avatar initials="JD" label="John Doe" size="small" image={<Icon href="…">} />
 * ```
 */
export const Avatar = forwardRef<"span", AvatarProps>((props, forwardedRef) => {
	const { size = "medium", initials, label, image, children, ...rest } = props;

	const avatarId = React.useId();

	return (
		<Ariakit.Role.span
			{...rest}
			role="img"
			aria-labelledby={avatarId}
			data-kiwi-size={size}
			className={cx("🥝-avatar", props.className)}
			ref={forwardedRef}
		>
			{image ?? (
				<abbr className="🥝-avatar-initials" aria-hidden="true">
					{initials?.substring(0, 1)}
				</abbr>
			)}
			<VisuallyHidden id={avatarId}>{label}</VisuallyHidden>
		</Ariakit.Role.span>
	);
});
DEV: Avatar.displayName = "Avatar";
