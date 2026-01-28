/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { useHref, useLocation } from "react-router";
import { Button, Divider, IconButton } from "@stratakit/bricks";
import { Icon } from "@stratakit/foundations";
import { unstable_NavigationRail as NavigationRail } from "@stratakit/structures";
import {
	isProduction,
	useColorScheme,
	useIsWideScreen,
	useLocalStorage,
	useSetColorScheme,
} from "./~utils.tsx";

import svgDashboard from "@stratakit/icons/dashboard.svg";
import svgDocumentation from "@stratakit/icons/documentation.svg";
import svgForm from "@stratakit/icons/form.svg";
import svgMoon from "@stratakit/icons/moon.svg";
import svgProducts from "@stratakit/icons/products.svg";
import svgSun from "@stratakit/icons/sun.svg";
import svgSwatch from "@stratakit/icons/swatch.svg";
import strataKitLogo from "internal/stratakit-logo.svg";
import styles from "./~navigation.module.css";

// ----------------------------------------------------------------------------

// TODO: Find better icons for some of these items
const navItems = [
	[
		{ path: "/tokens", label: "Tokens", icon: `${svgSwatch}#icon-large` },
		{ path: "/icons", label: "Icons", icon: `${svgProducts}#icon-large` },
		{ path: "/mui", label: "MUI Theme", icon: <MuiLogo /> },
		{
			path: "/tests",
			label: "StrataKit components",
			icon: `${svgForm}#icon-large`,
			startingPath: "/tests/anchor", // Use first component starting path to avoid landing on empty page
		},
		{ path: "/sandbox", label: "Sandbox", icon: `${svgDashboard}#icon-large` },
	],
	[
		isProduction && {
			path: "/docs",
			label: "Documentation",
			icon: `${svgDocumentation}#icon-large`,
		},
	].filter(Boolean),
] as {
	path: string;
	label: string;
	icon: React.JSX.Element | string;
	startingPath?: string;
}[][];

// ----------------------------------------------------------------------------

export const SkipLinkContext = React.createContext<{ id: string } | null>(null);

/** ID for the nav element, useful for cross-document view transitions. */
export const appNavId = "app-navigation-rail";

// ----------------------------------------------------------------------------

interface AppNavigationRailProps {
	mainContent: React.ReactNode;
}

export function AppNavigationRail(props: AppNavigationRailProps) {
	const { mainContent } = props;

	const location = useLocation();
	const isWideScreen = useIsWideScreen();

	const colorScheme = useColorScheme();
	const setColorScheme = useSetColorScheme();

	const showNavigation =
		useLocalStorage("🥝:show-navigation") !== "false" && isWideScreen;

	const mainContentId = React.useId();
	const deferredMainContent = React.useDeferredValue(mainContent, null); // Defer rendering main content

	// Hide navigation rail if localStorage flag is set
	if (!showNavigation) {
		return <>{deferredMainContent}</>;
	}

	return (
		<div className={styles.layout}>
			<NavigationRail.Root className={styles.appNav} id={appNavId}>
				<NavigationRail.Header>
					<Button
						className={styles.skipLink}
						render={<a href={`#${mainContentId}`} />}
					>
						Skip to content
					</Button>
					<IconButton
						label="Home"
						icon={<Icon href={`${strataKitLogo}#icon`} size="large" />}
						render={<RegularLink to="/" />}
						variant="ghost"
						className={styles.homeLink}
					/>
					<NavigationRail.ToggleButton />
				</NavigationRail.Header>

				<NavigationRail.Content>
					{navItems.length > 0 &&
						navItems.map((group, groupIndex) => (
							<React.Fragment key={groupIndex}>
								<NavigationRail.List>
									{group.map((item) => {
										const isActive = location.pathname.startsWith(item.path);

										return (
											<NavigationRail.ListItem key={item.path}>
												<NavigationRail.Anchor
													icon={item.icon}
													label={item.label}
													active={isActive}
													render={
														<RegularLink to={item.startingPath || item.path} />
													}
												/>
											</NavigationRail.ListItem>
										);
									})}
								</NavigationRail.List>
								{groupIndex < navItems.length - 1 && <Divider presentational />}
							</React.Fragment>
						))}

					<NavigationRail.Footer>
						<Divider />
						<NavigationRail.Button
							label="Toggle color scheme"
							icon={colorScheme === "dark" ? svgSun : svgMoon}
							onClick={() => {
								setColorScheme(colorScheme === "dark" ? "light" : "dark");
							}}
						/>
					</NavigationRail.Footer>
				</NavigationRail.Content>
			</NavigationRail.Root>

			<div className={styles.mainContent}>
				<SkipLinkContext value={{ id: mainContentId }}>
					{/* Prevent focus outline from getting clipped */}
					<style>{`[id=${mainContentId}] { outline-offset: -4px; }`}</style>{" "}
					{deferredMainContent}
				</SkipLinkContext>
			</div>
		</div>
	);
}

// ----------------------------------------------------------------------------

function MuiLogo() {
	return (
		<Icon
			render={
				<svg className={styles.muiLogo} viewBox="0 0 24 24" fill="none">
					<path
						fill="currentColor"
						fillRule="evenodd"
						d="M24 5.601V1.592a.344.344 0 0 0-.514-.298l-2.64 1.508a.69.69 0 0 0-.346.597v4.009c0 .264.285.43.514.298l2.64-1.508A.69.69 0 0 0 24 5.6ZM.515 1.295l7.643 4.383a.69.69 0 0 0 .684 0l7.643-4.383a.344.344 0 0 1 .515.298v12.03c0 .235-.12.453-.319.58l-4.65 2.953 3.11 1.832c.22.13.495.127.713-.009l4.61-2.878a.34.34 0 0 0 .161-.292v-4.085a.69.69 0 0 1 .362-.606l2.507-1.346a.344.344 0 0 1 .506.303v7.531c0 .244-.13.47-.34.593l-7.834 4.592a.69.69 0 0 1-.71-.009l-5.953-3.681A.34.34 0 0 1 9 18.808v-3.624c0-.115.057-.222.153-.286l4.04-2.694a.69.69 0 0 0 .307-.572v-4.39a.137.137 0 0 0-.208-.117l-4.44 2.664a.69.69 0 0 1-.705.002L3.645 7.123a.138.138 0 0 0-.208.118v7.933a.344.344 0 0 1-.52.295L.5 14.019c-.31-.186-.5-.522-.5-.884V1.593c0-.264.286-.43.515-.298"
						clipRule="evenodd"
					/>
				</svg>
			}
		/>
	);
}

// ----------------------------------------------------------------------------

interface RegularLinkProps
	extends Omit<React.ComponentPropsWithoutRef<"a">, "href"> {
	to: string;
}

/** Wrapper over `<a>` that resolves URLs using react-router.  */
function RegularLink({ to, ...props }: RegularLinkProps) {
	return <a href={useHref(to)} {...props} />;
}
