/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import globalStyles from "./index.css?url";
import { Link, type MetaFunction } from "@remix-run/react";
import { Anchor, Divider } from "@itwin/kiwi-react/bricks";
import styles from "./index.module.css";
import type { LinksFunction } from "@remix-run/node";

const components = [
	"Root",
	"Anchor",
	"Button",
	"Checkbox",
	"Divider",
	"DropdownMenu",
	"Field",
	"Icon",
	"IconButton",
	"Input",
	"List",
	"Radio",
	"Switch",
	"Tabs",
	"Textarea",
	"Tooltip",
];

export const meta: MetaFunction = () => {
	return [
		{ title: "Kiwi test app" },
		{ name: "color-scheme", content: "dark" },
	];
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

function toKebabCase(str: string) {
	return str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}
