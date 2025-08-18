/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
export type PredefinedSymbol = keyof typeof predefinedSymbols;

export const predefinedSymbols = {
	Backspace: "\u232b",
	Command: "\u2318",
	Control: "Ctrl",
	Down: "\u2193",
	Eject: "\u23cf",
	Enter: "\u21b5",
	Escape: "Esc",
	Left: "\u2190",
	Option: "\u2325",
	Right: "\u2192",
	Shift: "\u21e7",
	Space: "\u2423",
	Tab: "Tab",
	Up: "\u2191",
} as const;
