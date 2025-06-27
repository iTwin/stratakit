/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Focusable } from "@ariakit/react/focusable";
import { Role } from "@ariakit/react/role";
import { forwardRef } from "@stratakit/foundations/secret-internals";
import { VisuallyHidden } from "@stratakit/bricks";
import cx from "classnames";

import type {
	BaseProps,
	FocusableProps,
} from "@stratakit/foundations/secret-internals";

interface AnchorRootProps extends FocusableProps<"a"> {
	/** @default "neutral" */
	tone?: "neutral" | "accent" | "critical";
}

/**
 * A styled anchor element, typically used for navigating to a different location.
 *
 * Supports the convenience API (lesser code) and the composition API (more customization).
 *
 * Example of convenience API:
 * ```tsx
 * import { Anchor } from "@stratakit/bricks";
 *
 * <Anchor href="https://www.example.com">Example</Anchor>
 * ```
 *
 * Example of composition API:
 * ```tsx
 * import * as Anchor from "@stratakit/bricks/Anchor";
 *
 * <Anchor.Root href="https://www.example.com">Example</Anchor.Root>
 * ```
 */
const AnchorRoot = forwardRef<"a", AnchorRootProps>((props, forwardedRef) => {
	const { tone = "neutral", ...rest } = props;
	return (
		<Role.a
			{...rest}
			data-kiwi-tone={tone}
			className={cx("🥝-anchor", props.className)}
			render={
				<Focusable accessibleWhenDisabled render={props.render || <a />} />
			}
			ref={forwardedRef}
		/>
	);
});
DEV: AnchorRoot.displayName = "Anchor.Root";

// ----------------------------------------------------------------------------

interface AnchorTextProps extends BaseProps<"span"> {
	/**
	 * The content displayed inside the anchor.
	 */
	children: React.ReactNode;
}

/**
 * Displays the anchor text.
 */
const AnchorText = forwardRef<"span", AnchorTextProps>(
	(props, forwardedRef) => {
		return (
			<Role.span
				{...props}
				className={cx("🥝-anchor-text", props.className)}
				ref={forwardedRef}
			>
				{props.children}
			</Role.span>
		);
	},
);
DEV: AnchorText.displayName = "Anchor.Text";

// ----------------------------------------------------------------------------

interface AnchorExternalMarkerProps extends BaseProps<"span"> {
	/**
	 * The content displayed inside the marker.
	 */
	children?: React.ReactNode;
}

/**
 * Displays an external link marker, with visually hidden text for screen readers.
 */
const AnchorExternalMarker = forwardRef<"span", AnchorExternalMarkerProps>(
	(props, forwardedRef) => {
		return (
			<>
				<Role.span
					aria-hidden="true"
					{...props}
					className={cx("🥝-anchor-external-marker", props.className)}
					ref={forwardedRef}
				>
					&nbsp;↗
				</Role.span>
				<VisuallyHidden> (opens in new tab)</VisuallyHidden>
			</>
		);
	},
);
DEV: AnchorExternalMarker.displayName = "Anchor.ExternalMarker";

// ----------------------------------------------------------------------------

interface AnchorProps extends FocusableProps<"a"> {
	/** @default "neutral" */
	tone?: "neutral" | "accent" | "critical";
}

/**
 * A styled anchor element, typically used for navigating to a different location.
 */
const Anchor = forwardRef<"a", AnchorProps>((props, forwardedRef) => {
	const { children, tone = "neutral", ...rest } = props;
	return (
		<AnchorRoot {...rest} tone={tone} ref={forwardedRef}>
			<AnchorText>{children}</AnchorText>
		</AnchorRoot>
	);
});
DEV: Anchor.displayName = "Anchor";

// ----------------------------------------------------------------------------

export default Anchor;
export {
	AnchorRoot as Root,
	AnchorText as Text,
	AnchorExternalMarker as ExternalMarker,
};
