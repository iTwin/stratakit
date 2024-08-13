/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Input, Label } from "@itwin/kiwi-react/bricks";
import { useSearchParams } from "@remix-run/react";
import { useId } from "react";

export default function Page() {
	const disabled = useSearchParams()[0].get("disabled") === "true";
	const id = useId();

	return (
		<>
			<h1>Input</h1>

			<Label htmlFor={id}>Fruit</Label>
			<Input id={id} disabled={disabled} />
		</>
	);
}
