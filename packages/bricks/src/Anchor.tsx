/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Focusable } from "@ariakit/react/focusable";
import { Role } from "@ariakit/react/role";
import { VisuallyHidden } from "@stratakit/bricks";
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
			data-_sk-tone={tone}
			className={cx("🥝Anchor", props.className)}
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
				className={cx("🥝AnchorText", props.className)}
				ref={forwardedRef}
			/>
		);
	},
);
DEV: AnchorText.displayName = "Anchor.Text";

// ----------------------------------------------------------------------------

interface AnchorExternalMarkerProps
	extends Omit<BaseProps<"span">, "children"> {
	/**
	 * Visually hidden text for screen readers.
	 * @default "external"
	 */
	alt?: string;
}

/**
 * Displays an external link marker, with visually hidden text for screen readers.
 */
const AnchorExternalMarker = forwardRef<"span", AnchorExternalMarkerProps>(
	(props, forwardedRef) => {
		const { alt = "external", ...rest } = props;
		return (
			<>
				<Role.span
					aria-hidden="true"
					{...rest}
					className={cx("🥝AnchorExternalMarker", props.className)}
					ref={forwardedRef}
				>
					&nbsp;↗
				</Role.span>
				<VisuallyHidden> ({alt})</VisuallyHidden>
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
	const { tone = "neutral", ...rest } = props;
	return <AnchorRoot {...rest} tone={tone} ref={forwardedRef} />;
});
DEV: Anchor.displayName = "Anchor";

// ----------------------------------------------------------------------------

export default Anchor;
export {
	AnchorRoot as Root,
	AnchorText as Text,
	AnchorExternalMarker as ExternalMarker,
};
