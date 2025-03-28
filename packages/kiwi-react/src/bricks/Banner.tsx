/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Role } from "@ariakit/react/role";
import cx from "classnames";
import * as React from "react";
import { Dismiss, Icon, StatusIcon } from "./Icon.js";
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
	 * Consider using a `VisuallyHidden` component if the label is not meant to be visible.
	 */
	label: React.ReactNode;
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

	const baseId = React.useId();
	const labelId = `${baseId}-label`;
	const dismissIconId = `${baseId}-dismiss`;

	const toneToStatus = {
		positive: "success",
		attention: "warning",
		critical: "error",
		info: "info",
	} as const;

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

		if (tone === "neutral") {
			return null;
		}
		return <StatusIcon status={toneToStatus[tone]} {...defaultIconProps} />;
	}, [iconProp, tone, toneToStatus]);

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

				<span className="🥝-banner-label" id={labelId}>
					{label}
				</span>

				<Text variant="body-sm" className="🥝-banner-message">
					{message}
				</Text>

				{actions != null ? (
					<div className="🥝-banner-actions">{actions}</div>
				) : null}

				{onDismiss ? (
					<IconButton
						id={dismissIconId}
						className="🥝-banner-dismiss-button"
						variant="ghost"
						aria-labelledby={`${dismissIconId} ${labelId}`}
						label="Dismiss"
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
