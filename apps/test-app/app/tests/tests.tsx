/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import globalStyles from "./tests.css?url";
import { Anchor, VisuallyHidden } from "@itwin/itwinui-react/bricks";
import type * as React from "react";
import {
	Outlet,
	useMatches,
	type MetaFunction,
	type LinksFunction,
	Link,
} from "react-router";
import * as ListItem from "@itwin/itwinui-react-internal/src/bricks/ListItem";

export const meta: MetaFunction = () => {
	return [{ title: "Kiwi tests" }];
};

export const links: LinksFunction = () => [
	{ rel: "stylesheet", href: globalStyles },
];

function Layout({
	children,
	title,
}: { children: React.ReactNode; title: string }) {
	const variants = {
		Default: "",
		Disabled: "?disabled",
		Visual: "?visual",
	};

	const variantFromUrl =
		Object.entries(variants).find(
			([, url]) => window.location.search === url,
		)?.[0] ?? Object.keys(variants)[0];

	return (
		<div
			style={{
				display: "grid",
				gridTemplateColumns: "8fr 2fr",
				height: "100vh",
				width: "100vw",
			}}
		>
			<div style={{ padding: "1rem" }}>{children}</div>

			<aside
				style={{
					overflow: "auto",
					backgroundColor: "var(--ids-color-bg-page-depth)",
					padding: "1rem",
				}}
			>
				<div
					// biome-ignore lint/a11y/useSemanticElements: // TODO
					role="list"
					style={{
						display: "flex",
						flexDirection: "column",
						gap: 4,
						height: "100%",
					}}
				>
					{Object.entries(variants).map(([title, url]) => (
						<ListItem.Root
							key={title}
							style={{
								backgroundColor:
									title === variantFromUrl
										? "var(--ids-color-bg-glow-on-surface-accent-pressed)"
										: undefined,
							}}
						>
							<ListItem.Content
								render={(props) => (
									<Anchor
										render={
											<Link
												to={url.length === 0 ? "?" : url}
												style={{
													textDecoration: "none",
												}}
											/>
										}
										{...props}
									/>
								)}
							>
								{title}
							</ListItem.Content>
						</ListItem.Root>
					))}
				</div>
			</aside>
		</div>
	);
}

export default function Page() {
	const matches = useMatches();
	const title = (matches.at(-1)?.handle as { title: string })?.title ?? "Tests";

	return (
		<>
			<main>
				<VisuallyHidden render={(props) => <h1 {...props} />}>
					{title}
				</VisuallyHidden>

				<Layout title={title}>
					<Outlet />
				</Layout>
			</main>
		</>
	);
}
