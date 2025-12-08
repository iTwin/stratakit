/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import {
	StyledEngineProvider,
	ThemeProvider,
	useColorScheme,
} from "@mui/material/styles";
import { Root as StrataKitRoot } from "@stratakit/foundations";
import {
	RootContext,
	useSafeContext,
} from "@stratakit/foundations/secret-internals";
import cx from "classnames";
import { createTheme } from "./createTheme.js";
import css from "./styles.css.js";

// ----------------------------------------------------------------------------

const packageName = "@stratakit/mui";
const key = `${packageName}@${__VERSION__}`;

// ----------------------------------------------------------------------------

interface RootProps extends React.ComponentPropsWithoutRef<"div"> {
	children?: React.ReactNode;
	/**
	 * The color scheme to use for all components on the page.
	 */
	colorScheme: "light" | "dark";

	/**
	 * The density to use for all descendants of the `Root`.
	 *
	 * Set to `"dense"` for a more compact UI.
	 */
	density?: "dense" | undefined;
}

/**
 * Component to be used at the root of your application. It ensures that StrataKit theme for MUI is applied correctly.
 *
 * Example:
 * ```tsx
 * <Root colorScheme="dark">
 *   <App />
 * </Root>
 * ```
 */
const Root = React.forwardRef<HTMLDivElement, RootProps>(
	(props, forwardedRef) => {
		const { children, colorScheme, density, ...rest } = props;

		const theme = React.useMemo(() => createTheme({ density }), [density]);

		return (
			<StyledEngineProvider enableCssLayer>
				<ThemeProvider theme={theme} defaultMode={colorScheme}>
					<ColorScheme colorScheme={colorScheme} />
					<RootInner
						{...rest}
						colorScheme={colorScheme}
						density={density}
						ref={forwardedRef}
					>
						<Styles />
						{children}
					</RootInner>
				</ThemeProvider>
			</StyledEngineProvider>
		);
	},
);
DEV: Root.displayName = "Root";

// ----------------------------------------------------------------------------

interface RootInnerProps
	extends React.ComponentPropsWithoutRef<"div">,
		Pick<RootProps, "colorScheme" | "density"> {}

/** @private */
const RootInner = React.forwardRef<HTMLDivElement, RootInnerProps>(
	(props, forwardedRef) => {
		const { children, colorScheme, density, ...rest } = props;

		return (
			<StrataKitRoot
				{...rest}
				className={cx("🥝MuiRoot", props.className)}
				colorScheme={colorScheme}
				synchronizeColorScheme
				density={density}
				ref={forwardedRef}
			>
				{children}
			</StrataKitRoot>
		);
	},
);
DEV: RootInner.displayName = "RootInner";

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

function Styles() {
	const rootContext = useSafeContext(RootContext);

	if (!rootContext.versions?.has(packageName))
		rootContext.versions?.set(packageName, __VERSION__);

	const { rootNode, loadStyles } = rootContext;

	React.useInsertionEffect(() => {
		if (!rootNode || !loadStyles) return;
		const { cleanup } = loadStyles(rootNode, { css, key });
		return cleanup;
	}, [rootNode, loadStyles]);

	return null;
}

// ----------------------------------------------------------------------------

export { Root };
