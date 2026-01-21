/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Spinner } from "@stratakit/bricks";

export default () => {
	return (
		<div className="flex">
			<Spinner size="small" />
			<Spinner size="medium" />
			<Spinner size="large" />
			<Spinner size="xlarge" />
		</div>
	);
};
