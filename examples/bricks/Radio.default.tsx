/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Field, Radio } from "@stratakit/bricks";

export default () => {
	return (
		<fieldset>
			<legend>Choose a design system:</legend>
			<Field.Root style={{ marginBlock: 8 }}>
				<Field.Control
					render={<Radio name="design-system" value="StrataKit" />}
				/>
				<Field.Label>StrataKit</Field.Label>
			</Field.Root>

			<Field.Root style={{ marginBlock: 8 }}>
				<Field.Control
					render={<Radio name="design-system" value="iTwinUI" />}
				/>
				<Field.Label>iTwinUI</Field.Label>
			</Field.Root>
		</fieldset>
	);
};
