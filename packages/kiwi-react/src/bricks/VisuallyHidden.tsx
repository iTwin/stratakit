/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Role } from "@ariakit/react/role";
import cx from "classnames";
import { forwardRef } from "./~utils.js";

import type { BaseProps } from "./~utils.js";

interface VisuallyHiddenProps extends BaseProps<"span"> {}

/**
 * A visually hidden element that is still accessible to screen readers and other assistive technology.
 *
 * This is useful when you want to provide a text alternative to a visual element (e.g. an icon or symbol).
 *
 * Example:
 * ```tsx
 * <span aria-hidden="true">⭐</span>
 * <VisuallyHidden>Favorite</VisuallyHidden>
 * ```
 *
 * **Note**: The `IconButton` component utilizes `VisuallyHidden` internally when the `label` prop is set.
 */
export const VisuallyHidden = forwardRef<"span", VisuallyHiddenProps>(
	(props, forwardedRef) => {
		return (
			<Role.span
				{...props}
				className={cx("🥝-visually-hidden", props.className)}
				ref={forwardedRef}
			/>
		);
	},
);
DEV: VisuallyHidden.displayName = "VisuallyHidden";
