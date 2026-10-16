/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { Role } from "@ariakit/react/role";
import { useSafeContext } from "@stratakit/internal-utils/hooks";
import { RootContext } from "./Root.internal.js";

// ----------------------------------------------------------------------------

/**
 * Stores the element that will contain the portal. By default, it will be the root portal container.
 */
const PortalContext = React.createContext<
	| {
			/**
			 * The HTML element that will contain the portal.
			 */
			container: HTMLElement | null;
			/**
			 * Function that is lazily resolved by MUI when the portal mounts. Passing the
			 * element directly requires the theme to be recreated once the element becomes available, which
			 * leaves a one-commit window where portals fall back to `<body>`.
			 *
			 * Needed to workaround https://github.com/mui/material-ui/issues/48882
			 */
			unstable_getContainer?: () => HTMLElement | null;
	  }
	| undefined
>(undefined);
DEV: PortalContext.displayName = "PortalContext";

type PortalContextValue = NonNullable<React.ContextType<typeof PortalContext>>;

// ----------------------------------------------------------------------------

interface PortalProviderProps
	extends Pick<PortalContextValue, "container" | "unstable_getContainer"> {
	children?: React.ReactNode;
}

/**
 * Provides the portal context to its children.
 * Additionally, the `unstable_portalProvider` prop of `Root` is used to customize the portal provider.
 */
function PortalProvider(props: PortalProviderProps) {
	const { portalProvider } = useSafeContext(RootContext);

	return (
		<PortalContext.Provider
			value={{
				container: props.container,
				unstable_getContainer: props.unstable_getContainer,
			}}
		>
			<Role render={portalProvider ?? <React.Fragment />}>
				{props.children}
			</Role>
		</PortalContext.Provider>
	);
}
DEV: PortalProvider.displayName = "PortalProvider";

// ----------------------------------------------------------------------------

export { PortalContext, PortalProvider };
