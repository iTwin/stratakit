/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cssOverrides from "./~blue.css.js";

// ----------------------------------------------------------------------------

type ColorScheme = keyof typeof cssOverrides;

// ----------------------------------------------------------------------------

let loaded = false;

function loadBlueStyles({ colorScheme }: { colorScheme: ColorScheme }) {
	if (loaded) return () => {};

	const css = cssOverrides[colorScheme];
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

export { loadBlueStyles };
