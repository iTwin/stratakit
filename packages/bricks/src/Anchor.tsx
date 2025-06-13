/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Focusable } from "@ariakit/react/focusable";
import { Role } from "@ariakit/react/role";
import { Icon } from "@stratakit/foundations";
import { forwardRef } from "@stratakit/foundations/secret-internals";
import cx from "classnames";

import type * as React from "react";
import type { FocusableProps } from "@stratakit/foundations/secret-internals";

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
 * import windowPopoutIconHref from "@stratakit/icons/window-popout.svg";
 *
 * <Anchor.Root href="https://www.example.com">
 *   Open in new window
 *   <Anchor.Icon href={windowPopoutIconHref} alt="External link" />
 * </Anchor.Root>
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

interface AnchorIconProps extends React.ComponentProps<typeof Icon> {}

/**
 * An icon in the `Anchor.Root` component.
 *
 * By default, this icon is decorative.
 * If the icon is semantically meaningful, pass the `alt` prop with alternative text.
 *
 * Example:
 * ```tsx
 * import * as Anchor from "@stratakit/bricks/Anchor";
 * import windowPopoutIconHref from "@stratakit/icons/window-popout.svg";
 *
 * <Anchor.Root href="https://www.example.com">
 *   Open in new window
 *   <Anchor.Icon href={windowPopoutIconHref} alt="External link" />
 * </Anchor.Root>
 * ```
 */
const AnchorIcon = forwardRef<"svg", AnchorIconProps>((props, forwardedRef) => {
	return (
		<Icon
			{...props}
			className={cx("🥝-anchor-icon", props.className)}
			ref={forwardedRef}
		/>
	);
});
DEV: AnchorIcon.displayName = "Anchor.Icon";

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
 * import windowPopoutIconHref from "@stratakit/icons/window-popout.svg";
 *
 * <Anchor.Root href="https://www.example.com">
 *   Open in new window
 *   <Anchor.Icon href={windowPopoutIconHref} alt="External link" />
 * </Anchor.Root>
 * ```
 */
const Anchor = AnchorRoot;
DEV: Anchor.displayName = "Anchor";

// ----------------------------------------------------------------------------

export default Anchor;
export { AnchorRoot as Root, AnchorIcon as Icon };
