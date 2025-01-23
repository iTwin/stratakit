/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import cx from "classnames";
import * as Ariakit from "@ariakit/react";
import { forwardRef, type BaseProps } from "./~utils.js";

interface IconProps extends Omit<BaseProps<"svg">, "children"> {
	/** URL of the symbol sprite. */
	href?: string;
	/** Size of the icon. Defaults to `regular`. */
	size?: "regular" | "large";
}

/**
 * Icon component that provides fill and sizing to the SVGs from `@itwin/itwinui-icons`.
 * It uses an external symbol sprite to render the icon based on the specified `size`.
 *
 * ```tsx
 * const arrowIcon = new URL("@itwin/itwinui-icons/arrow.svg", import.meta.url).href;
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
export const Icon = forwardRef<"svg", IconProps>((props, forwardedRef) => {
	const { href, size = "regular", ...rest } = props;
	const iconId = toIconId(size);
	return (
		<Ariakit.Role.svg
			aria-hidden
			{...rest}
			data-kiwi-size={size}
			className={cx("🥝-icon", props.className)}
			ref={forwardedRef}
		>
			<use href={`${props.href}#${iconId}`} />
		</Ariakit.Role.svg>
	);
});
DEV: Icon.displayName = "Icon";

function toIconId(size: IconProps["size"]) {
	if (size === "large") return "icon-large";
	return "icon";
}

// ----------------------------------------------------------------------------

interface DisclosureArrowProps extends Omit<BaseProps<"svg">, "children"> {
	/**
	 * Which direction should the arrow point towards?
	 * @default "down"
	 */
	direction?: "down" | "right";
}

export const DisclosureArrow = forwardRef<"svg", DisclosureArrowProps>(
	(props, forwardedRef) => {
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
	},
);
DEV: DisclosureArrow.displayName = "DisclosureArrow";

// ----------------------------------------------------------------------------

interface DismissProps extends Omit<BaseProps<"svg">, "children"> {}

export const Dismiss = forwardRef<"svg", DismissProps>(
	(props, forwardedRef) => {
		return (
			<Icon
				{...props}
				render={
					<Ariakit.Role.svg
						width="16"
						height="16"
						viewBox="0 0 16 16"
						fill="currentColor"
						render={props.render}
					>
						<path d="M4.853 4.146a.5.5 0 1 0-.707.708L7.293 8l-3.147 3.146a.5.5 0 0 0 .707.708L8 8.707l3.146 3.147a.5.5 0 0 0 .707-.708L8.707 8l3.146-3.146a.5.5 0 1 0-.707-.708L8 7.293 4.853 4.146Z" />
					</Ariakit.Role.svg>
				}
				ref={forwardedRef}
			/>
		);
	},
);
DEV: Dismiss.displayName = "Dismiss";
