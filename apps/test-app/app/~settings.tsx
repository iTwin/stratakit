/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
	colorSchemeStorageKey,
	getStoredColorScheme,
	isValidColorScheme,
	setStoredColorScheme,
} from "internal/color-scheme-storage.ts";
import { isProduction } from "./~utils.tsx";

import type { ColorSchemeSetting } from "internal/color-scheme-storage.ts";
import type { PersistStorage, StorageValue } from "zustand/middleware";
import type { SettingsDialogProps } from "./~settings.dialog.tsx";

// ----------------------------------------------------------------------------

export type AccentColor = "aurora" | "cobalt";

interface PersistedSettings {
	colorScheme: ColorSchemeSetting;
	accentColor: AccentColor;
	debugMode: boolean;
}

interface SettingsState extends PersistedSettings {
	setColorScheme: (scheme: ColorSchemeSetting) => void;
	setAccentColor: (color: AccentColor) => void;
	setDebugMode: (debug: boolean) => void;
}

/**
 * Splits the store into two localStorage entries:
 * - colorScheme is stored separately (in `🥝:color-scheme`).
 * - the default key used for all the other settings.
 */
const settingsStorage: PersistStorage<Partial<PersistedSettings>> = {
	getItem: (name) => {
		if (typeof localStorage === "undefined") return null;

		let settings: StorageValue<PersistedSettings> | undefined;
		try {
			settings = JSON.parse(localStorage.getItem(name) ?? "null");
		} catch {}
		const colorScheme = getStoredColorScheme();
		if (!settings && !colorScheme) return null;

		return {
			...settings,
			state: {
				...settings?.state,
				...(colorScheme ? { colorScheme } : {}),
			},
		};
	},
	setItem: (name, settings) => {
		const { colorScheme, ...state } = settings.state ?? {};
		if (isValidColorScheme(colorScheme)) setStoredColorScheme(colorScheme);
		try {
			localStorage.setItem(name, JSON.stringify({ ...settings, state }));
		} catch {}
	},
	removeItem: (name) => {
		try {
			localStorage.removeItem(name);
			localStorage.removeItem(colorSchemeStorageKey);
		} catch {}
	},
};

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
			storage: settingsStorage,
			partialize: ({ colorScheme, accentColor, debugMode }) =>
				({ colorScheme, accentColor, debugMode }) satisfies PersistedSettings,
		},
	),
);

// ----------------------------------------------------------------------------

const LazySettingsDialog = React.lazy(() => import("./~settings.dialog.tsx"));

export function SettingsDialog(props: SettingsDialogProps) {
	return (
		<React.Suspense>
			<LazySettingsDialog {...props} />
		</React.Suspense>
	);
}
