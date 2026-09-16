/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { useHref, useLocation } from "react-router";
import { Button, Divider, IconButton } from "@stratakit/bricks";
import { Icon } from "@stratakit/foundations";
import { unstable_NavigationRail as NavigationRail } from "@stratakit/structures";
import { SettingsDialog } from "./~settings.tsx";
import { isProduction, useIsWideScreen, useLocalStorage } from "./~utils.tsx";
import { SvgStrataKitLogo } from "./assets/SvgStrataKitLogo.tsx";

import svgComponents from "@stratakit/icons/components.svg";
import svgDocumentation from "@stratakit/icons/documentation.svg";
import svgSettings from "@stratakit/icons/settings.svg";
import styles from "./~navigation.module.css";
import svgIcons from "./assets/icons.svg";
import svgMui from "./assets/mui.svg";
import svgSandbox from "./assets/sandbox.svg";
import svgTokens from "./assets/tokens.svg";

// ----------------------------------------------------------------------------

// TODO: Find better icons for some of these items
const navItems = [
	[
		{ path: "/tokens", label: "Tokens", icon: `${svgTokens}#icon` },
		{ path: "/icons", label: "Icons", icon: `${svgIcons}#icon` },
		{ path: "/mui", label: "MUI Theme", icon: `${svgMui}#icon` },
		{
			path: "/tests",
			label: "StrataKit components",
			icon: `${svgComponents}#icon`,
			startingPath: "/tests/anchor", // Use first component starting path to avoid landing on empty page
		},
		{ path: "/sandbox", label: "Sandbox", icon: `${svgSandbox}#icon` },
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

// ----------------------------------------------------------------------------

interface AppNavigationRailProps {
	mainContent: React.ReactNode;
}

export function AppNavigationRail(props: AppNavigationRailProps) {
	const { mainContent } = props;

	const [open, setOpen] = React.useState(false);
	const location = useLocation();
	const isWideScreen = useIsWideScreen();

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
			<NavigationRail.Root className={styles.appNav}>
				<NavigationRail.Header>
					<Button
						className={styles.skipLink}
						render={<a href={`#${mainContentId}`} />}
					>
						Skip to content
					</Button>
					<IconButton
						label="Home"
						icon={
							<Icon
								size="large"
								className={styles.strataLogo}
								render={<SvgStrataKitLogo />}
							/>
						}
						render={<RegularLink to="/" />}
						variant="ghost"
						className={styles.homeLink}
					/>
					<NavigationRail.ToggleButton />
				</NavigationRail.Header>

				<NavigationRail.Content>
					{navItems.length > 0 &&
						navItems.map((group, groupIndex) => (
							<React.Fragment key={group.map((item) => item.path).join(",")}>
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
							label="Settings"
							icon={svgSettings}
							onClick={() => setOpen(true)}
						/>
						<SettingsDialog open={open} onClose={() => setOpen(false)} />
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

interface RegularLinkProps
	extends Omit<React.ComponentPropsWithoutRef<"a">, "href"> {
	to: string;
}

/** Wrapper over `<a>` that resolves URLs using react-router.  */
function RegularLink({ to, ...props }: RegularLinkProps) {
	return <a href={useHref(to)} {...props} />;
}
