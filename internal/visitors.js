/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import primitives from "./primitives.json" with { type: "json" };

/**
 * LightningCSS visitor that inlines the values of primitive color tokens.
 *
 * The primitive tokens are defined in `primitives.json` and can be used
 * in CSS as `--primitive("[group].[token]")` function calls.
 *
 * Input:
 * ```css
 * :root { --color: --primitive("gray.800"); }
 * ```
 *
 * Output:
 * ```css
 * :root { --color: oklch(34.4% 0.011 264.42); }
 * ```
 */
export function primitivesTransform() {
	return {
		Function: {
			"--primitive"(fn) {
				if (
					fn.arguments.length === 1 &&
					fn.arguments[0].type === "token" &&
					fn.arguments[0].value.type === "string"
				) {
					const [group, token] = fn.arguments[0].value.value.split(".");
					return {
						raw: primitives[group][token],
					};
				}
			},
		},
	};
}
