/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Skeleton, VisuallyHidden } from "@stratakit/bricks";

export default () => {
	return (
		<div style={{ display: "flex", gap: 8 }}>
			<Skeleton variant="text" size="xsmall" />
			<VisuallyHidden>Loading…</VisuallyHidden>

			<Skeleton variant="text" size="small" />
			<VisuallyHidden>Loading…</VisuallyHidden>

			<Skeleton variant="text" size="medium" />
			<VisuallyHidden>Loading…</VisuallyHidden>

			<Skeleton variant="text" size="large" />
			<VisuallyHidden>Loading…</VisuallyHidden>

			<Skeleton variant="text" size="xlarge" />
			<VisuallyHidden>Loading…</VisuallyHidden>
		</div>
	);
};
