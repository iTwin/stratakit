/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { useHref, useLocation } from "react-router";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { Button, Divider, IconButton } from "@stratakit/bricks";
import { Icon } from "@stratakit/foundations";
import { unstable_NavigationRail as NavigationRail } from "@stratakit/structures";
import {
	isProduction,
	useAccentColor,
	type useColorScheme,
	useColorSchemeSetting,
	useIsWideScreen,
	useLocalStorage,
	useSetAccentColor,
	useSetColorScheme,
} from "./~utils.tsx";

import svgComputer from "@stratakit/icons/computer.svg";
import svgDocumentation from "@stratakit/icons/documentation.svg";
import svgMoon from "@stratakit/icons/moon.svg";
import svgSettings from "@stratakit/icons/settings.svg";
import svgSun from "@stratakit/icons/sun.svg";
import primitives from "internal/primitives.json" with { type: "json" };
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
						<SettingsButton />
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

// ----------------------------------------------------------------------------

type ColorScheme = ReturnType<typeof useColorScheme>;
type ColorSchemeSetting = ColorScheme | "auto";
type AccentColor = ReturnType<typeof useAccentColor>;

function SettingsButton() {
	const id = React.useId();
	const [open, setOpen] = React.useState(true);

	const colorScheme = useColorSchemeSetting() ?? "auto";
	const setColorScheme = useSetColorScheme();

	const accentColor = useAccentColor();
	const setAccentColor = useSetAccentColor();
	return (
		<>
			<NavigationRail.Button
				label="Settings"
				icon={svgSettings}
				onClick={() => setOpen(true)}
			/>
			<Dialog open={open} onClose={() => setOpen(false)}>
				<DialogTitle>Settings</DialogTitle>
				<DialogContent className={styles.settingsDialogContent}>
					<FormControl>
						<FormLabel id={`${id}-color-scheme`}>Color scheme</FormLabel>
						<ToggleButtonGroup
							exclusive
							value={colorScheme}
							onChange={(_, value: ColorSchemeSetting | null) => {
								setColorScheme(
									value === null || value === "auto" ? undefined : value,
								);
							}}
							aria-labelledby={`${id}-color-scheme`}
						>
							<ToggleButton value="auto" label="Auto">
								<Icon href={svgComputer} />
							</ToggleButton>
							<ToggleButton value="light" label="Light">
								<Icon href={svgSun} />
							</ToggleButton>
							<ToggleButton value="dark" label="Dark">
								<Icon href={svgMoon} />
							</ToggleButton>
						</ToggleButtonGroup>
					</FormControl>
					<FormControl>
						<FormLabel id={`${id}-accent-color`}>Accent color</FormLabel>
						<ToggleButtonGroup
							exclusive
							value={accentColor}
							onChange={(_, value: AccentColor | null) => {
								setAccentColor(value === null ? undefined : value);
							}}
							aria-labelledby={`${id}-accent-color`}
						>
							<ToggleButton value="aurora" label="Aurora">
								<Icon
									render={<ColorIcon />}
									style={{
										color: primitives.aurora[500],
									}}
								/>
							</ToggleButton>
							<ToggleButton value="cobalt" label="Cobalt">
								<Icon
									render={<ColorIcon />}
									style={{
										color: "oklch(53.32% 0.139 246.77)",
									}}
								/>
							</ToggleButton>
						</ToggleButtonGroup>
					</FormControl>
				</DialogContent>
			</Dialog>
		</>
	);
}

function ColorIcon(props: React.ComponentProps<"svg">) {
	return (
		<svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
			<circle cx="8" cy="8" r="8" fill="currentColor" />
		</svg>
	);
}
