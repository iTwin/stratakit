/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { VisuallyHidden as AkVisuallyHidden } from "@ariakit/react/visually-hidden";
import { forwardRef, type BaseProps } from "./~utils.js";

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
		return <AkVisuallyHidden {...props} ref={forwardedRef} />;
	},
);
DEV: VisuallyHidden.displayName = "VisuallyHidden";
