/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Skeleton, VisuallyHidden } from "@stratakit/bricks";

export default () => {
	return (
		<div style={{ display: "flex", gap: 8, alignItems: "center" }}>
			<Skeleton variant="object" />
			<Skeleton variant="text" />
			<VisuallyHidden>Loading…</VisuallyHidden>
		</div>
	);
};
