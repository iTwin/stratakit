/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Focusable } from "@ariakit/react/focusable";
import { Role } from "@ariakit/react/role";
import { forwardRef } from "@stratakit/foundations/secret-internals";
import cx from "classnames";

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
const Anchor = AnchorRoot;
DEV: Anchor.displayName = "Anchor";

// ----------------------------------------------------------------------------

export default Anchor;
export { AnchorRoot as Root };
