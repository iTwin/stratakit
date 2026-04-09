/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { Button, NativeSelect } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { unstable_NavigationRail as NavigationRail } from "@stratakit/structures";
import * as Dialog from "@stratakit/structures/unstable_Dialog";
import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { Root } from "@stratakit/mui";

import svgSettings from "@stratakit/icons/settings.svg";
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
				<form
					action={(data) => {
						const newColorScheme = data.get(
							"color-scheme",
						) as ColorSchemeSetting;

						setColorScheme(newColorScheme);
						setOpen(false);
					}}
				>
					<Dialog.Content className={styles.dialogContent}>
						<FormControl className={styles.formControl}>
							<InputLabel htmlFor={`${id}-color-scheme`}>
								Color scheme
							</InputLabel>
							<NativeSelect
								className={styles.select}
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
					</Dialog.Content>
					<Dialog.Footer>
						<Dialog.ActionList
							actions={[
								<Button
									key="discard"
									size="small"
									onClick={() => setOpen(false)}
								>
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
		</>
	);
}
