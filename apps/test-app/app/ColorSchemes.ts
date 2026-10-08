/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { Page } from "@playwright/test";

interface ColorScheme {
	name: string;
	media: Parameters<Page["emulateMedia"]>[0];
}

const ColorScheme = {
	light: {
		name: "light",
		media: {
			colorScheme: "light",
		} as const,
	},
	dark: {
		name: "dark",
		media: {
			colorScheme: "dark",
		} as const,
	},
	forcedColors: {
		name: "forced-colors",
		media: {
			forcedColors: "active",
		} as const,
	},
};

export const colorSchemes: ColorScheme[] = [
	ColorScheme.light,
	ColorScheme.dark,
	ColorScheme.forcedColors,
];
