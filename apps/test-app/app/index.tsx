/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import globalStyles from "./index.css?url";
import { Link, type MetaFunction, type LinksFunction } from "react-router";
import { Anchor, Divider } from "@itwin/itwinui-react/bricks";
import styles from "./index.module.css";
import { toKebabCase } from "./~utils.tsx";
import { components } from "./components.ts";

export const meta: MetaFunction = () => {
	return [{ title: "Kiwi test app" }];
};

export const links: LinksFunction = () => [
	{ rel: "stylesheet", href: globalStyles },
];

export default function Index() {
	return (
		<main className={styles.main}>
			<h1>Kiwi</h1>
			<Divider />

			<ul className={styles.list}>
				<li>
					<Anchor render={<Link to="/sandbox" />}>Sandbox</Anchor>
				</li>
				<li>
					<Anchor render={<Link to="/tokens" />}>Tokens</Anchor>
				</li>
				<li>
					<Anchor render={<Link to="/icons" />}>Icons</Anchor>
				</li>
			</ul>

			<ul className={styles.list}>
				{components.map((component) => (
					<li key={component}>
						<Anchor render={<Link to={`/tests/${toKebabCase(component)}`} />}>
							{component}
						</Anchor>
					</li>
				))}
			</ul>
		</main>
	);
}
