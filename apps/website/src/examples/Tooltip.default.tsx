/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Button, Tooltip } from "@stratakit/bricks";

export default () => {
	return (
		<Tooltip
			content="Save is disabled until you finish reading the documentation."
			type="description"
		>
			<Button disabled>Save</Button>
		</Tooltip>
	);
};
