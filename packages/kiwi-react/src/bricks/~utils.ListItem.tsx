/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Role } from "@ariakit/react/role";
import cx from "classnames";
import { Text } from "./Text.js";
import { forwardRef } from "./~utils.js";

import type { RoleProps } from "@ariakit/react/role";

// ----------------------------------------------------------------------------

interface ListItemProps extends RoleProps<"div"> {}

/** @internal */
const ListItem = forwardRef<"div", ListItemProps>((props, forwardedRef) => {
	return (
		<Role.div
			role="listitem"
			{...props}
			className={cx("🥝-list-item", props.className)}
			ref={forwardedRef}
		/>
	);
});
DEV: ListItem.displayName = "ListItem.Root";

// ----------------------------------------------------------------------------

interface ListItemContentProps extends RoleProps<"div"> {}

/** @internal */
const ListItemContent = forwardRef<"div", ListItemContentProps>(
	(props, forwardedRef) => {
		return (
			<Text
				{...props}
				variant="body-sm"
				className={cx("🥝-list-item-content", props.className)}
				ref={forwardedRef}
			/>
		);
	},
);
DEV: ListItemContent.displayName = "ListItem.Content";

// ----------------------------------------------------------------------------

interface ListItemDecorationProps extends RoleProps<"div"> {}

/** @internal */
const ListItemDecoration = forwardRef<"div", ListItemDecorationProps>(
	(props, forwardedRef) => {
		return (
			<Role.div
				{...props}
				className={cx("🥝-list-item-decoration", props.className)}
				ref={forwardedRef}
			/>
		);
	},
);
DEV: ListItemDecoration.displayName = "ListItem.Decoration";

// ----------------------------------------------------------------------------

export {
	ListItem as Root,
	ListItemContent as Content,
	ListItemDecoration as Decoration,
};
