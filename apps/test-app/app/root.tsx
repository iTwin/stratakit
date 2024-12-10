/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import {
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	type LinksFunction,
} from "react-router";
import { Root } from "@itwin/kiwi-react/bricks";
import { ColorSchemeProvider, useColorScheme } from "./~utils.tsx";
import { useIsRootTest } from "./tests/root/index.tsx";

export const links: LinksFunction = () => {
	return [
		{
			rel: "icon",
			href: "data:image/svg+xml,<svg viewBox='0 -16 20 20' xmlns='http://www.w3.org/2000/svg'><text>🥝</text></svg>",
			type: "image/svg+xml",
		},
		{ rel: "preconnect", href: "https://rsms.me/" },
		{ rel: "stylesheet", href: "https://rsms.me/inter/inter.css" },
	];
};

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<ColorSchemeProvider>
			<LayoutInner>{children}</LayoutInner>
		</ColorSchemeProvider>
	);
}

function LayoutInner({ children }: { children: React.ReactNode }) {
	// Normally we want the return value of `useColorScheme` which adapts to the system preference,
	// However, isRootTest is a special case where for testing the `synchronizeColorSchemeWithHost` prop.
	const isRootTest = useIsRootTest();
	const colorScheme = isRootTest ? "dark light" : useColorScheme();

	return (
		<html lang="en" data-color-scheme={colorScheme}>
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta name="color-scheme" content={colorScheme} />
				<Meta />
				<Links />
			</head>
			<body>
				{children}
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}

export default function App() {
	const colorScheme = useColorScheme();

	React.useEffect(function signalPageLoad() {
		document.body.dataset.loaded = "true";
	}, []);

	return (
		<Root colorScheme={colorScheme} density="dense">
			<Outlet />
		</Root>
	);
}

export async function clientLoader() {
	return true;
}

export function HydrateFallback() {
	const fallbackCss =
		"html { background-color: var(--kiwi-color-bg-surface-primary, #25282c); }";

	return (
		<>
			<style>{fallbackCss}</style>
			<noscript>Please enable JavaScript.</noscript>
		</>
	);
}
