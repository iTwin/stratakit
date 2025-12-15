/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { useHref } from "react-router";
import { Anchor, Text } from "@stratakit/bricks";
import { components } from "./~meta.ts";
import { toKebabCase } from "./~utils.tsx";

import type { MetaFunction } from "react-router";

import styles from "./index.module.css";

// ----------------------------------------------------------------------------

const isDev = import.meta.env.DEV;

export const meta: MetaFunction = () => {
	return [{ title: "StrataKit test app" }];
};

export default function Index() {
	return (
		<main className={styles.main}>
			<hgroup role="group" className={styles.hgroup}>
				<Text variant="display-md" render={<h1 />}>
					StrataKit
				</Text>
				<Text variant="body-md">
					The design system for building complex user interfaces.
				</Text>
			</hgroup>

			<ul className={styles.list}>
				<li>
					<Anchor href="https://github.com/iTwin/design-system">
						GitHub source
					</Anchor>
				</li>
				<li>
					<Anchor href={useHref("/sandbox")}>Sandbox</Anchor>
				</li>
			</ul>

			<Text variant="headline-md" render={<h2 />} className={styles.h2}>
				Foundations
			</Text>

			<ul className={styles.list}>
				<li>
					<Anchor href={useHref("/tokens")}>Tokens list</Anchor>
				</li>

				<li>
					<Anchor href={useHref("/icons")}>Icons list</Anchor>
				</li>

				<li>
					<Anchor href={useHref("/tests/root")}>Root component</Anchor>
				</li>

				<li>
					<Anchor href={useHref("/tests/icon")}>Icon component</Anchor>
				</li>
			</ul>

			<Text variant="headline-md" render={<h2 />} className={styles.h2}>
				MUI
			</Text>

			<ul className={styles.list}>
				<li>
					<Anchor href={useHref("/mui")}>StrataKit MUI theme</Anchor>
				</li>
			</ul>

			<Text variant="headline-md" render={<h2 />} className={styles.h2}>
				Bricks
			</Text>

			<ul className={styles.list}>
				{components.bricks.map((component) => (
					<li key={component}>
						<Anchor href={useHref(`/tests/${toKebabCase(component)}`)}>
							{component}
						</Anchor>
					</li>
				))}
			</ul>

			<Text variant="headline-md" render={<h2 />} className={styles.h2}>
				Structures
			</Text>

			<ul className={styles.list}>
				{components.structures.map((component) => (
					<li key={component}>
						<Anchor href={useHref(`/tests/${toKebabCase(component)}`)}>
							{component}
						</Anchor>
					</li>
				))}
			</ul>

			{isDev && (
				<>
					<Text variant="headline-md" render={<h2 />} className={styles.h2}>
						Private
					</Text>

					<ul className={styles.list}>
						{components.private.map((component) => (
							<li key={component}>
								<Anchor href={useHref(`/tests/${toKebabCase(component)}`)}>
									{component}
								</Anchor>
							</li>
						))}
					</ul>
				</>
			)}
		</main>
	);
}
