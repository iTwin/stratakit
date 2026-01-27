/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { Link, Outlet, useMatches } from "react-router";
import { Text, VisuallyHidden } from "@stratakit/bricks";
import { unstable_NavigationList as NavigationList } from "@stratakit/structures";
import cx from "classnames";
import { components } from "~/~meta.ts";
import { SkipLinkContext } from "~/~navigation.tsx";
import {
	isProduction,
	toKebabCase,
	useLocalStorage,
	VariantsListContext,
	VariantsListProvider,
} from "~/~utils.tsx";

import styles from "./tests.module.css";

// ----------------------------------------------------------------------------

export default function Page() {
	const matches = useMatches();
	const title = (matches.at(-1)?.handle as { title: string })?.title ?? "Tests";
	const currentPath = matches.at(-1)?.pathname ?? "";

	const showNavigation = useLocalStorage("🥝:show-navigation") !== "false";

	return (
		<>
			<title>{`${title} – StrataKit components`}</title>
			<VariantsListProvider>
				<div className={styles.page}>
					{showNavigation ? (
						<SecondaryNavigation currentPath={currentPath} />
					) : null}

					<main
						className={styles.main}
						tabIndex={-1}
						id={React.use(SkipLinkContext)?.id}
					>
						<VisuallyHidden render={(props) => <h1 {...props} />}>
							{title}
						</VisuallyHidden>

						<Outlet />
					</main>
				</div>
			</VariantsListProvider>
		</>
	);
}

// ----------------------------------------------------------------------------

const packages = [
	"bricks",
	"structures",
	"foundations",
	...(!isProduction ? (["private"] as const) : []),
] as const;

function SecondaryNavigation({ currentPath }: { currentPath: string }) {
	const { variants } = React.useContext(VariantsListContext);
	const headingId = React.useId();

	return (
		<nav className={cx(styles.secondaryNav)} aria-labelledby={headingId}>
			<div className={styles.secondaryNavHeader}>
				<Text
					variant="body-lg"
					render={<h2 />}
					className={styles.h2}
					id={headingId}
				>
					StrataKit components
				</Text>
			</div>

			{packages.map((packageName) => {
				const componentList = components[packageName];

				return (
					<React.Fragment key={packageName}>
						<Text variant="body-md" render={<h3 />} className={styles.h3}>
							{packageName}
						</Text>
						<NavigationList.Root
							className={styles.navList}
							items={componentList.map((componentName) => {
								const href = `/tests/${toKebabCase(componentName)}`;
								const isActive = currentPath === href;

								// Display variants for the current component
								if (isActive && variants.length > 0) {
									return (
										<NavigationList.Subgroup
											key={componentName}
											label={componentName}
											defaultOpen
											items={variants.map((variant) => (
												<NavigationList.Anchor
													key={variant.name}
													label={variant.name}
													active={variant.isCurrent}
													render={<Link to={{ search: variant.url }} replace />}
												/>
											))}
										/>
									);
								}

								return (
									<NavigationList.Anchor
										key={componentName}
										label={componentName}
										active={isActive}
										render={<Link to={href} />}
									/>
								);
							})}
						/>
					</React.Fragment>
				);
			})}
		</nav>
	);
}
