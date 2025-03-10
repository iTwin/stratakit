/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import globalStyles from "./tests.css?url";
import { VisuallyHidden } from "@itwin/itwinui-react/bricks";
import {
	Outlet,
	useMatches,
	type MetaFunction,
	type LinksFunction,
} from "react-router";

export const meta: MetaFunction = () => {
	return [{ title: "Kiwi tests" }];
};

export const links: LinksFunction = () => [
	{ rel: "stylesheet", href: globalStyles },
];

export default function Page() {
	const matches = useMatches();
	const title = (matches.at(-1)?.handle as { title: string })?.title ?? "Tests";

	return (
		<>
			<main>
				<VisuallyHidden render={(props) => <h1 {...props} />}>
					{title}
				</VisuallyHidden>
				<Outlet />
			</main>
		</>
	);
}
