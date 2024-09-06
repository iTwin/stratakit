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
	/** Resolution of the icon. Defaults to `regular`. */
	resolution?: "regular" | "large";
}

/** Icon component to be used with `@itwin/kiwi-icons`. This component uses external symbol sprite to render the icon of specified resolution.
 * @example
 * import arrowIcon from "@itwin/kiwi-icons/icons/arrow.svg";
 *
 * <Icon href={arrowIcon} />
 */
export const Icon = React.forwardRef<React.ElementRef<"svg">, IconProps>(
	(props, forwardedRef) => {
		const { href, ...other } = props;
		const iconId = toIconId(props.resolution);
		return (
			<Ariakit.Role.svg
				width="1rem"
				height="1rem"
				{...other}
				className={cx("🥝-icon", props.className)}
				ref={forwardedRef}
			>
				<use href={`${props.href}#${iconId}`} />
			</Ariakit.Role.svg>
		);
	},
);

function toIconId(resolution: IconProps["resolution"]) {
	if (resolution === "large") return "icon-large";
	return "icon";
}
