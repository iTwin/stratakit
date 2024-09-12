/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Switch, Label, VisuallyHidden } from "@itwin/kiwi-react/bricks";
import { useSearchParams } from "@remix-run/react";
import { useId } from "react";

export const handle = { title: "Switch" };

export default function Page() {
	const [searchParams] = useSearchParams();
	const checked = searchParams.get("checked") === "true";
	const disabled = searchParams.get("disabled") === "true";
	const visualTest = searchParams.get("visual") === "true";

	const id = useId();

	if (visualTest) {
		return <VisualTest />;
	}

	return (
		<>
			<Switch id={id} defaultChecked={checked} disabled={disabled} />
			<Label htmlFor={id}>Toggle me</Label>
		</>
	);
}

function VisualTest() {
	const [searchParams] = useSearchParams();
	const checked = searchParams.get("checked") === "true";
	const disabled = searchParams.get("disabled") === "true";

	return (
		<label>
			<Switch defaultChecked={checked} disabled={disabled} />
			<VisuallyHidden>Toggle me</VisuallyHidden>
		</label>
	);
}
