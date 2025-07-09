/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { Role, type RoleProps } from "@ariakit/react/role";
import { IconButton, Text } from "@stratakit/bricks";
import { GhostAligner } from "@stratakit/bricks/secret-internals";
import { Icon } from "@stratakit/foundations";
import {
	forwardRef,
	useSafeContext,
} from "@stratakit/foundations/secret-internals";
import cx from "classnames";
import { createStore, useStore } from "zustand";
import { combine } from "zustand/middleware";
import { Dismiss, StatusIcon } from "./~utils.icons.js";

import type { BaseProps } from "@stratakit/foundations/secret-internals";
import type { ExtractState } from "zustand";

// ----------------------------------------------------------------------------

type BannerState = ExtractState<ReturnType<typeof createBannerStore>>;

function createBannerStore(initialState: { labelId: string }) {
	return createStore(
		combine(initialState, (set, _, store) => ({
			setLabelId: (labelId?: string) => {
				set({ labelId: labelId || store.getInitialState().labelId });
			},
		})),
	);
}

const BannerContext = React.createContext<
	ReturnType<typeof createBannerStore> | undefined
>(undefined);

function BannerProvider(props: React.PropsWithChildren) {
	const defaultLabelId = React.useId();
	const [store] = React.useState(() =>
		createBannerStore({ labelId: defaultLabelId }),
	);

	return (
		<BannerContext.Provider value={store}>
			{props.children}
		</BannerContext.Provider>
	);
}

function useBannerState<P>(selectorFn: (state: BannerState) => P): P {
	const store = useSafeContext(BannerContext);
	return useStore(store, selectorFn);
}

// ----------------------------------------------------------------------------

interface BannerRootProps extends BaseProps<"div"> {
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
}

/**
 * Root component of the compositional Banner component.
 *
 * Example:
 * ```tsx
 * <Banner.Root tone="info" variant="outline">
 *   <Banner.Icon href={placeholderIcon} />
 *   <Banner.Label>Label</Banner.Label>
 *   <Banner.Message>Message</Banner.Message>
 *   <Banner.DismissButton onClick={onDismiss} />
 * </Banner.Root>
 * ```
 */
const BannerRoot = forwardRef<"div", BannerRootProps>((props, forwardedRef) => {
	const { tone = "neutral", variant = "outline", ...rest } = props;

	return (
		<BannerProvider>
			<Role
				{...rest}
				data-kiwi-tone={tone}
				data-kiwi-variant={variant}
				className={cx("🥝-banner", props.className)}
				ref={forwardedRef}
			/>
		</BannerProvider>
	);
});
DEV: BannerRoot.displayName = "Banner.Root";

// ----------------------------------------------------------------------------

interface BannerIconProps extends React.ComponentProps<typeof Icon> {}

/**
 * A static icon decoration for the `Banner.Root` component.
 */
const BannerIcon = forwardRef<"svg", BannerIconProps>((props, forwardedRef) => {
	return (
		<Icon
			{...props}
			className={cx("🥝-banner-icon", props.className)}
			ref={forwardedRef}
		/>
	);
});
DEV: BannerIcon.displayName = "Banner.Icon";

// ----------------------------------------------------------------------------

interface BannerLabelProps extends RoleProps<"span"> {}

/**
 * Label component that should be used with the compositional Banner component.
 *
 * A `Banner.Root`'s label.
 *
 * Example:
 * ```tsx
 * <Banner.Root>
 *   <Banner.Label>Label</Banner.Label>
 * </Banner.Root>
 * ```
 */
const BannerLabel = forwardRef<"span", BannerLabelProps>(
	(props, forwardedRef) => {
		const labelId = useBannerState((state) => state.labelId);
		const setLabelId = useBannerState((state) => state.setLabelId);

		React.useEffect(() => {
			setLabelId(props.id);
		}, [setLabelId, props.id]);

		return (
			<Text
				id={labelId}
				render={<span />}
				{...props}
				className={cx("🥝-banner-label", props.className)}
				variant="body-sm"
				ref={forwardedRef}
			/>
		);
	},
);
DEV: BannerLabel.displayName = "Banner.Label";

// ----------------------------------------------------------------------------

interface BannerMessageProps extends RoleProps<"div"> {}

/**
 * The message content of the `Banner.Root`.
 *
 * Example:
 * ```tsx
 * <Banner.Root>
 *   <Banner.Message>Message content goes here.</Banner.Message>
 * </Banner.Root>
 * ```
 */
const BannerMessage = forwardRef<"span", BannerMessageProps>(
	(props, forwardedRef) => {
		return (
			<Text
				{...props}
				variant="body-sm"
				className={cx("🥝-banner-message", props.className)}
				ref={forwardedRef}
			/>
		);
	},
);
DEV: BannerMessage.displayName = "Banner.Message";

// ----------------------------------------------------------------------------

interface BannerDismissButtonProps
	extends Omit<BaseProps<"button">, "children"> {
	/**
	 * Label for the dismiss button.
	 *
	 * The final accessible name of the dismiss button is a combination of this `label` and the text content of `Chip.Label`.
	 *
	 * @default "Dismiss"
	 */
	label?: string;
}

/**
 * Button to dismiss the banner. Handle the `onClick` event to remove the banner from the UI.
 *
 * Example:
 * ```tsx
 * <Banner.Root>
 *   <Banner.DismissButton onClick={() => {}} />
 * </Banner.Root>
 * ```
 */
const BannerDismissButton = forwardRef<"button", BannerDismissButtonProps>(
	(props, forwardedRef) => {
		const { label = "Dismiss", ...rest } = props;
		const labelId = useBannerState((state) => state.labelId);

		const defaultId = React.useId();
		const id = props.id ?? defaultId;

		return (
			<GhostAligner align="block">
				<IconButton
					{...rest}
					id={id}
					className={cx("🥝-banner-dismiss-button", props.className)}
					variant="ghost"
					label={label}
					aria-labelledby={`${id} ${labelId}`}
					icon={<Dismiss />}
					ref={forwardedRef}
				/>
			</GhostAligner>
		);
	},
);
DEV: BannerDismissButton.displayName = "Banner.DismissButton";

// ----------------------------------------------------------------------------

type BannerProps = Omit<BaseProps, "children"> &
	Pick<BannerRootProps, "tone" | "variant"> & {
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
const Banner = forwardRef<"div", BannerProps>((props, forwardedRef) => {
	const {
		message,
		label,
		actions,
		onDismiss,
		tone = "neutral",
		icon = tone !== "neutral" ? <StatusIcon tone={tone} /> : undefined,
		...rest
	} = props;

	return (
		<BannerRoot tone={tone} {...rest} ref={forwardedRef}>
			{icon ? (
				<BannerIcon
					href={typeof icon === "string" ? icon : undefined}
					render={React.isValidElement(icon) ? icon : undefined}
				/>
			) : null}

			<BannerLabel render={React.isValidElement(label) ? label : undefined}>
				{label}
			</BannerLabel>

			<BannerMessage>{message}</BannerMessage>

			{actions != null ? (
				<div className="🥝-banner-actions">{actions}</div>
			) : null}

			{onDismiss ? <BannerDismissButton onClick={onDismiss} /> : null}
		</BannerRoot>
	);
});
DEV: Banner.displayName = "Banner";

// ----------------------------------------------------------------------------

export default Banner;
export {
	BannerRoot as Root,
	BannerIcon as Icon,
	BannerLabel as Label,
	BannerMessage as Message,
	BannerDismissButton as DismissButton,
};
