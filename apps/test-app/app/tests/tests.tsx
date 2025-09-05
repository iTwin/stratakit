/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { Link, Outlet, useMatches } from "react-router";
import { Anchor, IconButton, Text, VisuallyHidden } from "@stratakit/bricks";
import cx from "classnames";
import {
	GitHubLink,
	RightSidebar,
	ThemeSwitcher,
	useLocalStorage,
	VariantsListContext,
} from "~/~utils.tsx";

import type { MetaFunction } from "react-router";

import chevronLeftIcon from "@stratakit/icons/chevron-left.svg";
import styles from "./tests.module.css";

export const meta: MetaFunction = () => {
	return [{ title: "StrataKit tests" }];
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

							<div className={cx(styles.actions, styles.pushRight)}>
								<GitHubLink path={matches.at(-1)?.id ?? ""} />
								<ThemeSwitcher />
							</div>
						</>
					}
				>
					<nav ref={setPortalTarget} />
				</RightSidebar>
			) : null}
		</div>
	);
}
