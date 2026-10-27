/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { PortalContext as AkPortalContext } from "@ariakit/react/portal";
import { Role } from "@ariakit/react/role";
import { PortalContext } from "@stratakit/foundations";
import { RootContext } from "@stratakit/foundations/secret-internals";
import { useSafeContext } from "@stratakit/internal-utils/hooks";

// ----------------------------------------------------------------------------

type PortalContextValue = React.ContextType<typeof PortalContext>;

/**
 * Provides the element that will contain the portal.
 */
export function PortalProvider(
	props: React.PropsWithChildren<PortalContextValue>,
) {
	const { children, container, unstable_getContainer } = props;

	const { portalProvider } = useSafeContext(RootContext);

	return (
		<PortalContext.Provider value={{ container, unstable_getContainer }}>
			<AkPortalContext.Provider value={container}>
				<Role render={portalProvider ?? <React.Fragment />}>{children}</Role>
			</AkPortalContext.Provider>
		</PortalContext.Provider>
	);
}
DEV: PortalProvider.displayName = "PortalProvider";

// ----------------------------------------------------------------------------
