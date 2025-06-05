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
 * Supports the convenience API and the composition API.
 *
 * Example:
 * ```tsx
 * import Anchor from "@stratakit/bricks/anchor"; // Convenience API
 * import { Anchor as AnchorComposition } from "@stratakit/bricks"; // Composition API
 *
 * <Anchor href="https://www.example.com">Example</Anchor>
 * <AnchorComposition.Root href="https://www.example.com">Example</AnchorComposition.Root>
 * ```
 *
 * Supports a `tone` prop to change the tone (color) of the anchor.
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
 * Example:
 * ```tsx
 * <Anchor href="https://www.example.com">Example</Anchor>
 * ```
 *
 * Supports a `tone` prop to change the tone (color) of the anchor.
 */
const Anchor = AnchorRoot;
DEV: Anchor.displayName = "Anchor";

export default Anchor;
export { AnchorRoot as Root };
