/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Anchor } from "@itwin/kiwi-react/bricks";
import { useSearchParams } from "@remix-run/react";

export default function Page() {
	const disabled = useSearchParams()[0].get("disabled") === "true";

	return (
		<>
			<h1 id="heading" tabIndex={-1}>
				Anchor
			</h1>

			<Anchor href="#heading" disabled={disabled}>
				Hello
			</Anchor>
		</>
	);
}
