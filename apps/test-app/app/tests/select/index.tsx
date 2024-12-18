/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Field, Label, Select } from "@itwin/itwinui-react/bricks";
import { definePage } from "~/~utils.tsx";

export const handle = { title: "Select" };

export default definePage(function Page() {
	return (
		<Field>
			<Label>Fruit</Label>
			<Select.Root>
				<Select.HtmlSelect>
					<option value="apple">Apple</option>
					<option value="orange">Orange</option>
					<option value="kiwi">Kiwi</option>
				</Select.HtmlSelect>
			</Select.Root>
		</Field>
	);
});
