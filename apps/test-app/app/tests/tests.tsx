/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import globalStyles from "./tests.css?url";
import { Anchor, Text, VisuallyHidden } from "@itwin/itwinui-react/bricks";
import {
	Outlet,
	useMatches,
	type MetaFunction,
	type LinksFunction,
	Link,
} from "react-router";
import { RightSidebar, VariantsListContext } from "~/~utils.tsx";
import styles from "./tests.module.css";
import * as React from "react";

export const meta: MetaFunction = () => {
	return [{ title: "Kiwi tests" }];
};

export const links: LinksFunction = () => [
	{ rel: "stylesheet", href: globalStyles },
];

const isTest = import.meta.env.VITE_ENV === "test";

export default function Page() {
	const matches = useMatches();
	const title = (matches.at(-1)?.handle as { title: string })?.title ?? "Tests";

	const [portalTarget, setPortalTarget] = React.useState<HTMLElement | null>(
		null,
	);

	return (
		<div className={styles.page}>
			<main>
				<VisuallyHidden render={(props) => <h1 {...props} />}>
					{title}
				</VisuallyHidden>

				<VariantsListContext
					value={React.useMemo(() => ({ portalTarget }), [portalTarget])}
				>
					<Outlet />
				</VariantsListContext>
			</main>

			{isTest ? null : (
				<RightSidebar
					header={
						<div className={styles.rightSidebarHeader}>
							<Text
								variant="body-md"
								className={styles.rightSidebarHeaderText}
								render={<Anchor render={<Link to="/" />} />}
							>
								Kiwi components
							</Text>
						</div>
					}
					className={styles.rightSidebar}
				>
					<div className={styles.rightSidebarContent}>
						<Text
							variant="body-sm"
							className={styles.rightSidebarComponentName}
						>
							{title}
						</Text>
						<nav ref={setPortalTarget} />
					</div>
				</RightSidebar>
			)}
		</div>
	);
}
