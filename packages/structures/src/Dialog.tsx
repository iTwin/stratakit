/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import * as AkDialog from "@ariakit/react/dialog";
import { Portal, PortalContext } from "@ariakit/react/portal";
import { Role } from "@ariakit/react/role";
import { useStoreState } from "@ariakit/react/store";
import { Button, IconButton, Text } from "@stratakit/bricks";
import { GhostAligner } from "@stratakit/bricks/secret-internals";
import {
	forwardRef,
	usePopoverApi,
} from "@stratakit/foundations/secret-internals";
import cx from "classnames";
import { Dismiss } from "./~utils.icons.js";

import type {
	BaseProps,
	FocusableProps,
} from "@stratakit/foundations/secret-internals";

// ----------------------------------------------------------------------------

interface DialogRootProps
	extends BaseProps,
		Pick<
			AkDialog.DialogProps,
			| "open"
			| "onClose"
			| "backdrop"
			| "unmountOnHide"
			| "hideOnEscape"
			| "hideOnInteractOutside"
		> {
	/**
	 * When set to `true`, the content element will be unmounted and removed from
	 * the DOM when it's hidden.
	 *
	 * @default true
	 */
	unmountOnHide?: boolean;
}

/**
 * A modal dialog component used to display content in a window overlay. Must include `Dialog.Header` and `Dialog.Content` as direct
 * descendants. Additionally, `Dialog.Footer` can be optionally used as a direct descendant.
 *
 * Example:
 * ```tsx
 * const [open, setOpen] = useState(false);
 *
 * <Dialog.Root open={open} onClose={() => setOpen(false)}>
 *   <Dialog.Heading>Heading</Dialog.Heading>
 *   <Dialog.Content>Content</Dialog.Content>
 *   <Dialog.Footer>
 *     <Dialog.Action>Ok</Dialog.Action>
 *   </Dialog.Footer>
 * </Dialog.Root>
 * ```
 */
const DialogRoot = forwardRef<"div", DialogRootProps>((props, forwardedRef) => {
	const { backdrop = true, unmountOnHide = true, ...rest } = props;

	const store = AkDialog.useDialogStore();
	const contentElement = useStoreState(store, "contentElement");

	const mounted = useStoreState(store, (state) => {
		if (!unmountOnHide) return true;
		return props.open ?? state?.mounted;
	});

	if (!mounted) return null;
	return (
		<AkDialog.DialogProvider store={store}>
			<DialogWrapper>
				<AkDialog.Dialog
					unmountOnHide={unmountOnHide}
					portal={false} // Portaling will be done by DialogWrapper
					{...rest}
					backdrop={backdrop === true ? <DialogBackdrop /> : backdrop}
					className={cx("🥝-dialog", props.className)}
					ref={forwardedRef}
				>
					<PortalContext.Provider value={contentElement}>
						{props.children}
					</PortalContext.Provider>
				</AkDialog.Dialog>
			</DialogWrapper>
		</AkDialog.DialogProvider>
	);
});
DEV: DialogRoot.displayName = "Dialog.Root";

// -------------------------------------------------------------------------

function DialogWrapper(props: React.PropsWithChildren) {
	const [wrapper, setWrapper] = React.useState<HTMLElement | null>(null);

	const store = AkDialog.useDialogContext();
	const open = useStoreState(store, "open");
	const popoverProps = usePopoverApi({
		element: wrapper,
		open,
	});

	const mounted = useStoreState(store, "mounted");
	return (
		<Portal
			className="🥝-dialog-wrapper"
			ref={setWrapper}
			{...popoverProps}
			hidden={mounted ? undefined : true}
		>
			{props.children}
		</Portal>
	);
}
DEV: DialogWrapper.displayName = "DialogWrapper";

// -------------------------------------------------------------------------

interface DialogHeaderProps extends BaseProps {}

/**
 * The header of a dialog. Should be used as a child of `Dialog.Root`. Must include `Dialog.Heading` as a direct
 * descendant. Additionally, `Dialog.CloseButton` can be optionally used as a direct descendant.
 *
 * Example:
 * ```tsx
 * <Dialog.Header>
 *   <Dialog.Heading>Heading</Dialog.Heading>
 *   <Dialog.CloseButton />
 * </Dialog.Header>
 * ```
 *
 * Use `render` prop when only a heading is displayed in a header.
 *
 * ```tsx
 * <Dialog.Header render={<Dialog.Heading />}>Heading</Dialog.Header>
 * ```
 *
 */
const DialogHeader = forwardRef<"div", DialogHeaderProps>(
	(props, forwardedRef) => {
		return (
			<Role
				{...props}
				className={cx("🥝-dialog-header", props.className)}
				ref={forwardedRef}
			/>
		);
	},
);
DEV: DialogHeader.displayName = "Dialog.Header";

// -------------------------------------------------------------------------

interface DialogHeadingProps extends BaseProps<"h1"> {}

/**
 * The heading of a dialog. Should be used as a child of `Dialog.DialogHeader`.
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
				className={cx("🥝-dialog-heading", props.className)}
				render={<Text variant="body-lg" render={props.render ?? <h1 />} />}
				ref={forwardedRef}
			/>
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
 * Should be used as a child of `Dialog.DialogHeader`.
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
			<GhostAligner align="inline">
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
					ref={forwardedRef}
				/>
			</GhostAligner>
		);
	},
);
DEV: DialogCloseButton.displayName = "Dialog.CloseButton";

// -------------------------------------------------------------------------

interface DialogActionProps extends FocusableProps<"button"> {}

/**
 * An action button that hides a dialog when clicked. Should be used as a child of `Dialog.Footer`.
 *
 * Example:
 * ```tsx
 * <Dialog.Action>Cancel</Dialog.Action>
 * ```
 *
 * By default it will render a solid `Button`. This can be customized by passing a `render` prop.
 *
 * ```tsx
 * <Dialog.Action render={<Button tone="accent" />}>
 *   Ok
 * </Dialog.Action>
 */
const DialogAction = forwardRef<"button", DialogActionProps>(
	(props, forwardedRef) => {
		return (
			<AkDialog.DialogDismiss
				{...props}
				className={cx("🥝-dialog-action", props.className)}
				render={props.render ?? <Button />}
				ref={forwardedRef}
			/>
		);
	},
);
DEV: DialogAction.displayName = "Dialog.Action";

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
			/>
		);
	},
);
DEV: DialogContent.displayName = "Dialog.Content";

// -------------------------------------------------------------------------

interface DialogFooterProps extends BaseProps {}

/**
 * A container for action buttons in a dialog. Should be used as a child of `Dialog.Root`.
 *
 * Example:
 * ```tsx
 * <Dialog.Footer>
 *   <Dialog.Action>Cancel</Dialog.Action>
 *   <Dialog.Action render={<Button tone="accent" />}>Ok</Dialog.Action>
 * </Dialog.Footer>
 * ```
 */
const DialogFooter = forwardRef<"div", DialogFooterProps>(
	(props, forwardedRef) => {
		return (
			<Role
				{...props}
				className={cx("🥝-dialog-footer", props.className)}
				ref={forwardedRef}
			/>
		);
	},
);
DEV: DialogFooter.displayName = "Dialog.Footer";

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
			/>
		);
	},
);
DEV: DialogBackdrop.displayName = "Dialog.Backdrop";

// -------------------------------------------------------------------------

export {
	DialogRoot as Root,
	DialogHeader as Header,
	DialogHeading as Heading,
	DialogCloseButton as CloseButton,
	DialogContent as Content,
	DialogFooter as Footer,
	DialogAction as Action,
	DialogBackdrop as Backdrop,
};
