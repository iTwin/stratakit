/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Button } from "@stratakit/bricks";
import { Icon } from "@stratakit/foundations";

import arrowIcon from "@stratakit/icons/arrow-right.svg";

export default () => {
	return (
		<Button onClick={() => {}}>
			Create new
			<Icon href={arrowIcon} />
		</Button>
	);
};
