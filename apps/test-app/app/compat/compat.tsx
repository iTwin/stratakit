/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { VisuallyHidden } from "@ariakit/react/visually-hidden";
import { Outlet, useMatches } from "react-router";
import type { MetaFunction } from "react-router";
import styles from "./compat.module.css";

export const meta: MetaFunction = () => {
	return [{ title: "StrataKit compat" }];
};

export default function Page() {
	const matches = useMatches();
	const title =
		(matches.at(-1)?.handle as { title: string })?.title ?? "Compatibility";

	return (
		<main className={styles.main}>
			<VisuallyHidden render={<h1 />}>{title}</VisuallyHidden>

			<Outlet />
		</main>
	);
}
