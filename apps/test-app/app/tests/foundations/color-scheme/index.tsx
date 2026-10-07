/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { ColorScheme, Root, useColorScheme } from "@stratakit/foundations";
import { definePage } from "~/~utils.tsx";

import type * as React from "react";

import styles from "./index.module.css";

export const handle = { title: "ColorScheme" };

function TestColorScheme({
	children,
	label,
}: { label: string } & React.PropsWithChildren) {
	const scheme = useColorScheme();
	return (
		<div className={styles.themeTest}>
			<dl>
				<dt>{label}</dt>
				<dd>{scheme.scheme}</dd>
				<dd>
					{scheme.unstable_accentColor}
					<span className={styles.accentSwatch} />
				</dd>
			</dl>
			{children}
		</div>
	);
}

function InvertColorScheme({ children }: React.PropsWithChildren) {
	const { scheme } = useColorScheme();
	return (
		<ColorScheme scheme={scheme === "light" ? "dark" : "light"}>
			{children}
		</ColorScheme>
	);
}

export default definePage(function Page() {
	const { scheme } = useColorScheme();

	return (
		<Root colorScheme={scheme} density="dense" data-testid="all">
			<TestColorScheme label="from page" />
			<InvertColorScheme>
				<TestColorScheme label="inverted">
					<InvertColorScheme>
						<TestColorScheme label="double inverted" />
					</InvertColorScheme>
				</TestColorScheme>
			</InvertColorScheme>

			<ColorScheme scheme="light">
				<TestColorScheme label="always light" />
			</ColorScheme>
			<ColorScheme scheme="dark">
				<TestColorScheme label="always dark" />
			</ColorScheme>
			<ColorScheme scheme={scheme} unstable_accentColor="cobalt">
				<TestColorScheme label="always cobalt" />
			</ColorScheme>
			<ColorScheme scheme={scheme} unstable_accentColor="aurora">
				<TestColorScheme label="always aurora" />
			</ColorScheme>
		</Root>
	);
});
