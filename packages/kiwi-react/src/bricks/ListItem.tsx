/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from "classnames";
import * as Ariakit from "@ariakit/react";
import { forwardRef } from "./~utils.js";

// ----------------------------------------------------------------------------

interface ListItemProps extends Ariakit.RoleProps<"div"> {}

/** @internal */
const ListItem = forwardRef<"div", ListItemProps>((props, forwardedRef) => {
	return (
		<Ariakit.Role.div
			role="listitem"
			{...props}
			className={cx("🥝-list-item", props.className)}
			ref={forwardedRef}
		/>
	);
});
DEV: ListItem.displayName = "ListItem.Root";

// ----------------------------------------------------------------------------

interface ListItemContentProps extends Ariakit.RoleProps<"span"> {}

/** @internal */
const ListItemContent = forwardRef<"span", ListItemContentProps>(
	(props, forwardedRef) => {
		return (
			<Ariakit.Role.span
				{...props}
				className={cx("🥝-list-item-content", props.className)}
				ref={forwardedRef}
			/>
		);
	},
);
DEV: ListItemContent.displayName = "ListItem.Content";

// ----------------------------------------------------------------------------

interface ListItemDecorationProps extends Ariakit.RoleProps<"span"> {
	placement: "before" | "after";
}

/** @internal */
const ListItemDecoration = forwardRef<"span", ListItemDecorationProps>(
	(props, forwardedRef) => {
		const { placement, ...rest } = props;
		return (
			<Ariakit.Role.span
				{...rest}
				className={cx("🥝-list-item-decoration", props.className)}
				data-kiwi-placement={placement}
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
