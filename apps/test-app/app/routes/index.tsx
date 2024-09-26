/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Link, type MetaFunction } from "@remix-run/react";
import { Anchor, Divider } from "@itwin/kiwi-react/bricks";
import styles from "./index.module.css";

const components = [
	"Root",
	"Anchor",
	"Button",
	"Checkbox",
	"Divider",
	"DropdownMenu",
	"Icon",
	"Input",
	"List",
	"Radio",
	"Switch",
	"Tabs",
	"Textarea",
];

export const meta: MetaFunction = () => {
	return [
		{ title: "Kiwi test app" },
		{ name: "color-scheme", content: "dark" },
	];
};

export default function Index() {
	return (
		<main className={styles.main}>
			<h1>Kiwi</h1>
			<Divider />

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
