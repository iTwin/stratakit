/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { Portal } from "@ariakit/react/portal";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { Icon, type Root } from "@stratakit/mui";
import { unstable_NavigationRail as NavigationRail } from "@stratakit/structures";
import { create } from "zustand";
import { persist } from "zustand/middleware";

import svgComputer from "@stratakit/icons/computer.svg";
import svgMoon from "@stratakit/icons/moon.svg";
import svgSettings from "@stratakit/icons/settings.svg";
import svgSun from "@stratakit/icons/sun.svg";
import primitives from "internal/primitives.json" with { type: "json" };
import styles from "./~settings.module.css";

// ----------------------------------------------------------------------------

type RootProps = React.ComponentProps<typeof Root>;
type ColorScheme = RootProps["colorScheme"];
type ColorSchemeSetting = ColorScheme | "auto";
type AccentColor = "aurora" | "cobalt";

interface SettingsState {
	colorScheme: ColorSchemeSetting;
	accentColor: AccentColor;
	setColorScheme: (scheme: ColorSchemeSetting) => void;
	setAccentColor: (color: AccentColor) => void;
}

export const useSettingsStore = create<SettingsState>()(
	persist(
		(set) => ({
			colorScheme: "auto",
			accentColor: "aurora",
			setColorScheme: (scheme) => set({ colorScheme: scheme }),
			setAccentColor: (color) => set({ accentColor: color }),
		}),
		{
			name: "🥝:settings",
		},
	),
);

// ----------------------------------------------------------------------------

export function SettingsButton() {
	const id = React.useId();
	const [open, setOpen] = React.useState(false);

	const colorScheme = useSettingsStore((state) => state.colorScheme);
	const setColorScheme = useSettingsStore((state) => state.setColorScheme);

	const accentColor = useSettingsStore((state) => state.accentColor);
	const setAccentColor = useSettingsStore((state) => state.setAccentColor);
	return (
		<>
			<NavigationRail.Button
				label="Settings"
				icon={svgSettings}
				onClick={() => setOpen(true)}
			/>
			<Dialog
				open={open}
				onClose={() => setOpen(false)}
				disablePortal
				component={Portal}
			>
				<DialogTitle>Settings</DialogTitle>
				<DialogContent className={styles.dialogContent}>
					<FormControl>
						<FormLabel id={`${id}-color-scheme`}>Color scheme</FormLabel>
						<ToggleButtonGroup
							exclusive
							value={colorScheme}
							onChange={(_, value: ColorSchemeSetting | null) => {
								setColorScheme(value === null ? "auto" : value);
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
								setAccentColor(value === null ? "aurora" : value);
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

// ----------------------------------------------------------------------------

function ColorIcon(props: React.ComponentProps<"svg">) {
	return (
		<svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
			<circle cx="8" cy="8" r="8" fill="currentColor" />
		</svg>
	);
}
