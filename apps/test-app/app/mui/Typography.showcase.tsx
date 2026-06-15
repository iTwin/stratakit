/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import TypographyMuiVariants_ from "examples/mui/Typography._mui-variants.tsx";
import TypographyColors from "examples/mui/Typography.colors.tsx";
import TypographyDefault from "examples/mui/Typography.default.tsx";
import TypographyHeading from "examples/mui/Typography.heading.tsx";
import TypographyVariants from "examples/mui/Typography.variants.tsx";

export default function TypographyExamples() {
	return (
		<>
			<TypographyDefault />
			<TypographyHeading />
			<TypographyVariants />
			<TypographyMuiVariants_ />
			<TypographyColors />
		</>
	);
}
