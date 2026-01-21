/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Field, Switch } from "@stratakit/bricks";

export default () => {
	return (
		<Field.Root>
			<Field.Control render={<Switch />} />
			<Field.Label>Dark mode</Field.Label>
		</Field.Root>
	);
};
