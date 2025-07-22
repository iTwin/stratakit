/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import * as AkDialog from "@ariakit/react/dialog";
import { Role } from "@ariakit/react/role";
import { useStoreState } from "@ariakit/react/store";
import { Button, IconButton, Text } from "@stratakit/bricks";
import { GhostAligner } from "@stratakit/bricks/secret-internals";
import { forwardRef } from "@stratakit/foundations/secret-internals";
import cx from "classnames";
import { Dismiss } from "./~utils.icons.js";

import type {
	BaseProps,
	FocusableProps,
} from "@stratakit/foundations/secret-internals";

// ----------------------------------------------------------------------------

function usePopoverApi(store: AkDialog.DialogStore) {
	const open = useStoreState(store, (state) => state.open);
	const contentElement = useStoreState(store, (state) => state.contentElement);
	const [backdropElement, setBackdropElement] =
		React.useState<HTMLElement | null>(null);

	React.useEffect(() => {
		if (backdropElement?.isConnected) {
			backdropElement?.togglePopover?.(open);
		}
		if (contentElement?.isConnected) {
			contentElement?.togglePopover?.(open);
		}
	}, [open, backdropElement, contentElement]);

	const popover = React.useMemo(
		() =>
			({
				dialogProps: { popover: "manual" },
				backdropProps: { popover: "manual" },
			}) as const,
		[],
	);
	return [popover, setBackdropElement] as const;
}

// ----------------------------------------------------------------------------

interface DialogRootProps
	extends BaseProps,
		Pick<
			AkDialog.DialogProps,
			"open" | "onClose" | "unmountOnHide" | "hideOnInteractOutside"
		> {}

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
 *     <Dialog.DismissButton>Ok</Dialog.DismissButton>
 *   </Dialog.Footer>
 * </Dialog.Root>
 * ```
 */
const DialogRoot = forwardRef<"div", DialogRootProps>((props, forwardedRef) => {
	const store = AkDialog.useDialogStore();
	const [popover, setBackdropElement] = usePopoverApi(store);

	return (
		<AkDialog.DialogProvider store={store}>
			<AkDialog.Dialog
				backdrop={
					<DialogBackdrop ref={setBackdropElement} {...popover.backdropProps} />
				}
				{...props}
				{...popover.dialogProps}
				className={cx("🥝-dialog", props.className)}
				ref={forwardedRef}
			>
				{props.children}
			</AkDialog.Dialog>
		</AkDialog.DialogProvider>
	);
});
DEV: DialogRoot.displayName = "Dialog.Root";

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
			>
				{props.children}
			</Role>
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
				render={<Text variant="body-lg" render={props.render ?? <h1 />} />}
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

interface DialogDismissButtonProps extends FocusableProps<"button"> {}

/**
 * An action button that hides a dialog when clicked. Should be used as a child of `Dialog.Footer`.
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

interface DialogFooterProps extends BaseProps {}

/**
 * A container for action buttons in a dialog. Should be used as a child of `Dialog.Root`.
 *
 * Example:
 * ```tsx
 * <Dialog.Footer>
 *   <Dialog.DismissButton>Cancel</Dialog.DismissButton>
 *   <Dialog.DismissButton render={<Button tone="accent" />}>Ok</Dialog.DismissButton>
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
			>
				{props.children}
			</Role>
		);
	},
);
DEV: DialogFooter.displayName = "Dialog.Footer";

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
DEV: DialogBackdrop.displayName = "DialogBackdrop";

// -------------------------------------------------------------------------

export {
	DialogRoot as Root,
	DialogHeader as Header,
	DialogHeading as Heading,
	DialogCloseButton as CloseButton,
	DialogContent as Content,
	DialogFooter as Footer,
	DialogDismissButton as DismissButton,
};
