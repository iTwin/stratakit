/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Skeleton, VisuallyHidden } from "@stratakit/bricks";

export default () => {
	return (
		<div className="flex" style={{ alignItems: "center" }}>
			<Skeleton variant="object" />
			<Skeleton variant="text" />
			<VisuallyHidden>Loading…</VisuallyHidden>
		</div>
	);
};
