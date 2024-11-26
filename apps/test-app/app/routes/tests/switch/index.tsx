/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Switch, Label, VisuallyHidden, Field } from "@itwin/kiwi-react/bricks";
import { useSearchParams } from "react-router";
import { useId } from "react";

export const handle = { title: "Switch" };

export default function Page() {
	const [searchParams] = useSearchParams();
	const checked = searchParams.get("checked") === "true";
	const disabled = searchParams.get("disabled") === "true";
	const visualTest = searchParams.get("visual") === "true";

	if (visualTest) {
		return <VisualTest />;
	}

	return (
		<Field>
			<Switch defaultChecked={checked} disabled={disabled} />
			<Label>Toggle me</Label>
		</Field>
	);
}

function VisualTest() {
	const [searchParams] = useSearchParams();
	const checked = searchParams.get("checked") === "true";
	const disabled = searchParams.get("disabled") === "true";
	const id = useId();

	return (
		<>
			<Switch defaultChecked={checked} disabled={disabled} id={id} />
			<VisuallyHidden render={<Label htmlFor={id} />}>Toggle me</VisuallyHidden>
		</>
	);
}
