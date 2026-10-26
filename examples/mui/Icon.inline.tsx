/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Icon } from "@stratakit/mui";

export default () => {
	return (
		<Icon
			render={
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
					<circle
						cx="8"
						cy="8"
						r="7"
						strokeWidth="2"
						fill="none"
						stroke="currentColor"
					/>
				</svg>
			}
		/>
	);
};
