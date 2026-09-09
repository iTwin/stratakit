/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { Button, NativeSelect } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Switch from "@mui/material/Switch";
import * as Dialog from "@stratakit/structures/unstable_Dialog";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { isProduction } from "./~utils.tsx";

import type { Root } from "@stratakit/mui";

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
	debugMode: boolean;
	setDebugMode: (debug: boolean) => void;
}

export const useSettingsStore = create<SettingsState>()(
	persist(
		(set) => ({
			colorScheme: "auto",
			accentColor: "aurora",
			setColorScheme: (scheme) => set({ colorScheme: scheme }),
			setAccentColor: (color) => set({ accentColor: color }),
			debugMode: !isProduction,
			setDebugMode: (debug) => set({ debugMode: debug }),
		}),
		{
			name: "🥝:settings",
		},
	),
);

// ----------------------------------------------------------------------------

interface SettingsDialogProps {
	open: boolean;
	onClose: () => void;
}

export function SettingsDialog(props: SettingsDialogProps) {
	const { open, onClose } = props;
	const id = React.useId();

	const colorScheme = useSettingsStore((state) => state.colorScheme);
	const setColorScheme = useSettingsStore((state) => state.setColorScheme);

	const accentColor = useSettingsStore((state) => state.accentColor);
	const setAccentColor = useSettingsStore((state) => state.setAccentColor);

	const debugMode = useSettingsStore((state) => state.debugMode);
	const setDebugMode = useSettingsStore((state) => state.setDebugMode);

	return (
		<Dialog.Root open={open} onClose={onClose} modal>
			<Dialog.Header>
				<Dialog.Heading>Settings</Dialog.Heading>
				<Dialog.CloseButton />
			</Dialog.Header>
			<form
				action={(data) => {
					const newColorScheme = data.get("color-scheme") as ColorSchemeSetting;
					const newAccentColor = data.get("accent-color") as AccentColor;
					const newDebugMode = data.get("debug-mode") === "on";

					setColorScheme(newColorScheme);
					setAccentColor(newAccentColor);
					setDebugMode(newDebugMode);
					onClose();
				}}
			>
				<Dialog.Content className={styles.dialogContent}>
					<FormControl className={styles.formControl} size="small">
						<InputLabel className={styles.label} htmlFor={`${id}-color-scheme`}>
							Color scheme
						</InputLabel>
						<NativeSelect
							defaultValue={colorScheme}
							inputProps={{
								name: "color-scheme",
								id: `${id}-color-scheme`,
							}}
						>
							<option value="auto">Auto</option>
							<option value="light">Light</option>
							<option value="dark">Dark</option>
						</NativeSelect>
					</FormControl>
					<FormControl className={styles.formControl} size="small">
						<InputLabel className={styles.label} htmlFor={`${id}-accent-color`}>
							Accent color
						</InputLabel>
						<NativeSelect
							defaultValue={accentColor}
							inputProps={{
								name: "accent-color",
								id: `${id}-accent-color`,
							}}
						>
							<option value="aurora">Aurora</option>
							<option value="cobalt">Cobalt</option>
						</NativeSelect>
					</FormControl>
					<FormControl className={styles.formControl} size="small">
						<InputLabel className={styles.label} htmlFor={`${id}-debug-mode`}>
							Debug mode
						</InputLabel>
						<Switch
							defaultChecked={debugMode}
							name="debug-mode"
							id={`${id}-debug-mode`}
							size="small"
						/>
					</FormControl>
				</Dialog.Content>
				<Dialog.Footer>
					<Dialog.ActionList
						actions={[
							<Button key="discard" size="small" onClick={() => onClose()}>
								Discard
							</Button>,
							<Button key="apply" color="primary" size="small" type="submit">
								Apply
							</Button>,
						]}
					/>
				</Dialog.Footer>
			</form>
		</Dialog.Root>
	);
}
