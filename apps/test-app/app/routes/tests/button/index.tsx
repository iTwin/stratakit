/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Button } from "@itwin/kiwi-react/bricks";
import { useSearchParams } from "@remix-run/react";

export default function Page() {
	const disabled = useSearchParams()[0].get("disabled") === "true";

	return (
		<>
			<h1>Hello</h1>
			<Button
				disabled={disabled}
				onClick={(e) => {
					e.currentTarget.textContent = "Clicked";
				}}
			>
				Hello
			</Button>
		</>
	);
}
