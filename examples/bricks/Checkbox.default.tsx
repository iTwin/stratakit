/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Checkbox, Field } from "@stratakit/bricks";

export default () => {
	return (
		<Field.Root>
			<Field.Control render={<Checkbox />} />
			<Field.Label>Don’t show again</Field.Label>
		</Field.Root>
	);
};
