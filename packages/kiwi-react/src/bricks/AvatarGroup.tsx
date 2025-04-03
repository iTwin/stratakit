/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from "classnames";
import { Role } from "@ariakit/react/role";
import { forwardRef, type BaseProps } from "./~utils.js";

interface AvatarGroupProps extends BaseProps<"div"> {
	/**
	 * Describes the purpose of the group of avatars.
	 */
	label?: string;

	/**
	 * The avatars to be displayed in the group.
	 */
	children: React.ReactNode;
}

/**
 * An avatar group to represent a collection of users or organizations.
 *
 * ```tsx
 * <AvatarGroup label="My team">
 *   <Avatar initials="AA" />
 *   <Avatar initials="BB" />
 *   <Avatar initials="CC" />
 * </AvatarGroup>
 * ```
 */
export const AvatarGroup = forwardRef<"div", AvatarGroupProps>(
	(props, forwardedRef) => {
		const { label, children, ...rest } = props;

		return (
			<Role.div
				role="group"
				aria-label={label}
				{...rest}
				className={cx("🥝-avatar-group", props.className)}
				ref={forwardedRef}
			>
				{children}
			</Role.div>
		);
	},
);
DEV: AvatarGroup.displayName = "AvatarGroup";
