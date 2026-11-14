/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import * as AkDialog from "@ariakit/react/dialog";
import {
	PortalContext as AkPortalContext,
	Portal,
} from "@ariakit/react/portal";
import { Role } from "@ariakit/react/role";
import Modal from "@mui/material/Modal";
import { ThemeProvider } from "@mui/material/styles";
import { PortalContext } from "@stratakit/foundations";
import { RootContext } from "@stratakit/foundations/secret-internals";
import { useSafeContext } from "@stratakit/internal-utils/hooks";
import { forwardRef } from "@stratakit/internal-utils/react";
import cx from "classnames";
import { PortalProvider } from "../PortalProvider.js";

import type { DialogOwnerState, DialogProps } from "@mui/material/Dialog";
import type DialogTitle from "@mui/material/DialogTitle";
import type { ModalProps } from "@mui/material/Modal";
import type { Theme } from "@mui/material/styles";
import type { BaseProps } from "@stratakit/internal-utils/props";

// ----------------------------------------------------------------------------

const MuiDialogContext = React.createContext<
	| {
			open: boolean;
	  }
	| undefined
>(undefined);

// ----------------------------------------------------------------------------

interface MuiDialogRootSlotProps extends DialogProps {}

const MuiDialogRootSlot = forwardRef<"div", MuiDialogRootSlotProps>(
	(props, forwardedRef) => {
		const { nonModal, ...rest } = props;
		const { open } = props;

		return (
			<MuiDialogContext.Provider
				value={{
					open,
				}}
			>
				{!nonModal ? (
					<Modal {...(rest as unknown as ModalProps)} ref={forwardedRef} />
				) : (
					<MuiDialogNonModalRoot {...rest} ref={forwardedRef} />
				)}
			</MuiDialogContext.Provider>
		);
	},
);
DEV: MuiDialogRootSlot.displayName = "MuiDialogRootSlot";

// ----------------------------------------------------------------------------

interface MuiDialogNonModalRootProps extends DialogProps {
	ownerState?: DialogOwnerState;
}

const MuiDialogNonModalRoot = forwardRef<"div", MuiDialogNonModalRootProps>(
	(props, forwardedRef) => {
		const {
			// biome-ignore-start lint/correctness/noUnusedVariables: Unused props of `Dialog`
			classes,
			closeAfterTransition = false,
			container: _container,
			component,
			disableAutoFocus = false,
			disableEnforceFocus = false,
			disablePortal = false,
			disableRestoreFocus = false,
			disableScrollLock = false,
			hideBackdrop = false,
			keepMounted = false,
			onClose,
			onTransitionEnter,
			onTransitionExited,
			open,
			slotProps,
			slots,
			ownerState,
			// biome-ignore-end lint/correctness/noUnusedVariables: Unused props of `Dialog`
			...rest
		} = props;

		const { container } = React.useContext(PortalContext) ?? {};

		return (
			<AkPortalContext.Provider value={container ?? null}>
				<Portal
					{...rest}
					className={cx("🥝MuiDialogNonModalRoot", rest.className)}
					ref={forwardedRef}
				/>
			</AkPortalContext.Provider>
		);
	},
);
DEV: MuiDialogNonModalRoot.displayName = "MuiDialogNonModalRoot";

// ----------------------------------------------------------------------------

const MuiDialogPaper = forwardRef<"div", BaseProps<"div">>(
	(props, forwardedRef) => {
		const { rootNode } = useSafeContext(RootContext);

		const containerId = React.useId();

		const [container, setContainer] = React.useState<HTMLDivElement | null>(
			null,
		);

		const getContainer = React.useCallback(() => {
			// Lookup using element id; `getContainer` is called (from layout effect) before the ref is attached.
			const containerEl = rootNode?.getElementById(containerId);
			return containerEl ?? null;
		}, [rootNode, containerId]);

		const Component = MuiDialogNonModalPaper;
		return (
			<Component {...props} ref={forwardedRef}>
				<PortalProvider
					container={container}
					unstable_getContainer={getContainer}
				>
					{props.children}
				</PortalProvider>
				{/* Render portalled elements in a container to avoid `aria-hidden` focus warning. */}
				<div id={containerId} ref={setContainer} />
			</Component>
		);
	},
);
DEV: MuiDialogPaper.displayName = "MuiDialogPaper";

// ----------------------------------------------------------------------------

const MuiDialogNonModalPaper = forwardRef<"div", BaseProps<"div">>(
	(props, forwardedRef) => {
		const { "aria-modal": _ariaModal, ...rest } = props;

		const { open } = useSafeContext(MuiDialogContext);

		return (
			<AkDialog.Dialog
				portal={false}
				hideOnInteractOutside={false}
				autoFocusOnShow={true}
				modal={false}
				open={open}
				{...(rest as unknown as React.ComponentProps<typeof AkDialog.Dialog>)}
				ref={forwardedRef}
			/>
		);
	},
);
DEV: MuiDialogNonModalPaper.displayName = "MuiDialogNonModalPaper";

// ----------------------------------------------------------------------------

type DialogTitleProps = React.ComponentProps<typeof DialogTitle>;

interface MuiDialogTitleProps
	extends BaseProps<"h2">,
		Pick<DialogTitleProps, "actions" | "slotProps"> {}

const MuiDialogTitle = forwardRef<"h2", MuiDialogTitleProps>(
	(props, forwardedRef) => {
		const { actions, slotProps, ...rest } = props;
		const { wrapper: wrapperProps } = slotProps ?? {};

		const title = <Role.h2 {...rest} ref={forwardedRef} />;
		if (actions) {
			const lastAction = actions.at(-1);
			const leadingActions = actions.slice(0, -1);
			return (
				<Role.div
					{...wrapperProps}
					className={cx("🥝MuiDialogTitleWrapper", wrapperProps?.className)}
				>
					{title}
					<MuiDialogTitleActionsProvider>
						{leadingActions}
						<MuiDialogTitleLastActionProvider>
							{lastAction}
						</MuiDialogTitleLastActionProvider>
					</MuiDialogTitleActionsProvider>
				</Role.div>
			);
		}

		return title;
	},
);
DEV: MuiDialogTitle.displayName = "MuiDialogTitle";

// ----------------------------------------------------------------------------

function MuiDialogTitleActionsProvider(props: React.PropsWithChildren) {
	return (
		<ThemeProvider<Theme>
			theme={(outerTheme) => ({
				...outerTheme,
				components: {
					...outerTheme.components,
					MuiIconButton: {
						...outerTheme.components?.MuiIconButton,
						defaultProps: {
							...outerTheme.components?.MuiIconButton?.defaultProps,
							size: "small",
						},
					},
				},
			})}
		>
			{props.children}
		</ThemeProvider>
	);
}
DEV: MuiDialogTitleActionsProvider.displayName =
	"MuiDialogTitleActionsProvider";

// ----------------------------------------------------------------------------

function MuiDialogTitleLastActionProvider(props: React.PropsWithChildren) {
	return (
		<ThemeProvider<Theme>
			theme={(outerTheme) => ({
				...outerTheme,
				components: {
					...outerTheme.components,
					MuiIconButton: {
						...outerTheme.components?.MuiIconButton,
						defaultProps: {
							...outerTheme.components?.MuiIconButton?.defaultProps,
							edge: "end",
						},
					},
				},
			})}
		>
			{props.children}
		</ThemeProvider>
	);
}
DEV: MuiDialogTitleLastActionProvider.displayName =
	"MuiDialogTitleLastActionProvider";

// ----------------------------------------------------------------------------

export { MuiDialogPaper, MuiDialogRootSlot, MuiDialogTitle };
