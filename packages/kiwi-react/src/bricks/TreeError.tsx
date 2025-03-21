/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import cx from "classnames";
import {
	PopoverProvider,
	PopoverDisclosure,
	Popover,
} from "@ariakit/react/popover";
import { Role } from "@ariakit/react/role";
import { forwardRef, type BaseProps } from "./~utils.js";
import { ChevronDown, Dismiss, StatusWarning } from "./Icon.js";
import { Text } from "./Text.js";
import { IconButton } from "./IconButton.js";
import { Anchor } from "./Anchor.js";
import { Divider } from "./Divider.js";
import { Button } from "./Button.js";
import { useControlledState } from "./~hooks.js";

// ----------------------------------------------------------------------------

interface TreeErrorProps extends Omit<BaseProps, "children"> {
	/**
	 * Label for the error header indicating the number of errors displayed.
	 */
	label?: React.ReactNode;
	/**
	 * A list of error items where each item describes an individual error in a tree. Must be a list of `Tree.ErrorItem` components.
	 */
	items?: React.ReactNode[];
	/**
	 * The controlled expanded state of the error.
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
	const { label, items, expanded, onExpandedChange, ...rest } = props;
	const labelId = React.useId();

	const [open, setOpen] = useControlledState(
		false,
		expanded,
		onExpandedChange as React.Dispatch<React.SetStateAction<boolean>>,
	);
	return (
		<PopoverProvider open={open} setOpen={setOpen}>
			<Role.section
				data-kiwi-expanded={open}
				{...rest}
				className={cx("🥝-tree-error", props.className)}
				ref={forwardedRef}
				aria-labelledby={labelId}
			>
				<div className="🥝-tree-error-container">
					<PopoverDisclosure
						className="🥝-tree-error-header"
						render={<Button variant="ghost" />}
					>
						<StatusWarning className="🥝-tree-error-icon" />
						<Text
							id={labelId}
							className="🥝-tree-error-label"
							variant="body-sm"
						>
							{label}
						</Text>
						<IconButton
							inert
							render={<span />}
							label="Toggle"
							icon={<ChevronDown />}
							variant="ghost"
						/>
					</PopoverDisclosure>
					<Popover
						portal={false}
						modal={false}
						wrapperProps={{
							style: {
								position: undefined,
								width: undefined,
							},
						}}
						updatePosition={() => {}}
						aria-labelledby={labelId}
					>
						<Divider className="🥝-tree-error-divider" presentational />
						<div className="🥝-tree-error-items" role="list">
							{items}
						</div>
					</Popover>
				</div>
			</Role.section>
		</PopoverProvider>
	);
});
DEV: TreeError.displayName = "Tree.Error";

// ----------------------------------------------------------------------------

interface TreeErrorItemProps extends Omit<BaseProps, "children"> {
	/**
	 * The error message. Use `Anchor` component to link to the associated tree item.
	 */
	message?: React.ReactNode;
	/**
	 * The `id` of the message node.
	 */
	messageId?: string;
	/**
	 * The actions available for the tree item error. Must be a list of `Tree.ErrorItemAction` components.
	 */
	actions?: React.ReactNode[];
	/**
	 * Callback fired when the tree error item is dismissed.
	 */
	onDismiss?: () => void;
}

const TreeErrorItem = forwardRef<"div", TreeErrorItemProps>(
	(props, forwardedRef) => {
		const { message, messageId, actions, onDismiss, ...rest } = props;
		return (
			<Role.div
				{...rest}
				role="listitem"
				className={cx("🥝-tree-error-item", props.className)}
				ref={forwardedRef}
			>
				<Text
					id={messageId}
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

// -------------------------------------------------------------------------

interface TreeErrorItemActionProps extends BaseProps<"button"> {}

/**
 * An action for the `<Tree.ErrorItem>` component, to be passed into the `actions` prop.
 * The action is typically displayed as an anchor button just below the error message.
 */
const TreeErrorItemAction = forwardRef<"button", TreeErrorItemActionProps>(
	(props, forwardedRef) => {
		return <Anchor render={<button {...props} />} ref={forwardedRef} />;
	},
);
DEV: TreeErrorItemAction.displayName = "Tree.ErrorItemAction";

// -------------------------------------------------------------------------

export {
	TreeError as Root,
	TreeErrorItem as Item,
	TreeErrorItemAction as ItemAction,
};
