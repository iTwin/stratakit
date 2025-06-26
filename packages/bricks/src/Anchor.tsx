/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Focusable } from "@ariakit/react/focusable";
import { Role } from "@ariakit/react/role";
import { forwardRef } from "@stratakit/foundations/secret-internals";
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

interface AnchorTextProps extends Omit<BaseProps<"span">, "children"> {
	/**
	 * The label displayed inside the anchor.
	 */
	label: React.ReactNode;
}

/**
 * Lorem ipsum
 */
const AnchorText = forwardRef<"span", AnchorTextProps>(
	(props, forwardedRef) => {
		const { label, ...rest } = props;

		return (
			<Role.span
				{...rest}
				className={cx("🥝-anchor-text", props.className)}
				ref={forwardedRef}
			>
				{label}
			</Role.span>
		);
	},
);
DEV: AnchorText.displayName = "Anchor.Text";

// ----------------------------------------------------------------------------

interface AnchorExternalMarkerProps
	extends Omit<BaseProps<"span">, "children"> {}

/**
 * Lorem ipsum
 */
const AnchorExternalMarker = forwardRef<"span", AnchorExternalMarkerProps>(
	(props, forwardedRef) => {
		const { ...rest } = props;

		return (
			<Role.span
				aria-hidden="true"
				{...rest}
				className={cx("🥝-anchor-external-marker", props.className)}
				ref={forwardedRef}
			>
				&nbsp;↗
			</Role.span>
		);
	},
);
DEV: AnchorExternalMarker.displayName = "Anchor.ExternalMarker";

// ----------------------------------------------------------------------------

interface AnchorProps extends FocusableProps<"a"> {
	/** @default "neutral" */
	tone?: "neutral" | "accent" | "critical";

	/**
	 * Lorem ipsum.
	 *
	 * @default false
	 */
	isExternal?: boolean;
}

/**
 * Lorem ipsum
 */
const Anchor = forwardRef<"a", AnchorProps>((props, forwardedRef) => {
	const { children, tone = "neutral", isExternal = false, ...rest } = props;
	return (
		<AnchorRoot {...rest} tone={tone} ref={forwardedRef}>
			<AnchorText label={children} />
			{isExternal && <AnchorExternalMarker />}
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
