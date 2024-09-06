/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import cx from "classnames";
import * as Ariakit from "@ariakit/react";

interface IconProps extends Ariakit.RoleProps<"svg"> {
	/** URL of the symbol sprite. */
	href?: string;
	/** Size of the icon. Defaults to `regular`. */
	size?: "regular" | "large";
}

/** Icon component to be used with `@itwin/kiwi-icons`. This component uses external symbol sprite to render the icon based on specified size.
 * @example
 * import arrowIcon from "@itwin/kiwi-icons/icons/arrow.svg";
 *
 * <Icon href={arrowIcon} />
 */
export const Icon = React.forwardRef<React.ElementRef<"svg">, IconProps>(
	(props, forwardedRef) => {
		const { href, size = "regular", ...rest } = props;
		const iconId = toIconId(size);
		return (
			<Ariakit.Role.svg
				data-kiwi-size={size}
				{...rest}
				className={cx("🥝-icon", props.className)}
				ref={forwardedRef}
			>
				<use href={`${props.href}#${iconId}`} />
			</Ariakit.Role.svg>
		);
	},
);

function toIconId(size: IconProps["size"]) {
	if (size === "large") return "icon-large";
	return "icon";
}
