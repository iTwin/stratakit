/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { createTheme as createMuiTheme } from "@mui/material/styles";

function createTheme() {
	return createMuiTheme({
		cssVariables: {
			nativeColor: true,
			colorSchemeSelector: "data",
		},
		defaultColorScheme: "dark",
		colorSchemes: {
			light: {
				palette: {
					contrastThreshold: 4.5,
					primary: { main: "oklch(54% .1 170.26)" },
					text: {
						primary: "oklch(29.76% .011 268.32)",
						secondary: "oklch(41.45% .013 256.75)",
					},
					divider: "oklch(91.52% .005 258.33)",
					background: {
						default: "oklch(99.06% .002 247.84)",
						paper: "oklch(100% none none)",
					},
				},
			},
			dark: {
				palette: {
					contrastThreshold: 4.5,
					primary: {
						main: "oklch(54% .1 170.26)",
						contrastText: "oklch(100% none none)",
						// text: 'oklch(87.59% .175 168.9)',
						// border: 'oklch(60.98% .092 173.18)',
					},
					text: {
						primary: "oklch(99.06% .002 247.84)",
						secondary: "oklch(79.56% .008 241.69)",
					},
					divider: "oklch(32.63% .014 268.32)",
					background: {
						default: "oklch(24.37% .006 268.32)",
						paper: "oklch(26.92% .008 268.32)",
					},
				},
			},
		},
		typography: {
			fontFamily: "InterVariable, system-ui",
			fontSize: 12,
		},
		transitions: {
			create: () => "none", // Globally disable the "cheap"-feeling transitions
		},
		components: {
			MuiCssBaseline: {
				styleOverrides: `${fontsCss}${focusOutlineCss}`,
			},
			MuiButtonBase: {
				defaultProps: {
					disableRipple: true, // This should disable ripple everywhere
				},
			},
			MuiCheckbox: {
				defaultProps: {
					disableRipple: true, // Checkbox doesn't inherit from ButtonBase
				},
			},
		},
	});
}

// ----------------------------------------------------------------------------

const fontsCss = `\
@font-face {
  font-family: InterVariable;
  font-style: normal;
  font-weight 100 900;
  font-display: swap;
  src: url("https://rsms.me/inter/font-files/InterVariable.woff2?v=4.1") format("woff2");
}
@font-face {
  font-family: InterVariable;
  font-style: italic;
  font-weight 100 900;
  font-display: swap;
  src: url("https://rsms.me/inter/font-files/InterVariable-Italic.woff2?v=4.1") format("woff2");
}
@font-feature-values InterVariable {
  @character-variant {
    cv01: 1; cv02: 2; cv03: 3; cv04: 4; cv05: 5; cv06: 6; cv07: 7; cv08: 8;
    cv09: 9; cv10: 10; cv11: 11; cv12: 12; cv13: 13;
    alt-1: 1;
    alt-3: 9;
    open-4: 2;
    open-6: 3;
    open-9: 4;
    lc-l-with-tail: 5;
    simplified-u: 6;
    alt-double-s: 7;
    uc-i-with-serif: 8;
    uc-g-with-spur: 10;
    single-story-a: 11;
    compact-lc-f: 12;
    compact-lc-t: 13;
  }
  @styleset {
    ss01: 1; ss02: 2; ss03: 3; ss04: 4; ss05: 5; ss06: 6; ss07: 7; ss08: 8;
    open-digits: 1;
    disambiguation: 2;
    disambiguation-except-zero: 4;
    round-quotes-and-commas: 3;
    square-punctuation: 7;
    square-quotes: 8;
    circled-characters: 5;
    squared-characters: 6;
  }
}
body {
  font-variant-alternates: character-variant(alt-1, alt-3, lc-l-with-tail, uc-i-with-serif);
  font-size: 0.75rem;
}
`;

const focusOutlineCss = `\
*:focus-visible { outline: 2px solid var(--mui-palette-primary-text, CanvasText) !important; outline-offset: 2px; }
`;

// ----------------------------------------------------------------------------

export { createTheme };
