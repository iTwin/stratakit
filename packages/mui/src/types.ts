/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

// This file is used to define custom types for MUI components to work with the StrataKit customizations.
// See: https://mui.com/material-ui/customization/theming/#typescript
// See: https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation

import type { RoleProps } from "@ariakit/react/role";
import type { AppBarOwnProps as MuiAppBarOwnProps } from "@mui/material/AppBar";
import type { BadgeProps } from "@mui/material/Badge";
import type { BottomNavigationActionOwnProps as MuiBottomNavigationActionOwnProps } from "@mui/material/BottomNavigationAction";
import type { ButtonProps } from "@mui/material/Button";
import type { ButtonBaseProps } from "@mui/material/ButtonBase";
import type { ButtonGroupProps } from "@mui/material/ButtonGroup";
import type { CardProps } from "@mui/material/Card";
import type { CssBaselineProps } from "@mui/material/CssBaseline";
import type { FilledInputProps } from "@mui/material/FilledInput";
import type { FormControlProps } from "@mui/material/FormControl";
import type {} from "@mui/material/Grow";
import type { IconProps } from "@mui/material/Icon";
import type { IconButtonProps } from "@mui/material/IconButton";
import type { InputProps } from "@mui/material/Input";
import type { InputBaseProps } from "@mui/material/InputBase";
import type { MenuProps as MuiMenuProps } from "@mui/material/Menu";
import type { OutlinedInputProps } from "@mui/material/OutlinedInput";
import type {
	CommonProps,
	DefaultComponentProps,
	OverridableTypeMap,
} from "@mui/material/OverridableComponent";
import type { PaginationProps as MuiPaginationProps } from "@mui/material/Pagination";
import type { PaperOwnProps } from "@mui/material/Paper";
import type { SelectProps } from "@mui/material/Select";
import type {} from "@mui/material/Slide";
import type {} from "@mui/material/Stepper";
import type { SvgIconProps } from "@mui/material/SvgIcon";
import type { SwitchProps } from "@mui/material/Switch";
import type { TabProps } from "@mui/material/Tab";
import type { TableCellProps as MuiTableCellProps } from "@mui/material/TableCell";
import type { TabsProps } from "@mui/material/Tabs";
import type { TextFieldProps } from "@mui/material/TextField";
import type { ToggleButtonProps } from "@mui/material/ToggleButton";
import type { TooltipProps } from "@mui/material/Tooltip";
import type {
	TypographyProps,
	TypographyTypeMap,
} from "@mui/material/Typography";
import type {} from "@mui/material/Zoom";
import type * as React from "react";

declare module "@mui/material/OverridableComponent" {
	interface CommonProps {
		/**
		 * Customize the `root` element by passing a React element.
		 *
		 * @example
		 * ```tsx
		 * render={<a href="/example" />}>
		 * ```
		 *
		 * **Note**: When using the `render` prop with a custom component, you must ensure the component is open for extension.
		 * This means it should pass the incoming props, including event listeners and the forwarded `ref` prop, to the underlying element.
		 */
		render?: RoleProps["render"];

		/** @deprecated Use `render` prop instead. */
		component?: React.ElementType;
	}

	interface OverridableComponent<TypeMap extends OverridableTypeMap> {
		// biome-ignore lint/style/useShorthandFunctionType: Interface with call signature is necessary when merging.
		(
			props:
				| DefaultComponentProps<TypeMap>
				| TypographyOverridableComponentProps<TypeMap>,
		): React.JSX.Element | null;
	}
}

declare module "@mui/material/Accordion" {
	interface AccordionHeadingSlotPropsOverrides extends TypographyProps {}

	interface AccordionOwnProps {
		/** @deprecated StrataKit does not support this prop. */
		disableGutters?: boolean | undefined;
	}
}

declare module "@mui/material/AccordionSummary" {
	interface AccordionSummaryOwnProps {
		/**
		 * The placement of the expander icon.
		 *
		 * - `"auto"`: Expander icon is placed to the left when wide, and to the right when narrow.
		 * - `"start"`: Forces expander icon to the left.
		 * - `"end"`: Forces expander icon to the right.
		 *
		 * @default 'auto'
		 */
		markerPlacement?: "auto" | "start" | "end";

		/** @deprecated StrataKit does not support this prop. */
		expandIcon?: React.ReactNode;
	}
}

declare module "@mui/material/Alert" {
	interface AlertPropsVariantOverrides {
		standard: false;
	}

	interface AlertPropsColorOverrides {
		none: true;
	}

	interface AlertProps {
		/**
		 * The default variant with `@stratakit/mui` is `"outlined"`.
		 *
		 * @default 'outlined'
		 */
		variant?: AlertProps["variant"];

		/**
		 * The default severity with `@stratakit/mui` is `"none"`.
		 *
		 * @default 'none'
		 */
		severity?: AlertProps["severity"];

		/**
		 * @deprecated Color is determined by severity
		 */
		color?: AlertProps["color"];
	}
}

declare module "@mui/material/AppBar" {
	interface AppBarPropsColorOverrides {
		inherit: false;
		primary: false;
		secondary: false;
		success: false;
		error: false;
		info: false;
		warning: false;
		default: false;
		transparent: false;
	}

	interface AppBarOwnProps {
		/** @deprecated StrataKit does not support this prop. */
		color?: MuiAppBarOwnProps["color"];
		/** @deprecated StrataKit does not support this prop. */
		elevation?: MuiAppBarOwnProps["elevation"];
		/** @deprecated StrataKit does not support this prop. */
		enableColorOnDark?: MuiAppBarOwnProps["enableColorOnDark"];
		/** @deprecated StrataKit does not support this prop. */
		square?: MuiAppBarOwnProps["square"];
		/** @deprecated StrataKit does not support this prop. */
		variant?: PaperOwnProps["variant"];
	}
}

declare module "@mui/material/Avatar" {
	interface AvatarPropsVariantOverrides {
		circular: false;
		rounded: false;
		square: false;
	}

	interface AvatarOwnProps {
		/** @deprecated `variant` is unnecessary. Only `"circular"` is supported and already the default. */
		variant?: never;
	}
}

declare module "@mui/material/Autocomplete" {
	interface AutocompleteProps<
		Value,
		Multiple extends boolean | undefined,
		DisableClearable extends boolean | undefined,
		FreeSolo extends boolean | undefined,
		ChipComponent extends React.ElementType,
	> {
		/** @deprecated StrataKit does not support this prop. */
		clearIcon?: React.ReactNode;
		/** @deprecated StrataKit does not support this prop. */
		forcePopupIcon?: boolean | "auto";
		/** @deprecated StrataKit does not support this prop. */
		popupIcon?: React.ReactNode;
	}
}

declare module "@mui/material/AvatarGroup" {
	interface AvatarGroupPropsVariantOverrides {
		circular: false;
		rounded: false;
		square: false;
	}

	interface AvatarGroupOwnProps {
		/** @deprecated `variant` is unnecessary. Only `"circular"` is supported and already the default. */
		variant?: never;
	}
}

declare module "@mui/material/Backdrop" {
	interface BackdropOwnProps {
		/** @deprecated Use `open` for `Backdrop`. */
		in?: never;
		/** @deprecated Use `transitionDuration` for `Backdrop`. */
		timeout?: never;
	}
}

declare module "@mui/material/Badge" {
	interface BadgePropsColorOverrides {
		default: false;
	}

	interface BadgeOwnProps {
		/**
		 * When `true`, the badge is rendered in normal document flow,
		 * instead of being positioned relative to its child based on `anchorOrigin` and `overlap` props.
		 *
		 * @default false
		 */
		inline?: boolean;
		/**
		 * The size of the badge.
		 *
		 * This prop can only be applied when `inline` is `true`.
		 *
		 * @default 'medium'
		 */
		size?: "small" | "medium";
		/**
		 * The default color with `@stratakit/mui` is `"secondary"`.
		 *
		 * @default 'secondary'
		 */
		color?: BadgeProps["color"];
		/**
		 * The visual type of the badge styling.
		 *
		 * This prop can only be applied when `inline` is `true`.
		 *
		 * @default 'strong'
		 */
		type?: "outlined" | "muted" | "strong";
	}
}

declare module "@mui/material/ButtonBase" {
	interface ButtonBaseOwnProps {
		/** @deprecated Use `ref` instead. */
		action?: ButtonBaseOwnProps["action"];

		/** @deprecated StrataKit does not support this prop. */
		centerRipple?: ButtonBaseOwnProps["centerRipple"];

		/** @deprecated StrataKit does not support this prop. */
		disableRipple?: ButtonBaseOwnProps["disableRipple"];

		/** @deprecated StrataKit does not support this prop. */
		disableTouchRipple?: ButtonBaseOwnProps["disableTouchRipple"];

		/** @deprecated StrataKit does not support this prop. */
		focusRipple?: ButtonBaseOwnProps["focusRipple"];

		/** @deprecated Use the `render` prop instead. */
		LinkComponent?: ButtonBaseOwnProps["LinkComponent"];

		/** @deprecated StrataKit does not support this prop. */
		TouchRippleProps?: ButtonBaseOwnProps["TouchRippleProps"];

		/** @deprecated StrataKit does not support this prop. */
		touchRippleRef?: ButtonBaseOwnProps["touchRippleRef"];
	}
}

interface ButtonBaseDeprecatedProps {
	/** @deprecated Use `ref` prop instead. */
	action?: ButtonBaseProps["action"];

	/** @deprecated StrataKit does not support this prop. */
	centerRipple?: ButtonBaseProps["centerRipple"];

	/** @deprecated StrataKit does not support this prop. */
	disableRipple?: ButtonBaseProps["disableRipple"];

	/** @deprecated StrataKit does not support this prop. */
	disableTouchRipple?: ButtonBaseProps["disableTouchRipple"];

	/** @deprecated StrataKit does not support this prop. */
	focusRipple?: ButtonBaseProps["focusRipple"];

	/** @deprecated Use the `render` prop instead. */
	LinkComponent?: ButtonBaseProps["LinkComponent"];

	/** @deprecated StrataKit does not support this prop. */
	TouchRippleProps?: ButtonBaseProps["TouchRippleProps"];

	/** @deprecated StrataKit does not support this prop. */
	touchRippleRef?: ButtonBaseProps["touchRippleRef"];
}

declare module "@mui/material/Button" {
	interface ButtonPropsColorOverrides {
		info: false;
		success: false;
		warning: false;
		inherit: false;
	}

	interface ButtonOwnProps extends ButtonBaseDeprecatedProps {
		/** @deprecated StrataKit does not support this prop. */
		disableElevation?: ButtonProps["disableElevation"];

		/** @deprecated StrataKit does not support this prop. */
		disableFocusRipple?: ButtonProps["disableFocusRipple"];

		/** @deprecated Use the `render` prop instead. */
		LinkComponent?: never;

		/**
		 * The default variant with `@stratakit/mui` is `"contained"`.
		 *
		 * @default 'contained'
		 */
		variant?: "contained" | "outlined" | "text";
	}
}

declare module "@mui/material/ButtonGroup" {
	interface ButtonGroupPropsColorOverrides {
		error: false;
		info: false;
		inherit: false;
		primary: false;
		secondary: false;
		success: false;
		warning: false;
	}

	interface ButtonGroupOwnProps {
		/** @deprecated StrataKit does not support this prop. */
		color?: ButtonGroupProps["color"];
	}
}

declare module "@mui/material/BottomNavigationAction" {
	interface BottomNavigationActionOwnProps {
		LinkComponent?: never;
		/** @deprecated Set `showLabels` on `BottomNavigation` instead. */
		showLabel?: MuiBottomNavigationActionOwnProps["showLabel"];
	}
}

declare module "@mui/material/Card" {
	interface CardOwnProps {
		/** @deprecated StrataKit does not support this prop. */
		elevation?: PaperOwnProps["elevation"];

		/** @deprecated StrataKit does not support this prop. */
		raised?: CardProps["raised"];

		/** @deprecated StrataKit does not support this prop. */
		square?: PaperOwnProps["square"];

		/**
		 * The default variant with `@stratakit/mui` is `"outlined"`.
		 *
		 * @default 'outlined'
		 * @deprecated StrataKit does not support this prop.
		 */
		variant?: PaperOwnProps["variant"];
	}
}

declare module "@mui/material/CardActionArea" {
	interface CardActionAreaOwnProps extends ButtonBaseDeprecatedProps {
		LinkComponent?: never;
	}
}

declare module "@mui/material/CardHeader" {
	interface CardHeaderOwnProps {
		/** @deprecated StrataKit does not support this prop. */
		disableTypography?: CardHeaderOwnProps["disableTypography"];
	}
}

declare module "@mui/material/Checkbox" {
	interface CheckboxProps {
		/** @deprecated StrataKit does not support this prop. */
		checkedIcon?: CheckboxProps["checkedIcon"];

		/** @deprecated StrataKit does not support this prop. */
		color?: CheckboxProps["color"];

		/** @deprecated StrataKit does not support this prop. */
		disableRipple?: CheckboxProps["disableRipple"];

		/** @deprecated StrataKit does not support this prop. */
		disableFocusRipple?: boolean;

		/** @deprecated StrataKit does not support this prop. */
		disableTouchRipple?: boolean;

		/** @deprecated StrataKit does not support this prop. */
		icon?: CheckboxProps["icon"];

		/** @deprecated StrataKit does not support this prop. */
		indeterminateIcon?: CheckboxProps["indeterminateIcon"];

		/** @deprecated StrataKit does not support this prop. */
		size?: CheckboxProps["size"];
	}

	interface CheckboxPropsColorOverrides {
		secondary: false;
		default: false;
		info: false;
		success: false;
		warning: false;
		error: false;
	}

	interface CheckboxPropsSizeOverrides {
		small: false;
		large: false;
	}
}

declare module "@mui/material/Chip" {
	interface ChipOwnProps {
		/**
		 * The label of the delete button.
		 *
		 * @default 'Clear'
		 */
		deleteLabel?: string;

		/** @deprecated StrataKit does not support this prop. */
		color?: never;
	}

	interface ChipPropsColorOverrides {
		default: false;
		primary: false;
		secondary: false;
		error: false;
		info: false;
		success: false;
		warning: false;
	}
}

declare module "@mui/material/LinearProgress" {
	interface LinearProgressPropsColorOverrides {
		inherit: false;
		info: false;
	}
}

declare module "@mui/material/CircularProgress" {
	interface CircularProgressOwnProps {
		/**
		 * The default value with `@stratakit/mui` is `true`.
		 *
		 * @default true
		 */
		enableTrackSlot?: boolean;

		/**
		 * The default thickness with `@stratakit/mui` is `5`.
		 *
		 * @default 5
		 */
		thickness?: number;
	}
}

declare module "@mui/material/Collapse" {
	interface CollapseProps {
		/** @deprecated StrataKit does not support this prop. */
		disablePrefersReducedMotion?: boolean;
	}
}

declare module "@mui/material/CssBaseline" {
	/** @deprecated StrataKit does not support this component.  Use `Root` from `@stratakit/mui` instead */
	export default function CssBaseline(
		props: CssBaselineProps,
	): React.JSX.Element;
}

declare module "@mui/material/Dialog" {
	interface DialogProps extends Pick<CommonProps, "render"> {
		/** @deprecated Use `render` prop instead. */
		component?: React.ElementType;
		/** @deprecated StrataKit does not support this prop. */
		PaperComponent?: DialogProps["PaperComponent"];
	}
}

declare module "@mui/material/DialogContent" {
	interface DialogContentProps {
		/** @deprecated StrataKit does not support this prop. */
		dividers?: DialogContentProps["dividers"];
	}
}

declare module "@mui/material/Divider" {
	interface DividerOwnProps {
		/** Add a 1x margin before and after the divider */
		margin?: boolean;
	}
}

declare module "@mui/material/Fab" {
	interface FabPropsColorOverrides {
		info: false;
		success: false;
		warning: false;
		error: false;
		default: false;
		inherit: false;
	}

	interface FabOwnProps extends ButtonBaseDeprecatedProps {
		LinkComponent?: never;

		/** @deprecated StrataKit does not support this prop. */
		disableRipple?: FabOwnProps["disableRipple"];

		/** @deprecated StrataKit does not support this prop. */
		disableFocusRipple?: FabOwnProps["disableFocusRipple"];

		/**
		 * The default color with `@stratakit/mui` is `"primary"`.
		 *
		 * @default 'primary'
		 */
		color?: "primary" | "secondary";
	}
}

declare module "@mui/material/Fade" {
	interface FadeProps {
		/** @deprecated StrataKit does not support this prop. */
		disablePrefersReducedMotion?: boolean;
	}
}

declare module "@mui/material/FilledInput" {
	interface FilledInputProps extends FilledInputDeprecatedProps {}

	/** @deprecated StrataKit does not support this component. */
	// @ts-expect-error -- Default exports cannot be augmented, but the prop deprecations still take effect.
	export default function FilledInput(
		props: Omit<FilledInputProps, keyof FilledInputDeprecatedProps> &
			FilledInputDeprecatedProps,
	): React.JSX.Element;
}

interface FilledInputDeprecatedProps extends InputBaseDeprecatedProps {
	/** @deprecated StrataKit does not support this prop. */
	disableUnderline?: FilledInputProps["disableUnderline"];
	/** @deprecated StrataKit does not support this prop. */
	notched?: FilledInputProps["notched"];
}

declare module "@mui/material/FormControl" {
	interface FormControlPropsColorOverrides {
		error: false;
		info: false;
		primary: false;
		secondary: false;
		success: false;
		warning: false;
	}

	interface FormControlOwnProps {
		/** @deprecated StrataKit does not support this prop. */
		color?: FormControlProps["color"];
		/** @deprecated StrataKit does not support this prop. */
		focused?: FormControlProps["focused"];
		/** @deprecated StrataKit does not support this prop. */
		hiddenLabel?: FormControlProps["hiddenLabel"];
		/** @deprecated StrataKit does not support this prop. */
		variant?: FormControlProps["variant"];
	}
}

interface FormControlDeprecatedProps {
	/** @deprecated StrataKit does not support this prop. */
	color?: FormControlProps["color"];
	/** @deprecated StrataKit does not support this prop. */
	focused?: FormControlProps["focused"];
	/** @deprecated StrataKit does not support this prop. */
	hiddenLabel?: FormControlProps["hiddenLabel"];
	/** @deprecated StrataKit does not support this prop. */
	variant?: FormControlProps["variant"];
}

declare module "@mui/material/FormLabel" {
	interface FormLabelPropsColorOverrides {
		secondary: false;
		info: false;
		success: false;
		warning: false;
		error: false;
	}

	interface FormLabelOwnProps {
		/** @deprecated */
		component?: never; // `@deprecated` marker is not showing up, so using `never` to prevent usage of this prop.
	}
}

declare module "@mui/material/Grow" {
	interface GrowProps {
		/** @deprecated StrataKit does not support this prop. */
		disablePrefersReducedMotion?: boolean;
	}
}

declare module "@mui/material/Icon" {
	/** @deprecated Use an SVG based icon with `Icon` from `@stratakit/mui` */
	// @ts-expect-error -- Default exports cannot be augmented, but the `@deprecated` above still takes effect.
	export default function Icon(props: IconProps): React.JSX.Element | null;
}

declare module "@mui/material/IconButton" {
	interface IconButtonPropsColorOverrides {
		default: false;
		info: false;
		success: false;
		warning: false;
		inherit: false;
	}

	interface IconButtonOwnProps extends ButtonBaseDeprecatedProps {
		LinkComponent?: never;

		/**
		 * The default color with `@stratakit/mui` is `"secondary"`.
		 *
		 * @default 'secondary'
		 */
		color?: IconButtonProps["color"];

		/** @deprecated StrataKit does not support this prop. */
		disableFocusRipple?: IconButtonProps["disableFocusRipple"];

		/**
		 * The accessible name of the button, which is also shown as a tooltip on hover/focus.
		 *
		 * If not specified, the accessible name and tooltip must be wired up manually.
		 */
		label?: string;

		/**
		 * Placement of the tooltip that is shown when the `label` prop is specified.
		 *
		 * @default 'top'
		 */
		labelPlacement?: TooltipProps["placement"];
	}
}

declare module "@mui/material/Input" {
	interface InputProps {
		/** @deprecated StrataKit does not support this prop. */
		disableUnderline?: InputProps["disableUnderline"];
	}

	// @ts-expect-error -- Default exports cannot be augmented, but the prop deprecations still take effect.
	export default function Input(
		props: Omit<InputProps, keyof InputDeprecatedProps> & InputDeprecatedProps,
	): React.JSX.Element;
}

interface InputDeprecatedProps extends InputBaseDeprecatedProps {
	/** @deprecated StrataKit does not support this prop. */
	disableUnderline?: InputProps["disableUnderline"];
}

declare module "@mui/material/InputBase" {
	interface InputBasePropsColorOverrides {
		primary: false;
		secondary: false;
		info: false;
		success: false;
		warning: false;
		error: false;
	}

	interface InputBaseProps {
		/** @deprecated StrataKit does not support this prop. */
		color?: InputBaseProps["color"];

		/** @deprecated StrataKit does not support this prop. */
		disableInjectingGlobalStyles?: InputBaseProps["disableInjectingGlobalStyles"];
	}
}

interface InputBaseDeprecatedProps {
	/** @deprecated StrataKit does not support this prop. */
	color?: InputBaseProps["color"];

	/** @deprecated StrataKit does not support this prop. */
	disableInjectingGlobalStyles?: InputBaseProps["disableInjectingGlobalStyles"];
}

declare module "@mui/material/Link" {
	interface LinkOwnProps {
		/** @deprecated StrataKit does not support this prop. */
		underline?: "none" | "hover" | "always";
	}
}

declare module "@mui/material/ListItemButton" {
	interface ListItemButtonOwnProps {
		LinkComponent?: never;
	}
}

declare module "@mui/material/Menu" {
	interface MenuProps {
		/** @deprecated StrataKit does not support this prop. */
		autoFocus?: MuiMenuProps["autoFocus"];
		/** @deprecated StrataKit does not support this prop. */
		disableAutoFocusItem?: MuiMenuProps["disableAutoFocusItem"];
	}
}

declare module "@mui/material/MenuItem" {
	interface MenuItemOwnProps {
		LinkComponent?: never;
	}
}
declare module "@mui/material/NativeSelect" {
	interface NativeSelectProps {
		/** @deprecated StrataKit does not support this prop. */
		variant?: NativeSelectProps["variant"];
	}

	// @ts-expect-error -- Default exports cannot be augmented, but the prop deprecations still take effect.
	export default function NativeSelect(
		props: {
			/** @deprecated StrataKit does not support this prop. */
			variant?: NativeSelectProps["variant"];
		} & Omit<NativeSelectProps, "variant" | keyof InputDeprecatedProps> &
			InputDeprecatedProps,
	): React.JSX.Element;
}

declare module "@mui/material/OutlinedInput" {
	interface OutlinedInputProps extends OutlinedInputDeprecatedProps {}

	// @ts-expect-error -- Default exports cannot be augmented, but the prop deprecations still take effect.
	export default function OutlinedInput(
		props: Omit<OutlinedInputProps, keyof OutlinedInputDeprecatedProps> &
			OutlinedInputDeprecatedProps,
	): React.JSX.Element;
}

interface OutlinedInputDeprecatedProps extends InputBaseDeprecatedProps {
	/** @deprecated StrataKit does not support this prop. */
	notched?: OutlinedInputProps["notched"];
}

declare module "@mui/material/Pagination" {
	interface PaginationPropsColorOverrides {
		primary: false;
		secondary: false;
		standard: false;
	}

	interface PaginationPropsVariantOverrides {
		text: false;
		outlined: false;
	}

	interface PaginationProps {
		/** @deprecated StrataKit does not support this prop. */
		color?: MuiPaginationProps["color"];
		/** @deprecated StrataKit does not support this prop. */
		shape?: MuiPaginationProps["shape"];
		/** @deprecated StrataKit does not support this prop. */
		variant?: MuiPaginationProps["variant"];
	}
}

declare module "@mui/material/PaginationItem" {
	interface PaginationItemPropsColorOverrides {
		primary: false;
		secondary: false;
		standard: false;
	}

	interface PaginationItemPropsVariantOverrides {
		text: false;
		outlined: false;
	}

	interface PaginationItemOwnProps extends ButtonBaseDeprecatedProps {
		/** @deprecated StrataKit does not support this prop. */
		color?: PaginationItemOwnProps["color"];
		LinkComponent?: never;
		/** @deprecated StrataKit does not support this prop. */
		shape?: PaginationItemOwnProps["shape"];
		/** @deprecated StrataKit does not support this prop. */
		variant?: PaginationItemOwnProps["variant"];
	}
}

declare module "@mui/material/Popover" {
	interface PopoverProps {
		/** @deprecated StrataKit does not support this prop. */
		elevation?: number | undefined;
		/** @deprecated StrataKit does not support this prop. */
		marginThreshold?: number | null | undefined;
	}
}

declare module "@mui/material/Radio" {
	interface RadioProps {
		/** @deprecated StrataKit does not support this prop. */
		checkedIcon?: RadioProps["checkedIcon"];

		/** @deprecated StrataKit does not support this prop. */
		color?: RadioProps["color"];

		/** @deprecated StrataKit does not support this prop. */
		disableRipple?: boolean;

		/** @deprecated StrataKit does not support this prop. */
		disableTouchRipple?: boolean;

		/** @deprecated StrataKit does not support this prop. */
		icon?: RadioProps["icon"];

		/** @deprecated StrataKit does not support this prop. */
		size?: RadioProps["size"];
	}

	interface RadioPropsColorOverrides {
		secondary: false;
		default: false;
		info: false;
		success: false;
		warning: false;
		error: false;
	}

	interface RadioPropsColorOverrides {
		secondary: false;
		default: false;
		info: false;
		success: false;
		warning: false;
		error: false;
	}

	interface RadioPropsSizeOverrides {
		small: false;
	}
}

declare module "@mui/material/ScopedCssBaseline" {
	/** @deprecated StrataKit does not support this component.  Use `Root` from `@stratakit/mui` instead */
	// @ts-expect-error -- Default exports cannot be augmented, but the `@deprecated` above still takes effect.
	export default function ScopedCssBaseline(): React.JSX.Element;
}

declare module "@mui/material/Select" {
	// @ts-expect-error -- Default exports cannot be augmented, but the prop deprecations still take effect.
	export default function Select(
		props: {
			/** @deprecated StrataKit does not support this prop. */
			IconComponent?: SelectProps["IconComponent"];
			/** @deprecated StrataKit does not support this prop. */
			variant?: SelectProps["variant"];
			/** @deprecated StrataKit does not support this prop. */
			disableUnderline?: SelectProps["disableUnderline"];
		} & Omit<
			SelectProps,
			| "IconComponent"
			| "variant"
			| "disableUnderline"
			| keyof OutlinedInputDeprecatedProps
		> &
			OutlinedInputDeprecatedProps,
	): React.JSX.Element;
}

declare module "@mui/material/Slide" {
	interface SlideProps {
		/** @deprecated StrataKit does not support this prop. */
		disablePrefersReducedMotion?: boolean;
	}
}

declare module "@mui/material/Slider" {
	interface SliderPropsColorOverrides {
		secondary: false;
		info: false;
		success: false;
		warning: false;
		error: false;
	}
}

declare module "@mui/material/SvgIcon" {
	/** @deprecated Use `Icon` from `@stratakit/mui` instead. */
	// @ts-expect-error -- Default exports cannot be augmented, but the `@deprecated` above still takes effect.
	export default function SvgIcon(
		props: SvgIconProps,
	): React.JSX.Element | null;
}

declare module "@mui/material/Switch" {
	interface SwitchProps {
		/** @deprecated StrataKit does not support this prop. */
		checkedIcon?: SwitchProps["checkedIcon"];

		/** @deprecated StrataKit does not support this prop. */
		color?: SwitchProps["color"];

		/** @deprecated StrataKit does not support this prop. */
		disableRipple?: boolean;

		/** @deprecated StrataKit does not support this prop. */
		disableFocusRipple?: boolean;

		/** @deprecated StrataKit does not support this prop. */
		disableTouchRipple?: boolean;

		/** @deprecated StrataKit does not support this prop. */
		icon?: SwitchProps["icon"];
	}

	interface SwitchPropsColorOverrides {
		secondary: false;
		default: false;
		info: false;
		success: false;
		warning: false;
		error: false;
	}

	interface SwitchProps {
		/** @deprecated StrataKit does not support this prop. */
		checkedIcon?: SwitchProps["checkedIcon"];

		/** @deprecated StrataKit does not support this prop. */
		disableRipple?: SwitchProps["disableRipple"];

		/** @deprecated StrataKit does not support this prop. */
		icon?: SwitchProps["icon"];
	}
}

declare module "@mui/material/StepButton" {
	interface StepButtonOwnProps {
		LinkComponent?: never;
	}
}

declare module "@mui/material/Stepper" {
	interface StepperOwnProps {
		/** @deprecated StrataKit does not support this prop. */
		connector?: StepperOwnProps["connector"];
	}
}

declare module "@mui/material/Tab" {
	interface TabOwnProps extends ButtonBaseDeprecatedProps {
		LinkComponent?: never;

		/** @deprecated StrataKit does not support this prop. */
		disableFocusRipple?: TabProps["disableFocusRipple"];

		/**
		 * The default icon position with `@stratakit/mui` is `"start"`.
		 *
		 * @default 'start'
		 */
		iconPosition?: TabProps["iconPosition"];
	}
}

declare module "@mui/material/TableCell" {
	interface TableCellProps {
		/** @deprecated StrataKit does not support this prop on `TableCell`. Set on `Table` instead. */
		size?: MuiTableCellProps["size"];
	}
}

declare module "@mui/material/TableSortLabel" {
	interface TableSortLabelOwnProps {
		/** @deprecated StrataKit does not currently support this prop. */
		hideSortIcon?: boolean | undefined;

		/** @deprecated StrataKit does not currently support this prop. */
		IconComponent?:
			| React.JSXElementConstructor<{
					className: string;
			  }>
			| undefined;
	}
}

declare module "@mui/material/Tabs" {
	interface TabsPropsTextColorOverrides {
		inherit: false;
	}

	interface TabsOwnProps {
		/**
		 * The size of the tab buttons.
		 *
		 * @default 'medium'
		 */
		size?: "small" | "medium";

		/** @deprecated StrataKit does not support this prop. */
		indicatorColor?: TabsProps["indicatorColor"];

		/** @deprecated StrataKit does not support this prop. */
		allowScrollButtonsMobile?: boolean;

		/** @deprecated StrataKit does not support this prop. */
		scrollButtons?: TabsProps["scrollButtons"];
	}
}

declare module "@mui/material/TableCell" {
	interface TableCellProps extends Pick<CommonProps, "render"> {
		/** @deprecated Use `render` prop instead. */
		component?: MuiTableCellProps["component"];
	}
}

declare module "@mui/material/TableRow" {
	interface TableRowOwnProps {
		/** The default with `@stratakit/mui` is `true`, except when used inside `TableHead`. */
		hover?: boolean;
	}
}

declare module "@mui/material/TextField" {
	interface TextFieldPropsColorOverrides {
		secondary: false;
		info: false;
		success: false;
		warning: false;
		error: false;
	}

	export default function TextField(
		props: FormControlDeprecatedProps & {
			/** @deprecated StrataKit does not support this prop. */
			select?: TextFieldProps["select"];
		} & Omit<TextFieldProps, "select" | keyof FormControlDeprecatedProps>,
	): React.JSX.Element;
}

declare module "@mui/material/ToggleButton" {
	interface ToggleButtonPropsColorOverrides {
		error: false;
		info: false;
		primary: false;
		secondary: false;
		success: false;
		warning: false;
	}

	interface ToggleButtonOwnProps extends ButtonBaseDeprecatedProps {
		/** @deprecated `color` is unnecessary. Only `"standard"` is supported and already the default. */
		color?: ToggleButtonProps["color"];

		/** @deprecated StrataKit does not support this prop. */
		disableFocusRipple?: ToggleButtonProps["disableFocusRipple"];

		/** @deprecated StrataKit does not support this prop. */
		fullWidth?: ToggleButtonProps["fullWidth"];

		/** @deprecated Use the `render` prop instead. */
		LinkComponent?: never;

		/**
		 * The accessible name of the button, which is also shown as a tooltip on hover/focus.
		 *
		 * Should only be provided when the toggle button does not have visible text content that can serve as an accessible name.
		 */
		label?: IconButtonProps["label"];

		/**
		 * Placement of the tooltip that is shown when the `label` prop is specified.
		 *
		 * @default 'top'
		 */
		labelPlacement?: TooltipProps["placement"];
	}
}

declare module "@mui/material/ToggleButtonGroup" {
	interface ToggleButtonGroupPropsColorOverrides {
		error: false;
		info: false;
		primary: false;
		secondary: false;
		success: false;
		warning: false;
	}

	interface ToggleButtonGroupProps {
		/** @deprecated `color` is unnecessary. Only `"standard"` is supported and already the default. */
		color?: ToggleButtonGroupProps["color"];
	}
}

declare module "@mui/material/Tooltip" {
	interface TooltipProps {
		/** @deprecated StrataKit does not support this prop. */
		arrow?: TooltipProps["arrow"];
		/**
		 * The default value with `@stratakit/mui` is `true`.
		 * Use `describeChild={false}` if you want to label the child element.
		 *
		 * @default true
		 */
		describeChild?: TooltipProps["describeChild"];
		/** @deprecated StrataKit does not support this prop. */
		disableFocusListener?: TooltipProps["disableFocusListener"];
		/** @deprecated StrataKit does not support this prop. */
		disableHoverListener?: TooltipProps["disableHoverListener"];
		/** @deprecated StrataKit does not support this prop. */
		disableInteractive?: TooltipProps["disableInteractive"];
		/** @deprecated StrataKit does not support this prop.  */
		disableTouchListener?: TooltipProps["disableTouchListener"];
		/** @deprecated StrataKit does not support this prop. */
		enterDelay?: TooltipProps["enterDelay"];
		/** @deprecated StrataKit does not support this prop. */
		enterNextDelay?: TooltipProps["enterNextDelay"];
		/** @deprecated StrataKit does not support this prop. */
		enterTouchDelay?: TooltipProps["enterTouchDelay"];
		/** @deprecated StrataKit does not support this prop. */
		followCursor?: TooltipProps["followCursor"];
	}
}

// These headings variants are declared separately from TypographyPropsVariantOverrides,
// so that we can force the `render` prop to be required for these variants.
type TypographyHeadingVariantProps = {
	variant:
		| "display-lg"
		| "display-md"
		| "display-sm"
		| "headline-lg"
		| "headline-md"
		| "headline-sm"
		| "subtitle-lg"
		| "subtitle-md"
		| "subtitle-sm"
		| "h1"
		| "h2"
		| "h3"
		| "h4"
		| "h5"
		| "h6"
		| "subtitle1"
		| "subtitle2";
	/**
	 * When using a heading-like `variant`, the `render` prop must be manually set to the most semantically appropriate element.
	 *
	 * Pick the most appropriate heading element ([`<h1>` to `<h6>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/Heading_Elements))
	 * required to maintain proper [heading structure](https://www.a11yproject.com/posts/how-to-accessible-heading-structure/) in your application.
	 *
	 * @example
	 * ```tsx
	 * render={<h2 />}>
	 * ```
	 *
	 * Do not use heading elements when you simply want to grab attention with large variants.
	 */
	render: NonNullable<RoleProps["render"]>;
};

// These are defined separately so that they only get added to `Typography`,
// and not to inherited components like `Link`.
type TypographyColorProps = {
	color?:
		| TypographyProps["color"]
		| "textSecondary"
		| "textTertiary" // New
		| "textDisabled";
};

type TypographyOverridableComponentProps<TypeMap extends OverridableTypeMap> =
	TypeMap extends TypographyTypeMap
		?
				| (Omit<
						DefaultComponentProps<TypeMap>,
						keyof TypographyHeadingVariantProps | "color"
				  > &
						TypographyHeadingVariantProps &
						TypographyColorProps)
				| (Omit<DefaultComponentProps<TypeMap>, "color"> & TypographyColorProps)
		: never;

declare module "@mui/material/Typography" {
	interface TypographyPropsColorOverrides {
		secondary: false;
		textSecondary: false; // Re-added above via TypographyColorProps.
		textDisabled: false; // Re-added above via TypographyColorProps.
	}

	interface TypographyPropsVariantOverrides {
		// Additional custom variants (non-heading).
		"body-lg": true;
		"body-md": true;
		"body-sm": true;
		"caption-lg": true;
		"caption-md": true;
		"caption-sm": true;
		"mono-sm": true;

		// Stock MUI heading variants are removed here and re-added above, with the `render` prop required.
		h1: false;
		h2: false;
		h3: false;
		h4: false;
		h5: false;
		h6: false;
		subtitle1: false;
		subtitle2: false;
	}

	interface TypographyOwnProps {
		/**
		 * The default variant with `@stratakit/mui` is `"inherit"`.
		 *
		 * @default "inherit"
		 */
		variant?: TypographyProps["variant"];

		/** @deprecated	StrataKit does not support this prop. */
		variantMapping?: TypographyProps["variantMapping"];
	}
}

declare module "@mui/material/Zoom" {
	interface ZoomProps {
		/** @deprecated StrataKit does not support this prop. */
		disablePrefersReducedMotion?: boolean;
	}
}
