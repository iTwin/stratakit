/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import cx from "classnames";
import * as Ariakit from "@ariakit/react";

interface ListItemProps extends Ariakit.RoleProps<"div"> {}

/** @internal */
export const ListItem = React.forwardRef<
	React.ElementRef<"div">,
	ListItemProps
>((props, forwardedRef) => {
	return (
		<Ariakit.Role.div
			role="listitem"
			{...props}
			className={cx("🥝-list-item", props.className)}
			ref={forwardedRef}
		/>
	);
});
