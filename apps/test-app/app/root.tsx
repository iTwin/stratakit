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
import globalStyles from "./root.css?url";

export const links: LinksFunction = () => {
	return [
		{ rel: "icon", href: "/favicon.svg", sizes: "any", type: "image/svg+xml" },
		{ rel: "preconnect", href: "https://rsms.me/" },
		{ rel: "stylesheet", href: "https://rsms.me/inter/inter.css" },
		{ rel: "stylesheet", href: globalStyles },
	];
};

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
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
	React.useEffect(function signalPageLoad() {
		document.body.dataset.loaded = "true";
	}, []);

	return (
		<Root>
			<Outlet />
		</Root>
	);
}

export function HydrateFallback() {
	return <p>Loading…</p>;
}
