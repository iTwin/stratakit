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

type BannerProps = BaseProps & {
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
	 * Whether the banner is dismissible. If `true`, a dismiss ("❌") button will be displayed.
	 * @default true
	 */
	dismissible?: boolean;

	/**
	 * Callback invoked when the dismiss ("❌") button is clicked.
	 */
	onDismiss?: () => void;
} & (
		| {
				/**
				 * The tone of the banner.
				 *
				 * When `tone="neutral"`, only the `"outline"` `variant` is supported.
				 *
				 * @default "neutral"
				 */
				tone?: "neutral";
				/**
				 * The variant of the banner.
				 *
				 * When `tone="neutral"`, only the `"outline"` `variant` is supported.
				 *
				 * @default "outline"
				 */
				variant?: "outline";
		  }
		| {
				tone: "info" | "positive" | "attention" | "critical";
				variant?: "outline" | "solid";
		  }
	);

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
		icon: iconProp,
		label,
		dismissible = true,
		onDismiss,
		tone = "neutral",
		variant = "outline",
		...rest
	} = props;

	const baseId = React.useId();
	const labelId = `${baseId}-label`;
	const dismissIconId = `${baseId}-dismiss`;

	const icon = React.useMemo(() => {
		if (tone === "neutral" && !!iconProp) {
			if (React.isValidElement(iconProp)) {
				return iconProp;
			}
			if (typeof iconProp === "string") {
				return <Icon href={iconProp} className="🥝-banner-icon" />;
			}
			return null;
		}

		if (tone === "info") {
			return <Info className="🥝-banner-icon" />;
		}
		if (tone === "positive") {
			return <StatusSuccess className="🥝-banner-icon" />;
		}
		if (tone === "attention") {
			return <StatusWarning className="🥝-banner-icon" />;
		}
		if (tone === "critical") {
			return <StatusError className="🥝-banner-icon" />;
		}

		return undefined;
	}, [iconProp, tone]);

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
				{icon}

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

				{dismissible && (
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
				)}
			</div>
		</Role>
	);
});
DEV: Banner.displayName = "Banner";
