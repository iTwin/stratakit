/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import assert from "node:assert/strict";
import test from "node:test";

import * as lightningcss from "lightningcss";
import { customAtRules, mixinsTransform } from "./lightningcss.mixins.js";

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
