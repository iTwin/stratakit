/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Button } from "@stratakit/bricks";

export default () => {
	return (
		<div className="flex">
			<Button tone="accent">Accent</Button>
			<Button tone="neutral">Neutral</Button>
		</div>
	);
};
