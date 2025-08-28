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
	useMatches,
} from "react-router";
import { PortalContainer, Root } from "@stratakit/foundations";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { overrideAccentColors } from "./~overrideAccentColors.ts";
import { ColorSchemeProvider, useColorScheme } from "./~utils.tsx";

import type { LinksFunction } from "react-router";

import interVariable from "./fonts/InterVariable.woff2?url";
import interVariableItalic from "./fonts/InterVariable-Italic.woff2?url";
import manifestUrl from "./manifest.json?url";

const queryClient = new QueryClient({
	defaultOptions: { queries: { experimental_prefetchInRender: true } }, // https://tanstack.com/query/latest/docs/framework/react/guides/suspense#using-usequerypromise-and-reactuse-experimental
});

export const links: LinksFunction = () => {
	return [
		{
			rel: "icon",
			href: "data:image/svg+xml,<svg viewBox='0 -16 20 20' xmlns='http://www.w3.org/2000/svg'><text>🥝</text></svg>",
			type: "image/svg+xml",
		},
		{ rel: "manifest", href: manifestUrl },
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
	const preferredColorScheme = useColorScheme();

	// Normally we want the return value of `useColorScheme` which adapts to the system preference,
	// However, we want to set a static value when testing the `/tests/root/` route.
	const colorScheme = useIsRootTest() ? "dark light" : preferredColorScheme;

	return (
		<html lang="en" data-color-scheme={colorScheme}>
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta name="color-scheme" content={colorScheme} />
				<Meta />
				<Links />
				<Fonts />
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

	React.useEffect(() => {
		return overrideAccentColors({
			colorScheme,
			selectors: ["[data-app-root]", "[data-app-root-portal]"],
		});
	}, [colorScheme]);
	return (
		<QueryClientProvider client={queryClient}>
			<Root colorScheme={colorScheme} density="dense" data-app-root>
				<Outlet />
				<PortalContainer data-app-root-portal />
			</Root>
		</QueryClientProvider>
	);
}

export async function clientLoader() {
	return true;
}

export function HydrateFallback() {
	const fallbackCss =
		"html { background-color: var(--stratakit-color-bg-page-base, #1F2023); }";

	return (
		<>
			<style>{fallbackCss}</style>
			<noscript>Please enable JavaScript.</noscript>
		</>
	);
}

function useIsRootTest() {
	type RootTestHandle = typeof import("~/tests/root/index.tsx").handle;
	return !!(useMatches()?.at(-1)?.handle as RootTestHandle)?.rootTest;
}

function Fonts() {
	return (
		// Based on https://rsms.me/inter/inter.css
		<style>{`
@font-face {
  font-family: InterVariable;
  font-style: normal;
  font-weight 100 900;
  font-display: swap;
  src: url(${interVariable}) format("woff2");
}
@font-face {
  font-family: InterVariable;
  font-style: italic;
  font-weight 100 900;
  font-display: swap;
  src: url(${interVariableItalic}) format("woff2");
}
`}</style>
	);
}
