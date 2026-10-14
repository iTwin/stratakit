/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import Stack from "@mui/material/Stack";
import SkeletonDefault from "examples/mui/Skeleton.default.tsx";
import SkeletonVariants from "examples/mui/Skeleton.variants.tsx";

export default function SkeletonExamples() {
	return (
		<Stack spacing={4} sx={{ alignSelf: "stretch" }}>
			<SkeletonDefault />
			<SkeletonVariants />
		</Stack>
	);
}
