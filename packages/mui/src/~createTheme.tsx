/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { Role } from "@ariakit/react/role";
import OutlinedInput from "@mui/material/OutlinedInput";
import StepConnector from "@mui/material/StepConnector";
import { createTheme as createMuiTheme } from "@mui/material/styles";
import cx from "classnames";
import {
	MuiAccordionHeadingSlot,
	MuiAccordionRootSlot,
	MuiAccordionSummary,
} from "./~components/MuiAccordion.js";
import { MuiAlert, MuiAlertTitle } from "./~components/MuiAlert.js";
import {
	MuiAutocomplete,
	MuiAutocompleteChip,
	MuiAutocompleteChipDeleteIcon,
	MuiAutocompleteClearIndicator,
} from "./~components/MuiAutocomplete.js";
import { MuiAvatarGroup } from "./~components/MuiAvatarGroup.js";
import { MuiBadge, MuiBadgeBadge } from "./~components/MuiBadge.js";
import { MuiBottomNavigationAction } from "./~components/MuiBottomNavigation.js";
import { MuiButtonBase } from "./~components/MuiButtonBase.js";
import {
	MuiCard,
	MuiCardActionArea,
	MuiCardHeaderTitle,
	MuiCardMedia,
} from "./~components/MuiCard.js";
import {
	MuiChip,
	MuiChipDeleteIcon,
	MuiChipLabel,
} from "./~components/MuiChip.js";
import { MuiDivider } from "./~components/MuiDivider.js";
import { MuiIconButton } from "./~components/MuiIconButton.js";
import { MuiInputLabel } from "./~components/MuiInputLabel.js";
import { MuiMenuListSlot } from "./~components/MuiMenu.js";
import { MuiPopoverPaperSlot } from "./~components/MuiPopover.js";
import { MuiSnackbar } from "./~components/MuiSnackbar.js";
import { MuiStepIcon } from "./~components/MuiStepper.js";
import {
	MuiTableBody,
	MuiTableCell,
	MuiTableHead,
	MuiTableSortLabelIconSlot,
} from "./~components/MuiTable.js";
import { MuiTab, MuiTabs } from "./~components/MuiTabs.js";
import { MuiToggleButton } from "./~components/MuiToggleButton.js";
import { MuiTooltipPopper } from "./~components/MuiTooltip.js";
import { MuiTypography, variantMapping } from "./~components/MuiTypography.js";
import {
	CalendarIcon,
	CaretsUpDownIcon,
	ChevronDownIcon,
	ChevronLeftDoubleIcon,
	ChevronLeftIcon,
	ChevronRightDoubleIcon,
	ChevronRightIcon,
	ClockIcon,
	DismissIcon,
	ErrorIcon,
	InfoIcon,
	SuccessIcon,
	WarningIcon,
} from "./Icon.js";

import type { RoleProps } from "@ariakit/react/role";
import type { ColorSystemOptions } from "@mui/material/styles";
import type {} from "@mui/x-date-pickers/themeAugmentation";

interface CreateThemeArgs {
	/**
	 * The container to use for all portaled components.
	 *
	 * Prefer passing a function, which is lazily resolved by MUI when the portal mounts. Passing the
	 * element directly requires the theme to be recreated once the element becomes available, which
	 * leaves a one-commit window where portals fall back to `<body>`.
	 */
	portalContainer?: HTMLElement | null | (() => HTMLElement | null);
}

/** Creates a StrataKit theme for MUI. Should be used with MUI's `ThemeProvider`. */
function createTheme(args: CreateThemeArgs) {
	const { portalContainer: container } = args;

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
			// These are only hardcoded here as fallback. The CSS will take precedence.
			body1: { fontSize: 16 },
			body2: { fontSize: 14 },
			h1: { fontSize: 20 },
			h2: { fontSize: 18 },
			h3: { fontSize: 16 },
			h4: { fontSize: 14 },
			h5: { fontSize: 12 },
			h6: { fontSize: 12 },
			caption: { fontSize: 12 },
			overline: {
				fontSize: 12,
				textTransform: "none",
			},
			subtitle1: { fontSize: 16 },
			subtitle2: { fontSize: 14 },
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
			MuiAccordion: {
				defaultProps: {
					component: Role.div,
					disableGutters: true,
					slots: {
						root: MuiAccordionRootSlot,
						heading: MuiAccordionHeadingSlot,
					},
					slotProps: {
						region: {
							role: undefined,
							"aria-labelledby": undefined,
						},
					},
				},
			},
			MuiAccordionSummary: {
				defaultProps: {
					component: MuiAccordionSummary,
					nativeButton: false,
					expandIcon: <ChevronDownIcon />,
				},
			},
			MuiAlert: {
				defaultProps: {
					component: MuiAlert,
					variant: "outlined",
					severity: "none",
					role: "group", // Overriding role="alert".
					iconMapping: {
						error: <ErrorIcon />,
						info: <InfoIcon />,
						success: <SuccessIcon />,
						warning: <WarningIcon />,
					},
					slotProps: {
						closeButton: {
							edge: "end",
						},
					},
				},
			},
			MuiAlertTitle: { defaultProps: { component: MuiAlertTitle } },
			MuiAutocomplete: {
				defaultProps: {
					popupIcon: <ChevronDownIcon />,
					clearIcon: <DismissIcon />,
					renderOption: ({ key, ...props }, option, _, ownerState) => (
						<li
							key={key}
							{...props}
							className={cx("MuiMenuItem-root", props.className)}
							data-_sk-dense={ownerState.size === "small" ? "" : undefined}
						>
							{ownerState.getOptionLabel(option)}
						</li>
					),
					slotProps: {
						root: {
							component: MuiAutocomplete,
						},
						paper: {
							elevation: 8, // match Menu elevation
						},
						chip: {
							size: "small",
							component: MuiAutocompleteChip,
							deleteIcon: <MuiAutocompleteChipDeleteIcon />,
						},
						clearIndicator: {
							component: MuiAutocompleteClearIndicator,
							tabIndex: 0, // make clear indicator focusable
							size: "small",
						},
						popupIndicator: {
							size: "small",
						},
					},
				},
			},
			MuiAvatar: {
				defaultProps: {
					component: Role.div,
					slotProps: { img: { draggable: false } },
				},
				styleOverrides: {
					root: {
						width: "var(--_MuiAvatar-size, 2rem)",
						height: "var(--_MuiAvatar-size, 2rem)",
					},
				},
			},
			MuiAvatarGroup: {
				defaultProps: {
					component: MuiAvatarGroup,
					slotProps: {
						surplus: {
							["data-_sk-surplus" as keyof React.HTMLAttributes<HTMLDivElement>]: ``,
						},
					},
				},
			},
			MuiBackdrop: { defaultProps: { component: Role.div } },
			MuiBadge: {
				defaultProps: {
					component: MuiBadge,
					color: "secondary",
					slotProps: { badge: { component: MuiBadgeBadge } },
				},
			},
			MuiBottomNavigation: { defaultProps: { component: Role.div } },
			MuiBottomNavigationAction: {
				defaultProps: {
					component: MuiBottomNavigationAction,
				},
			},
			MuiBreadcrumbs: {
				defaultProps: {
					component: Role.nav,
					separator: <ChevronRightIcon />,
				},
			},
			MuiButtonBase: {
				defaultProps: {
					component: MuiButtonBase,
					disableRipple: true, // https://mui.com/material-ui/getting-started/faq/#how-can-i-disable-the-ripple-effect-globally
				},
			},
			MuiButton: {
				defaultProps: {
					component: MuiButtonBase,
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
			MuiCard: {
				defaultProps: {
					component: MuiCard,
					variant: "outlined",
				},
			},
			MuiCardActionArea: {
				defaultProps: {
					component: MuiCardActionArea,
					slots: { focusHighlight: Nothing },
				},
			},
			MuiCardContent: { defaultProps: { component: Role.div } },
			MuiCardHeader: {
				defaultProps: {
					component: Role.div,
					slotProps: {
						title: {
							// biome-ignore lint/suspicious/noExplicitAny: MUI's CardHeader.title.component is hardcoded to "span"
							component: MuiCardHeaderTitle as any,
						},
					},
				},
			},
			MuiCardMedia: { defaultProps: { component: MuiCardMedia } },
			MuiCheckbox: {
				defaultProps: {
					component: Role.span,
					disableRipple: true, // Checkbox doesn't inherit from ButtonBase
					icon: <Nothing />,
					checkedIcon: <Nothing />,
					indeterminateIcon: <Nothing />,
				},
			},
			MuiChip: {
				defaultProps: {
					component: MuiChip,
					deleteIcon: <MuiChipDeleteIcon />,
					slotProps: {
						label: {
							component: MuiChipLabel,
						},
					},
				},
			},
			MuiCircularProgress: {
				defaultProps: {
					enableTrackSlot: true,
					thickness: 5,
				},
			},
			MuiContainer: { defaultProps: { component: Role.div } },
			MuiDatePicker: {
				defaultProps: {
					slots: {
						openPickerIcon: withExcludedProps(CalendarIcon, ["ownerState"]),
					},
					slotProps: {
						openPickerButton: {
							size: "small",
						},
					},
				},
			},
			MuiDialog: {
				defaultProps: {
					component: Role.div,
					disableScrollLock: true, // Handled in MuiDialog.css instead.
				},
			},
			MuiDialogContentText: {
				defaultProps: {
					component: Role.p,
					variant: "inherit",
				},
			},
			MuiDialogTitle: {
				defaultProps: {
					component: Role.h2,
					variant: "body-lg",
				},
			},
			MuiDivider: { defaultProps: { component: MuiDivider } },
			MuiDrawer: {
				defaultProps: {
					component: Role.div,
					disableScrollLock: true, // Handled in MuiDrawer.css instead.
				},
			},
			MuiFab: {
				defaultProps: {
					component: MuiButtonBase,
					color: "primary",
				},
			},
			MuiFormControl: { defaultProps: { component: Role.div } },
			MuiFormControlLabel: {
				defaultProps: {
					slotProps: {
						typography: { variant: "body-md" },
					},
				},
			},
			MuiFormHelperText: { defaultProps: { component: Role.p } },
			MuiFormLabel: { defaultProps: { component: Role.label as never } },
			MuiGrid: { defaultProps: { component: Role.div } },
			MuiIcon: { defaultProps: { component: Role.span } },
			MuiIconButton: {
				defaultProps: { component: MuiIconButton, color: "secondary" },
			},
			MuiImageList: { defaultProps: { component: Role.ul } },
			MuiImageListItem: { defaultProps: { component: Role.li } },
			MuiInputBase: {
				defaultProps: {
					className: "🥝MuiInput",
				},
			},
			MuiInputAdornment: { defaultProps: { component: Role.div } },
			MuiInputLabel: {
				defaultProps: {
					component: MuiInputLabel,
					shrink: true, // Removes label animation and masked border from TextField
				},
			},
			MuiLink: {
				defaultProps: { component: Role.a, color: "textPrimary" },
			},
			MuiList: { defaultProps: { component: Role.ul } },
			MuiListItem: { defaultProps: { component: Role.li } },
			MuiListItemButton: {
				defaultProps: {
					component: MuiButtonBase,
					nativeButton: true,
				},
			},
			MuiListItemText: {
				defaultProps: {
					slotProps: {
						primary: { variant: "inherit" },
					},
				},
			},
			MuiListSubheader: { defaultProps: { component: Role.li } },
			MuiMenu: {
				defaultProps: {
					component: Role.div,
					slots: {
						list: MuiMenuListSlot,
					},
					slotProps: {
						paper: {
							role: "presentation", // Removes role="dialog"
						},
					},
				},
			},
			MuiMenuItem: { defaultProps: { component: Role.li } },
			MuiMenuList: { defaultProps: { component: Role.ul } },
			MuiMobileStepper: { defaultProps: { component: Role.div } },
			MuiModal: { defaultProps: { component: Role.div, container } },
			MuiOutlinedInput: {
				defaultProps: {
					classes: {
						root: "🥝MuiInput",
					},
					notched: false, // Removes masked border from Select
				},
			},
			MuiPagination: { defaultProps: { shape: "rounded" } },
			MuiPaginationItem: {
				defaultProps: {
					component: MuiButtonBase,
					shape: "rounded",
					slots: {
						previous: ChevronLeftIcon,
						next: ChevronRightIcon,
						first: ChevronLeftDoubleIcon,
						last: ChevronRightDoubleIcon,
					},
				},
			},
			MuiPaper: { defaultProps: { component: Role.div } },
			MuiPickersInputBase: {
				defaultProps: {
					className: "🥝MuiInput",
				},
			},
			MuiPopover: {
				defaultProps: {
					component: Role.div,
					disableScrollLock: true,
					// Popover passes down `container` prop to `Modal` https://github.com/mui/material-ui/blob/708ef10e874efa63d2e4972bd902befa1912f2dc/packages/mui-material/src/Popover/Popover.js#L389
					container,
					slots: {
						paper: MuiPopoverPaperSlot,
					},
					slotProps: {
						paper: { role: "dialog" },
					},
				},
			},
			MuiPopper: {
				defaultProps: {
					container,
				},
			},
			MuiRadio: {
				defaultProps: {
					component: Role.span,
					disableRipple: true, // Radio doesn't inherit from ButtonBase
					icon: <Nothing />,
					checkedIcon: <Nothing />,
				},
			},
			MuiRating: { defaultProps: { component: Role.span } },
			MuiSelect: {
				defaultProps: {
					IconComponent: CaretsUpDownIcon,
				},
			},
			MuiNativeSelect: {
				defaultProps: {
					input: <OutlinedInput />,
					IconComponent: CaretsUpDownIcon,
				},
			},
			MuiSkeleton: { defaultProps: { component: Role.span } },
			MuiSlider: {
				defaultProps: {
					component: Role.span,
					slotProps: {
						valueLabel: {
							className: "🥝MuiTooltip",
						},
					},
				},
			},
			MuiSnackbar: {
				defaultProps: {
					slotProps: {
						root: {
							component: MuiSnackbar,
						},
					},
				},
			},
			MuiSnackbarContent: { defaultProps: { component: Role.div } },
			MuiStack: { defaultProps: { component: Role.div } },
			MuiStep: { defaultProps: { component: Role.li } },
			MuiSwitch: { defaultProps: { component: Role.span } },
			MuiStepper: {
				defaultProps: {
					component: Role.ol,
					connector: <StepConnector aria-hidden="true" />, // hiding the connector to prevent invalid markup
				},
			},
			MuiStepLabel: {
				defaultProps: {
					slotProps: {
						root: { component: Role.div },
						stepIcon: { component: MuiStepIcon },
					},
				},
			},
			MuiSvgIcon: { defaultProps: { component: Role.svg } },
			MuiSwipeableDrawer: { defaultProps: { component: Role.div } },
			MuiTabs: {
				defaultProps: {
					component: MuiTabs,
					allowScrollButtonsMobile: true,
					slotProps: {
						scrollButtons: {
							"aria-hidden": true,
						},
						startScrollButtonIcon: {
							component: ChevronLeftIcon,
						},
						endScrollButtonIcon: {
							component: ChevronRightIcon,
						},
					},
				},
			},
			MuiTab: { defaultProps: { component: MuiTab, iconPosition: "start" } },
			MuiTable: { defaultProps: { component: withRenderProp(Role, "table") } },
			MuiTableBody: {
				defaultProps: {
					component: MuiTableBody,
					role: undefined, // Removing role="rowgroup". See https://github.com/iTwin/stratakit/pull/1361
				},
			},
			MuiTableCell: { defaultProps: { component: MuiTableCell } },
			MuiTableContainer: {
				defaultProps: { component: withRenderProp(Role, "div") },
			},
			MuiTableFooter: {
				defaultProps: { component: withRenderProp(Role, "tfoot") },
			},
			MuiTableHead: {
				defaultProps: { component: MuiTableHead },
			},
			MuiTablePagination: {
				defaultProps: {
					component: withRenderProp(Role, "td"),
					slotProps: { root: { colSpan: 999 } },
				},
			},
			MuiTableRow: { defaultProps: { component: withRenderProp(Role, "tr") } },
			MuiTableSortLabel: {
				defaultProps: {
					component: Role.span,
					slots: {
						icon: MuiTableSortLabelIconSlot,
					},
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
			MuiTextField: { defaultProps: { component: Role.div } },
			MuiTimePicker: {
				defaultProps: {
					slots: {
						openPickerIcon: withExcludedProps(ClockIcon, ["ownerState"]),
					},
					slotProps: {
						openPickerButton: {
							size: "small",
						},
					},
				},
			},
			MuiToggleButton: { defaultProps: { component: MuiToggleButton } },
			MuiToolbar: { defaultProps: { component: Role.div } },
			MuiTooltip: {
				defaultProps: {
					placement: "top",
					describeChild: true,
					slotProps: {
						tooltip: {
							className: "🥝MuiTooltip",
						},
						popper: {
							component: MuiTooltipPopper,
							modifiers: [
								{
									name: "offset",
									options: {
										offset: [0, 2],
									},
								},
								{
									name: "flip",
									options: {
										padding: 4,
									},
								},
								{
									name: "preventOverflow",
									options: {
										padding: 4,
									},
								},
							],
						},
					},
				},
			},
			MuiTypography: {
				defaultProps: {
					variant: "inherit",
					variantMapping,
					component: MuiTypography,
				},
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
						props: { color: "textTertiary" },
						style: { color: "var(--stratakit-color-text-neutral-tertiary)" },
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

/** HOC that "excludes" certain props from being passed to the specified Component. */
function withExcludedProps<Element, Props extends object>(
	Component: React.ComponentType<Props & React.RefAttributes<Element>>,
	excludedProps: readonly string[],
) {
	return React.forwardRef<Element, Props>((props, forwardedRef) => {
		const filteredProps = Object.fromEntries(
			Object.entries(props).filter(([key]) => !excludedProps.includes(key)),
		) as Props;

		return <Component {...filteredProps} ref={forwardedRef} />;
	});
}

// ----------------------------------------------------------------------------

/** Ignores all passed in props and renders nothing. */
function Nothing() {
	return null;
}

// ----------------------------------------------------------------------------

export { createTheme };
