/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { CssBaseline } from "@mui/material";
import {
	StyledEngineProvider,
	ThemeProvider,
	useColorScheme,
} from "@mui/material/styles";
import { createTheme } from "./createTheme.js";

const theme = createTheme();

interface RootProps extends React.ComponentPropsWithoutRef<"div"> {
	children?: React.ReactNode;
	/**
	 * The color scheme to use for all components on the page.
	 */
	colorScheme: "light" | "dark";
}

/**
 * Component to be used at the root of your application. It ensures that StrataKit theme for MUI is applied correctly.
 *
 * Example:
 * ```tsx
 * <Root>
 *   <App />
 * </Root>
 * ```
 */
const Root = React.forwardRef<HTMLDivElement, RootProps>(
	(props, forwardedRef) => {
		const { children, colorScheme, ...rest } = props;

		return (
			<StyledEngineProvider enableCssLayer>
				<ThemeProvider theme={theme} defaultMode={colorScheme}>
					<CssBaseline />
					<ColorScheme colorScheme={colorScheme} />
					<div {...rest} ref={forwardedRef}>
						{children}
					</div>
				</ThemeProvider>
			</StyledEngineProvider>
		);
	},
);
DEV: Root.displayName = "Root";

// ----------------------------------------------------------------------------

function ColorScheme({ colorScheme }: Pick<RootProps, "colorScheme">) {
	const { setColorScheme } = useColorScheme();
	React.useEffect(() => {
		setColorScheme(colorScheme);
	}, [colorScheme, setColorScheme]);
	return null;
}
DEV: ColorScheme.displayName = "ColorScheme";

// ----------------------------------------------------------------------------

export { Root };
