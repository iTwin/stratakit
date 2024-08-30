/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Checkbox, Label } from "@itwin/kiwi-react/bricks";
import { useSearchParams } from "@remix-run/react";
import { useId } from "react";

export const handle = { title: "Checkbox" };

export default function Page() {
	const [searchParams] = useSearchParams();
	const checked = searchParams.get("checked") === "true";
	const indeterminate = searchParams.get("indeterminate") === "true";
	const disabled = searchParams.get("disabled") === "true";

	const id = useId();

	return (
		<>
			<Checkbox
				id={id}
				defaultChecked={indeterminate ? "mixed" : checked}
				disabled={disabled}
			/>
			<Label htmlFor={id}>Toggle me</Label>
		</>
	);
}
