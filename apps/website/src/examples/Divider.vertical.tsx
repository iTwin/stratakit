/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Divider } from "@stratakit/bricks";

export default () => {
	return (
		<div style={{ blockSize: "calc(100dvh - 16px * 2)" }}>
			<Divider orientation="vertical" />
		</div>
	);
};
