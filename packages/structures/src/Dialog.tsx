/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as AkDialog from "@ariakit/react/dialog";
import { IconButton, Text } from "@stratakit/bricks";
import { forwardRef } from "@stratakit/foundations/secret-internals";
import cx from "classnames";
import { Dismiss } from "./~utils.icons.js";

import type { BaseProps } from "@stratakit/foundations/secret-internals";

// ----------------------------------------------------------------------------

interface DialogProps
	extends BaseProps,
		Pick<AkDialog.DialogProps, "open" | "onClose"> {
	primaryContent: React.ReactNode;
	secondaryContent?: React.ReactNode;
	actions?: React.ReactNode;
}

const DialogRoot = forwardRef<"div", DialogProps>((props, forwardedRef) => {
	const { actions, primaryContent, secondaryContent, onClose, ...rest } = props;
	return (
		<AkDialog.Dialog
			{...rest}
			onClose={onClose}
			className={cx("🥝-dialog", props.className)}
			ref={forwardedRef}
		>
			{props.children}
			{primaryContent && (
				<Text variant="body-sm" className="🥝-dialog-primary">
					{primaryContent}
				</Text>
			)}
			{secondaryContent && (
				<Text variant="body-sm" className="🥝-dialog-secondary">
					{secondaryContent}
				</Text>
			)}
			{actions && <div className="🥝-dialog-footer">{actions}</div>}
		</AkDialog.Dialog>
	);
});
DEV: DialogRoot.displayName = "Dialog.Root";

// -------------------------------------------------------------------------

interface DialogHeadingProps extends BaseProps<"h1"> {}

const DialogHeading = forwardRef<"h1", DialogHeadingProps>(
	(props, forwardedRef) => {
		return (
			<AkDialog.DialogHeading
				{...props}
				render={<Text variant="body-lg" render={props.render ?? <h1 />} />}
				className={cx("🥝-dialog-heading", props.className)}
				ref={forwardedRef}
			>
				{props.children}
			</AkDialog.DialogHeading>
		);
	},
);
DEV: DialogHeading.displayName = "Dialog.Heading";

// -------------------------------------------------------------------------

interface DialogDismissButtonProps extends BaseProps<"button"> {}

const DialogDismissButton = forwardRef<"button", DialogDismissButtonProps>(
	(props, forwardedRef) => {
		return (
			<AkDialog.DialogDismiss
				{...props}
				render={
					<IconButton
						render={props.render}
						variant="ghost"
						label="Close"
						icon={<Dismiss />}
					/>
				}
				className="🥝-dialog-close"
				ref={forwardedRef}
			/>
		);
	},
);
DEV: DialogDismissButton.displayName = "Dialog.DismissButton";

// -------------------------------------------------------------------------

export {
	DialogRoot as Root,
	DialogHeading as Heading,
	DialogDismissButton as DismissButton,
};
