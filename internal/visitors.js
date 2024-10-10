/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import primitives from "./primitives.json" with { type: "json" };
import darkTheme from "./theme-dark.json" with { type: "json" };

/**
 * LightningCSS visitor that inlines the values of primitive color tokens.
 *
 * The primitive tokens are defined in `primitives.json` and can be used
 * in CSS as `--primitive("[group].[token]")` function calls.
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
		},
	};
}

/**
 * LightningCSS visitor that exposes a `--theme` CSS mixin which can be applied (using `@apply`)
 * to any selector to include the theme's design tokens as CSS properties.
 *
 * The dark theme is defined in `theme-dark.json` and maps to the tokens from `primitives.json`.
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
 *   --kiwi-color-bg-neutral-base: --primitive("color.gray.800");
 *   --kiwi-color-text-neutral-primary: --primitive("color.gray.5");
 *   …
 * }
 * ```
 *
 * @returns {import("lightningcss").Visitor}
 */
export function themeTransform() {
	return {
		Rule: {
			/** Processes `@apply` rules that match `--theme()`. */
			unknown({ name, prelude, loc }) {
				if (
					name !== "apply" ||
					prelude[0]?.type !== "function" ||
					prelude[0].value.name !== "--theme"
				) {
					return;
				}

				const theme = prelude[0].value.arguments?.[0]?.value?.value;
				if (theme !== "dark") {
					throw new Error(`Unknown theme: ${theme}`);
				}

				const tokens = parseTokens(darkTheme);
				const declarations = [];

				for (let [name, { $value }] of tokens.entries()) {
					// Tokens that should be skipped are marked using "🫥" (by convention).
					if (name.includes("🫥")) continue;

					// Values wrapped in {…} are references to other tokens.
					// The "p-" prefix indicates a primitive token (by convention).
					if (typeof $value === "string" && $value.startsWith("{p-")) {
						// Convert {p.color.gray.200} into --primitive("color.gray.200") for further processing.
						$value = cssFunction(
							"--primitive",
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
						cssCustomProperty(name, $value, { prefix: "kiwi-color" }),
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
 * LightningCSS visitor that substitutes certain variables with their values.
 * To indicate a static variable, it must be prefixed with 💥.
 *
 * Input:
 * ```css
 * .foo {
 *   --💥color: hotpink;
 *   color: var(--💥color);
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
			if (rule.value.selectors.some((s) => s?.[0]?.type === "nesting")) return;
			lastNonNestedSelector = rule.value.selectors;
		},
		Declaration({ property, value: { name, value } }) {
			if (property !== "custom") return;
			if (!name.startsWith("--💥")) return;

			if (!savedValues.has(lastNonNestedSelector)) {
				savedValues.set(lastNonNestedSelector, {});
			}
			savedValues.get(lastNonNestedSelector)[name] = value;

			return []; // Remove the declaration
		},
		VariableExit({ name }) {
			if (name.ident.startsWith("--💥")) {
				return savedValues.get(lastNonNestedSelector)?.[name.ident];
			}
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
function parseTokens(obj, prefix = "") {
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
