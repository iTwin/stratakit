/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { MetaFunction } from "@remix-run/node";
import { Button } from "@itwin/kiwi-react/bricks";

export const meta: MetaFunction = () => {
	return [
		{ title: "Kiwi test app" },
		{ name: "color-scheme", content: "dark" },
	];
};

export default function Index() {
	return (
		<>
			<h1>Welcome</h1>
			<Button>Hello</Button>
		</>
	);
}
