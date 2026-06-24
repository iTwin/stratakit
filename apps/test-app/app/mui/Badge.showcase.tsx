/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import BadgeColors from "examples/mui/Badge.colors.tsx";
import BadgeDefault from "examples/mui/Badge.default.tsx";
import BadgeError from "examples/mui/Badge.error.tsx";
import BadgeSizes from "examples/mui/Badge.sizes.tsx";

export default function BadgeExamples() {
	return (
		<>
			<BadgeDefault />
			<BadgeSizes />
			<BadgeColors />
			<BadgeError />
		</>
	);
}
