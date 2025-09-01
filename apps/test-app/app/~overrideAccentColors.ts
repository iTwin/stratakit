/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

const cssOverrides = {
	light: `:is(html:where([data-color-scheme="light"]),[data-app-root]) {--stratakit-color-bg-accent-base: oklch(53.32% 0.139 246.77);--stratakit-color-bg-accent-muted: oklch(90.88% 0.04 234.23);--stratakit-color-bg-accent-faded: oklch(38.03% 0.093 244.58);--stratakit-color-bg-accent-transparent: oklch(53.32% 0.139 246.77 / 0.16);--stratakit-color-bg-glow-on-surface-accent-hover: oklch(53.32% 0.139 246.77 / 0.12);--stratakit-color-bg-glow-on-surface-accent-pressed: oklch(53.32% 0.139 246.77 / 0.16);--stratakit-color-bg-glow-on-surface-accent-active-hover: oklch(53.32% 0.139 246.77 / 0.24);--stratakit-color-icon-accent-base: oklch(48.43% 0.124 245.93);--stratakit-color-icon-accent-strong: oklch(48.43% 0.124 245.93);--stratakit-color-icon-accent-faded: oklch(44.1% 0.104 244.82);--stratakit-color-border-accent-base: oklch(53.32% 0.139 246.77);--stratakit-color-border-accent-faded: oklch(44.1% 0.104 244.82);--stratakit-color-border-accent-muted: oklch(84.62% 0.067 236.36);--stratakit-color-border-accent-strong: oklch(48.43% 0.124 245.93);--stratakit-color-text-accent-base: oklch(48.43% 0.124 245.93);--stratakit-color-text-accent-faded: oklch(44.1% 0.104 244.82);--stratakit-color-text-accent-strong: oklch(48.43% 0.124 245.93);--stratakit-color-static-accent: oklch(53.32% 0.139 246.77);--stratakit-shadow-table-strong: 0px -1px 0px 0px oklch(53.32% 0.139 246.77);}`,
	dark: `:is(html:where([data-color-scheme="dark"]),[data-app-root]) {--stratakit-color-bg-accent-base: oklch(53.32% 0.139 246.77);--stratakit-color-bg-accent-muted: oklch(38.03% 0.093 244.58);--stratakit-color-bg-accent-faded: oklch(69.98% 0.118 238.51);--stratakit-color-bg-accent-transparent: oklch(53.32% 0.139 246.77 / 0.16);--stratakit-color-bg-glow-on-surface-accent-hover: oklch(53.32% 0.139 246.77 / 0.12);--stratakit-color-bg-glow-on-surface-accent-pressed: oklch(53.32% 0.139 246.77 / 0.16);--stratakit-color-bg-glow-on-surface-accent-active-hover: oklch(53.32% 0.139 246.77 / 0.24);--stratakit-color-icon-accent-base: oklch(69.98% 0.118 238.51);--stratakit-color-icon-accent-strong: oklch(69.98% 0.118 238.51);--stratakit-color-icon-accent-faded: oklch(78.73% 0.093 236.98);--stratakit-color-border-accent-base: oklch(62.53% 0.14 241.42);--stratakit-color-border-accent-faded: oklch(84.62% 0.067 236.36);--stratakit-color-border-accent-muted: oklch(44.1% 0.104 244.82);--stratakit-color-border-accent-strong: oklch(69.98% 0.118 238.51);--stratakit-color-text-accent-base: oklch(69.98% 0.118 238.51);--stratakit-color-text-accent-faded: oklch(78.73% 0.093 236.98);--stratakit-color-text-accent-strong: oklch(69.98% 0.118 238.51);--stratakit-color-static-accent: oklch(53.32% 0.139 246.77);--stratakit-shadow-table-strong: 0px -1px 0px 0px oklch(69.98% 0.118 238.51);}`,
};

// ----------------------------------------------------------------------------

type ColorScheme = keyof typeof cssOverrides;

// ----------------------------------------------------------------------------

const styleSheets = new Map<ColorScheme, CSSStyleSheet>();
function getStyleSheet(colorScheme: ColorScheme) {
	let styleSheet = styleSheets.get(colorScheme);
	if (!styleSheet) {
		styleSheet = new CSSStyleSheet();
		styleSheet.replaceSync(cssOverrides[colorScheme]);
		styleSheets.set(colorScheme, styleSheet);
	}
	return styleSheet;
}

function overrideAccentColors(colorScheme: ColorScheme) {
	const styleSheet = getStyleSheet(colorScheme);
	document.adoptedStyleSheets.push(styleSheet);

	return () => {
		document.adoptedStyleSheets = document.adoptedStyleSheets.filter(
			(sheet) => sheet !== styleSheet,
		);
	};
}

// ----------------------------------------------------------------------------

export { overrideAccentColors };
