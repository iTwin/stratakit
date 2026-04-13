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

import svgDocumentation from "@stratakit/icons/documentation.svg";
import svgSettings from "@stratakit/icons/settings.svg";
import styles from "./~navigation.module.css";
import svgComponents from "./assets/components.svg";
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
						icon={<StrataKitLogo />}
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

function StrataKitLogo() {
	const basePathId = React.useId();
	const gradientId = React.useId();

	const defs = (
		<defs>
			<path
				id={basePathId}
				d="M8.03 16.9h9.68l2.42 2.42v.81H6.42L4 17.71v-2.42h2.42zm0-6.45h9.68l2.42 2.42v2.42h-2.42l-1.61-1.61H6.42L4 11.26V8.84h2.42zm12.1-4.03v2.42h-2.42L16.1 7.23H6.42L4 4.8V4h13.71z"
			/>

			<linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
				<stop offset="0" stopOpacity="0" />
				<stop offset="1" />
			</linearGradient>
		</defs>
	);

	return (
		<Icon
			size="large"
			className={styles.strataLogo}
			render={
				<svg width={24} height={24} fill="none" viewBox="0 0 24 24">
					{defs}
					<g>
						<use
							href={`#${basePathId}`}
							fill="var(--stratakit-color-brand-logo-fill)"
						/>
						<use
							href={`#${basePathId}`}
							fill={`url(#${gradientId})`}
							fillOpacity=".24"
						/>
						<use
							href={`#${basePathId}`}
							stroke="var(--stratakit-color-brand-logo-stroke)"
							strokeWidth={0.5}
						/>
					</g>
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
