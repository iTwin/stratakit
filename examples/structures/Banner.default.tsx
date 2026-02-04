/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { unstable_Banner as Banner } from "@stratakit/structures";

export default () => {
	return (
		<Banner
			label="Update complete"
			message="Your settings have been saved successfully."
		/>
	);
};
