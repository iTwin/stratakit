/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Checkbox } from "@mui/material";
import { ScreenShotWrapper } from "~/ScreenShotWrapper.tsx";
import { VaryPropsStack, varyProp } from "~/VaryProps.tsx";

export function Visual() {
	const variations = varyProp({
		prop: "disabled",
		values: [false, true],
		withExisting: [
			{ checked: false },
			{ indeterminate: true },
			{ checked: true },
		],
		order: "new-existing",
	});

	return (
		<ScreenShotWrapper>
			<VaryPropsStack component={Checkbox} variations={variations} />
		</ScreenShotWrapper>
	);
}
