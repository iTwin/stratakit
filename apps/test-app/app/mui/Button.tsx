/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import ButtonIcons_ from "examples/mui/Button._icons.tsx";
import ButtonPermutations_ from "examples/mui/Button._permutations.js";
import ButtonColors from "examples/mui/Button.colors.tsx";
import ButtonDefault from "examples/mui/Button.default.tsx";
import ButtonSizes from "examples/mui/Button.sizes.tsx";
import ButtonVariants from "examples/mui/Button.variants.tsx";
import { isProduction } from "../~utils.tsx";

export default function ButtonExamples() {
	return (
		<>
			<ButtonDefault />
			<ButtonSizes />
			<ButtonVariants />
			<ButtonColors />
			{!isProduction && <ButtonIcons_ />}
			{!isProduction && <ButtonPermutations_ />}
		</>
	);
}
