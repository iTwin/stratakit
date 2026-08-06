/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

// This file is used to define custom types for MUI components to work with the StrataKit customizations.
// See: https://mui.com/material-ui/customization/theming/#typescript
// See: https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation

import type { RoleProps } from "@ariakit/react/role";
import type { AlertProps } from "@mui/material/Alert";
import type { BadgeProps } from "@mui/material/Badge";
import type { ButtonBaseProps } from "@mui/material/ButtonBase";
import type { IconProps } from "@mui/material/Icon";
import type { IconButtonProps } from "@mui/material/IconButton";
import type {
	CommonProps,
	DefaultComponentProps,
	OverridableTypeMap,
} from "@mui/material/OverridableComponent";
import type { SvgIconProps } from "@mui/material/SvgIcon";
import type { TabProps } from "@mui/material/Tab";
import type { TableCellProps as MuiTableCellProps } from "@mui/material/TableCell";
import type { TabsProps } from "@mui/material/Tabs";
import type {
	TextFieldProps,
	TextFieldVariants,
} from "@mui/material/TextField";
import type { ToggleButtonProps } from "@mui/material/ToggleButton";
import type { TooltipProps } from "@mui/material/Tooltip";
import type {
	TypographyProps,
	TypographyTypeMap,
} from "@mui/material/Typography";
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
	}
}

declare module "@mui/material/Alert" {
	interface AlertPropsVariantOverrides {
		standard: false;
	}

	interface AlertPropsColorOverrides {
		none: true;
	}

	interface AlertOwnProps {
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

	interface ButtonOwnProps {
		LinkComponent?: never;

		/**
		 * The default variant with `@stratakit/mui` is `"contained"`.
		 *
		 * @default 'contained'
		 */
		variant?: "contained" | "outlined" | "text";
	}
}

declare module "@mui/material/BottomNavigationAction" {
	interface BottomNavigationActionOwnProps {
		LinkComponent?: never;
	}
}

declare module "@mui/material/Card" {
	interface CardOwnProps {
		/**
		 * The default variant with `@stratakit/mui` is `"outlined"`.
		 *
		 * @default 'outlined'
		 */
		variant?: "outlined" | "elevation";
	}
}

declare module "@mui/material/CardActionArea" {
	interface CardActionAreaOwnProps {
		LinkComponent?: never;
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

declare module "@mui/material/Dialog" {
	interface DialogProps extends Pick<CommonProps, "render"> {
		/** @deprecated Use `render` prop instead. */
		component?: React.ElementType;
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

	interface FabOwnProps {
		LinkComponent?: never;

		/**
		 * The default color with `@stratakit/mui` is `"primary"`.
		 *
		 * @default 'primary'
		 */
		color?: "primary" | "secondary";
	}
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

	interface IconButtonOwnProps {
		LinkComponent?: never;

		/**
		 * The default color with `@stratakit/mui` is `"secondary"`.
		 *
		 * @default 'secondary'
		 */
		color?: IconButtonProps["color"];

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

declare module "@mui/material/InputBase" {
	interface InputBasePropsColorOverrides {
		secondary: false;
		info: false;
		success: false;
		warning: false;
		error: false;
	}
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

declare module "@mui/material/MenuItem" {
	interface MenuItemOwnProps {
		LinkComponent?: never;
	}
}

declare module "@mui/material/PaginationItem" {
	interface PaginationItemOwnProps {
		LinkComponent?: never;
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

	interface RadioPropsSizeOverrides {
		small: false;
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
	interface SwitchPropsColorOverrides {
		secondary: false;
		default: false;
		info: false;
		success: false;
		warning: false;
		error: false;
	}
}

declare module "@mui/material/StepButton" {
	interface StepButtonOwnProps {
		LinkComponent?: never;
	}
}

declare module "@mui/material/Tab" {
	interface TabOwnProps {
		LinkComponent?: never;

		/**
		 * The default icon position with `@stratakit/mui` is `"start"`.
		 *
		 * @default 'start'
		 */
		iconPosition?: TabProps["iconPosition"];
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
		props: {
			/** @deprecated StrataKit does not support this prop. */ variant?: TextFieldVariants;
		} & Omit<TextFieldProps, "variant">,
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
		/**
		 * The default value with `@stratakit/mui` is `true`.
		 * Use `describeChild={false}` if you want to label the child element.
		 *
		 * @default true
		 */
		describeChild?: boolean;
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

type TypographyOverridableComponentProps<TypeMap extends OverridableTypeMap> =
	TypeMap extends TypographyTypeMap
		? Omit<
				DefaultComponentProps<TypeMap>,
				keyof TypographyHeadingVariantProps
			> &
				TypographyHeadingVariantProps
		: never;

declare module "@mui/material/Typography" {
	interface TypographyPropsColorOverrides {
		secondary: false;
		textTertiary: true;
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
	}
}
