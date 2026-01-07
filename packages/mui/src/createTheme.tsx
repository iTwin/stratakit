/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { createTheme as createMuiTheme } from "@mui/material/styles";
import {
	ArrowDownIcon,
	CaretsUpDownIcon,
	ChevronDownIcon,
	ChevronLeftDoubleIcon,
	ChevronLeftIcon,
	ChevronRightDoubleIcon,
	ChevronRightIcon,
	DismissIcon,
	ErrorIcon,
	InfoIcon,
	SuccessIcon,
	WarningIcon,
} from "./Icon.js";

/**
 * Creates a StrataKit theme for MUI. Should be used with MUI's `ThemeProvider`.
 *
 * Example:
 * ```tsx
 * import { ThemeProvider } from "@mui/material/styles";
 * import { createTheme } from "@stratakit/mui";
 *
 * const theme = createTheme();
 * <ThemeProvider theme={theme}>
 *   <App />
 * </ThemeProvider>
 * ```
 */
function createTheme() {
	return createMuiTheme({
		cssVariables: {
			nativeColor: true,
			colorSchemeSelector: "[data-color-scheme='%s']",
			cssVarPrefix: "stratakit-mui",
		},
		colorSchemes: {
			light: true,
			dark: true,
		},
		typography: {
			fontFamily: "var(--stratakit-font-family-sans)",
			fontSize: 14,
			button: {
				textTransform: "none", // Disable all-caps on buttons and tabs
			},
		},
		shadows: [
			"none", // 0
			"none", // 1
			"var(--stratakit-shadow-surface-xs)", // 2
			"var(--stratakit-shadow-surface-sm)", // 3
			...new Array(4).fill("var(--stratakit-shadow-surface-md)"), // 4-7
			...new Array(17).fill("var(--stratakit-shadow-surface-lg)"), // 8-24
			// biome-ignore lint/suspicious/noExplicitAny: MUI expects 25 items in the shadows array
		] as any,
		components: {
			MuiAccordionSummary: {
				defaultProps: {
					expandIcon: <ChevronDownIcon />,
				},
			},
			MuiAlert: {
				defaultProps: {
					iconMapping: {
						error: <ErrorIcon />,
						info: <InfoIcon />,
						success: <SuccessIcon />,
						warning: <WarningIcon />,
					},
				},
			},
			MuiAutocomplete: {
				defaultProps: {
					popupIcon: <ChevronDownIcon />,
					clearIcon: <DismissIcon />,
					slotProps: {
						paper: {
							elevation: 8, // match Menu elevation
						},
					},
				},
			},
			MuiBreadcrumbs: {
				defaultProps: {
					separator: <ChevronRightIcon />,
				},
			},
			MuiButtonBase: {
				defaultProps: {
					disableRipple: true, // https://mui.com/material-ui/getting-started/faq/#how-can-i-disable-the-ripple-effect-globally
				},
			},
			MuiButton: {
				defaultProps: {
					color: "secondary",
				},
			},
			MuiChip: {
				defaultProps: {
					deleteIcon: <DismissIcon />,
				},
			},
			MuiCheckbox: {
				defaultProps: {
					disableRipple: true, // Checkbox doesn't inherit from ButtonBase
				},
			},
			MuiInputLabel: {
				defaultProps: {
					shrink: true, // Removes floating label from TextField
				},
			},
			MuiLink: {
				defaultProps: {
					color: "textPrimary",
				},
			},
			MuiOutlinedInput: {
				defaultProps: {
					notched: false, // Removes floating label from Select
				},
			},
			MuiPaginationItem: {
				defaultProps: {
					slots: {
						previous: ChevronLeftIcon,
						next: ChevronRightIcon,
						first: ChevronLeftDoubleIcon,
						last: ChevronRightDoubleIcon,
					},
				},
			},
			MuiSelect: {
				defaultProps: {
					IconComponent: CaretsUpDownIcon,
				},
			},
			MuiTablePaginationActions: {
				defaultProps: {
					slots: {
						previousButtonIcon: ChevronLeftIcon,
						nextButtonIcon: ChevronRightIcon,
						firstButtonIcon: ChevronLeftDoubleIcon,
						lastButtonIcon: ChevronRightDoubleIcon,
					},
				},
			},
			MuiTableSortLabel: {
				defaultProps: {
					// TODO: This should use sort-ascending and sort-descending icons, but that requires disabling MUI's built-in icon rotation.
					IconComponent: ArrowDownIcon,
				},
			},
		},
	});
}

// ----------------------------------------------------------------------------

export { createTheme };
