/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { IconButton } from "@stratakit/bricks";

import placeholderIcon from "@stratakit/icons/placeholder.svg";

export default () => {
	return (
		<div className="flex">
			<IconButton variant="solid" label="Solid" icon={placeholderIcon} />
			<IconButton variant="outline" label="Outline" icon={placeholderIcon} />
			<IconButton variant="ghost" label="Ghost" icon={placeholderIcon} />
		</div>
	);
};
