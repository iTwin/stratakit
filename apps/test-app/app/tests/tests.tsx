/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Anchor, IconButton, Text, VisuallyHidden } from "@stratakit/bricks";
import * as React from "react";
import { Link, Outlet, useMatches } from "react-router";
import {
	RightSidebar,
	ThemeSwitcher,
	VariantsListContext,
	useLocalStorage,
} from "~/~utils.tsx";

import chevronLeftIcon from "@stratakit/icons/chevron-left.svg";

import styles from "./tests.module.css";

import type { MetaFunction } from "react-router";

export const meta: MetaFunction = () => {
	return [{ title: "Stratakit tests" }];
};

export default function Page() {
	const matches = useMatches();
	const title = (matches.at(-1)?.handle as { title: string })?.title ?? "Tests";

	const showRightSidebar = useLocalStorage("🥝:right-sidebar") !== "false";

	const [portalTarget, setPortalTarget] = React.useState<HTMLElement | null>(
		null,
	);

	return (
		<div className={styles.page}>
			<main className={styles.main}>
				<VisuallyHidden render={(props) => <h1 {...props} />}>
					{title}
				</VisuallyHidden>

				<VariantsListContext
					value={React.useMemo(() => ({ portalTarget }), [portalTarget])}
				>
					<Outlet />
				</VariantsListContext>
			</main>

			{showRightSidebar ? (
				<RightSidebar
					className={styles.sidebar}
					header={
						<>
							<IconButton
								icon={chevronLeftIcon}
								variant="ghost"
								label="Back to homepage"
								labelVariant="visually-hidden"
								render={<Anchor render={<Link to="/" />} />}
							/>

							<Text variant="body-md">{title}</Text>

							<ThemeSwitcher className={styles.pushRight} />
						</>
					}
				>
					<nav ref={setPortalTarget} />
				</RightSidebar>
			) : null}
		</div>
	);
}
