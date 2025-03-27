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
	StatusWarning,
	StatusSuccess,
	StatusError,
	Info,
} from "./Icon.js";
import { Text } from "./Text.js";
import { IconButton } from "./IconButton.js";

import { forwardRef, type BaseProps } from "./~utils.js";

type BannerProps = BaseProps & {
	/**
	 * The label displayed inside the banner.
	 *
	 * Serves as the accessible name for the banner.
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
	 * The actions available for the banner.
	 *
	 * Example with one action:
	 * ```tsx
	 * actions={<Button key={…} onClick={}>Action</Button>}
	 * ```
	 *
	 * Example with two `Button`s:
	 * ```tsx
	 * actions={
	 *   <>
	 *     <Button key={…} onClick={…}>Action 1</Button>,
	 *     <Button key={…} onClick={…}>Action 2</Button>,
	 *   </>
	 * }
	 * ```
	 *
	 * Example with two `Anchor`s as `Button`:
	 * ```tsx
	 * actions={
	 *   <>
	 *     <Anchor key={…} render={<button />} onClick={…}>Action 1</Anchor>,
	 *     <Anchor key={…} render={<button />} onClick={…}>Action 2</Anchor>,
	 *   </>
	 * }
	 */
	actions?: React.ReactNode;
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
 * <Banner label="Title" icon={placeholderIcon} onDismiss={() => {}}>
 *   Message
 * </Banner>
 * ```
 */
export const Banner = forwardRef<"div", BannerProps>((props, forwardedRef) => {
	const {
		className,
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

		return null;
	}, [iconProp, tone]);

	return (
		<Role
			{...rest}
			data-kiwi-tone={tone}
			data-kiwi-variant={variant}
			className={cx("🥝-banner", className)}
			ref={forwardedRef}
		>
			<div className="🥝-banner-grid">
				{icon}

				<span className="🥝-banner-label">{label}</span>

				<Text variant="body-sm" className="🥝-banner-message">
					{children}
				</Text>

				{actions != null ? (
					<div className="🥝-banner-actions">{actions}</div>
				) : null}

				{onDismiss ? (
					<IconButton
						className="🥝-banner-dismiss-button"
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
