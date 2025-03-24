/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import cx from "classnames";
import {
	DialogProvider,
	DialogDisclosure,
	Dialog,
} from "@ariakit/react/dialog";
import { Role } from "@ariakit/react/role";
import { forwardRef, type BaseProps } from "./~utils.js";
import { ChevronDown, Dismiss, StatusWarning } from "./Icon.js";
import { Text } from "./Text.js";
import { IconButton } from "./IconButton.js";
import { Divider } from "./Divider.js";
import { Button } from "./Button.js";
import { useControlledState } from "./~hooks.js";
import { VisuallyHidden } from "./VisuallyHidden.js";

// ----------------------------------------------------------------------------

interface ErrorRegionRootProps extends Omit<BaseProps, "children"> {
	/**
	 * Label for the error header indicating the number of errors displayed.
	 */
	label?: React.ReactNode;
	/**
	 * A list of error items where each item describes an individual error. Must be a list of `ErrorRegion.Item` components.
	 */
	items?: React.ReactNode[];
	/**
	 * The controlled expanded state of the error.
	 */
	expanded?: boolean;
	/**
	 * Callback fired when the error is expanded.
	 *
	 * Should be used with the `expanded` prop.
	 */
	onExpandedChange?: (expanded: boolean) => void;
}

const ErrorRegionRoot = forwardRef<"div", ErrorRegionRootProps>(
	(props, forwardedRef) => {
		const { label, items, expanded, onExpandedChange, ...rest } = props;
		const labelId = React.useId();

		const [open, setOpen] = useControlledState(
			false,
			expanded,
			onExpandedChange as React.Dispatch<React.SetStateAction<boolean>>,
		);
		return (
			<>
				<VisuallyHidden aria-live="polite" aria-atomic={true}>
					{label}
				</VisuallyHidden>
				{label && (
					<DialogProvider open={open} setOpen={setOpen}>
						<Role.section
							data-kiwi-expanded={open}
							{...rest}
							className={cx("🥝-error-region", props.className)}
							ref={forwardedRef}
							aria-labelledby={labelId}
						>
							<div className="🥝-error-region-container">
								<DialogDisclosure
									className="🥝-error-region-header"
									render={<Button variant="ghost" />}
								>
									<StatusWarning className="🥝-error-region-icon" />
									<Text
										id={labelId}
										className="🥝-error-region-label"
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
								</DialogDisclosure>
								<Dialog portal={false} modal={false} aria-labelledby={labelId}>
									<Divider className="🥝-error-region-divider" presentational />
									<div className="🥝-error-region-items" role="list">
										{items}
									</div>
								</Dialog>
							</div>
						</Role.section>
					</DialogProvider>
				)}
			</>
		);
	},
);
DEV: ErrorRegionRoot.displayName = "ErrorRegion.Root";

// ----------------------------------------------------------------------------

interface ErrorRegionItemProps extends Omit<BaseProps, "children"> {
	/**
	 * The error message. Consumers might consider using `Anchor` component to link to the associated element in the UI.
	 */
	message?: React.ReactNode;
	/**
	 * The `id` of the message node.
	 */
	messageId?: string;
	/**
	 * The actions available for this item. Must be a list of anchors, each rendered as a button using `<Anchor render={<button />} />`.
	 */
	actions?: React.ReactNode[];
	/**
	 * Callback fired when the error item is dismissed.
	 */
	onDismiss?: () => void;
}

const ErrorRegionItem = forwardRef<"div", ErrorRegionItemProps>(
	(props, forwardedRef) => {
		const { message, messageId, actions, onDismiss, ...rest } = props;
		return (
			<Role.div
				{...rest}
				role="listitem"
				className={cx("🥝-error-region-item", props.className)}
				ref={forwardedRef}
			>
				<Text
					id={messageId}
					variant="body-sm"
					className="🥝-error-region-item-message"
				>
					{message}
				</Text>
				{onDismiss && (
					<IconButton
						className="🥝-error-region-item-dismiss"
						variant="ghost"
						label="Dismiss"
						icon={<Dismiss />}
						onClick={onDismiss}
					/>
				)}
				<div className="🥝-error-region-item-actions">{actions}</div>
			</Role.div>
		);
	},
);
DEV: ErrorRegionItem.displayName = "ErrorRegion.Item";

// -------------------------------------------------------------------------

export { ErrorRegionRoot as Root, ErrorRegionItem as Item };
