/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Stack } from "@mui/material";
import { svgPlaceholder } from "@stratakit/icons/placeholder";
import { Icon } from "@stratakit/mui";
import BadgeColors from "examples/mui/Badge.colors.tsx";
import BadgeDefault from "examples/mui/Badge.default.tsx";
import BadgeDot from "examples/mui/Badge.dot.tsx";
import BadgeInline from "examples/mui/Badge.inline.tsx";
import BadgeSizes from "examples/mui/Badge.sizes.tsx";
import BadgeType from "examples/mui/Badge.type.tsx";
import { ScreenShotWrapper } from "~/ScreenShotWrapper.tsx";

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

export function VisualTest() {
	return (
		<ScreenShotWrapper>
			<Stack spacing={4}>
				<BadgeSizes />
				<BadgeColors />
				<BadgeType />
				<Stack spacing={4} direction="row">
					<BadgeDefault color="secondary" variant="dot" />
					<BadgeDefault color="info" badgeContent={99} />
					<BadgeDefault color="success" badgeContent={99} />
					<BadgeDefault color="warning" badgeContent={999} />
					<BadgeDefault
						color="error"
						badgeContent={<Icon href={svgPlaceholder} />}
					/>
				</Stack>
			</Stack>
		</ScreenShotWrapper>
	);
}
