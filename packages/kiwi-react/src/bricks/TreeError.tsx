/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import cx from "classnames";
import { Role } from "@ariakit/react/role";
import { Button as ButtonAk } from "@ariakit/react/button";
import { forwardRef, type BaseProps } from "./~utils.js";
import { ChevronDown, Dismiss, StatusWarning } from "./Icon.js";
import { Text } from "./Text.js";
import { IconButton } from "./IconButton.js";
import { Anchor } from "./Anchor.js";
import { TreeContext } from "./Tree.internal.js";
import { Divider } from "./Divider.js";

// ----------------------------------------------------------------------------

interface TreeErrorProps extends BaseProps {
	/**
	 * Label for the tree header indicating the number of errors displayed.
	 */
	label?: React.ReactNode;
	/**
	 * Specifies if the tree error is expanded.
	 *
	 * @default false
	 */
	expanded?: boolean;
	/**
	 * Callback fired when the tree error is expanded.
	 *
	 * Should be used with the `expanded` prop.
	 */
	onExpandedChange?: (expanded: boolean) => void;
}

const TreeError = forwardRef<"div", TreeErrorProps>((props, forwardedRef) => {
	const { label, expanded = false, onExpandedChange, ...rest } = props;

	return (
		<Role.div
			data-kiwi-expanded={expanded}
			{...rest}
			className={cx("🥝-tree-error", props.className)}
			ref={forwardedRef}
		>
			<div className="🥝-tree-error-container">
				<div className="🥝-tree-error-header">
					<StatusWarning className="🥝-tree-error-icon" />
					<Text className="🥝-tree-error-label" variant="body-sm">
						{label}
					</Text>
					<IconButton
						label={expanded ? "Collapse" : "Expand"}
						icon={<ChevronDown />}
						variant="ghost"
						onClick={() => {
							onExpandedChange?.(!expanded);
						}}
					/>
				</div>
				{expanded && (
					<>
						<Divider className="🥝-tree-error-divider" presentational />
						<div className="🥝-tree-error-items">{props.children}</div>
					</>
				)}
			</div>
		</Role.div>
	);
});
DEV: TreeError.displayName = "Tree.Error";

// ----------------------------------------------------------------------------

interface TreeErrorItemProps extends BaseProps {
	/**
	 * The `id` of the associated `Tree.Item`.
	 */
	treeItemId?: string;
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
		const { treeItemId: itemId, message, actions, onDismiss, ...rest } = props;
		const { setErrorId } = React.useContext(TreeContext) ?? {};
		const errorId = React.useId();
		React.useEffect(() => {
			if (!itemId) return;
			setErrorId?.({ itemId, errorId });
			return () => {
				setErrorId?.({ itemId, errorId: undefined });
			};
		}, [itemId, errorId, setErrorId]);
		return (
			<Role.div
				{...rest}
				className={cx("🥝-tree-error-item", props.className)}
				ref={forwardedRef}
			>
				<Text
					id={errorId}
					variant="body-sm"
					className="🥝-tree-error-item-message"
				>
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

interface TreeErrorItemActionProps extends BaseProps<"button"> {}

/**
 * An action for `<Tree.ErrorItem>`, to be passed into the `actions` prop. The action is typically
 * displayed as an anchor button just below the error description.
 */
const TreeErrorItemAction = forwardRef<"button", TreeErrorItemActionProps>(
	(props, forwardedRef) => {
		return (
			<ButtonAk
				render={<Anchor render={<button />} />}
				{...props}
				className={cx("🥝-tree-error-item-action", props.className)}
				ref={forwardedRef}
			/>
		);
	},
);
DEV: TreeErrorItemAction.displayName = "Tree.ErrorItemAction";

// -------------------------------------------------------------------------

export {
	TreeError as Root,
	TreeErrorItem as Item,
	TreeErrorItemAction as ItemAction,
};
