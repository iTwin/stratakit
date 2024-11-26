/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Radio, Label, VisuallyHidden, Field } from "@itwin/kiwi-react/bricks";
import { useSearchParams } from "react-router";
import { useId } from "react";

export const handle = { title: "Radio" };

export default function Page() {
	const [searchParams] = useSearchParams();
	const defaultValue = searchParams.get("defaultValue");
	const disabled = searchParams.get("disabled") === "true";
	const visualTest = searchParams.get("visual") === "true";

	if (visualTest) {
		return <VisualTest />;
	}

	return (
		<div style={{ display: "grid", gap: 8 }}>
			<Field>
				<Radio
					name="test"
					value="A"
					defaultChecked={defaultValue === "A"}
					disabled={disabled}
				/>
				<Label>A</Label>
			</Field>

			<Field>
				<Radio
					name="test"
					value="B"
					defaultChecked={defaultValue === "B"}
					disabled={disabled}
				/>
				<Label>B</Label>
			</Field>
		</div>
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
