/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Role } from "@ariakit/react/role";
import { Separator } from "@ariakit/react/separator";
import { forwardRef } from "@stratakit/internal-utils/react";
import cx from "classnames";
import { useInit } from "./~utils.useInit.js";

import type { SeparatorProps } from "@ariakit/react/separator";
import type { BaseProps } from "@stratakit/internal-utils/props";

interface DividerProps
	extends BaseProps<"hr">,
		Pick<SeparatorProps, "orientation"> {
	/**
	 * If true, the divider will be purely presentational and will not have any associated semantics.
	 *
	 * @default false
	 */
	presentational?: boolean;
	/**
	 * If true, the divider will extend to the edges of the nearest scrollable container.
	 *
	 * @default false
	 */
	bleed?: boolean;
}

/**
 * A styled "separator" element (e.g. `<hr>`), useful for grouping and dividing content within a layout.
 *
 * A `Divider` can be oriented horizontally or vertically (using the `orientation` prop),
 * and can be a semantic divider or a purely presentational one (using the `presentational` prop).
 *
 * @deprecated Use MUI [`Divider`](https://mui.com/material-ui/api/divider/) component instead.
 * See [migration guide](https://stratakit.bentley.com/docs/getting-started/migration-from-legacy-stratakit/#divider).
 */
const Divider = forwardRef<"hr", DividerProps>((props, forwardedRef) => {
	useInit();

	const { presentational, bleed, ...rest } = props;

	const Comp = presentational ? Role : Separator;

	return (
		<Comp
			{...rest}
			className={cx("🥝Divider", props.className)}
			data-_sk-orientation={props.orientation}
			data-_sk-bleed={bleed ? "true" : undefined}
			ref={forwardedRef}
		/>
	);
});
DEV: Divider.displayName = "Divider";

// ----------------------------------------------------------------------------

export default Divider;
