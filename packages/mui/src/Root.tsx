/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { CssBaseline } from "@mui/material";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import { createTheme } from "./createTheme.js";

const theme = createTheme();

interface RootProps {
	children?: React.ReactNode;
}

function Root(props: RootProps) {
	return (
		<StyledEngineProvider enableCssLayer>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				{props.children}
			</ThemeProvider>
		</StyledEngineProvider>
	);
}

// ----------------------------------------------------------------------------

export { Root };
