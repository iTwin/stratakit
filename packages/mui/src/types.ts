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
import type { IconButtonProps } from "@mui/material/IconButton";
import type { CommonProps } from "@mui/material/OverridableComponent";
import type { TabProps } from "@mui/material/Tab";
import type { TableCellProps as MuiTableCellProps } from "@mui/material/TableCell";
import type { TabsProps } from "@mui/material/Tabs";
import type {
	TextFieldProps,
	TextFieldVariants,
} from "@mui/material/TextField";
import type { TooltipProps } from "@mui/material/Tooltip";
import type { TypographyProps } from "@mui/material/Typography";
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
		 * The default color with `@stratakit/mui` is `"secondary"`.
		 *
		 * @default 'secondary'
		 */
		color?: BadgeProps["color"];
		/**
		 * The emphasis of the badge styling.
		 *
		 * @default 'strong'
		 */
		emphasis?: "subtle" | "moderate" | "strong";
	}
}

declare module "@mui/material/ButtonBase" {
	interface ButtonBaseOwnProps {
		/** @deprecated Use the `render` prop instead. */
		LinkComponent?: React.ElementType;
	}
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

declare module "@mui/material/CardActionArea" {
	interface CardActionAreaOwnProps {
		LinkComponent?: never;
	}
}

declare module "@mui/material/Checkbox" {
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

		/** @deprecated DO NOT USE */
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

declare module "@mui/material/Dialog" {
	interface DialogProps extends Pick<CommonProps, "render"> {
		/** @deprecated Use `render` prop instead. */
		component?: React.ElementType;
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
		/** @deprecated DO NOT USE */
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

		/** @deprecated DO NOT USE */
		indicatorColor?: TabsProps["indicatorColor"];
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
			/** @deprecated DO NOT USE */ variant?: TextFieldVariants;
		} & Omit<TextFieldProps, "variant">,
	): React.JSX.Element;
}

declare module "@mui/material/ToggleButton" {
	interface ToggleButtonOwnProps {
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

declare module "@mui/material/Typography" {
	interface TypographyPropsColorOverrides {
		secondary: false;
		textTertiary: true;
	}

	interface TypographyOwnProps {
		/**
		 * The default variant with `@stratakit/mui` is `"body2"`.
		 *
		 * @default "body2"
		 */
		variant?: TypographyProps["variant"];
	}
}
