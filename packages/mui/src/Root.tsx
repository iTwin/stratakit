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

	const portalContainerRef = React.useRef<HTMLDivElement | null>(null);

	// The container is passed as a function so that MUI resolves it lazily (inside `Portal`'s layout
	// effect), by which point the ref is guaranteed to be attached.
	//
	// Storing the element in state and passing directly instead would leave the container `undefined` for the first
	// commit, which permanently breaks any `Modal` that is already open on that commit:
	//
	//   1. `Portal` has no container, so it falls back to `document.body`.
	//   2. `ModalManager.add(modal, document.body)` calls `ariaHiddenSiblings`, which sets
	//      `aria-hidden="true"` on every child of `<body>` other than the modal itself — including
	//      our portal container.
	//   3. The ref attaches, the theme is recreated, and on the next commit the modal moves into
	//      the portal container. `ariaHiddenSiblings` only runs when a modal is added or removed,
	//      so nothing re-evaluates it: the container keeps `aria-hidden="true"` for as long as the
	//      modal is open, and the modal is now *inside* it.
	//
	// The modal is then visible on screen but absent from the accessibility tree.
	const theme = React.useMemo(
		() => createTheme({ portalContainer: () => portalContainerRef.current }),
		[],
	);
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
					portalContainerRef={portalContainerRef}
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
		Pick<RootProps, "colorScheme" | "unstable_accentColor" | "rootNode"> {
	portalContainerRef: React.Ref<HTMLDivElement>;
}

/** @private */
const RootInner = forwardRef<"div", RootInnerProps>((props, forwardedRef) => {
	const {
		children,
		colorScheme,
		unstable_accentColor,
		rootNode,
		portalContainerRef,
		...rest
	} = props;

	return (
		<StrataKitRoot
			{...rest}
			className={cx("🥝MuiRoot", props.className)}
			portalContainer={<div className="🥝MuiRoot" ref={portalContainerRef} />}
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
