/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Button } from "@stratakit/bricks";

export default () => {
	return (
		<div style={{ display: "flex", gap: 8 }}>
			<Button tone="accent">Accent</Button>
			<Button tone="neutral">Neutral</Button>
		</div>
	);
};
