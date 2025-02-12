/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from "classnames";
import * as Ariakit from "@ariakit/react";
import { forwardRef } from "./~utils.js";
import { Icon } from "./Icon.js";

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

interface ListItemContentProps extends Ariakit.RoleProps<"span"> {
	/** Use `ListItem.Icon`. */
	icon?: React.ReactNode;
	/** Use `ListItem.Description` and `ListItem.Label` for `children` prop. */
	description?: React.ReactNode;
}

/** @internal */
const ListItemContent = forwardRef<"span", ListItemContentProps>(
	(props, forwardedRef) => {
		const { icon, description, children, ...rest } = props;
		return (
			<Ariakit.Role.span
				{...rest}
				data-kiwi-icon={icon ? true : undefined}
				data-kiwi-description={description ? true : undefined}
				className={cx("🥝-list-item-content", props.className)}
				ref={forwardedRef}
			>
				{icon}
				{children}
				{description}
			</Ariakit.Role.span>
		);
	},
);
DEV: ListItemContent.displayName = "ListItem.Content";

// ----------------------------------------------------------------------------

type IconProps = React.ComponentProps<typeof Icon>;

interface ListItemIconProps extends IconProps {}

/** @internal */
const ListItemIcon = forwardRef<"svg", ListItemIconProps>(
	(props, forwardedRef) => {
		return (
			<Icon
				{...props}
				className={cx("🥝-list-item-icon", props.className)}
				ref={forwardedRef}
			/>
		);
	},
);
DEV: ListItemContent.displayName = "ListItem.Icon";

// ----------------------------------------------------------------------------

interface ListItemLabelProps extends Ariakit.RoleProps<"span"> {}

/** @internal */
const ListItemLabel = forwardRef<"span", ListItemLabelProps>(
	(props, forwardedRef) => {
		return (
			<Ariakit.Role.span
				{...props}
				className={cx("🥝-list-item-label", props.className)}
				ref={forwardedRef}
			/>
		);
	},
);
DEV: ListItemContent.displayName = "ListItem.Label";

// ----------------------------------------------------------------------------

interface ListItemDescriptionProps extends Ariakit.RoleProps<"span"> {}

/** @internal */
const ListItemDescription = forwardRef<"span", ListItemDescriptionProps>(
	(props, forwardedRef) => {
		return (
			<Ariakit.Role.span
				{...props}
				className={cx("🥝-list-item-description", props.className)}
				ref={forwardedRef}
			/>
		);
	},
);
DEV: ListItemContent.displayName = "ListItem.Description";

// ----------------------------------------------------------------------------

export {
	ListItem as Root,
	ListItemContent as Content,
	ListItemLabel as Label,
	ListItemDescription as Description,
	ListItemIcon as Icon,
};
