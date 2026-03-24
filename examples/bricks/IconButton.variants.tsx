/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { IconButton } from "@stratakit/bricks";

import svgPlaceholder from "@stratakit/icons/placeholder.svg";

export default () => {
	return (
		<div className="flex">
			<IconButton variant="solid" label="Solid" icon={svgPlaceholder} />
			<IconButton variant="outline" label="Outline" icon={svgPlaceholder} />
			<IconButton variant="ghost" label="Ghost" icon={svgPlaceholder} />
		</div>
	);
};
