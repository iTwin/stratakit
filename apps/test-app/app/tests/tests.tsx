/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Anchor, Text, VisuallyHidden } from "@itwin/itwinui-react/bricks";
import type * as React from "react";
import { Outlet, useMatches, type MetaFunction, Link } from "react-router";
import * as ListItem from "@itwin/itwinui-react-internal/src/bricks/ListItem";
import styles from "./tests.module.css";
import { allDemoVariants } from "./_allVariants.tsx";

export const meta: MetaFunction = () => {
	return [{ title: "Kiwi tests" }];
};

function Layout({
	children,
	title,
}: { children: React.ReactNode; title: string }) {
	const demoVariants = allDemoVariants[title] ?? {};
	const variantFromUrl =
		Object.entries(demoVariants).find(
			([, url]) => window.location.search === encodeURI(url),
		)?.[0] ?? "";

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
					paddingTop: "0",
				}}
			>
				<div
					// biome-ignore lint/a11y/useSemanticElements: // TODO
					role="list"
					style={{
						display: "flex",
						flexDirection: "column",
						height: "100%",
					}}
				>
					<Text variant="body-sm" className={styles.asideHeading}>
						{title} variants
					</Text>

					{Object.entries(demoVariants).map(([title, url]) => (
						<ListItem.Root
							key={title}
							className={styles.listItem}
							data-selected={title === variantFromUrl ? "" : undefined}
						>
							<ListItem.Decoration
								style={{
									width: 24,
									height: "100%",
									position: "relative",
									display: "flex",
									flexDirection: "column",
									justifyContent: "center",
								}}
							>
								<span
									style={{
										width: 0,
										height: "100%",
										border: "1px solid var(--ids-color-border-page-base)",
										position: "absolute",
									}}
								/>
								{title === variantFromUrl ? (
									<span
										style={{
											width: 0,
											height: "62.5%",
											border: "2px solid var(--ids-color-border-accent-strong)",
											borderRadius: "9999px",
											position: "absolute",
										}}
									/>
								) : null}
							</ListItem.Decoration>
							<ListItem.Content
								render={(props) => (
									<Anchor
										render={
											<Link
												className={styles.listItemAnchor}
												to={url.length === 0 ? "?" : url}
												style={{ textDecoration: "none" }}
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
