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
	useLocation,
	useMatches,
} from "react-router";
import { Root } from "@stratakit/foundations";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppNavigationRail } from "./~navigation.tsx";
import { ColorSchemeProvider, useColorScheme } from "./~utils.tsx";

import type { LinksFunction } from "react-router";

import interVariable from "./fonts/InterVariable.woff2?url";
import interVariableItalic from "./fonts/InterVariable-Italic.woff2?url";

const queryClient = new QueryClient({
	defaultOptions: { queries: { experimental_prefetchInRender: true } }, // https://tanstack.com/query/latest/docs/framework/react/guides/suspense#using-usequerypromise-and-reactuse-experimental
});

export const links: LinksFunction = () => {
	return [
		{
			rel: "icon",
			href: "/favicon.svg",
			type: "image/svg+xml",
		},
		{ rel: "manifest", href: "/manifest.json", crossOrigin: "use-credentials" },
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
	const location = useLocation();

	React.useEffect(function signalPageLoad() {
		document.body.dataset.loaded = "true";
	}, []);

	return (
		<QueryClientProvider client={queryClient}>
			{(() => {
				// MUI theme uses a looser density.
				const density = location.pathname.startsWith("/mui")
					? undefined
					: "dense";

				return (
					<Root
						colorScheme={colorScheme}
						density={density}
						synchronizeColorScheme={false}
						style={{ display: "contents" }}
					>
						<AppNavigationRail mainContent={<Outlet />} />
					</Root>
				);
			})()}
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
