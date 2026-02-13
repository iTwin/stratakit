/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import * as ReactDOM from "react-dom";
import { Role } from "@ariakit/react/role";
import { OutlinedInput } from "@mui/material";
import { createTheme as createMuiTheme } from "@mui/material/styles";
import { useMergedRefs } from "@stratakit/foundations/secret-internals";
import { Chip, ChipDeleteIcon, ChipLabel } from "./~components.js";
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

import type { RoleProps } from "@ariakit/react/role";
import type { ColorSystemOptions } from "@mui/material/styles";

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
	// Map the JS palette back to MUI's own CSS variables, which will then be mapped to the correct StrataKit tokens in CSS.
	// (This is a fallback for any code that uses MUI's theme.palette values directly instead of CSS variables)
	const palette = {
		primary: { main: "var(--stratakit-mui-palette-primary-main)" },
		secondary: { main: "var(--stratakit-mui-palette-secondary-main)" },

		error: { main: "var(--stratakit-mui-palette-error-main)" },
		warning: { main: "var(--stratakit-mui-palette-warning-main)" },
		info: { main: "var(--stratakit-mui-palette-info-main)" },
		success: { main: "var(--stratakit-mui-palette-success-main)" },

		grey: Object.fromEntries(
			["50", "100", "200", "300", "400", "500", "600", "700", "800", "900"].map(
				(shade) => [shade, `var(--stratakit-mui-palette-grey-${shade})`],
			),
		),
	} satisfies ColorSystemOptions["palette"];

	return createMuiTheme({
		cssVariables: {
			nativeColor: true,
			colorSchemeSelector: "[data-color-scheme='%s']",
			cssVarPrefix: "stratakit-mui",
		},
		colorSchemes: {
			light: { palette },
			dark: { palette },
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
			MuiAppBar: { defaultProps: { component: Role.header } },
			MuiAccordion: { defaultProps: { component: Role.div } },
			MuiAccordionSummary: {
				defaultProps: {
					component: Role.div,
					expandIcon: <ChevronDownIcon />,
				},
			},
			MuiAlert: {
				defaultProps: {
					component: Role.div,
					variant: "outlined",
					iconMapping: {
						error: <ErrorIcon />,
						info: <InfoIcon />,
						success: <SuccessIcon />,
						warning: <WarningIcon />,
					},
				},
			},
			MuiAlertTitle: { defaultProps: { component: Role.div } },
			MuiAutocomplete: {
				defaultProps: {
					popupIcon: <ChevronDownIcon />,
					clearIcon: <DismissIcon />,
					onKeyDown: (e) => {
						if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
							e.defaultMuiPrevented = true; // Prevent MUI from handling left/right arrow keys to focus the tags
						}
					},
					slotProps: {
						paper: {
							elevation: 8, // match Menu elevation
						},
						chip: {
							component: AutocompleteChip,
						},
						clearIndicator: {
							component: AutocompleteClearIndicator,
							tabIndex: 0, // make clear indicator focusable
							onKeyDown: (e: React.KeyboardEvent<HTMLButtonElement>) => {
								// Stop Autocomplete from handling the event
								e.stopPropagation();
							},
						},
					},
				},
			},
			MuiAvatar: { defaultProps: { component: Role.div } },
			MuiAvatarGroup: { defaultProps: { component: Role.div } },
			MuiBackdrop: { defaultProps: { component: Role.div } },
			MuiBadge: { defaultProps: { component: Role.span } },
			MuiBottomNavigation: { defaultProps: { component: Role.div } },
			MuiBottomNavigationAction: {
				defaultProps: { component: Role.button },
			},
			MuiBreadcrumbs: {
				defaultProps: {
					component: Role.nav,
					separator: <ChevronRightIcon />,
				},
			},
			MuiButtonBase: {
				defaultProps: {
					component: Role.button,
					disableRipple: true, // https://mui.com/material-ui/getting-started/faq/#how-can-i-disable-the-ripple-effect-globally
				},
			},
			MuiButton: {
				defaultProps: {
					component: Role.button,
					color: "secondary",
					variant: "contained",
				},
			},
			MuiButtonGroup: {
				defaultProps: {
					component: Role.div,
					color: "secondary",
					disableRipple: true, // ButtonGroup overrides Button's disableRipple so we need to set it here as well
				},
			},
			MuiCard: { defaultProps: { component: Role.div } },
			MuiCardActionArea: {
				defaultProps: { component: Role.button },
			},
			MuiCardContent: { defaultProps: { component: Role.div } },
			MuiCardMedia: { defaultProps: { component: Role.div } },
			MuiCheckbox: {
				defaultProps: {
					component: Role.span,
					disableRipple: true, // Checkbox doesn't inherit from ButtonBase
					icon: <></>,
					checkedIcon: <></>,
					indeterminateIcon: <></>,
				},
			},
			MuiChip: {
				defaultProps: {
					component: Chip,
					deleteIcon: <ChipDeleteIcon />,
					slotProps: {
						label: {
							component: ChipLabel,
						},
					},
				},
			},
			MuiContainer: { defaultProps: { component: Role.div } },
			MuiDialog: { defaultProps: { component: Role.div } },
			MuiDialogContentText: { defaultProps: { component: Role.p } },
			MuiDialogTitle: { defaultProps: { component: Role.h2 } },
			MuiDivider: { defaultProps: { component: withRenderProp(Role, "hr") } },
			MuiDrawer: { defaultProps: { component: Role.div } },
			MuiFab: {
				defaultProps: {
					component: Role.button,
					color: "primary",
				},
			},
			MuiFormControl: { defaultProps: { component: Role.div } },
			MuiFormHelperText: { defaultProps: { component: Role.p } },
			MuiFormLabel: { defaultProps: { component: Role.label } },
			MuiGrid: { defaultProps: { component: Role.div } },
			MuiGridLegacy: { defaultProps: { component: Role.div } },
			MuiIcon: { defaultProps: { component: Role.span } },
			MuiIconButton: { defaultProps: { component: Role.button } },
			MuiImageList: { defaultProps: { component: Role.ul } },
			MuiImageListItem: { defaultProps: { component: Role.li } },
			MuiInputAdornment: { defaultProps: { component: Role.div } },
			MuiInputLabel: {
				defaultProps: {
					component: Role.label,
					shrink: true, // Removes label animation and masked border from TextField
				},
			},
			MuiLink: {
				defaultProps: { component: Role.a, color: "textPrimary" },
				variants: [
					{
						props: { color: "primary" },
						style: { color: "var(--stratakit-color-text-accent-strong)" },
					},
					{
						props: { color: "secondary" },
						style: { color: "var(--stratakit-color-text-neutral-primary)" },
					},
					{
						props: { color: "error" },
						style: { color: "var(--stratakit-color-text-critical-base)" },
					},
					{
						props: { color: "info" },
						style: { color: "var(--stratakit-color-text-info-base)" },
					},
					{
						props: { color: "success" },
						style: { color: "var(--stratakit-color-text-positive-base)" },
					},
					{
						props: { color: "warning" },
						style: { color: "var(--stratakit-color-text-attention-base)" },
					},
				],
			},
			MuiList: { defaultProps: { component: Role.ul } },
			MuiListItem: { defaultProps: { component: Role.li } },
			MuiListItemButton: {
				defaultProps: { component: Role.button },
			},
			MuiListSubheader: { defaultProps: { component: Role.li } },
			MuiMenu: { defaultProps: { component: Role.div } },
			MuiMenuItem: { defaultProps: { component: Role.li } },
			MuiMenuList: { defaultProps: { component: Role.ul } },
			MuiMobileStepper: { defaultProps: { component: Role.div } },
			MuiModal: { defaultProps: { component: Role.div } },
			MuiOutlinedInput: {
				defaultProps: {
					notched: false, // Removes masked border from Select
				},
			},
			MuiPaginationItem: {
				defaultProps: {
					component: Role.button,
					slots: {
						previous: ChevronLeftIcon,
						next: ChevronRightIcon,
						first: ChevronLeftDoubleIcon,
						last: ChevronRightDoubleIcon,
					},
				},
			},
			MuiPaper: { defaultProps: { component: Role.div } },
			MuiPopover: { defaultProps: { component: Role.div } },
			MuiRadio: {
				defaultProps: {
					component: Role.span,
					disableRipple: true, // Radio doesn't inherit from ButtonBase
					icon: <></>,
					checkedIcon: <></>,
				},
			},
			MuiRating: { defaultProps: { component: Role.span } },
			MuiSelect: {
				defaultProps: {
					IconComponent: CaretsUpDownIcon,
				},
			},
			MuiSkeleton: { defaultProps: { component: Role.span } },
			MuiSlider: { defaultProps: { component: Role.span } },
			MuiSnackbarContent: { defaultProps: { component: Role.div } },
			MuiStack: { defaultProps: { component: Role.div } },
			MuiStep: { defaultProps: { component: Role.div } },
			MuiStepButton: { defaultProps: { component: Role.button } },
			MuiSwitch: { defaultProps: { component: Role.span } },
			MuiStepper: { defaultProps: { component: Role.div } },
			MuiSvgIcon: { defaultProps: { component: Role.svg } },
			MuiSwipeableDrawer: { defaultProps: { component: Role.div } },
			MuiTab: { defaultProps: { component: Role.button } },
			MuiTabs: { defaultProps: { component: Role.div } },
			MuiTable: { defaultProps: { component: withRenderProp(Role, "table") } },
			MuiTableBody: {
				defaultProps: { component: withRenderProp(Role, "tbody") },
			},
			// MuiTableCell: { defaultProps: { component: withRenderProp(Role, "td") } }, // This dynamically renders as `th` when inside TableHeader
			MuiTableContainer: {
				defaultProps: { component: withRenderProp(Role, "div") },
			},
			MuiTableFooter: {
				defaultProps: { component: withRenderProp(Role, "tfoot") },
			},
			MuiTableHead: {
				defaultProps: { component: withRenderProp(Role, "thead") },
			},
			MuiTablePagination: {
				defaultProps: { component: withRenderProp(Role, "td") },
			},
			MuiTableRow: { defaultProps: { component: withRenderProp(Role, "tr") } },
			MuiTableSortLabel: {
				defaultProps: {
					component: Role.span,
					// TODO: This should use sort-ascending and sort-descending icons, but that requires disabling MUI's built-in icon rotation.
					IconComponent: ArrowDownIcon,
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
			MuiTextField: {
				defaultProps: {
					// component: Role.input, // This dynamically renders as `textarea` when multiline is true
					slots: {
						input: TextFieldInput,
					},
				},
			},
			MuiToggleButton: { defaultProps: { component: Role.button } },
			MuiToolbar: { defaultProps: { component: Role.div } },
			MuiTooltip: {
				defaultProps: {
					describeChild: true,
				},
			},
			MuiTypography: { defaultProps: { component: Role.p } },
		},
	});
}

// ----------------------------------------------------------------------------

/** HOC that sets a default value for the `render` prop. */
function withRenderProp(
	Role: React.ComponentType<RoleProps>,
	DefaultTagName: React.ElementType,
) {
	return React.forwardRef<HTMLDivElement, RoleProps>((props, forwardedRef) => {
		return <Role render={<DefaultTagName />} {...props} ref={forwardedRef} />;
	});
}

// ----------------------------------------------------------------------------

function TextFieldInput(props: React.ComponentProps<typeof OutlinedInput>) {
	const [host, setHost] = React.useState<HTMLElement | null>(null);
	const [shadow, setShadow] = React.useState<ShadowRoot | null>(null);
	React.useEffect(() => {
		if (!host) return;
		if (!host.shadowRoot) {
			host.attachShadow({ mode: "open", slotAssignment: "named" });
		}
		setShadow(host.shadowRoot);
	}, [host]);
	const ref = useMergedRefs(setHost, props.ref);
	return (
		<>
			<OutlinedInput {...props} ref={ref} />
			{shadow &&
				ReactDOM.createPortal(
					<>
						<slot />
						<div role="list">
							<slot name="chips" />
						</div>
						<slot name="end" />
					</>,
					shadow,
				)}
		</>
	);
}

function AutocompleteClearIndicator(props: React.ComponentProps<"button">) {
	const [el, setEl] = React.useState<HTMLButtonElement | null>(null);
	React.useEffect(() => {
		const parentElement = el?.parentElement;
		if (!parentElement) return;
		parentElement.slot = "end";
		return () => {
			parentElement.slot = "";
		};
	}, [el]);
	return <button {...props} ref={setEl} />;
}

function AutocompleteChip(props: React.ComponentProps<typeof Chip>) {
	return <Chip {...props} role="listitem" />;
}

export { createTheme };
