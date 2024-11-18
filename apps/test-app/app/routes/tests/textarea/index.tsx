/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Label, TextBox } from "@itwin/kiwi-react/bricks";
import { useSearchParams } from "@remix-run/react";
import { useId } from "react";

export const handle = { title: "Textarea" };

export default function Page() {
	const disabled = useSearchParams()[0].get("disabled") === "true";
	const id = useId();

	return (
		<>
			<Label htmlFor={id}>Fruit</Label>
			<TextBox.Textarea id={id} rows={3} disabled={disabled} />
		</>
	);
}
