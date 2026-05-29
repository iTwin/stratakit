/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { Role } from "@ariakit/react/role";
import {
	forwardRef,
	PortalProvider,
} from "@stratakit/foundations/secret-internals";

import type { BaseProps } from "@stratakit/foundations/secret-internals";

// ----------------------------------------------------------------------------

const MuiDialogPaper = forwardRef<"div", BaseProps<"div">>(
	(props, forwardedRef) => {
		const [container, setContainer] = React.useState<HTMLDivElement | null>(
			null,
		);
		return (
			<PortalProvider container={container}>
				<Role {...props} ref={forwardedRef}>
					{props.children}
					{/* Render in a container to avoid `aria-hidden` focus warning. */}
					<div ref={setContainer} />
				</Role>
			</PortalProvider>
		);
	},
);
DEV: MuiDialogPaper.displayName = "MuiDialogPaper";

// ----------------------------------------------------------------------------

export { MuiDialogPaper };
