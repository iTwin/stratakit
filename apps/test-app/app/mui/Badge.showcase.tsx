/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import BadgeColors from "examples/mui/Badge.colors.tsx";
import BadgeDefault from "examples/mui/Badge.default.tsx";
import BadgeDot from "examples/mui/Badge.dot.tsx";
import BadgeInline from "examples/mui/Badge.inline.tsx";
import BadgeSizes from "examples/mui/Badge.sizes.tsx";
import BadgeType from "examples/mui/Badge.type.tsx";

export default function BadgeExamples() {
	return (
		<>
			<BadgeDefault />
			<BadgeDot />
			<BadgeInline />
			<BadgeSizes />
			<BadgeColors />
			<BadgeType />
		</>
	);
}
