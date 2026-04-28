/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Role } from "@ariakit/react/role";
import { forwardRef } from "@stratakit/foundations/secret-internals";

import type { TypographyOwnProps } from "@mui/material/Typography";
import type { BaseProps } from "@stratakit/foundations/secret-internals";

// ----------------------------------------------------------------------------

const variantMapping = {
	h1: "h1",
	h2: "h2",
	h3: "h3",
	h4: "h4",
	h5: "h5",
	h6: "h6",
	subtitle1: "h6",
	subtitle2: "h6",
	body1: "p",
	body2: "p",
	inherit: "p",
	button: "span",
	caption: "span",
	overline: "span",
} satisfies TypographyOwnProps["variantMapping"];

const variants = Object.keys(variantMapping) as TypographyOwnProps["variant"][];

/** These variants are currently rendered as headings by default. */
const headings = ["h1", "h2", "h3", "h4", "h5", "h6", "subtitle1", "subtitle2"];

// ----------------------------------------------------------------------------

const MuiTypography = forwardRef<"p", BaseProps<"p">>((props, forwardedRef) => {
	const classList = props.className?.split(" ").filter(Boolean);

	// Derive the variant from the className passed to the DOM element.
	const variant = (() => {
		const variant = variants.find((name) =>
			classList?.includes(`MuiTypography-${name}`),
		);
		return variant || "body2";
	})();

	DEV: if (!props.render && headings.includes(variant)) {
		console.warn(
			"MuiTypography: Please explicitly set the `render` prop to ensure correct heading structure.",
		);
	}

	const render = (() => {
		const Element = variantMapping[variant] || "p";
		return <Element />;
	})();

	return <Role render={render} {...props} ref={forwardedRef} />;
});
DEV: MuiTypography.displayName = "MuiTypography";

// ----------------------------------------------------------------------------

export { MuiTypography };
