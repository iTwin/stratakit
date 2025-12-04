/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Role } from "@ariakit/react/role";
import { Text } from "@stratakit/bricks";
import { forwardRef } from "@stratakit/foundations/secret-internals";
import cx from "classnames";
import { useInit } from "./~utils.useInit.js";

import type { RoleProps } from "@ariakit/react/role";

// ----------------------------------------------------------------------------

interface ListItemProps extends RoleProps<"div"> {}

/** @private */
const ListItem = forwardRef<"div", ListItemProps>((props, forwardedRef) => {
	useInit();

	return (
		<Role.div
			role="listitem"
			{...props}
			className={cx("🥝ListItem", props.className)}
			ref={forwardedRef}
		/>
	);
});
DEV: ListItem.displayName = "ListItemRoot";

// ----------------------------------------------------------------------------

interface ListItemContentProps extends RoleProps<"div"> {}

/** @private */
const ListItemContent = forwardRef<"div", ListItemContentProps>(
	(props, forwardedRef) => {
		return (
			<Text
				{...props}
				variant="body-sm"
				className={cx("🥝ListItemContent", props.className)}
				ref={forwardedRef}
			/>
		);
	},
);
DEV: ListItemContent.displayName = "ListItemContent";

// ----------------------------------------------------------------------------

interface ListItemDecorationProps extends RoleProps<"div"> {}

/** @private */
const ListItemDecoration = forwardRef<"div", ListItemDecorationProps>(
	(props, forwardedRef) => {
		return (
			<Role.div
				{...props}
				className={cx("🥝ListItemDecoration", props.className)}
				ref={forwardedRef}
			/>
		);
	},
);
DEV: ListItemDecoration.displayName = "ListItemDecoration";

// ----------------------------------------------------------------------------

export {
	ListItem as Root,
	ListItemContent as Content,
	ListItemDecoration as Decoration,
};
