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
import IconButton from "@mui/material/IconButton";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { Icon, type Root } from "@stratakit/mui";
import { unstable_NavigationRail as NavigationRail } from "@stratakit/structures";
import { create } from "zustand";
import { persist } from "zustand/middleware";

import svgComputer from "@stratakit/icons/computer.svg";
import svgDismiss from "@stratakit/icons/dismiss.svg";
import svgMoon from "@stratakit/icons/moon.svg";
import svgSettings from "@stratakit/icons/settings.svg";
import svgSun from "@stratakit/icons/sun.svg";
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
				<div className={styles.dialogHeader}>
					<DialogTitle className={styles.dialogTitle}>Settings</DialogTitle>
					<IconButton edge="end" onClick={() => setOpen(false)}>
						<Icon href={svgDismiss} />
					</IconButton>
				</div>
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
				</DialogContent>
			</Dialog>
		</>
	);
}
