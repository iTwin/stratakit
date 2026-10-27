/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { IconButton } from "@stratakit/bricks";
import { svgPlaceholder } from "@stratakit/icons/placeholder";

export default () => {
	return (
		<div style={{ display: "flex", gap: 8 }}>
			<IconButton variant="solid" label="Solid" icon={svgPlaceholder} />
			<IconButton variant="outline" label="Outline" icon={svgPlaceholder} />
			<IconButton variant="ghost" label="Ghost" icon={svgPlaceholder} />
		</div>
	);
};
