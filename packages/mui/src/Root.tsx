/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import {
	type Theme,
	ThemeProvider,
	useColorScheme,
} from "@mui/material/styles";
import { Root as StrataKitRoot } from "@stratakit/foundations";
import {
	PortalContext,
	PortalWrapperContext,
	RootContext,
} from "@stratakit/foundations/secret-internals";
import { useSafeContext } from "@stratakit/internal-utils/hooks";
import { forwardRef } from "@stratakit/internal-utils/react";
import cx from "classnames";
import { createTheme } from "./~createTheme.js";
import { StyledEngineProvider } from "./Root.internal.js";
import css from "./styles.css.js";

import type { BaseProps } from "@stratakit/internal-utils/props";

// ----------------------------------------------------------------------------

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

	// The container is passed as a function so that MUI resolves it lazily (inside `Portal`'s layout
	// effect), by which point the ref is guaranteed to be attached.
	const theme = React.useMemo(() => createTheme(), []);
	return (
		<StyledEngineProvider>
			<ThemeProvider
				theme={theme}
				defaultMode={colorScheme}
				storageManager={null}
				disableTransitionOnChange
				noSsr
			>
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
		<PortalWrapperContext.Provider value={wrapPortal}>
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
		</PortalWrapperContext.Provider>
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

function wrapPortal(portal: React.ReactNode) {
	return <PortalThemeProvider>{portal}</PortalThemeProvider>;
}

// ----------------------------------------------------------------------------

function PortalThemeProvider(props: React.PropsWithChildren) {
	const { container: containerEl, unstable_getContainer } =
		useSafeContext(PortalContext);
	const container = unstable_getContainer ?? containerEl;
	const theme = React.useCallback(
		(outerTheme: Theme): Theme => {
			return {
				...outerTheme,
				components: {
					...outerTheme.components,
					MuiModal: {
						...outerTheme.components?.MuiModal,
						defaultProps: {
							...outerTheme.components?.MuiModal?.defaultProps,
							container,
						},
					},
					MuiPopover: {
						...outerTheme.components?.MuiPopover,
						defaultProps: {
							...outerTheme.components?.MuiPopover?.defaultProps,
							// Popover passes down `container` prop to `Modal` https://github.com/mui/material-ui/blob/708ef10e874efa63d2e4972bd902befa1912f2dc/packages/mui-material/src/Popover/Popover.js#L389
							container,
						},
					},
					MuiPopper: {
						...outerTheme.components?.MuiPopper,
						defaultProps: {
							...outerTheme.components?.MuiPopper?.defaultProps,
							container,
						},
					},
				},
			};
		},
		[container],
	);
	return <ThemeProvider theme={theme} {...props} />;
}
DEV: PortalThemeProvider.displayName = "PortalThemeProvider";

// ----------------------------------------------------------------------------

export { Root };
