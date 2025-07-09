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

function createBannerStore(initialState: {
	labelId: string;
	iconSubComponentsDescendants?: string[];
}) {
	return createStore(
		combine(initialState, (set, _, store) => ({
			setLabelId: (labelId?: string) => {
				set({ labelId: labelId || store.getInitialState().labelId });
			},
			addIconSubComponentsDescendants: (iconId: string) => {
				set({
					iconSubComponentsDescendants: (
						store.getState().iconSubComponentsDescendants || []
					).includes(iconId)
						? store.getState().iconSubComponentsDescendants
						: [
								...(store.getState().iconSubComponentsDescendants || []),
								iconId,
							],
				});
			},
			removeIconSubComponentsDescendants: (iconId: string) => {
				set({
					iconSubComponentsDescendants: (
						store.getState().iconSubComponentsDescendants || []
					).filter((id) => id !== iconId),
				});
			},
		})),
	);
}

const BannerContext = React.createContext<
	ReturnType<typeof createBannerStore> | undefined
>(undefined);

function BannerProvider(props: React.PropsWithChildren) {
	const defaultLabelId = React.useId();
	const defaultIconSubComponentsDescendants: string[] = [];

	const [store] = React.useState(() =>
		createBannerStore({
			labelId: defaultLabelId,
			iconSubComponentsDescendants: defaultIconSubComponentsDescendants,
		}),
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
 * A banner to highlight information and also optionally provide actions.
 * The information could be very important (like a call to action) or reasonably import (like a status message).
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
	const { tone = "neutral", variant = "outline", children, ...rest } = props;

	return (
		<BannerProvider>
			<Role
				{...rest}
				data-kiwi-tone={tone}
				data-kiwi-variant={variant}
				className={cx("🥝-banner", props.className)}
				ref={forwardedRef}
			>
				<ConditionalBannerStatusIcon tone={tone} />

				{children}
			</Role>
		</BannerProvider>
	);
});
DEV: BannerRoot.displayName = "Banner.Root";

/**
 * If no `Banner.Icon` descendant is found and if the tone is not-neutral, shows a banner status icon.
 * Else, returns `null`.
 *
 * @private
 */
const ConditionalBannerStatusIcon = ({
	tone,
}: {
	tone: NonNullable<BannerRootProps["tone"]>;
}) => {
	const iconSubComponentsDescendants = useBannerState(
		(state) => state.iconSubComponentsDescendants,
	);

	if (tone !== "neutral" && iconSubComponentsDescendants?.length === 0) {
		return (
			<BannerIconBase
				render={(props) => <StatusIcon tone={tone} {...props} />}
			/>
		);
	}

	return null;
};
DEV: ConditionalBannerStatusIcon.displayName = "ConditionalBannerStatusIcon";

// ----------------------------------------------------------------------------

interface BannerIconProps extends React.ComponentProps<typeof Icon> {}

/**
 * Only the main part of the `Banner.Icon` component.
 * Does not register itself in the `Banner` store, unlike `Banner.Icon`.
 *
 * @private
 */
const BannerIconBase = forwardRef<"svg", BannerIconProps>(
	(props, forwardedRef) => {
		return (
			<Icon
				{...props}
				className={cx("🥝-banner-icon", props.className)}
				ref={forwardedRef}
			/>
		);
	},
);
DEV: BannerIconBase.displayName = "Banner.IconBase";

/**
 * A static icon decoration for the `Banner.Root` component.
 *
 * - If no `<Banner.Icon>` is passed and the `tone` is `"neutral"`, no icon is shown.
 * - If no `<Banner.Icon>` is passed and the `tone` is not`"neutral"`, the status icon is shown.
 *
 * Example:
 * ```tsx
 * import placeholderIcon from "@stratakit/icons/placeholder.svg";
 *
 * <Banner.Root>
 *   <Banner.Icon href={placeholderIcon} />
 * </Banner.Root>
 */
const BannerIcon = forwardRef<"svg", BannerIconProps>((props, forwardedRef) => {
	const defaultId = React.useId();
	const id = props.id ?? defaultId;

	const addIconSubComponentsDescendants = useBannerState(
		(state) => state.addIconSubComponentsDescendants,
	);
	const removeIconSubComponentsDescendants = useBannerState(
		(state) => state.removeIconSubComponentsDescendants,
	);

	// Register and de-register the icon sub-component in the store.
	React.useEffect(() => {
		addIconSubComponentsDescendants(id);

		return () => {
			removeIconSubComponentsDescendants(id);
		};
	}, [addIconSubComponentsDescendants, removeIconSubComponentsDescendants, id]);

	return <BannerIconBase {...props} ref={forwardedRef} />;
});
DEV: BannerIcon.displayName = "Banner.Icon";

// ----------------------------------------------------------------------------

interface BannerLabelProps extends RoleProps<"span"> {}

/**
 * The label of the `Banner.Root`.
 *
 * Pass `render={<VisuallyHidden />}` if you don't want the label to be visible.
 *
 * Example:
 * ```tsx
 * <Banner.Root>
 *   <Banner.Label>Label</Banner.Label>
 * </Banner.Root>
 * ```
 *
 * Example with a visually hidden label:
 * ```tsx
 * <Banner.Root>
 *   <Banner.Label render={<VisuallyHidden />}>Label</Banner.Label>
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

interface BannerActionsProps extends BaseProps<"div"> {}

/**
 * The actions available for the `Banner.Root`.
 *
 * Example with one action:
 * ```tsx
 * <Banner.Root>
 *   <Banner.Actions>
 *     <Button key={…} onClick={…}>Action</Button>
 *   </Banner.Actions>
 * </Banner.Root>
 * ```
 *
 * Example with two `Button`s:
 * ```tsx
 * <Banner.Root>
 *   <Banner.Actions>
 *     <Button key={…} onClick={…}>Action 1</Button>
 *     <Button key={…} onClick={…}>Action 2</Button>
 *   </Banner.Actions>
 * </Banner.Root>
 * ```
 *
 * Example with two `Anchor`s as `Button`:
 * ```tsx
 * <Banner.Root>
 *   <Banner.Actions>
 *     <Anchor key={…} render={<button />} onClick={…}>Action 1</Anchor>,
 *     <Anchor key={…} render={<button />} onClick={…}>Action 2</Anchor>,
 *   </Banner.Actions>
 * </Banner.Root>
 * ```
 */
const BannerActions = forwardRef<"div", BannerActionsProps>(
	(props, forwardedRef) => {
		return (
			<Role.div
				{...props}
				className={cx("🥝-banner-actions", props.className)}
				ref={forwardedRef}
			/>
		);
	},
);
DEV: BannerActions.displayName = "Banner.Actions";

// ----------------------------------------------------------------------------

interface BannerDismissButtonProps
	extends Omit<BaseProps<"button">, "children"> {
	/**
	 * Label for the `Banner.DismissButton`.
	 *
	 * The final accessible name of the dismiss button is a combination of this `label` and the text content of `Banner.Label`.
	 *
	 * @default "Dismiss"
	 */
	label?: string;
}

/**
 * Dismiss ("❌") button for the `Banner.Root`.
 * Handle the `onClick` callback to dismiss the `Banner.Root`.
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
		 * A static icon decoration for the `Banner.Root` component.
		 *
		 * Can be a URL of an SVG from the `@stratakit/icons` package, or a custom JSX icon.
		 *
		 * - If no `icon` is passed and the `tone` is `"neutral"`, no icon is shown.
		 * - If no `icon` is passed and the `tone` is not `"neutral"`, the status icon is shown.
		 */
		icon?: string | React.JSX.Element;
		/**
		 * The label of the `Banner`.
		 *
		 * Either pass a string or a `<VisuallyHidden>` component if you don't want the label to be visible.
		 */
		label: string | React.JSX.Element;
		/**
		 * The message content of the `Banner`.
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
		 * The actions available for the `Banner`.
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
		 * ```
		 */
		actions?: React.ReactNode;
	};

/**
 * A banner to highlight information and also optionally provide actions.
 * The information could be very important (like a call to action) or reasonably import (like a status message).
 *
 * Example:
 * ```tsx
 * <Banner label="Label" message="Message" icon={placeholderIcon} onDismiss={() => {}} />
 * ```
 */
const Banner = forwardRef<"div", BannerProps>((props, forwardedRef) => {
	const { message, label, actions, onDismiss, icon, ...rest } = props;

	return (
		<BannerRoot {...rest} ref={forwardedRef}>
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

			{actions != null ? <BannerActions>{actions}</BannerActions> : null}

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
	BannerActions as Actions,
	BannerDismissButton as DismissButton,
};
