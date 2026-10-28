/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Chip } from "@stratakit/structures";

export default () => {
	return (
		<div style={{ display: "flex", gap: 8 }}>
			<Chip variant="solid" label="Solid" />
			<Chip variant="outline" label="Outline" />
		</div>
	);
};
