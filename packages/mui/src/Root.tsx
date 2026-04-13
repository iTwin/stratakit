/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { ThemeProvider, useColorScheme } from "@mui/material/styles";
import { Root as StrataKitRoot } from "@stratakit/foundations";
import {
	forwardRef,
	RootContext,
	useSafeContext,
} from "@stratakit/foundations/secret-internals";
import cx from "classnames";
import { createTheme } from "./~createTheme.js";
import { StyledEngineProvider } from "./Root.internal.js";
import css from "./styles.css.js";

import type { BaseProps } from "@stratakit/foundations/secret-internals";

// ----------------------------------------------------------------------------

const theme = createTheme();

const packageName = "@stratakit/mui";
const key = `${packageName}@${__VERSION__}`;

// ----------------------------------------------------------------------------

type StrataKitRootProps = React.ComponentPropsWithoutRef<typeof StrataKitRoot>;

interface RootProps
	extends BaseProps<"div">,
		Pick<StrataKitRootProps, "unstable_accentColor" | "rootNode"> {
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
 * <Root colorScheme="dark">
 *   <App />
 * </Root>
 * ```
 */
const Root = forwardRef<"div", RootProps>((props, forwardedRef) => {
	const { children, colorScheme, unstable_accentColor, ...rest } = props;

	return (
		<StyledEngineProvider>
			<ThemeProvider theme={theme} defaultMode={colorScheme}>
				<ColorScheme colorScheme={colorScheme} />
				<RootInner
					{...rest}
					colorScheme={colorScheme}
					unstable_accentColor={unstable_accentColor}
					ref={forwardedRef}
				>
					<Styles />
					{children}
				</RootInner>
			</ThemeProvider>
		</StyledEngineProvider>
	);
});
DEV: Root.displayName = "Root";

// ----------------------------------------------------------------------------

interface RootInnerProps
	extends BaseProps<"div">,
		Pick<RootProps, "colorScheme" | "unstable_accentColor" | "rootNode"> {}

/** @private */
const RootInner = forwardRef<"div", RootInnerProps>((props, forwardedRef) => {
	const { children, colorScheme, unstable_accentColor, rootNode, ...rest } =
		props;

	return (
		<StrataKitRoot
			{...rest}
			className={cx("🥝MuiRoot", props.className)}
			portalContainer={<div className="🥝MuiRoot" />}
			colorScheme={colorScheme}
			unstable_accentColor={unstable_accentColor}
			rootNode={rootNode}
			synchronizeColorScheme
			ref={forwardedRef}
		>
			{children}
		</StrataKitRoot>
	);
});
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
