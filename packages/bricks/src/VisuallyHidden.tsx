/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Role } from "@ariakit/react/role";
import { forwardRef } from "@stratakit/internal-utils/react";
import cx from "classnames";
import { useInit } from "./~utils.useInit.js";

import type { BaseProps } from "@stratakit/internal-utils/props";

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
 *
 * @deprecated Use MUI [`visuallyHidden`](https://mui.com/system/screen-readers/#visually-hidden-elements) CSS utility instead.
 * See [migration guide](https://stratakit.bentley.com/docs/getting-started/migration-from-legacy-stratakit/#visuallyhidden).
 */
const VisuallyHidden = forwardRef<"span", VisuallyHiddenProps>(
	(props, forwardedRef) => {
		useInit();
		return (
			<Role.span
				{...props}
				className={cx("🥝VisuallyHidden", props.className)}
				ref={forwardedRef}
			/>
		);
	},
);
DEV: VisuallyHidden.displayName = "VisuallyHidden";

// ----------------------------------------------------------------------------

export default VisuallyHidden;
