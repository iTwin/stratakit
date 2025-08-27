/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import css from "./~blue.css.js";

// ----------------------------------------------------------------------------

let loaded = false;

function loadBlueStyles() {
	if (loaded) return () => {};

	const styleSheet = new window.CSSStyleSheet();
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
