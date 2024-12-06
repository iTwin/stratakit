/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import cx from "classnames";
import * as Ariakit from "@ariakit/react";
import type { OptionProps, Props } from "./~utils.js";

type IconProps = Props<
	"svg",
	OptionProps<Ariakit.RoleProps<"svg">>,
	"children"
> & {
	/** URL of the symbol sprite. */
	href?: string;
	/** Size of the icon. Defaults to `regular`. */
	size?: "regular" | "large";
};

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
DEV: Icon.displayName = "Icon";

function toIconId(size: IconProps["size"]) {
	if (size === "large") return "icon-large";
	return "icon";
}

// ----------------------------------------------------------------------------

type DisclosureArrowProps = Props<
	"svg",
	OptionProps<Ariakit.RoleProps<"svg">>,
	"children"
> & {
	/**
	 * Which direction should the arrow point towards?
	 * @default "down"
	 */
	direction?: "down" | "right";
};

export const DisclosureArrow = React.forwardRef<
	React.ElementRef<"svg">,
	DisclosureArrowProps
>((props, forwardedRef) => {
	const { direction = "down", ...rest } = props;

	const path = React.useMemo(() => {
		switch (direction) {
			case "down":
				return <path d="M8 10 5 7h6l-3 3Z" />;
			case "right":
				return <path d="M7 11V5l3 3-3 3Z" />;
		}
	}, [direction]);

	return (
		<Icon
			{...rest}
			render={
				<Ariakit.Role.svg
					width="16"
					height="16"
					fill="currentColor"
					viewBox="0 0 16 16"
					render={props.render}
				>
					{path}
				</Ariakit.Role.svg>
			}
			className={cx("🥝-disclosure-arrow", props.className)}
			ref={forwardedRef}
		/>
	);
});
DEV: DisclosureArrow.displayName = "DisclosureArrow";
