/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { useLocation, useSearchParams } from "react-router";
import Typography from "@mui/material/Typography";
import { Icon } from "@stratakit/foundations";

import type * as React from "react";

import errorSvg from "@stratakit/icons/error.svg";
import styles from "./index.module.css";

const modules = import.meta.glob("../../../../../examples/mui/*.tsx", {
	eager: true,
}) as Record<string, { default: React.FC }>;

const examples = Object.entries(modules)
	.map(([key, module]) => {
		const fileName = key.split("/").pop(); // "Button.variants.tsx"
		if (!fileName) {
			throw new Error(`Bad name format for: ${key}`);
		}

		const parts = fileName.split(".");
		const component = parts[0];
		const example = parts[1];
		return {
			key,
			module,
			component,
			example,
		};
	})
	.filter((example) => !!example);

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

function ErrorPage({
	component,
	missing,
}: {
	component?: string;
	missing?: string[];
}) {
	if (!component) {
		return <ErrorPageWrapper />;
	}

	if (!missing) {
		return (
			<ErrorPageWrapper>
				<Typography render={<p />} variant="body-lg">
					No examples for <code>{component}</code>
				</Typography>
			</ErrorPageWrapper>
		);
	}

	return (
		<ErrorPageWrapper>
			<Typography render={<p />} variant="body-lg" gutterBottom>
				Missing the folowing examples for <code>{component}</code>:
			</Typography>
			<Typography render={<ul />} gutterBottom>
				{missing.map((missing) => (
					<li key={missing}>{missing}</li>
				))}
			</Typography>
		</ErrorPageWrapper>
	);
}

export default function MuiExamplePage() {
	const { pathname } = useLocation();
	const [searchParams] = useSearchParams();

	const componentName = pathname.split("/").pop(); // "Button"
	if (!componentName) {
		return <ErrorPage />;
	}
	const only = searchParams.get("only")?.split(","); // ["variants"] or undefined

	const foundExamples = examples.filter((entry) => {
		if (entry.component !== componentName) {
			return false;
		}
		return !only || only.includes(entry.example);
	});

	if (!only && foundExamples.length === 0) {
		return <ErrorPage component={componentName} />;
	}
	if (only && foundExamples.length !== only.length) {
		const missing = only.filter((requested) =>
			foundExamples.every((example) => example.example !== requested),
		);
		return <ErrorPage component={componentName} missing={missing} />;
	}

	return (
		<main data-example="all" className={styles.allExamples}>
			{foundExamples.map((entry) => {
				const Component = entry.module.default;
				return (
					<section
						key={entry.key}
						data-example={entry.example}
						className={styles.example}
					>
						<Component />
					</section>
				);
			})}
		</main>
	);
}
