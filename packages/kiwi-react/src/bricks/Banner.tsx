/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Role } from "@ariakit/react/role";
import cx from "classnames";
import * as React from "react";
import {
	Dismiss,
	Icon,
	Info,
	StatusSuccess,
	StatusWarning,
	StatusError,
} from "./Icon.js";
import { Text } from "./Text.js";
import { Button } from "./Button.js";
import { IconButton } from "./IconButton.js";

import { forwardRef, type BaseProps } from "./~utils.js";

interface BannerProps extends BaseProps {
	/**
	 * Icon to be displayed inside the banner.
	 *
	 * Can be a URL of an SVG from the `@itwin/itwinui-icons` package,
	 * or a custom JSX icon.
	 */
	icon: string | React.JSX.Element;

	/**
	 * The label displayed inside the banner.
	 */
	label: string;

	/**
	 * The variant of the banner.
	 *
	 * @default "solid"
	 */
	variant?: "outline" | "solid";
	/**

	/**
	 * The tone of the banner.
	 * @default "neutral"
	 */
	tone?: "neutral" | "info" | "positive" | "attention" | "critical";

	/**
	 * Callback invoked when the dismiss ("❌") button is clicked.
	 */
	onDismiss?: () => void;
}

/**
 * A banner used to alert the user of something.
 *
 * Example:
 * ```tsx
 * <Banner />
 * ```
 *
 * Supports a `tone` prop to change the tone (color) of the banner.
 */
export const Banner = forwardRef<"div", BannerProps>((props, forwardedRef) => {
	const {
		children,
		icon,
		label,
		onDismiss,
		tone = "neutral",
		variant = "outline",
		...rest
	} = props;

	const baseId = React.useId();
	const labelId = `${baseId}-label`;
	const dismissIconId = `${baseId}-dismiss`;

	return (
		<Role
			role="alert"
			{...rest}
			data-kiwi-tone={tone}
			data-kiwi-variant={variant}
			className={cx("🥝-banner", props.className)}
			ref={forwardedRef}
		>
			<div className={cx("🥝-banner-grid", props.className)}>
				{tone === "neutral" && icon ? (
					React.isValidElement(icon) ? (
						icon
					) : typeof icon === "string" ? (
						<Icon
							href={icon}
							className={cx("🥝-banner-icon", props.className)}
						/>
					) : undefined
				) : null}
				{tone === "info" && (
					<Info className={cx("🥝-banner-icon", props.className)} />
				)}
				{tone === "positive" && (
					<StatusSuccess className={cx("🥝-banner-icon", props.className)} />
				)}
				{tone === "attention" && (
					<StatusWarning className={cx("🥝-banner-icon", props.className)} />
				)}
				{tone === "critical" && (
					<StatusError className={cx("🥝-banner-icon", props.className)} />
				)}
				<span className={cx("🥝-banner-label", props.className)} id={labelId}>
					{label}
				</span>
				<Text
					variant="body-sm"
					className={cx("🥝-banner-message", props.className)}
				>
					{children}
				</Text>
				<Button className={cx("🥝-banner-action-button", props.className)}>
					Action
				</Button>
				{onDismiss && (
					<IconButton
						id={dismissIconId}
						className={cx("🥝-banner-dismiss-button", props.className)}
						variant="ghost"
						aria-labelledby={`${dismissIconId} ${labelId}`}
						label="Dismiss"
						labelVariant="visually-hidden"
						icon={<Dismiss />}
						onClick={onDismiss}
					/>
				)}{" "}
			</div>
		</Role>
	);
});
DEV: Banner.displayName = "Banner";
