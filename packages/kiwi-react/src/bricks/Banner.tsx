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

	const predefinedIcons = {
		info: "info",
		positive: "status-success",
		attention: "StatusWarning",
		critical: "status-error",
	};

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
			{tone === "neutral" && icon ? <Icon href={icon} /> : null}
			{tone === "info" && <Info />}
			{tone === "positive" && <StatusSuccess />}
			{tone === "attention" && <StatusWarning />}
			{tone === "critical" && <StatusError />}
			<span className={cx("🥝-banner-label", props.className)} id={labelId}>
				{label}
			</span>
			<Text
				variant="body-sm"
				className={cx("🥝-banner-message", props.className)}
			>
				{children}
			</Text>
			<Button>Action</Button>
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
		</Role>
	);
});
DEV: Banner.displayName = "Banner";
