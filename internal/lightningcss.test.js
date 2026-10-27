/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import assert from "node:assert/strict";
import test from "node:test";

import * as lightningcss from "lightningcss";
import { staticVariablesTransform } from "./lightningcss.tokens.js";

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
			visitor: staticVariablesTransform(),
		})
		.code.toString();

	// The transform appends a trailing whitespace token when replaying a value.
	assert.equal(css, `.foo{color:var(--other) }`);
});
