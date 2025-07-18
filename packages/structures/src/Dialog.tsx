/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as AkDialog from "@ariakit/react/dialog";
import { Role } from "@ariakit/react/role";
import { IconButton, Text } from "@stratakit/bricks";
import { forwardRef } from "@stratakit/foundations/secret-internals";
import cx from "classnames";
import { Dismiss } from "./~utils.icons.js";

import type { BaseProps } from "@stratakit/foundations/secret-internals";

// ----------------------------------------------------------------------------

interface DialogProps
	extends BaseProps,
		Pick<AkDialog.DialogProps, "open" | "onClose" | "modal" | "backdrop"> {}

const DialogRoot = forwardRef<"div", DialogProps>((props, forwardedRef) => {
	const { backdrop, ...rest } = props;
	return (
		<AkDialog.Dialog
			{...rest}
			backdrop={backdrop === true ? DialogBackdrop : backdrop}
			className={cx("🥝-dialog", props.className)}
			ref={forwardedRef}
		>
			{props.children}
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

interface DialogDismissButtonProps extends BaseProps<"button"> {
	/**
	 * Label for the dismiss button.
	 *
	 * @default "Dismiss"
	 */
	label?: string;
}

const DialogDismissButton = forwardRef<"button", DialogDismissButtonProps>(
	(props, forwardedRef) => {
		const { label = "Dismiss", ...rest } = props;
		return (
			<AkDialog.DialogDismiss
				{...rest}
				render={
					<IconButton
						render={props.render}
						variant="ghost"
						label={label}
						icon={<Dismiss />}
					/>
				}
				className={cx("🥝-dialog-dismiss", props.className)}
				ref={forwardedRef}
			/>
		);
	},
);
DEV: DialogDismissButton.displayName = "Dialog.DismissButton";

// -------------------------------------------------------------------------

interface DialogContentProps extends BaseProps {}

const DialogContent = forwardRef<"div", DialogContentProps>(
	(props, forwardedRef) => {
		return (
			<Text
				variant="body-sm"
				{...props}
				className={cx("🥝-dialog-content", props.className)}
				ref={forwardedRef}
			>
				{props.children}
			</Text>
		);
	},
);
DEV: DialogContent.displayName = "Dialog.Content";

// -------------------------------------------------------------------------

interface DialogActionsProps extends BaseProps {}

const DialogActions = forwardRef<"div", DialogActionsProps>(
	(props, forwardedRef) => {
		return (
			<Role
				{...props}
				className={cx("🥝-dialog-actions", props.className)}
				ref={forwardedRef}
			>
				{props.children}
			</Role>
		);
	},
);
DEV: DialogActions.displayName = "Dialog.Actions";

// -------------------------------------------------------------------------

interface DialogBackdropProps extends BaseProps {}

const DialogBackdrop = forwardRef<"div", DialogBackdropProps>(
	(props, forwardedRef) => {
		return (
			<Role
				{...props}
				className={cx("🥝-dialog-backdrop", props.className)}
				ref={forwardedRef}
			>
				{props.children}
			</Role>
		);
	},
);
DEV: DialogBackdrop.displayName = "Dialog.Backdrop";

// -------------------------------------------------------------------------

export {
	DialogRoot as Root,
	DialogHeading as Heading,
	DialogDismissButton as DismissButton,
	DialogContent as Content,
	DialogActions as Actions,
	DialogBackdrop as Backdrop,
};
