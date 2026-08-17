/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import ExampleIcons from "examples/mui/Button._icons.js";
import ExamplePermutations from "examples/mui/Button._permutations.js";
import ExampleSizes from "examples/mui/Button.sizes.js";
import { ScreenShotWrapper } from "~/ScreenShotWrapper.tsx";

export function Visual() {
	return (
		<ScreenShotWrapper addSpacing>
			<ExampleIcons />
			<ExamplePermutations />
			<ExampleSizes />
		</ScreenShotWrapper>
	);
}
