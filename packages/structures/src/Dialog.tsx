/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as AkDialog from "@ariakit/react/dialog";
import { Role } from "@ariakit/react/role";
import { Button, IconButton, Text } from "@stratakit/bricks";
import { forwardRef } from "@stratakit/foundations/secret-internals";
import cx from "classnames";
import { Dismiss } from "./~utils.icons.js";

import type {
	BaseProps,
	FocusableProps,
} from "@stratakit/foundations/secret-internals";

// ----------------------------------------------------------------------------

interface DialogProviderProps
	extends BaseProps,
		Pick<AkDialog.DialogProviderProps, "children" | "open" | "setOpen"> {}

/**
 * Provider for `Dialog` components. Must include a `Dialog.Root` as a direct
 * descendant. Additionally, `Dialog.Disclosure` can be used as a direct descendant to trigger the dialog to open.
 *
 * Example:
 * ```tsx
 * <Dialog.Provider>
 *   <Dialog.Disclosure>Open</Dialog.Disclosure>
 *
 *   <Dialog.Root>
 *     <Dialog.Heading>Heading</Dialog.Heading>
 *     <Dialog.Content>Content</Dialog.Content>
 *   </Dialog.Root>
 * </Dialog.Provider>
 * ```
 */
function DialogProvider(props: DialogProviderProps) {
	return (
		<AkDialog.DialogProvider {...props}>
			{props.children}
		</AkDialog.DialogProvider>
	);
}
DEV: DialogProvider.displayName = "Dialog.Provider";

// ----------------------------------------------------------------------------

interface DialogDisclosureProps extends FocusableProps<"button"> {}

/**
 * The button that triggers the dialog to open. Should be used as a child of `Dialog.Provider`.
 *
 * Example:
 * ```tsx
 * <Dialog.Disclosure>Open</Dialog.Disclosure>
 * ```
 *
 * By default it will render a solid `Button`. This can be customized by passing a `render` prop.
 *
 * ```tsx
 * <Dialog.Disclosure
 *   render={<IconButton label="Open" icon={<Icon href={…} />}  />}
 * />
 * ```
 */
const DialogDisclosure = forwardRef<"button", DialogDisclosureProps>(
	(props, forwardedRef) => {
		return (
			<AkDialog.DialogDisclosure
				{...props}
				render={props.render ?? <Button />}
				ref={forwardedRef}
			>
				{props.children}
			</AkDialog.DialogDisclosure>
		);
	},
);
DEV: DialogDisclosure.displayName = "Dialog.Disclosure";

// ----------------------------------------------------------------------------

interface DialogRootProps
	extends BaseProps,
		Pick<AkDialog.DialogProps, "modal" | "backdrop" | "unmountOnHide"> {}

/**
 * A dialog component used to display content in a window overlay. Should be used as a child of `Dialog.Provider`.
 *
 * Example:
 * ```tsx
 * <Dialog.Root>
 *   <Dialog.Heading>Heading</Dialog.Heading>
 *   <Dialog.Content>Content</Dialog.Content>
 * </Dialog.Root>
 * ```
 */
const DialogRoot = forwardRef<"div", DialogRootProps>((props, forwardedRef) => {
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

/**
 * The heading of a dialog. Should be used as a child of `Dialog.Root`.
 *
 * Example:
 * ```tsx
 * <Dialog.Heading>Heading</Dialog.Heading>
 * ```
 */
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

interface DialogCloseButtonProps
	extends Omit<FocusableProps<"button">, "children"> {
	/**
	 * Label for the close button.
	 *
	 * @default "Dismiss"
	 */
	label?: string;
}

/**
 * A button that closes the dialog. Displayed as an icon button in the top-right corner of the dialog.
 * Should be used as a child of `Dialog.Root`.
 *
 * Example:
 * ```tsx
 * <Dialog.CloseButton />
 * ```
 */
const DialogCloseButton = forwardRef<"button", DialogCloseButtonProps>(
	(props, forwardedRef) => {
		const { label = "Dismiss", ...rest } = props;
		return (
			<AkDialog.DialogDismiss
				{...rest}
				render={
					<IconButton
						render={props.render}
						className={cx("🥝-dialog-close", props.className)}
						variant="ghost"
						label={label}
						icon={<Dismiss />}
					/>
				}
				ref={forwardedRef}
			/>
		);
	},
);
DEV: DialogCloseButton.displayName = "Dialog.CloseButton";

// -------------------------------------------------------------------------

interface DialogDismissButtonProps extends FocusableProps<"button"> {}

/**
 * An action button that hides a dialog when clicked. Should be used as a child of `Dialog.Actions`.
 *
 * Example:
 * ```tsx
 * <Dialog.DismissButton>Cancel</Dialog.DismissButton>
 * ```
 *
 * By default it will render a solid `Button`. This can be customized by passing a `render` prop.
 *
 * ```tsx
 * <Dialog.DismissButton render={<Button tone="accent" />}>
 *   Ok
 * </Dialog.DismissButton>
 */
const DialogDismissButton = forwardRef<"button", DialogDismissButtonProps>(
	(props, forwardedRef) => {
		return (
			<AkDialog.DialogDismiss
				{...props}
				render={props.render ?? <Button />}
				ref={forwardedRef}
			/>
		);
	},
);
DEV: DialogDismissButton.displayName = "Dialog.DismissButton";

// -------------------------------------------------------------------------

interface DialogContentProps extends BaseProps {}

/**
 * The content of a dialog. Should be used as a child of `Dialog.Root`.
 *
 * Example:
 * ```tsx
 * <Dialog.Content>Content</Dialog.Content>
 * ```
 */
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

/**
 * A container for action buttons in a dialog. Should be used as a child of `Dialog.Root`.
 *
 * Example:
 * ```tsx
 * <Dialog.Actions>
 *   <Dialog.DismissButton>Cancel</Dialog.DismissButton>
 *   <Dialog.DismissButton render={<Button tone="accent" />}>Ok</Dialog.DismissButton>
 * </Dialog.Actions>
 * ```
 */
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

/**
 * The backdrop of a dialog. Should be passed into the `backdrop` prop of `Dialog.Root`.
 *
 * Example:
 * ```tsx
 * <Dialog.Root backdrop={<Dialog.Backdrop />} />
 * ```
 */
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

interface DialogDescriptionProps extends BaseProps<"p"> {}

/**
 * The description of a dialog. Should be used as a child of `Dialog.Content`.
 *
 * Example:
 * ```tsx
 * <Dialog.Description>Content</Dialog.Description>
 * ```
 *
 * Alternatively, should be passed passed into the `render` prop of `Dialog.Content` if the dialog content contains only description.
 *
 * ```tsx
 * <Dialog.Content render={<Dialog.Description />}>Content</Dialog.Content>
 * ```
 */
const DialogDescription = forwardRef<"p", DialogDescriptionProps>(
	(props, forwardedRef) => {
		return (
			<AkDialog.DialogDescription {...props} ref={forwardedRef}>
				{props.children}
			</AkDialog.DialogDescription>
		);
	},
);
DEV: DialogDescription.displayName = "Dialog.Description";

// -------------------------------------------------------------------------

export {
	DialogProvider as Provider,
	DialogDisclosure as Disclosure,
	DialogRoot as Root,
	DialogHeading as Heading,
	DialogCloseButton as CloseButton,
	DialogContent as Content,
	DialogActions as Actions,
	DialogDismissButton as DismissButton,
	DialogBackdrop as Backdrop,
	DialogDescription as Description,
};
