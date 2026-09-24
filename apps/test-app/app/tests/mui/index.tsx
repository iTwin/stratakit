/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { useParams } from "react-router";
import Typography from "@mui/material/Typography";
import { Icon } from "@stratakit/foundations";

import type * as React from "react";

import errorSvg from "@stratakit/icons/error.svg";
import styles from "./index.module.css";

// Eagerly load all story files so they're available synchronously.
const storyModules = import.meta.glob("./*.spec.stories.tsx", {
	eager: true,
}) as Record<string, Record<string, React.ComponentType>>;

export default function GalleryPage() {
	const { component, story } = useParams<{
		package: string;
		component: string;
		story: string;
	}>();

	if (!component || !story) {
		return <ErrorPage message="Invalid gallery URL." />;
	}

	// Find the matching story module: ../tests/mui/{component}.story.tsx
	const moduleKey = Object.keys(storyModules).find((key) => {
		const segments = key.split("/");
		const file = segments.at(-1); // e.g. "Button.spec.stories.tsx"

		return file === `${component}.spec.stories.tsx`;
	});

	if (!moduleKey) {
		return (
			<ErrorPage
				message={
					<>
						Missing story file for <code>{component}</code>. Check that{" "}
						<code>tests/mui/{component}.spec.stories.tsx</code> exists.
					</>
				}
			/>
		);
	}

	const module = storyModules[moduleKey];
	const Story = module[story];

	if (!Story) {
		const available = Object.keys(module).filter((k) => k !== "default");
		return (
			<MissingStoryErrorPage
				component={component}
				missing={story}
				stories={available}
			/>
		);
	}

	return <Story />;
}

function ErrorPageWrapper({ children }: React.PropsWithChildren) {
	return (
		<main className={styles.errorPage}>
			<Typography
				variant="headline-md"
				render={<h1 className={styles.heading} />}
				gutterBottom
			>
				<Icon href={errorSvg} size="large" />
				<span>Not Found</span>
			</Typography>
			{children}
		</main>
	);
}

function ErrorPage({ message }: { message: React.ReactNode }) {
	return (
		<ErrorPageWrapper>
			<Typography render={<p />} variant="body-lg">
				{message}
			</Typography>
		</ErrorPageWrapper>
	);
}

function MissingStoryErrorPage({
	component,
	missing,
	stories,
}: {
	component: string;
	missing: string;
	stories: string[];
}) {
	return (
		<ErrorPageWrapper>
			<Typography render={<p />} variant="body-lg" gutterBottom>
				Missing story <code>{missing}</code> for <code>{component}</code>.
				Available stories are:
			</Typography>
			<Typography render={<ul />} gutterBottom>
				{stories.map((story) => (
					<li key={story}>{story}</li>
				))}
			</Typography>
		</ErrorPageWrapper>
	);
}
