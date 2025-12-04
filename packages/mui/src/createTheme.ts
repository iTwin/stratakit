/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { createTheme as createMuiTheme } from "@mui/material/styles";

function createTheme() {
	return createMuiTheme({
		cssVariables: {
			nativeColor: true,
		},
		colorSchemes: {
			light: {
				palette: {
					primary: {
						main: "var(--stratakit-color-bg-accent-base)",
					},
					text: {
						primary: "var(--stratakit-color-text-neutral-primary)",
						secondary: "var(--stratakit-color-text-neutral-secondary)",
					},
					divider: "var(--stratakit-color-border-neutral-muted)",
					background: {
						default: "var(--stratakit-color-bg-page-base)",
						paper: "var(--stratakit-color-bg-elevation-base)",
					},
				},
			},
			dark: {
				palette: {
					primary: {
						main: "var(--stratakit-color-bg-accent-base)",
						contrastText: "var(--stratakit-color-icon-neutral-emphasis)",
					},
					text: {
						primary: "var(--stratakit-color-text-neutral-primary)",
						secondary: "var(--stratakit-color-text-neutral-secondary)",
					},
					divider: "var(--stratakit-color-border-neutral-muted)",
					background: {
						default: "var(--stratakit-color-bg-page-base)",
						paper: "var(--stratakit-color-bg-elevation-base)",
					},
				},
			},
		},
		components: {
			MuiButtonBase: {
				defaultProps: {
					disableRipple: true, // https://mui.com/material-ui/getting-started/faq/#how-can-i-disable-the-ripple-effect-globally
				},
			},
			MuiCheckbox: {
				defaultProps: {
					disableRipple: true, // Checkbox doesn't inherit from ButtonBase
				},
			},
		},
	});
}

// ----------------------------------------------------------------------------

export { createTheme };
