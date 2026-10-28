/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Chip } from "@stratakit/structures";

export default () => {
	return (
		<div style={{ display: "flex", gap: 8 }}>
			<Chip label="HTML" />
			<Chip label="CSS" />
			<Chip label="JS" />
		</div>
	);
};
