/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { VisuallyHidden } from "@ariakit/react/visually-hidden";
import { ThemeProvider } from "@itwin/itwinui-react";
import { Outlet, useMatches } from "react-router";
import type { MetaFunction } from "react-router";
import styles from "./index.module.css";

export const meta: MetaFunction = () => {
	return [{ title: "Stratakit compat" }];
};

export default function Page() {
	const matches = useMatches();
	const title =
		(matches.at(-1)?.handle as { title: string })?.title ?? "Compatibility";

	return (
		<ThemeProvider
			className={styles.main}
			future={{ themeBridge: true }}
			as="main"
		>
			<VisuallyHidden render={<h1 />}>{title}</VisuallyHidden>

			<Outlet />
		</ThemeProvider>
	);
}
