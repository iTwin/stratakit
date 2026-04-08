/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { Tooltip } from "@stratakit/bricks";
import { Icon, type Root } from "@stratakit/mui";
import { unstable_NavigationRail as NavigationRail } from "@stratakit/structures";
import * as Dialog from "@stratakit/structures/unstable_Dialog";
import { create } from "zustand";
import { persist } from "zustand/middleware";

import svgComputer from "@stratakit/icons/computer.svg";
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
			<Dialog.Root open={open} onClose={() => setOpen(false)} modal>
				<Dialog.Header>
					<Dialog.Heading>Settings</Dialog.Heading>
					<Dialog.CloseButton />
				</Dialog.Header>
				<Dialog.Content className={styles.dialogContent}>
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
							<Tooltip content="Auto" type="label">
								<ToggleButton value="auto">
									<Icon href={svgComputer} />
								</ToggleButton>
							</Tooltip>
							<Tooltip content="Light" type="label">
								<ToggleButton value="light">
									<Icon href={svgSun} />
								</ToggleButton>
							</Tooltip>
							<Tooltip content="Dark" type="label">
								<ToggleButton value="dark">
									<Icon href={svgMoon} />
								</ToggleButton>
							</Tooltip>
						</ToggleButtonGroup>
					</FormControl>
				</Dialog.Content>
			</Dialog.Root>
		</>
	);
}
