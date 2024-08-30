/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Anchor } from "@itwin/kiwi-react/bricks";
import { useSearchParams } from "@remix-run/react";

export const handle = { title: "Anchor" };

export default function Page() {
	const disabled = useSearchParams()[0].get("disabled") === "true";

	return (
		<>
			<Anchor href="#main" disabled={disabled}>
				Hello
			</Anchor>

			<main id="main" tabIndex={-1}>
				Main content
			</main>
		</>
	);
}
