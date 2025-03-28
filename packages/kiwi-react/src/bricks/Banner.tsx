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

type BannerProps = Omit<BaseProps, "children"> & {
	/**
	 * Icon to be displayed inside the banner.
	 *
	 * Can be a URL of an SVG from the `@itwin/itwinui-icons` package,
	 * or a custom JSX icon.
	 *
	 * - If `icon=undefined` and `tone="neutral"`, no icon is shown.
	 * - If `icon=undefined` and `tone!="neutral"`, the status icon will be shown.
	 */
	icon?: string | React.JSX.Element;
	/**
	 * The label displayed inside the banner.
	 *
	 * Serves as the accessible name for the banner.
	 */
	label?: string;
	/**
	 * The content of the banner.
	 */
	message?: React.ReactNode;
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
	/**
	 * The tone of the banner.
	 *
	 * @default "neutral"
	 */
	tone?: "neutral" | "info" | "positive" | "attention" | "critical";
	/**
	 * The variant of the banner.
	 *
	 * @default "outline"
	 */
	variant?: "outline";
};

/**
 * A banner used to alert the user of something.
 *
 * ```tsx
 * <Banner label="Title" message="Message" icon={placeholderIcon} onDismiss={() => {}} />
 * ```
 */
export const Banner = forwardRef<"div", BannerProps>((props, forwardedRef) => {
	const {
		className,
		message,
		icon: iconProp,
		label,
		actions,
		onDismiss,
		tone = "neutral",
		variant = "outline",
		...rest
	} = props;

	const icon = React.useMemo(() => {
		const defaultIconProps = { className: "🥝-banner-icon" };

		if (iconProp) {
			if (typeof iconProp === "string") {
				return <Icon href={iconProp} {...defaultIconProps} />;
			}

			return React.cloneElement(iconProp, {
				className: cx("🥝-banner-icon", iconProp.props),
			});
		}

		if (tone === "info") {
			return <Info {...defaultIconProps} />;
		}
		if (tone === "positive") {
			return <StatusSuccess {...defaultIconProps} />;
		}
		if (tone === "attention") {
			return <StatusWarning {...defaultIconProps} />;
		}
		if (tone === "critical") {
			return <StatusError {...defaultIconProps} />;
		}

		return null;
	}, [iconProp, tone]);

	const dismissButtonLabel = React.useMemo(() => {
		if (label) {
			return `Dismiss ${label}`;
		}
		return "Dismiss";
	}, [label]);

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

				{label ? <span className="🥝-banner-label">{label}</span> : null}

				<Text variant="body-sm" className="🥝-banner-message">
					{message}
				</Text>

				{actions != null ? (
					<div className="🥝-banner-actions">{actions}</div>
				) : null}

				{onDismiss ? (
					<IconButton
						className="🥝-banner-dismiss-button"
						variant="ghost"
						label={dismissButtonLabel}
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
