/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { Role } from "@ariakit/react/role";
import { RootContext } from "@stratakit/foundations/secret-internals";
import { useSafeContext } from "@stratakit/internal-utils/hooks";
import { forwardRef } from "@stratakit/internal-utils/react";
import { PortalProvider } from "../Root.internal.js";

import type { BaseProps } from "@stratakit/internal-utils/props";

// ----------------------------------------------------------------------------

const MuiDrawerPaper = forwardRef<"div", BaseProps<"div">>(
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

		return (
			<Role {...props} ref={forwardedRef}>
				<PortalProvider
					container={container}
					unstable_getContainer={getContainer}
				>
					{props.children}
				</PortalProvider>
				<div id={containerId} ref={setContainer} />
			</Role>
		);
	},
);
DEV: MuiDrawerPaper.displayName = "MuiDrawerPaper";

// ----------------------------------------------------------------------------

export { MuiDrawerPaper };
