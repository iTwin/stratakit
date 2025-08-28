/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cssOverrides from "./~overrideAccentColors.css.js";

// ----------------------------------------------------------------------------

type ColorScheme = keyof typeof cssOverrides;

// ----------------------------------------------------------------------------

let loaded = false;

function overrideAccentColors({
	colorScheme,
	selector,
}: {
	colorScheme: ColorScheme;
	selector: string;
}) {
	if (loaded) return () => {};

	const getCss = cssOverrides[colorScheme];
	const css = getCss(selector);
	const styleSheet = new CSSStyleSheet();
	styleSheet.replaceSync(css);
	document.adoptedStyleSheets.push(styleSheet);
	loaded = true;

	return () => {
		document.adoptedStyleSheets = document.adoptedStyleSheets.filter(
			(sheet) => sheet !== styleSheet,
		);
		loaded = false;
	};
}

// ----------------------------------------------------------------------------

export { overrideAccentColors };
