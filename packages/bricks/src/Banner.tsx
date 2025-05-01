/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Role } from "@ariakit/react/role";
import { Icon } from "@stratakit/foundations";
import { forwardRef } from "@stratakit/foundations/secret-internals";
import cx from "classnames";
import * as React from "react";
import { IconButton } from "./IconButton.js";
import { Text } from "./Text.js";
import { GhostAligner } from "./~utils.GhostAligner.js";
import { Dismiss, StatusIcon } from "./~utils.icons.js";

import type { BaseProps } from "@stratakit/foundations/secret-internals";

type BannerProps = Omit<BaseProps, "children"> & {
	/**
	 * Icon to be displayed inside the banner.
	 *
	 * Can be a URL of an SVG from the `@stratakit/icons` package,
	 * or a custom JSX icon.
	 *
	 * - If `icon=undefined` and `tone="neutral"`, no icon is shown.
	 * - If `icon=undefined` and `tone!="neutral"`, the status icon will be shown.
	 */
	icon?: string | React.JSX.Element;
	/**
	 * The label displayed inside the banner.
	 *
	 * Either pass a string or a `<VisuallyHidden>` component if you don't want the label to be visible.
	 */
	label: string | React.JSX.Element;
	/**
	 * The content of the banner.
	 */
	message: React.ReactNode;
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
 * A banner to highlight information and also optionally provide actions.
 * The information could be very important (like a call to action) or reasonably import (like a status message).
 *
 * Example:
 * ```tsx
 * <Banner label="Title" message="Message" icon={placeholderIcon} onDismiss={() => {}} />
 * ```
 */
export const Banner = forwardRef<"div", BannerProps>((props, forwardedRef) => {
	const {
		className,
		message,
		label,
		actions,
		onDismiss,
		tone = "neutral",
		icon = tone !== "neutral" ? <StatusIcon tone={tone} /> : undefined,
		variant = "outline",
		...rest
	} = props;

	const baseId = React.useId();
	const labelId = `${baseId}-label`;
	const dismissId = `${baseId}-dismiss`;

	return (
		<Role
			{...rest}
			data-kiwi-tone={tone}
			data-kiwi-variant={variant}
			className={cx("🥝-banner", className)}
			ref={forwardedRef}
		>
			{icon ? (
				<Icon
					className="🥝-banner-icon"
					href={typeof icon === "string" ? icon : undefined}
					render={React.isValidElement(icon) ? icon : undefined}
				/>
			) : null}

			<Text
				className="🥝-banner-label"
				id={labelId}
				variant="body-sm"
				render={React.isValidElement(label) ? label : <span />}
			>
				{!React.isValidElement(label) ? label : undefined}
			</Text>

			<Text render={<div />} variant="body-sm" className="🥝-banner-message">
				{message}
			</Text>

			{actions != null ? (
				<div className="🥝-banner-actions">{actions}</div>
			) : null}

			{onDismiss ? (
				<GhostAligner align="block">
					<IconButton
						id={dismissId}
						className="🥝-banner-dismiss-button"
						variant="ghost"
						label="Dismiss"
						aria-labelledby={`${dismissId} ${labelId}`}
						icon={<Dismiss />}
						onClick={onDismiss}
					/>
				</GhostAligner>
			) : null}
		</Role>
	);
});
DEV: Banner.displayName = "Banner";
