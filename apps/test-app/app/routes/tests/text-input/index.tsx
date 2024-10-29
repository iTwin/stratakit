/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { TextInput, Label } from "@itwin/kiwi-react/bricks";
import { useSearchParams } from "@remix-run/react";
import { useId } from "react";

export const handle = { title: "TextInput" };

export default function Page() {
	const disabled = useSearchParams()[0].get("disabled") === "true";
	const id = useId();

	return (
		<>
			<Label htmlFor={id}>Fruit</Label>
			<TextInput id={id} disabled={disabled} />
		</>
	);
}
