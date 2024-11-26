/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Field, Label, TextBox } from "@itwin/kiwi-react/bricks";
import { useSearchParams } from "react-router";
import { useId } from "react";

export const handle = { title: "Textarea" };

export default function Page() {
	const disabled = useSearchParams()[0].get("disabled") === "true";
	const id = useId();

	return (
		<Field>
			<Label>Fruit</Label>
			<TextBox.Textarea rows={3} disabled={disabled} />
		</Field>
	);
}
