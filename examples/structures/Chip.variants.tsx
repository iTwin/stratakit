/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Chip } from "@stratakit/structures";

export default () => {
	return (
		<div className="flex">
			<Chip variant="solid" label="Solid" />
			<Chip variant="outline" label="Outline" />
		</div>
	);
};
