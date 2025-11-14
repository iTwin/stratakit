/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import * as AkDialog from "@ariakit/react/dialog";
import { Portal, PortalContext } from "@ariakit/react/portal";
import { Role } from "@ariakit/react/role";
import { useStoreState } from "@ariakit/react/store";
import { IconButton, Text } from "@stratakit/bricks";
import { GhostAligner } from "@stratakit/bricks/secret-internals";
import {
	forwardRef,
	usePopoverApi,
} from "@stratakit/foundations/secret-internals";
import cx from "classnames";
import { Dismiss } from "./~utils.icons.js";
import { useInit } from "./~utils.useInit.js";

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
			| "hideOnInteractOutside"
		> {
	/**
	 * When set to `true`, the content element will be unmounted and removed from
	 * the DOM when it's hidden.
	 *
	 * @default true
	 */
	unmountOnHide?: boolean;
	/**
	 * Determines whether the dialog is modal.
	 * Currently, only modal dialogs are supported.
	 */
	modal: true;
}

/**
 * A modal dialog component used to display content in a window overlay. Must include `Dialog.Header` and `Dialog.Content` as direct
 * descendants. Additionally, `Dialog.Footer` can be optionally used as a direct descendant.
 *
 * Example:
 * ```tsx
 * const [open, setOpen] = useState(false);
 *
 * <Dialog.Root modal={true} open={open} onClose={() => setOpen(false)}>
 *   <Dialog.Heading>Heading</Dialog.Heading>
 *   <Dialog.Content>Content</Dialog.Content>
 *   <Dialog.Footer>
 *     <Dialog.ActionList
 *       actions={[
 *         <Button key="ok" onClick={() => setOpen(false)}>Ok</Button>,
 *       ]}
 *     />
 *
 *   </Dialog.Footer>
 * </Dialog.Root>
 * ```
 */
const DialogRoot = forwardRef<"div", DialogRootProps>((props, forwardedRef) => {
	useInit();

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
			<DialogWrapper open={props.open}>
				<AkDialog.Dialog
					unmountOnHide={unmountOnHide}
					portal={false} // Portaling will be done by DialogWrapper
					{...rest}
					backdrop={backdrop === true ? <DialogBackdrop /> : backdrop}
					className={cx("🥝Dialog", props.className)}
					ref={forwardedRef}
				>
					{/* Avoids rendering a visually hidden dismiss button for screen readers. */}
					<AkDialog.DialogDismiss hidden />
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

interface DialogWrapperProps
	extends Pick<DialogRootProps, "children" | "open"> {}

function DialogWrapper(props: DialogWrapperProps) {
	const [wrapper, setWrapper] = React.useState<HTMLElement | null>(null);

	const store = AkDialog.useDialogContext();
	const open = useStoreState(store, (state) => {
		return props.open ?? state?.open;
	});

	const popoverProps = usePopoverApi({
		element: wrapper,
		open,
	});

	const mounted = useStoreState(store, "mounted");
	return (
		<Portal
			className="🥝DialogWrapper"
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
				className={cx("🥝DialogHeader", props.className)}
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
				className={cx("🥝DialogHeading", props.className)}
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
			<GhostAligner align="inline-end">
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
			<Role
				{...props}
				className={cx("🥝DialogContent", props.className)}
				ref={forwardedRef}
			/>
		);
	},
);
DEV: DialogContent.displayName = "Dialog.Content";

// -------------------------------------------------------------------------

interface DialogFooterProps extends BaseProps {}

/**
 * The footer section of a dialog, typically used to display action buttons at the bottom of the dialog.
 * Should be used as a child of `Dialog.Root`. Use `Dialog.ActionList` as a direct descendant to display a list of actions.
 *
 * Example:
 * ```tsx
 * <Dialog.Footer>
 *   <Dialog.ActionList
 *     actions={[
 *       <Button key="cancel" onClick={() => setOpen(false)}>Cancel</Button>,
 *       <Button key="ok" tone="accent" onClick={() => setOpen(false)}>Ok</Button>,
 *     ]}
 *   />
 * </Dialog.Footer>
 * ```
 */
const DialogFooter = forwardRef<"div", DialogFooterProps>(
	(props, forwardedRef) => {
		return (
			<Role
				{...props}
				className={cx("🥝DialogFooter", props.className)}
				ref={forwardedRef}
			/>
		);
	},
);
DEV: DialogFooter.displayName = "Dialog.Footer";

// -------------------------------------------------------------------------

interface DialogActionListProps extends Omit<BaseProps, "children"> {
	/**
	 * The actions available for the dialog. Must be a list of `Button` components.
	 */
	actions?: React.ReactNode[];
}

/**
 * A container for action buttons in a dialog. Should be used as a child of `Dialog.Footer`.
 *
 * Example:
 * ```tsx
 * <Dialog.ActionList
 *   actions={[
 *     <Button key="cancel" onClick={() => setOpen(false)}>Cancel</Button>,
 *     <Button key="ok" tone="accent" onClick={() => setOpen(false)}>Ok</Button>,
 *   ]}
 * />
 * ```
 */
const DialogActionList = forwardRef<"div", DialogActionListProps>(
	(props, forwardedRef) => {
		const { actions, ...rest } = props;

		return (
			<Role
				role="list"
				{...rest}
				className={cx("🥝DialogActionList", props.className)}
				ref={forwardedRef}
			>
				{React.Children.map(actions, (action) => {
					return <div role="listitem">{action}</div>;
				})}
			</Role>
		);
	},
);
DEV: DialogActionList.displayName = "Dialog.ActionList";

// -------------------------------------------------------------------------

interface DialogBackdropProps extends BaseProps {}

/**
 * The backdrop of a dialog. Should be passed into the `backdrop` prop of `Dialog.Root`.
 *
 * Example:
 * ```tsx
 * <Dialog.Root modal={true} backdrop={<Dialog.Backdrop />} />
 * ```
 */
const DialogBackdrop = forwardRef<"div", DialogBackdropProps>(
	(props, forwardedRef) => {
		return (
			<Role
				{...props}
				className={cx("🥝DialogBackdrop", props.className)}
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
	DialogActionList as ActionList,
	DialogBackdrop as Backdrop,
};
