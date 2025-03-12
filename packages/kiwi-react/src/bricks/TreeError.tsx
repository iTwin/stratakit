/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from "classnames";
import { Role } from "@ariakit/react/role";
import { forwardRef, type BaseProps } from "./~utils.js";
import { Dismiss, StatusWarning } from "./Icon.js";
import { Text } from "./Text.js";
import { IconButton } from "./IconButton.js";

// ----------------------------------------------------------------------------

interface TreeErrorProps extends BaseProps {
	/**
	 * Label for the tree header indicating the number of errors displayed.
	 */
	label?: React.ReactNode;
}

const TreeError = forwardRef<"div", TreeErrorProps>((props, forwardedRef) => {
	const { label, ...rest } = props;
	return (
		<Role.div
			{...rest}
			className={cx("🥝-tree-error", props.className)}
			ref={forwardedRef}
		>
			<div className="🥝-tree-error-header">
				<StatusWarning />
				<Text variant="body-sm">{label}</Text>
			</div>
			<div className="🥝-tree-error-items">{props.children}</div>
		</Role.div>
	);
});
DEV: TreeError.displayName = "Tree.Error";

// ----------------------------------------------------------------------------

interface TreeErrorItemProps extends BaseProps {
	/**
	 * The primary error message.
	 */
	message?: React.ReactNode;
	/**
	 * The actions available for the tree item error. Must be a list of `Tree.ErrorAction` components.
	 */
	actions?: React.ReactNode[];
	/**
	 * Callback fired when the tree error item is dismissed.
	 */
	onDismiss?: () => void;
}

const TreeErrorItem = forwardRef<"div", TreeErrorItemProps>(
	(props, forwardedRef) => {
		const { message, actions, onDismiss, ...rest } = props;
		return (
			<Role.div
				{...rest}
				className={cx("🥝-tree-error-item", props.className)}
				ref={forwardedRef}
			>
				<Text variant="body-sm" className="🥝-tree-error-item-message">
					{message}
				</Text>
				{onDismiss && (
					<IconButton
						className="🥝-tree-error-item-dismiss"
						variant="ghost"
						label="Dismiss"
						icon={<Dismiss />}
						onClick={onDismiss}
					/>
				)}
				<div className="🥝-tree-error-item-actions">{actions}</div>
			</Role.div>
		);
	},
);
DEV: TreeErrorItem.displayName = "Tree.ErrorItem";

// ----------------------------------------------------------------------------

export { TreeError as Root, TreeErrorItem as Item };
