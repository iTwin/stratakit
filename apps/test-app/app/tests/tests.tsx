/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import globalStyles from "./tests.css?url";
import {
	Anchor,
	IconButton,
	Text,
	VisuallyHidden,
} from "@itwin/itwinui-react/bricks";
import chevronLeftIcon from "@itwin/itwinui-icons/chevron-left.svg";
import {
	Outlet,
	useMatches,
	type MetaFunction,
	type LinksFunction,
	Link,
} from "react-router";
import {
	RightSidebar,
	ThemeSwitcher,
	useLocalStorage,
	VariantsListContext,
} from "~/~utils.tsx";
import styles from "./tests.module.css";
import * as React from "react";

export const meta: MetaFunction = () => {
	return [{ title: "Kiwi tests" }];
};

export const links: LinksFunction = () => [
	{ rel: "stylesheet", href: globalStyles },
];

export default function Page() {
	const matches = useMatches();
	const title = (matches.at(-1)?.handle as { title: string })?.title ?? "Tests";

	const showRightSidebar = useLocalStorage("🥝:right-sidebar") !== "false";

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

			{showRightSidebar ? (
				<RightSidebar
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
