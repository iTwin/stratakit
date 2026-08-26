/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import assert from "node:assert/strict";
import test from "node:test";

import * as lightningcss from "lightningcss";
import { customAtRules, mixinsTransform } from "./lightningcss.mixins.js";
import { staticVariablesTransform } from "./lightningcss.tokens.js";

test("mixinsTransform: zero-argument mixins", () => {
	const source = `
@mixin --foo() {
  @result {
    color: red;
  }
}
.foo {
  @apply --foo;
}
`;

	const css = lightningcss
		.transform({
			filename: "test.css",
			code: Buffer.from(source),
			minify: true,
			customAtRules,
			visitor: mixinsTransform(),
		})
		.code.toString();

	assert.equal(css, `.foo{color:red}`);
});

test("mixinsTransform: parameterized mixins with if()", () => {
	const source = `
@mixin --font(--type) {
  @result {
    font-family: if(
      style(--type: "mono"): monospace;
      else: sans-serif
    );
  }
}
.foo {
  @apply --font("mono");
}
`;

	const css = lightningcss
		.transform({
			filename: "test.css",
			code: Buffer.from(source),
			minify: true,
			customAtRules,
			visitor: mixinsTransform(),
		})
		.code.toString();

	assert.equal(css, `.foo{font-family:monospace}`);
});

test("composeVisitors: later visitors are not invoked after an earlier one removes a node", () => {
	/** @type {string[]} */
	const seen = [];

	const dropColor = {
		Declaration(/** @type {any} */ decl) {
			return decl.property === "color" ? [] : undefined;
		},
	};

	const recordProperty = {
		Declaration(/** @type {any} */ decl) {
			seen.push(decl?.property ?? "<undefined>");
			return undefined;
		},
	};

	lightningcss.transform({
		filename: "test.css",
		code: Buffer.from(".a{color:red}"),
		minify: true,
		visitor: lightningcss.composeVisitors([dropColor, recordProperty]),
	});

	assert.deepEqual(seen, []);
});

test("mixinsTransform: mixin body containing var(), across an @import", async () => {
	const sources = {
		// A literal value here would not exercise the bug: only `var()` carries
		// the null-valued fields that fail to round-trip.
		"/mixins.css":
			"@mixin --foo() {\n  @result {\n    font-size: var(--size);\n  }\n}\n",
		"/styles.css": ".foo {\n  @apply --foo;\n}\n",
		"/entry.css": '@import "./mixins.css";\n@import "./styles.css";\n',
	};

	const { code } = await lightningcss.bundleAsync({
		filename: "/entry.css",
		minify: true,
		customAtRules,
		visitor: mixinsTransform(),
		resolver: {
			resolve: (specifier, from) =>
				new URL(specifier, `file://${from}`).pathname,
			read: (file) => sources[file],
		},
	});

	assert.equal(code.toString(), ".foo{font-size:var(--size)}");
});

test("staticVariablesTransform: replays a saved value containing a var()", () => {
	// A literal value here would not exercise the bug: only `var()` carries
	// the null-valued fields that fail to round-trip.
	const source = `
.foo {
  --✨saved: var(--other);
  color: var(--✨saved);
}
`;

	const css = lightningcss
		.transform({
			filename: "test.css",
			code: Buffer.from(source),
			minify: true,
			customAtRules,
			visitor: staticVariablesTransform(),
		})
		.code.toString();

	// The transform appends a trailing whitespace token when replaying a value.
	assert.equal(css, `.foo{color:var(--other) }`);
});
