/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Radio, Label, VisuallyHidden } from "@itwin/kiwi-react/bricks";
import { useSearchParams } from "react-router";
import { useId } from "react";

export const handle = { title: "Radio" };

export default function Page() {
	const [searchParams] = useSearchParams();
	const defaultValue = searchParams.get("defaultValue");
	const disabled = searchParams.get("disabled") === "true";
	const visualTest = searchParams.get("visual") === "true";

	const idA = useId();
	const idB = useId();

	if (visualTest) {
		return <VisualTest />;
	}

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

function VisualTest() {
	const [searchParams] = useSearchParams();
	const checked = searchParams.get("checked") === "true";
	const disabled = searchParams.get("disabled") === "true";

	const id = useId();

	return (
		<>
			<Radio
				name="test"
				value="A"
				id={id}
				defaultChecked={checked}
				disabled={disabled}
			/>
			<VisuallyHidden render={<Label htmlFor={id} />}>Toggle me</VisuallyHidden>
		</>
	);
}
