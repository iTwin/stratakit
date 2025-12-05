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
			<StyledEngineProvider enableCssLayer>
				<ThemeProvider theme={theme}>
					<div {...rest} ref={forwardedRef}>
						<CssBaseline />
						{children}
					</div>
				</ThemeProvider>
			</StyledEngineProvider>
		);
	},
);

// ----------------------------------------------------------------------------

export { Root };
