/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cssOverrides from "./~overrideAccentColors.css.js";

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
