/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Anchor, Divider } from "@stratakit/bricks";
import { Link } from "react-router";
import { compatComponents as components } from "~/components.ts";
import { toKebabCase } from "~/~utils.tsx";
import styles from "./index.module.css";

export const handle = { title: "" };

export default function Page() {
	return (
		<main className={styles.main}>
			<h1>Compatibility</h1>
			<Divider />

			<ul className={styles.list}>
				{components.map((component) => (
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
