/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { useHref } from "react-router";
import { Anchor, Text } from "@stratakit/bricks";
import { SkipLinkContext } from "./~navigation.tsx";

import type { MetaFunction } from "react-router";

import styles from "./index.module.css";

// ----------------------------------------------------------------------------

export const meta: MetaFunction = () => {
	return [{ title: "StrataKit test app" }];
};

export default function Index() {
	return (
		<main
			className={styles.main}
			tabIndex={-1}
			id={React.use(SkipLinkContext)?.id}
		>
			<hgroup role="group" className={styles.hgroup}>
				<Text variant="display-md" render={<h1 />}>
					StrataKit
				</Text>
				<Text variant="body-md">
					The design system for complex user interfaces.
				</Text>
			</hgroup>

			<ul className={styles.list}>
				<li>
					<Anchor href="https://github.com/iTwin/design-system">
						GitHub source
					</Anchor>
				</li>
				<li>
					<Anchor href="/docs">Documentation</Anchor>
				</li>
			</ul>

			<ul className={styles.list}>
				<li>
					<Anchor href={useHref("/tokens")}>Tokens</Anchor>
				</li>
				<li>
					<Anchor href={useHref("/icons")}>Icons</Anchor>
				</li>
				<li>
					<Anchor href={useHref("/mui")}>StrataKit MUI theme</Anchor>
				</li>
			</ul>

			<ul className={styles.list}>
				<li>
					<Anchor href={useHref("/tests/anchor")}>StrataKit components</Anchor>
				</li>
				<li>
					<Anchor href={useHref("/sandbox")}>Sandbox</Anchor>
				</li>
			</ul>
		</main>
	);
}
