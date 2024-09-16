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
	"Icon",
	"Input",
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

export default function Index() {
	return (
		<main className={styles.main}>
			<h1>Kiwi</h1>
			<Divider />

			<ul className={styles.list}>
				{components.map((component) => (
					<li key={component}>
						<Anchor render={<Link to={`/tests/${component.toLowerCase()}`} />}>
							{component}
						</Anchor>
					</li>
				))}
			</ul>
		</main>
	);
}
