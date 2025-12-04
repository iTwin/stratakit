/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { CssBaseline } from "@mui/material";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import { createTheme } from "./createTheme.js";

const theme = createTheme();

interface RootProps extends React.ComponentPropsWithoutRef<"div"> {
	children?: React.ReactNode;
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
		const { children, ...rest } = props;

		return (
			<div {...rest} ref={forwardedRef}>
				<StyledEngineProvider enableCssLayer>
					<ThemeProvider theme={theme}>
						<CssBaseline />
						{children}
					</ThemeProvider>
				</StyledEngineProvider>
			</div>
		);
	},
);

// ----------------------------------------------------------------------------

export { Root };
