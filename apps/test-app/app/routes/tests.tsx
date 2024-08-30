/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { VisuallyHidden } from "@itwin/kiwi-react/bricks";
import type { MetaFunction } from "@remix-run/node";
import { Outlet, useMatches } from "@remix-run/react";

export const meta: MetaFunction = () => {
	return [{ title: "Kiwi tests" }, { name: "color-scheme", content: "dark" }];
};

export default function Page() {
	const matches = useMatches();
	const title = (matches.at(-1)?.handle as { title: string })?.title ?? "Tests";

	return (
		<>
			<VisuallyHidden render={(props) => <h1 {...props} />}>
				{title}
			</VisuallyHidden>
			<Outlet />
		</>
	);
}
