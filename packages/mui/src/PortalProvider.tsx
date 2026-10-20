/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { PortalContext } from "@stratakit/foundations";
import { PortalThemeProvider } from "./PortalProvider.internal.js";

// ----------------------------------------------------------------------------

type PortalContextValue = NonNullable<React.ContextType<typeof PortalContext>>;

// ----------------------------------------------------------------------------

interface PortalProviderProps
	extends Pick<PortalContextValue, "container" | "unstable_getContainer"> {
	children?: React.ReactNode;
}

/**
 * Provides the `PortalContext` to its children and sets up the MUI theme provider.
 * All descendent floating elements from StrataKit and MUI will be portaled into the specified container.
 *
 * Example:
 * ```tsx
 * const [container, setContainer] = React.useState(null);
 *
 * <CustomDialog ref={setContainer}>
 *   <PortalProvider container={container}>
 *     …
 *   </PortalProvider>
 * </CustomDialog>
 * ```
 */
function PortalProvider(props: PortalProviderProps) {
	return (
		<PortalContext.Provider
			value={{
				container: props.container,
				unstable_getContainer: props.unstable_getContainer,
			}}
		>
			<PortalThemeProvider>{props.children}</PortalThemeProvider>
		</PortalContext.Provider>
	);
}
DEV: PortalProvider.displayName = "PortalProvider";

// ----------------------------------------------------------------------------

export { PortalProvider };
