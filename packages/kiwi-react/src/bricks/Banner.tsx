/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Role } from "@ariakit/react/role";
import cx from "classnames";
import * as React from "react";
import { Dismiss, Icon, StatusWarning } from "./Icon.js";
import { Text } from "./Text.js";
import { IconButton } from "./IconButton.js";

import { forwardRef, type BaseProps } from "./~utils.js";

type BannerProps = BaseProps & {
	/**
	 * The label displayed inside the banner.
	 */
	label: string;
	/**
	 * Callback invoked when the dismiss ("❌") button is clicked.
	 *
	 * If `undefined`, the dismiss button will not be rendered.
	 *
	 * @default undefined
	 */
	onDismiss?: () => void;
	/**
	 * The actions available for the banner. Must be a list of `Tree.ItemAction` components.
	 *
	 * Example:
	 * ```tsx
	 * actions={[
	 *   <Tree.ItemAction key={…} icon={…} label={…} />,
	 *   <Tree.ItemAction key={…} icon={…} label={…} />,
	 * ]}
	 * ```
	 */
	actions?: React.ReactNode[];
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
				/**
				 * Icon to be displayed inside the banner.
				 *
				 * Can be a URL of an SVG from the `@itwin/itwinui-icons` package,
				 * or a custom JSX icon.
				 */
				icon: string | React.JSX.Element;
		  }
		| {
				tone: "info" | "positive" | "attention" | "critical";
				variant?: "outline" | "solid";
				icon?: undefined;
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
		actions,
		onDismiss,
		tone = "neutral",
		variant = "outline",
		...rest
	} = props;

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
			return <StatusWarning className="🥝-banner-icon" />;
		}
		if (tone === "positive") {
			return <StatusWarning className="🥝-banner-icon" />;
		}
		if (tone === "attention") {
			return <StatusWarning className="🥝-banner-icon" />;
		}
		if (tone === "critical") {
			return <StatusWarning className="🥝-banner-icon" />;
		}

		return null;
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

				<span className={cx("🥝-banner-label", props.className)}>{label}</span>

				<Text
					variant="body-sm"
					className={cx("🥝-banner-message", props.className)}
				>
					{children}
				</Text>

				{actions != null && actions.length > 0 ? (
					<div className={cx("🥝-banner-actions", props.className)}>
						{actions}
					</div>
				) : null}

				{onDismiss ? (
					<IconButton
						className={cx("🥝-banner-dismiss-button", props.className)}
						variant="ghost"
						label={`Dismiss ${label}`}
						labelVariant="visually-hidden"
						icon={<Dismiss />}
						onClick={onDismiss}
					/>
				) : null}
			</div>
		</Role>
	);
});

DEV: Banner.displayName = "Banner";
