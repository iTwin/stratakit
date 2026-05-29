/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { Role } from "@ariakit/react/role";
import { PortalProvider } from "@stratakit/foundations/secret-internals";
import { useMergedRefs } from "@stratakit/internal-utils/hooks";
import { forwardRef } from "@stratakit/internal-utils/react";

import type { BaseProps } from "@stratakit/internal-utils/props";

// ----------------------------------------------------------------------------

const MuiDialogPaper = forwardRef<"div", BaseProps<"div">>(
	(props, forwardedRef) => {
		const containerRef = React.useRef<HTMLDivElement | null>(null);
		const [container, setContainer] = React.useState<HTMLDivElement | null>(
			null,
		);

		// Re-create the callback whenever the ref changes, while still
		// returning the latest `containerRef.current`.
		// biome-ignore lint/correctness/useExhaustiveDependencies: intentional for https://github.com/mui/material-ui/issues/48882
		const getContainer = React.useCallback(
			() => containerRef.current,
			[container],
		);
		return (
			<PortalProvider container={getContainer}>
				<Role {...props} ref={forwardedRef}>
					{props.children}
					{/* Render in a container to avoid `aria-hidden` focus warning. */}
					<div ref={useMergedRefs(containerRef, setContainer)} />
				</Role>
			</PortalProvider>
		);
	},
);
DEV: MuiDialogPaper.displayName = "MuiDialogPaper";

// ----------------------------------------------------------------------------

export { MuiDialogPaper };
