/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { definePage } from "~/~utils.tsx";
import { Field, TextBox } from "@itwin/itwinui-react/bricks";

export const handle = { title: "Textarea" };

export default definePage(function Page({ disabled }) {
	return (
		<Field.Root>
			<Field.Label>Fruit</Field.Label>
			<Field.Control
				render={<TextBox.Textarea rows={3} disabled={!!disabled} />}
			/>
		</Field.Root>
	);
});
