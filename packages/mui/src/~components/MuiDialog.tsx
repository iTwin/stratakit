/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { PortalContext } from "@ariakit/react/portal";
import { Role } from "@ariakit/react/role";
import Modal from "@mui/material/Modal";
import { forwardRef } from "@stratakit/foundations/secret-internals";

import type { BaseProps } from "@stratakit/foundations/secret-internals";

// ----------------------------------------------------------------------------

const MuiDialogRootSlot = forwardRef<"div", React.ComponentProps<typeof Modal>>(
	(props, forwardedRef) => {
		const container = React.useContext(PortalContext);
		return <Modal container={container} {...props} ref={forwardedRef} />;
	},
);
DEV: MuiDialogRootSlot.displayName = "MuiDialogRootSlot";

// ----------------------------------------------------------------------------

const MuiDialogPaper = forwardRef<"div", BaseProps<"div">>(
	(props, forwardedRef) => {
		const [containerElement, setContainerElement] =
			React.useState<HTMLDivElement | null>(null);
		return (
			<PortalContext.Provider value={containerElement}>
				<Role {...props} ref={forwardedRef}>
					{props.children}
					{/* Render in a container to avoid `aria-hidden` focus warning. */}
					<div ref={setContainerElement} />
				</Role>
			</PortalContext.Provider>
		);
	},
);
DEV: MuiDialogPaper.displayName = "MuiDialogPaper";

// ----------------------------------------------------------------------------

export { MuiDialogPaper, MuiDialogRootSlot };
