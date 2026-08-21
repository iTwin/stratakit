/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { PortalContext } from "@stratakit/foundations/secret-internals";
import { useSafeContext } from "@stratakit/internal-utils/hooks";

import type { Theme } from "@mui/material/styles";

// ----------------------------------------------------------------------------

function PortalTheme(props: React.PropsWithChildren) {
	const { container: containerEl, unstable_getContainer } =
		useSafeContext(PortalContext);
	const container = unstable_getContainer ?? containerEl;
	const theme = React.useCallback(
		(outerTheme: Theme): Theme => {
			return {
				...outerTheme,
				components: {
					...outerTheme.components,
					MuiModal: {
						...outerTheme.components?.MuiModal,
						defaultProps: {
							...outerTheme.components?.MuiModal?.defaultProps,
							container,
						},
					},
					MuiPopover: {
						...outerTheme.components?.MuiPopover,
						defaultProps: {
							...outerTheme.components?.MuiPopover?.defaultProps,
							// Popover passes down `container` prop to `Modal` https://github.com/mui/material-ui/blob/708ef10e874efa63d2e4972bd902befa1912f2dc/packages/mui-material/src/Popover/Popover.js#L389
							container,
						},
					},
					MuiPopper: {
						...outerTheme.components?.MuiPopper,
						defaultProps: {
							...outerTheme.components?.MuiPopper?.defaultProps,
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
