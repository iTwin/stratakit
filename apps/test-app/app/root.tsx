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
import { Root as StrataKitRoot } from "@stratakit/foundations";
import { Root as StrataKitMuiRoot } from "@stratakit/mui";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useSettingsStore } from "./~settings.tsx";
import { isProduction, useColorScheme } from "./~utils.tsx";

import type { LinksFunction } from "react-router";

import plexMonoVariableItalic from "./assets/IBM Plex Mono Var-Italic.woff2?url";
import plexMonoVariable from "./assets/IBM Plex Mono Var-Roman.woff2?url";
import interVariable from "./assets/InterVariable.woff2?url";
import interVariableItalic from "./assets/InterVariable-Italic.woff2?url";

const queryClient = new QueryClient();

export const links: LinksFunction = () => {
	const faviconHref = isProduction ? "/favicon.svg" : "/favicon-dev.svg";

	return [
		{
			rel: "icon",
			href: faviconHref,
			type: "image/svg+xml",
		},
		{ rel: "manifest", href: "/manifest.json", crossOrigin: "use-credentials" },
	];
};

export function Layout({ children }: { children: React.ReactNode }) {
	return <LayoutInner>{children}</LayoutInner>;
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
	const accentColor = useSettingsStore((state) => state.accentColor);
	const isRootTest = useIsRootTest();
	const handle = useMatches().at(-1)?.handle as { density?: string };

	React.useEffect(function signalPageLoad() {
		document.body.dataset.loaded = "true";
	}, []);

	return (
		<QueryClientProvider client={queryClient}>
			{(() => {
				// Use `density="dense"` for all routes except those explicitly marked as "loose".
				const density = handle?.density === "loose" ? undefined : "dense";

				// Use the `@stratakit/foundations` Root when testing the Root itself.
				// Use `@stratakit/mui` for everything else.
				const Root = isRootTest ? StrataKitRoot : StrataKitMuiRoot;

				return (
					<Root
						key={isRootTest ? "foundations" : "mui"}
						colorScheme={colorScheme}
						unstable_accentColor={accentColor}
						density={density}
						synchronizeColorScheme={false}
						style={{ display: "contents" }}
					>
						<Outlet />
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
	type RootTestHandle =
		typeof import("~/tests/foundations/root/index.tsx").handle;
	return !!(useMatches()?.at(-1)?.handle as RootTestHandle)?.rootTest;
}

function Fonts() {
	return (
		// Based on https://rsms.me/inter/inter.css and https://github.com/IBM/plex/blob/master/packages/plex-mono-variable/fonts/split/woff2/IBM%20Plex%20Mono%20Var-Roman.css
		<style>{`
@font-face {
  font-family: InterVariable;
  font-style: normal;
  font-weight: 100 900;
  font-display: swap;
  src: url(${interVariable}) format("woff2");
}
@font-face {
  font-family: InterVariable;
  font-style: italic;
  font-weight: 100 900;
  font-display: swap;
  src: url(${interVariableItalic}) format("woff2");
}
@font-face {
  font-family: 'IBM Plex Mono Var';
  font-style: normal;
  font-weight: 100 700;
  font-display: swap;
  src: url(${plexMonoVariable}) format("woff2");
}
@font-face {
  font-family: 'IBM Plex Mono Var';
  font-style: italic;
  font-weight: 100 700;
  font-display: swap;
  src: url(${plexMonoVariableItalic}) format("woff2");
}
`}</style>
	);
}
