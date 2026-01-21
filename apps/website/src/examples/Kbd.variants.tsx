/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Kbd } from "@stratakit/bricks";

export default () => {
	return (
		<div className="flex">
			<Kbd variant="solid">Solid</Kbd>
			<Kbd variant="muted">Muted</Kbd>
			<Kbd variant="ghost">Ghost</Kbd>
		</div>
	);
};
