/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Switch, Label } from "@itwin/kiwi-react/bricks";
import { useSearchParams } from "@remix-run/react";
import { useId } from "react";

export default function Page() {
	const [searchParams] = useSearchParams();
	const checked = searchParams.get("checked") === "true";
	const disabled = searchParams.get("disabled") === "true";

	const id = useId();

	return (
		<>
			<h1>Switch</h1>

			<Switch id={id} defaultChecked={checked} disabled={disabled} />
			<Label htmlFor={id}>Toggle me</Label>
		</>
	);
}
