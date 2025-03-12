/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import cx from "classnames";
import { Role } from "@ariakit/react/role";
import { forwardRef, type BaseProps } from "./~utils.js";

interface IconProps extends Omit<BaseProps<"svg">, "children"> {
	/**
	 * URL of the symbol sprite.
	 *
	 * Should be a URL to an `.svg` file from `@itwin/itwinui-icons`.
	 */
	href?: string;
	/**
	 * Size of the icon. This affects the icon's physical dimensions, as well as the
	 * actual SVG contents (different sizes might have different fidelity).
	 *
	 * Defaults to `"regular"` (16px) and can be optionally set to `"large"` (24px).
	 */
	size?: "regular" | "large";
	/**
	 * Alternative text describing the icon.
	 *
	 * When this prop is passed, the SVG gets rendered as `role="img"` and labelled
	 * using the provided text.
	 *
	 * This prop is not required if the icon is purely decorative. By default, the icon
	 * will be hidden from the accessibility tree.
	 */
	alt?: string;
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
 * By default, this component assumes that the icon is decorative, so it adds `aria-hidden` by default.
 *
 * If the icon is semantically meaningful, the `alt` prop can be used to provide alternative text.
 *
 * ```tsx
 * <Icon href={…} alt="Help" />
 * ```
 */
export const Icon = forwardRef<"svg", IconProps>((props, forwardedRef) => {
	const { href, size, alt, ...rest } = props;

	const iconId = toIconId(size);
	const isDecorative = !alt;

	return (
		<Role.svg
			aria-hidden={isDecorative ? "true" : undefined}
			role={isDecorative ? undefined : "img"}
			aria-label={isDecorative ? undefined : alt}
			{...rest}
			data-kiwi-size={size}
			className={cx("🥝-icon", props.className)}
			ref={forwardedRef}
		>
			<use href={`${props.href}#${iconId}`} />
		</Role.svg>
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
					<Role.svg
						width="16"
						height="16"
						fill="currentColor"
						viewBox="0 0 16 16"
						render={props.render}
					>
						{path}
					</Role.svg>
				}
				className={cx("🥝-disclosure-arrow", props.className)}
				ref={forwardedRef}
			/>
		);
	},
);
DEV: DisclosureArrow.displayName = "DisclosureArrow";

// ----------------------------------------------------------------------------

interface CheckmarkProps extends Omit<BaseProps<"svg">, "children"> {}

export const Checkmark = forwardRef<"svg", CheckmarkProps>(
	(props, forwardedRef) => {
		return (
			<Icon
				{...props}
				render={
					<Role.svg
						width="16"
						height="16"
						fill="currentColor"
						viewBox="0 0 16 16"
						render={props.render}
					>
						<path
							fillRule="evenodd"
							d="M13.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L6.5 10.793l6.646-6.647a.5.5 0 0 1 .708 0Z"
							clipRule="evenodd"
						/>
					</Role.svg>
				}
				ref={forwardedRef}
			/>
		);
	},
);
DEV: Checkmark.displayName = "Checkmark";

// ----------------------------------------------------------------------------

interface DismissProps extends Omit<BaseProps<"svg">, "children"> {}

export const Dismiss = forwardRef<"svg", DismissProps>(
	(props, forwardedRef) => {
		return (
			<Icon
				{...props}
				render={
					<Role.svg
						width="16"
						height="16"
						viewBox="0 0 16 16"
						fill="currentColor"
						render={props.render}
					>
						<path d="M4.853 4.146a.5.5 0 1 0-.707.708L7.293 8l-3.147 3.146a.5.5 0 0 0 .707.708L8 8.707l3.146 3.147a.5.5 0 0 0 .707-.708L8.707 8l3.146-3.146a.5.5 0 1 0-.707-.708L8 7.293 4.853 4.146Z" />
					</Role.svg>
				}
				ref={forwardedRef}
			/>
		);
	},
);
DEV: Dismiss.displayName = "Dismiss";

// ----------------------------------------------------------------------------

interface StatusWarningProps extends Omit<BaseProps<"svg">, "children"> {}

export const StatusWarning = forwardRef<"svg", StatusWarningProps>(
	(props, forwardedRef) => {
		return (
			<Icon
				{...props}
				render={
					<Role.svg
						width="16"
						height="16"
						fill="currentColor"
						viewBox="0 0 16 16"
						render={props.render}
					>
						<path
							fill="currentColor"
							fillRule="evenodd"
							d="M8.354 2.06a.5.5 0 0 0-.708 0L2.061 7.647a.5.5 0 0 0 0 .707l5.585 5.586a.5.5 0 0 0 .708 0l5.585-5.586a.5.5 0 0 0 0-.707L8.354 2.061Zm-1.415-.707a1.5 1.5 0 0 1 2.122 0l5.585 5.586a1.5 1.5 0 0 1 0 2.122l-5.585 5.585a1.5 1.5 0 0 1-2.122 0L1.354 9.061a1.5 1.5 0 0 1 0-2.122l5.585-5.586ZM8.75 10.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM8.5 8.5v-3a.5.5 0 0 0-1 0v3a.5.5 0 0 0 1 0Z"
							clipRule="evenodd"
						/>
					</Role.svg>
				}
				ref={forwardedRef}
			/>
		);
	},
);
DEV: StatusWarning.displayName = "StatusWarning";

// ----------------------------------------------------------------------------

interface ChevronDownProps extends Omit<BaseProps<"svg">, "children"> {}

export const ChevronDown = forwardRef<"svg", ChevronDownProps>(
	(props, forwardedRef) => {
		return (
			<Icon
				{...props}
				render={
					<Role.svg
						width="16"
						height="16"
						fill="currentColor"
						viewBox="0 0 16 16"
						render={props.render}
					>
						<path d="M4.146 6.146a.5.5 0 0 1 .708 0L8 9.293l3.146-3.147a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 0 1 0-.708Z" />
					</Role.svg>
				}
				className={cx("🥝-chevron-down", props.className)}
				ref={forwardedRef}
			/>
		);
	},
);
DEV: ChevronDown.displayName = "ChevronDown";
