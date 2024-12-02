/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { definePage } from "~/~utils.tsx";
import { Field, Label, TextBox } from "@itwin/kiwi-react/bricks";

export const handle = { title: "Textarea" };

export default definePage(function Page({ disabled }) {
	return (
		<Field>
			<Label>Fruit</Label>
			<TextBox.Textarea rows={3} disabled={!!disabled} />
		</Field>
	);
});
