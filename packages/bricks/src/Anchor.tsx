/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Focusable } from "@ariakit/react/focusable";
import { Role } from "@ariakit/react/role";
import { Icon } from "@stratakit/foundations";
import { forwardRef } from "@stratakit/foundations/secret-internals";
import cx from "classnames";
import * as React from "react";

import type {
	BaseProps,
	FocusableProps,
} from "@stratakit/foundations/secret-internals";

interface AnchorComponentProps extends FocusableProps<"a"> {
	/** @default "neutral" */
	tone?: "neutral" | "accent" | "critical";
}

/**
 * A styled anchor element, typically used for navigating to a different location.
 *
 * Example:
 * ```tsx
 * <Anchor href="https://www.example.com">Example</Anchor>
 * ```
 *
 * Supports a `tone` prop to change the tone (color) of the anchor.
 */
const AnchorComponent = forwardRef<"a", AnchorComponentProps>(
	(props, forwardedRef) => {
		const { tone = "neutral", ...rest } = props;

		return (
			<Role.a
				{...rest}
				data-kiwi-tone={tone}
				className={cx("🥝-anchor", props.className)}
				render={
					<Focusable accessibleWhenDisabled render={props.render || <a />} />
				}
				ref={forwardedRef}
			>
				{props.children}
			</Role.a>
		);
	},
);
DEV: AnchorComponent.displayName = "Anchor";

interface AnchorIconProps extends BaseProps<"svg"> {
	/**
	 * Alternative text describing the icon.
	 */
	alt?: string;

	/**
	 * Icon to be displayed.
	 */
	icon?: string | React.JSX.Element | undefined;
}

export const AnchorIcon = forwardRef<"svg", AnchorIconProps>(
	(props, forwardedRef) => {
		const { alt, icon, ...rest } = props;

		return icon ? (
			<Role
				className="🥝-anchor-icon"
				// id={decorationId} // TODO: What id to give? Do we even need it?
				render={
					React.isValidElement(icon) ? (
						icon
					) : typeof icon === "string" ? (
						<Icon href={icon} ref={forwardedRef} {...rest} />
					) : undefined
				}
				// TODO: Should we deconstruct rest here? Maybe no since the types don't work?
			/>
		) : null;

		// <Icon
		// 	alt={alt}
		// 	render={icon}
		// 	{...rest}
		// 	className={cx("🥝-anchor-icon", props.className)}
		// 	ref={forwardedRef}
		// />
		// );
	},
);
DEV: AnchorIcon.displayName = "Anchor.Icon";

// /**
//  * Displays an icon or multiple decorations of a `<Tree.Item>`.
//  * @private
//  */
// function TreeItemDecoration() {
// 	const decorationId = React.useContext(TreeItemDecorationIdContext);
// 	const decorations = React.useContext(TreeItemDecorationsContext);
// 	const icon = React.useContext(TreeItemIconContext);
// 	return icon || decorations ? (
// 		<Role
// 			className="🥝-tree-item-decoration"
// 			id={decorationId}
// 			render={
// 				React.isValidElement(icon) ? (
// 					icon
// 				) : typeof icon === "string" ? (
// 					<Icon href={icon} />
// 				) : undefined
// 			}
// 		>
// 			{!icon ? decorations : null}
// 		</Role>
// 	) : null;
// }
// DEV: TreeItemDecoration.displayName = "TreeItemDecoration";

export const Anchor = Object.assign(AnchorComponent, {
	Root: AnchorComponent,
	/**
	 * Icon component for external links.
	 */
	Icon: AnchorIcon,
});
