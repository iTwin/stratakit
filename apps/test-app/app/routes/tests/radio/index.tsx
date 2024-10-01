/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Radio, Label } from "@itwin/kiwi-react/bricks";
import { useSearchParams } from "@remix-run/react";
import { useId } from "react";

export const handle = { title: "Radio" };

export default function Page() {
	const [searchParams] = useSearchParams();
	const defaultValue = searchParams.get("defaultValue");
	const disabled = searchParams.get("disabled") === "true";

	const idA = useId();
	const idB = useId();

	return (
		<>
			<Radio
				name="test"
				value="A"
				id={idA}
				defaultChecked={defaultValue === "A"}
				disabled={disabled}
			/>
			<Label htmlFor={idA}>A</Label>

			<Radio
				name="test"
				value="B"
				id={idB}
				defaultChecked={defaultValue === "B"}
				disabled={disabled}
			/>
			<Label htmlFor={idB}>B</Label>
		</>
	);
}
