/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

// This shared module contains utils for managing the user's color-scheme preference.
// It helps keep the preference consistent between the `test-app` and `website`, which share localStorage.

/** The localStorage key for storing the color-scheme preference. */
export const colorSchemeStorageKey = "🥝:color-scheme";

export type ColorSchemeSetting = "auto" | "light" | "dark";

export const isValidColorScheme = (
	value: unknown,
): value is ColorSchemeSetting =>
	value === "auto" || value === "light" || value === "dark";

export const getStoredColorScheme = (): ColorSchemeSetting | undefined => {
	try {
		const colorScheme = localStorage.getItem(colorSchemeStorageKey);
		return isValidColorScheme(colorScheme) ? colorScheme : undefined;
	} catch {
		return undefined;
	}
};

export const setStoredColorScheme = (colorScheme: ColorSchemeSetting): void => {
	try {
		localStorage.setItem(colorSchemeStorageKey, colorScheme);
	} catch {}
};
