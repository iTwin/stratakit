/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import cx from "classnames";
import * as Ariakit from "@ariakit/react";

interface IconProps extends Omit<Ariakit.RoleProps<"svg">, "children"> {
	/** URL of the symbol sprite. */
	href?: string;
	/** Size of the icon. Defaults to `regular`. */
	size?: "regular" | "large";
}

/**
 * Icon component that provides fill and sizing to the SVGs from `@itwin/kiwi-icons`.
 * It uses an external symbol sprite to render the icon based on the specified `size`.
 *
 * ```tsx
 * const arrowIcon = new URL("@itwin/kiwi-icons/icons/arrow.svg", import.meta.url).href;
 * <Icon href={arrowIcon} />
 * ```
 *
 * It also accepts a custom SVG, via the `render `prop:
 *
 * ```tsx
 * <Icon render={<svg><path d="…" fill="currentColor" /></svg>} />
 * ```
 *
 * **Note**: This component is meant to be used with decorative icons, so it adds `aria-hidden` by default.
 */
export const Icon = React.forwardRef<React.ElementRef<"svg">, IconProps>(
	(props, forwardedRef) => {
		const { href, size = "regular", ...rest } = props;
		const iconId = toIconId(size);
		return (
			<Ariakit.Role.svg
				data-kiwi-size={size}
				aria-hidden
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
