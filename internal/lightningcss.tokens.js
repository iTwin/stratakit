/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import Color from "colorjs.io";
import primitives from "./primitives.json" with { type: "json" };
import darkTheme from "./theme-dark.json" with { type: "json" };
import lightTheme from "./theme-light.json" with { type: "json" };
import typography from "./typography.json" with { type: "json" };

/**
 * LightningCSS visitor that inlines the values of primitive color tokens.
 *
 * The primitive tokens are defined in `primitives.json` and can be used
 * in CSS as `--primitive("[group].[token]")` function calls. There is also a
 * `--primitive-fallback` function that can be used to provide a hex fallback for oklch.
 *
 * Input:
 * ```css
 * :root { --color: --primitive("color.gray.800"); }
 * ```
 *
 * Output:
 * ```css
 * :root { --color: oklch(34.4% 0.011 264.42); }
 * ```
 *
 * @returns {import("lightningcss").Visitor}
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
					const [, group, token] = fn.arguments[0].value.value.split(".");
					return {
						raw: primitives[group][token],
					};
				}
			},
			"--primitive-fallback"(fn) {
				if (
					fn.arguments.length === 1 &&
					fn.arguments[0].type === "token" &&
					fn.arguments[0].value.type === "string"
				) {
					const [, group, token] = fn.arguments[0].value.value.split(".");
					const raw = primitives[group][token];
					const fallback = new Color(raw).to("srgb");
					return {
						raw: fallback.toString({ format: "hex" }),
					};
				}
			},
		},
	};
}

/**
 * LightningCSS visitor that exposes a `--theme` CSS mixin which can be applied (using `@apply`)
 * to any selector to include the theme's design tokens as CSS properties.
 *
 * For supporting older browsers, a `--theme-fallback` mixin is also provided that converts `oklch`
 * color values to hex values.
 *
 * The dark and light themes are defined in `theme-dark.json` and `theme-light.json` respectively,
 * and map to the tokens from `primitives.json`.
 *
 * Input:
 * ```css
 * :root {
 *   ​​\@​apply --theme("dark");
 * }
 * ```
 *
 * Output:
 * ```css
 * :root {
 *   --stratakit-color-bg-neutral-base: --primitive("color.gray.800");
 *   --stratakit-color-text-neutral-primary: --primitive("color.gray.5");
 *   …
 * }
 * ```
 *
 * @returns {import("lightningcss").Visitor}
 */
export function themeTransform() {
	const themes = new Map(
		Object.entries({ light: lightTheme, dark: darkTheme }),
	);

	return {
		Rule: {
			/** Processes `@apply` rules that match `--theme()` or `--theme-fallback()`. */
			unknown({ name, prelude, loc }) {
				if (
					name !== "apply" ||
					prelude[0]?.type !== "function" ||
					!["--theme", "--theme-fallback"].includes(prelude[0].value.name)
				) {
					return;
				}

				const isFallback = prelude[0].value.name === "--theme-fallback";
				const theme = prelude[0].value.arguments?.[0]?.value?.value;
				if (!themes.has(theme)) {
					throw new Error(`Unknown theme: ${theme}`);
				}

				const declarations = [];

				const colorTokens = parseTokens(themes.get(theme)?.color);
				const shadowTokens = parseTokens(themes.get(theme)?.shadow);

				for (let [name, { $value }] of colorTokens.entries()) {
					// Tokens that should be skipped are marked using "🫥" (by convention).
					if (name.includes("🫥")) continue;

					// Values wrapped in {…} are references to other tokens.
					// The "p-" prefix indicates a primitive token (by convention).
					if (typeof $value === "string" && $value.startsWith("{p-")) {
						// Convert {p.color.gray.200} into --primitive("color.gray.200") for further processing.
						$value = cssFunction(
							isFallback ? "--primitive-fallback" : "--primitive",
							$value.replace("{p-", "").replace("}", ""),
						);
					}
					// Token names ending with "%" indicate percentage values (by convention).
					else if (name.endsWith("%")) {
						$value = {
							type: "token",
							value: { type: "percentage", value: $value / 100 },
						};
					}
					// Pass unknown values through the `_raw` function for inlining.
					else if (typeof $value === "string") {
						$value = cssFunction("_raw", $value);
					}

					declarations.push(
						cssCustomProperty(name, $value, { prefix: "stratakit-color" }),
					);
				}

				for (let [name, { $value }] of shadowTokens.entries()) {
					$value = $value.join(", ");

					if (isFallback)
						$value = $value.replaceAll("--primitive", "--primitive-fallback");

					// Pass shadow values through the `_raw` function for inlining.
					$value = cssFunction("_raw", $value);

					declarations.push(
						cssCustomProperty(name, $value, { prefix: "stratakit-shadow" }),
					);
				}

				// Style rule that can be nested under any selector.
				return [
					{
						type: "style",
						value: {
							declarations: { declarations },
							selectors: [[{ type: "nesting" }]],
							rules: [],
							loc,
						},
					},
				];
			},
		},
		Function: {
			/**
			 * "Private" helper function that just returns the unmodified (passthrough) value of the argument.
			 * This is needed because LightningCSS does not otherwise support raw values.
			 */
			_raw(fn) {
				if (fn.arguments.length === 1 && fn.arguments[0].type === "token") {
					return { raw: fn.arguments[0].value.value };
				}
			},
		},
	};
}

/**
 * LightningCSS visitor that exposes a `--typography-tokens` CSS mixin (applied
 * with `@apply`) that adds typography-related tokens as custom properties.
 *
 * Input:
 * ```css
 * :root {
 * 	 \@apply --typography-tokens;
 * }
 * ```
 *
 * Output:
 * ```css
 * :root {
 * 	 …
 * 	 --stratakit-font-size-32: 2rem;
 * 	 …
 * }
 * ```
 *
 * @returns {import("lightningcss").Visitor}
 */
export function typographyTokensTransform() {
	return {
		Rule: {
			unknown({ name, prelude, loc }) {
				if (
					name !== "apply" ||
					prelude[0]?.type !== "dashed-ident" ||
					prelude[0].value !== "--typography-tokens"
				) {
					return;
				}

				const declarations = [];

				for (const [step, token] of Object.entries(typography.size)) {
					declarations.push(
						cssCustomProperty(
							step,
							{
								type: "length",
								// This shape of this object coincidentally matches what Lightning expects
								value: token.$value,
							},
							{ prefix: "stratakit-font-size" },
						),
					);
				}

				return [
					{
						type: "style",
						value: {
							declarations: { declarations },
							selectors: [[{ type: "nesting" }]],
							rules: [],
							loc,
						},
					},
				];
			},
		},
	};
}

/**
 * LightningCSS visitor that substitutes certain variables with their values.
 * To indicate a static variable, it must be prefixed with ✨.
 *
 * Input:
 * ```css
 * .foo {
 *   --✨color: hotpink;
 *   color: var(--✨color);
 * }
 * ```
 *
 * Output:
 * ```css
 * .foo {
 *   color: hotpink;
 * }
 * ```
 *
 * @returns {import("lightningcss").Visitor}
 */
export function staticVariablesTransform() {
	const savedValues = new WeakMap();
	let lastNonNestedSelector;

	return {
		Rule(rule) {
			if (rule.type !== "style") return;
			if (rule.value.selectors?.[0]?.some((s) => s?.type === "nesting")) return;
			lastNonNestedSelector = rule.value.selectors;
		},
		DeclarationExit({ property, value: { name, value } }) {
			if (property !== "custom") return;
			if (!name.startsWith("--✨")) return;

			if (!savedValues.has(lastNonNestedSelector)) {
				savedValues.set(lastNonNestedSelector, {});
			}
			savedValues.get(lastNonNestedSelector)[name] = value;

			return []; // Remove the declaration
		},
		Variable({ name }) {
			if (name.ident.startsWith("--✨")) {
				return [
					...(savedValues.get(lastNonNestedSelector)?.[name.ident] ?? []),
					{ type: "token", value: { type: "white-space", value: " " } },
				];
			}
		},
	};
}

/**
 * LightningCSS visitor that replaces aurora primitives with internal accent CSS variables.
 *
 * Input:
 * ```css
 * :root { --color: --primitive("color.aurora.800"); }
 * ```
 *
 * Output:
 * ```css
 * :root { --color: var(--_stratakit-accent-800, oklch(33.76% 0.059 170.74)); }
 * ```
 *
 * Aurora primitives that apply opacity to the base token do not generate separate token variables.
 * Instead, they are defined using `oklch` functional notation using the base accent token.
 *
 * Input:
 * ```css
 * :root { --color: --primitive("color.aurora.12"); }
 * ```
 *
 * Output:
 * ```css
 * :root { --color: oklch(from var(--_stratakit-accent-500, oklch(54% 0.1 170.26)) l c h / 12%); }
 * ```
 *
 * @returns {import("lightningcss").Visitor}
 */
export function accentsTransform() {
	return {
		Function: {
			"--primitive"(fn) {
				if (
					fn.arguments.length === 1 &&
					fn.arguments[0].type === "token" &&
					fn.arguments[0].value.type === "string"
				) {
					const [, group, token] = fn.arguments[0].value.value.split(".");
					if (group !== "aurora") return;

					const primitive = primitives[group][token];
					const tokenNumber = Number(token);
					if (tokenNumber % 50 === 0)
						return {
							raw: `var(--_stratakit-accent-${token}, ${primitive})`,
						};

					return {
						raw: `oklch(from --primitive("color.aurora.500") l c h / ${token}%);`,
					};
				}
			},
		},
	};
}

/**
 * Parses a deeply-nested JS object into a flattened Map of tokens with dash-separated names.
 *
 * Example:
 * ```js
 * parseTokens({
 *   color: {
 *     background: { $value: "#1a1a1a" },
 *     text: { $value: "#f0f0f0" },
 *   },
 * });
 * // Map { "color-background" → {…}, "color-text" → {…} }
 * ```
 */
export function parseTokens(obj, prefix = "") {
	const tokens = new Map();
	for (const [key, value] of Object.entries(obj)) {
		if (typeof value === "object" && value !== null && !("$value" in value)) {
			const nestedTokens = parseTokens(value, `${prefix + key}-`);
			for (const [nestedKey, nestedValue] of nestedTokens.entries()) {
				tokens.set(nestedKey, nestedValue);
			}
		} else {
			tokens.set(`${prefix + key}`, value);
		}
	}
	return tokens;
}

/** AST representation of a CSS "variable" declaration, e.g. `--prefix-name: value;` */
function cssCustomProperty(name, value, { prefix = "" } = {}) {
	return {
		property: "custom",
		value: {
			name: `--${prefix}-${name}`,
			value: [value],
		},
	};
}

/** AST representation of a CSS function call, e.g. `--name(value)` */
function cssFunction(name, value) {
	return {
		type: "function",
		value: {
			name,
			arguments: [{ type: "token", value: { type: "string", value } }],
		},
	};
}
