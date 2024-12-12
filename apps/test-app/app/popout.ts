/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
export function loader() {
	return new Response("<!doctype html><meta charset=utf-8>", {
		status: 200,
		headers: { "content-type": "text/html;charset=utf-8" },
	});
}
