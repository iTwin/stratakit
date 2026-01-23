/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Badge } from "@stratakit/bricks";

export default () => {
	return (
		<div className="flex">
			<Badge variant="solid" label="Solid" />
			<Badge variant="muted" label="Muted" />
			<Badge variant="outline" label="Outline" />
		</div>
	);
};
