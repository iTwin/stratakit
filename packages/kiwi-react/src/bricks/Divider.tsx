/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import cx from "classnames";
import * as Ariakit from "@ariakit/react";

interface DividerProps extends Ariakit.SeparatorProps {
	/**
	 * If true, the divider will be purely presentational and will not have any associated semantics.
	 *
	 * @default false
	 */
	presentational?: boolean;
}

/**
 * The `Divider` component can be used for grouping and dividing content within a layout.
 *
 * A `Divider` can be oriented horizontally or vertically (using the `orientation` prop),
 * and can be a semantic divider or a purely presentational one (using the `presentational` prop).
 */
export const Divider = React.forwardRef<React.ElementRef<"div">, DividerProps>(
	(props, forwardedRef) => {
		const { presentational, ...rest } = props;

		const Comp = presentational ? Ariakit.Role : Ariakit.Separator;

		return (
			<Comp
				{...rest}
				className={cx("🥝-divider", props.className)}
				data-kiwi-orientation={props.orientation}
				ref={forwardedRef as DividerProps["ref"]}
			/>
		);
	},
);
Divider.displayName = "Divider";
