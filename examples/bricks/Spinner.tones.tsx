/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Spinner } from "@stratakit/bricks";

export default () => {
	return (
		<div className="flex">
			<Spinner tone="neutral" />
			<Spinner tone="accent" />
		</div>
	);
};
