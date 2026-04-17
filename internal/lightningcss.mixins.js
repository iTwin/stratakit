/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

/** @import * as lightningcss from "lightningcss" */

/** Enables parsing for `@mixin` and `@result` rules. */
export const customAtRules = /** @type {const} */ ({
	mixin: { prelude: "*", body: "style-block" },
	result: { body: "style-block" },
});

/**
 * LightningCSS visitor that expands CSS-authored `@mixin` definitions, returning their `@result` blocks.
 *
 * Mixins are invoked through `@apply` calls and allow passing arguments that can be handled within the
 * mixin definition using `if(style(--arg: value): …)` queries (processed at build-time).
 *
 * Input:
 * ```css
 * \@mixin --font(--type) {
 *   \@result {
 *     font-weight: 400;
 *     font-family: if(
 *       style(--type: "mono"): monospace;
 *       else: sans-serif
 *     );
 *   }
 * }
 *
 * .foo {
 *   \@apply --font("mono");
 * }
 * ```
 *
 * Output:
 * ```css
 * .foo {
 *   font-weight: 400;
 *   font-family: monospace;
 * }
 * ```
 */
export function mixinsTransform() {
	const mixins = new Map();

	return {
		Rule: {
			custom: {
				mixin(rule) {
					const mixinDefinition = parseMixinDefinition(rule);
					if (!mixinDefinition) {
						console.warn("Invalid @mixin rule ignored.");
						return [];
					}

					mixins.set(mixinDefinition.name, mixinDefinition);
					return [];
				},
			},
			unknown(rule) {
				if (rule.name !== "apply") return;

				const applyInvocation = parseApplyInvocation(rule);
				if (!applyInvocation) return;

				const mixinDefinition = mixins.get(applyInvocation.name);
				if (!mixinDefinition) return;

				if (
					applyInvocation.arguments.length >
					mixinDefinition.parameterNames.length
				) {
					console.warn(`Too many arguments passed to ${applyInvocation.name}.`);
					return [];
				}

				return processApplyInvocation(mixinDefinition, applyInvocation);
			},
		},
	};
}

/** Parses an authored `@mixin` rule (into mixin name + param names + `@result` rules). */
function parseMixinDefinition(
	/** @type {lightningcss.CustomAtRule<typeof customAtRules, "mixin">} */ rule,
) {
	const prelude = rule.prelude?.value;
	if (prelude?.length !== 1 || prelude[0].type !== "function") return null;

	const name = prelude[0].value.name;
	if (!name.startsWith("--")) return null;

	const parameterNames = splitTokens(prelude[0].value.arguments, "comma").map(
		(tokens) => {
			const [param] = trimWhitespace(tokens);
			return param?.type === "dashed-ident" ? param.value : null;
		},
	);
	if (parameterNames.some((param) => !param)) return null;

	const rules = /** @type {lightningcss.Rule[]} */ ([]);
	for (const bodyRule of rule.body.value) {
		if (
			bodyRule.type === "custom" &&
			bodyRule.value.name === "result" && // only `@result` blocks are retained
			bodyRule.value.body?.type === "rule-list"
		) {
			rules.push(...bodyRule.value.body.value);
		}
	}

	if (rules.length === 0) return null;

	return { name, parameterNames, rules };
}

/** Parses an `@apply` rule into a mixin call (name + argument values). */
function parseApplyInvocation(/** @type {lightningcss.UnknownAtRule} */ rule) {
	const callee = rule.prelude[0];
	if (!callee) return null;

	if (callee.type === "dashed-ident") {
		return { name: callee.value, arguments: [] };
	}

	if (callee.type !== "function") return null;
	if (callee.value.arguments.length === 0) return null;

	return {
		name: callee.value.name,
		arguments: splitTokens(callee.value.arguments, "comma").map(trimWhitespace),
	};
}

/** Processes one `@apply` invocation by cloning the mixin's `@result` rules and applying the passed argument values. */
function processApplyInvocation(
	/** @type {{ name: string, parameterNames: string[], rules: lightningcss.Rule[] }} */ mixin,
	/** @type {{ name: string, arguments: lightningcss.TokenOrValue[][] }} */ invocation,
) {
	const argumentsByName = new Map(
		mixin.parameterNames.map((name, index) => [
			name,
			invocation.arguments[index] ?? null,
		]),
	);
	const parameterNames = new Set(mixin.parameterNames);

	return mixin.rules
		.map((childRule) => resolveRule(structuredClone(childRule)))
		.filter(Boolean);

	/** Resolves one cloned rule for this `@apply` call, including any nested rules. */
	function resolveRule(/** @type {lightningcss.Rule} */ rule) {
		if (rule.type === "style" || rule.type === "nested-declarations") {
			rule.value.declarations.declarations =
				rule.value.declarations.declarations
					.map((declaration) => resolveDeclaration(declaration))
					.filter(Boolean);

			rule.value.declarations.importantDeclarations =
				rule.value.declarations.importantDeclarations
					.map((declaration) => resolveDeclaration(declaration))
					.filter(Boolean);
		}

		if (rule.value?.rules) {
			rule.value.rules = rule.value.rules
				.map((childRule) => resolveRule(childRule))
				.filter(Boolean);
		}

		return rule;
	}

	/** Resolves a declaration's value for this `@apply` call. Returns null if the value is not resolved. */
	function resolveDeclaration(
		/** @type {lightningcss.Declaration} */ declaration,
	) {
		if (
			declaration.property !== "custom" &&
			declaration.property !== "unparsed"
		) {
			return declaration;
		}

		const value = resolveTokens(declaration.value.value);
		if (value.length === 0) return null;
		declaration.value.value = value;

		return declaration;
	}

	/**
	 * Recursively resolves a token list for one `@apply` call and replaces any supported
	 * `if(...)` expressions with the branch that matches the passed argument values.
	 */
	function resolveTokens(/** @type {lightningcss.TokenOrValue[]} */ tokens) {
		return tokens.flatMap((token) => {
			if (token.type !== "function") return [token];

			if (token.value.name === "if") {
				const reduced = processIfElse(token.value.arguments);
				if (reduced) return reduced;
			}

			return [
				{
					...token,
					value: {
						...token.value,
						arguments: resolveTokens(token.value.arguments),
					},
				},
			];
		});
	}

	/** Evaluates a supported `if(...)` token list against one `@apply` call's argument values. */
	function processIfElse(/** @type {lightningcss.TokenOrValue[]} */ tokens) {
		const branches = splitTokens(tokens, "semicolon").map(trimWhitespace);
		if (branches.length === 0) return [];

		let elseBranch = null;

		for (const branch of branches) {
			if (branch.length === 0) continue;

			const parsedBranch = parseConditionalBranch(branch);
			if (!parsedBranch) return null;

			if (parsedBranch.type === "else") {
				elseBranch = parsedBranch.value;
				continue;
			}

			const passedValue = argumentsByName.get(parsedBranch.condition.name);
			if (
				passedValue &&
				JSON.stringify(tokenShape(passedValue)) ===
					JSON.stringify(tokenShape(parsedBranch.condition.value))
			) {
				return parsedBranch.value;
			}
		}

		return elseBranch ?? [];
	}

	/** Parses one `if(...)` branch into either an `else` branch or a conditional branch. */
	function parseConditionalBranch(
		/** @type {lightningcss.TokenOrValue[]} */ branch,
	) {
		const colonIndex = branch.findIndex(
			(token) => token.type === "token" && token.value.type === "colon",
		);
		if (colonIndex === -1) return null;

		const conditionTokens = trimWhitespace(branch.slice(0, colonIndex));
		const valueTokens = trimWhitespace(
			resolveTokens(branch.slice(colonIndex + 1)),
		);

		if (
			conditionTokens.length === 1 &&
			conditionTokens[0].type === "token" &&
			conditionTokens[0].value.type === "ident" &&
			conditionTokens[0].value.value === "else"
		) {
			return {
				type: "else",
				value: valueTokens,
			};
		}

		const condition = parseStyleQuery(conditionTokens);
		if (!condition || !parameterNames.has(condition.name)) return null;

		return {
			type: "when",
			condition,
			value: valueTokens,
		};
	}
}

/** Parses `style(--arg: value)` conditions used by `if(...)` branches inside mixins. */
function parseStyleQuery(/** @type {lightningcss.TokenOrValue[]} */ tokens) {
	if (tokens.length !== 1 || tokens[0].type !== "function") return null;
	if (tokens[0].value.name !== "style") return null;

	const styleQueryTokens = trimWhitespace(tokens[0].value.arguments);
	if (styleQueryTokens[0]?.type !== "dashed-ident") return null;

	const colonIndex = styleQueryTokens.findIndex(
		(token) => token.type === "token" && token.value.type === "colon",
	);
	if (colonIndex === -1) return null;

	return {
		name: styleQueryTokens[0].value,
		value: trimWhitespace(styleQueryTokens.slice(colonIndex + 1)),
	};
}

/** Converts a token list into a plain nested shape so two token lists can be compared. */
function tokenShape(/** @type {lightningcss.TokenOrValue[]} */ tokens) {
	return trimWhitespace(tokens).map((token) => {
		if (token.type !== "function") return token;

		return {
			type: token.type,
			value: {
				name: token.value.name,
				arguments: tokenShape(token.value.arguments),
			},
		};
	});
}

/** Splits a token list based on a top-level separator token (e.g. comma or semicolon). */
function splitTokens(
	/** @type {lightningcss.TokenOrValue[]} */ tokens,
	/** @type {lightningcss.Token["value"]["type"]} */ separatorType,
) {
	if (tokens.length === 0) return [];

	const groups = [];
	let currentGroup = [];

	for (const token of tokens) {
		if (token.type === "token" && token.value.type === separatorType) {
			groups.push(currentGroup);
			currentGroup = [];
			continue;
		}

		currentGroup.push(token);
	}

	groups.push(currentGroup);
	return groups;
}

/** Removes leading and trailing whitespace tokens from a token list. */
function trimWhitespace(/** @type {lightningcss.TokenOrValue[]} */ tokens) {
	let start = 0;
	let end = tokens.length;

	while (start < end && isWhitespace(tokens[start])) start += 1;
	while (end > start && isWhitespace(tokens[end - 1])) end -= 1;

	return tokens.slice(start, end);

	function isWhitespace(/** @type {lightningcss.TokenOrValue} */ token) {
		return token?.type === "token" && token.value.type === "white-space";
	}
}
