/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import CheckboxChecked from "examples/mui/Checkbox.checked.tsx";
import CheckboxDefault from "examples/mui/Checkbox.default.tsx";
import CheckboxError from "examples/mui/Checkbox.error.tsx";
import CheckboxGroup from "examples/mui/Checkbox.group.tsx";
import CheckboxIndeterminate from "examples/mui/Checkbox.indeterminate.tsx";

export default function CheckboxExamples() {
	return (
		<>
			<CheckboxDefault />
			<CheckboxChecked />
			<CheckboxIndeterminate />
			<CheckboxGroup />
			<CheckboxError />
		</>
	);
}
