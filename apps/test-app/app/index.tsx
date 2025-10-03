/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Link, type MetaFunction } from "react-router";
import { Anchor, Text } from "@stratakit/bricks";
import { components } from "./~meta.ts";
import { toKebabCase } from "./~utils.tsx";

import styles from "./index.module.css";

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
					<Anchor render={<Link to="/sandbox" />}>Sandbox</Anchor>
				</li>
			</ul>

			<Text variant="headline-md" render={<h2 />} className={styles.h2}>
				Foundations
			</Text>

			<ul className={styles.list}>
				<li>
					<Anchor render={<Link to="/tokens" />}>Tokens list</Anchor>
				</li>

				<li>
					<Anchor render={<Link to="/icons" />}>Icons list</Anchor>
				</li>

				<li>
					<Anchor render={<Link to="/tests/root" />}>Root component</Anchor>
				</li>

				<li>
					<Anchor render={<Link to="/tests/icon" />}>Icon component</Anchor>
				</li>
			</ul>

			<Text variant="headline-md" render={<h2 />} className={styles.h2}>
				Bricks
			</Text>

			<ul className={styles.list}>
				{components.bricks.map((component) => (
					<li key={component}>
						<Anchor render={<Link to={`/tests/${toKebabCase(component)}`} />}>
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
						<Anchor render={<Link to={`/tests/${toKebabCase(component)}`} />}>
							{component}
						</Anchor>
					</li>
				))}
			</ul>

			<Text variant="headline-md" render={<h2 />} className={styles.h2}>
				Compat
			</Text>

			<ul className={styles.list}>
				{components.compat.map((component) => (
					<li key={component}>
						<Anchor render={<Link to={`/compat/${toKebabCase(component)}`} />}>
							{component}
						</Anchor>
					</li>
				))}
			</ul>
		</main>
	);
}
