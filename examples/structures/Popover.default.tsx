/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import Button from "@stratakit/bricks/Button";
import Popover from "@stratakit/structures/unstable_Popover";

export default () => {
	return (
		<Popover content="The content of the Popover.">
			<Button>Open popover</Button>
		</Popover>
	);
};
