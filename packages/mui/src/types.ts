/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

// This file is used to define custom types for MUI components to work with the StrataKit customizations.
// See: https://mui.com/material-ui/customization/theming/#typescript
// See: https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation

import type { TextFieldProps, TextFieldVariants } from "@mui/material";
import type * as React from "react";

declare module "@mui/material/Alert" {
	interface AlertPropsVariantOverrides {
		standard: false;
	}

	interface AlertOwnProps {
		/**
		 * The default variant with `@stratakit/mui` is `"outlined"`.
		 *
		 * @default 'outlined'
		 */
		variant?: "filled" | "outlined";
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
		/**
		 * The default variant with `@stratakit/mui` is `"contained"`.
		 *
		 * @default 'contained'
		 */
		variant?: "contained" | "outlined" | "text";
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
}

declare module "@mui/material/IconButton" {
	interface IconButtonPropsColorOverrides {
		info: false;
		success: false;
		warning: false;
		inherit: false;
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

declare module "@mui/material/Radio" {
	interface RadioPropsColorOverrides {
		secondary: false;
		default: false;
		info: false;
		success: false;
		warning: false;
		error: false;
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

declare module "@mui/material/Tooltip" {
	interface TooltipOwnProps {
		/**
		 * The default value with `@stratakit/mui` is `true`.
		 * Use `describeChild={false}` if you want to label the child element.
		 */
		describeChild?: boolean;
	}
}
