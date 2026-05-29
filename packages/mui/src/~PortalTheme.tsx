/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { PortalContext } from "@ariakit/react/portal";
import { ThemeProvider } from "@mui/material/styles";

import type { Theme } from "@mui/material/styles";

// ----------------------------------------------------------------------------

function PortalTheme(props: React.PropsWithChildren) {
	const container = React.useContext(PortalContext);
	const theme = React.useCallback(
		(outerTheme: Theme): Theme => {
			return {
				...outerTheme,
				components: {
					...outerTheme.components,
					MuiModal: {
						defaultProps: {
							container,
						},
					},
					MuiPopover: {
						defaultProps: {
							// Popover passes down `container` prop to `Modal` https://github.com/mui/material-ui/blob/708ef10e874efa63d2e4972bd902befa1912f2dc/packages/mui-material/src/Popover/Popover.js#L389
							container,
						},
					},
					MuiPopper: {
						defaultProps: {
							container,
						},
					},
				},
			};
		},
		[container],
	);
	return <ThemeProvider theme={theme} {...props} />;
}
DEV: PortalTheme.displayName = "PortalTheme";

// ----------------------------------------------------------------------------

export { PortalTheme };
